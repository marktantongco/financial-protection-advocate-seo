/**
 * Notion Database Update Script
 * 
 * This script updates the Financial Protection Advocate SEO Content Engine
 * Notion database with post completion status, word counts, and publish dates.
 * 
 * Database ID: 3245ac674b2780e9a52cea36d416c82c
 * 
 * Required Environment Variables:
 * - NOTION_API_KEY: Your Notion integration secret
 * 
 * Setup:
 * 1. Create a Notion integration at https://www.notion.so/my-integrations
 * 2. Copy the integration secret to NOTION_API_KEY
 * 3. Share the database with your integration
 * 4. Run: bun run scripts/update-notion.ts
 */

const NOTION_DATABASE_ID = '3245ac674b2780e9a52cea36d416c82c';
const NOTION_API_VERSION = '2022-06-28';

// Post data to sync
const posts = [
  {
    title: 'Pacific Cross FlexiShield Review',
    status: 'Completed',
    wordCount: 1650,
    publishDate: '2025-01-15',
    keyword: 'Pacific Cross health insurance review',
    stage: 'Consideration'
  },
  {
    title: 'HMO vs Health Insurance Philippines',
    status: 'Completed',
    wordCount: 1850,
    publishDate: '2025-01-18',
    keyword: 'HMO vs health insurance Philippines',
    stage: 'Consideration'
  },
  {
    title: 'Pre-Existing Conditions Guide',
    status: 'Completed',
    wordCount: 1700,
    publishDate: '2025-01-20',
    keyword: 'health insurance pre-existing conditions Philippines',
    stage: 'Decision'
  },
  {
    title: '7 Signs You Need Insurance',
    status: 'Pending',
    wordCount: 0,
    publishDate: null,
    keyword: 'health insurance Philippines',
    stage: 'Awareness'
  },
  {
    title: 'Health Insurance Cost Philippines',
    status: 'Pending',
    wordCount: 0,
    publishDate: null,
    keyword: 'health insurance cost Philippines',
    stage: 'Decision'
  },
  {
    title: 'OFW Family Health Insurance',
    status: 'Pending',
    wordCount: 0,
    publishDate: null,
    keyword: 'health insurance for OFW families',
    stage: 'Consideration'
  },
  {
    title: 'How to Buy Health Insurance',
    status: 'Pending',
    wordCount: 0,
    publishDate: null,
    keyword: 'how to apply for health insurance',
    stage: 'Decision'
  },
  {
    title: 'Losing Company HMO Guide',
    status: 'Pending',
    wordCount: 0,
    publishDate: null,
    keyword: 'company HMO vs personal insurance',
    stage: 'Awareness'
  }
];

interface NotionPage {
  id: string;
  properties: {
    Name?: { title: { plain_text: string }[] };
    Title?: { title: { plain_text: string }[] };
    [key: string]: unknown;
  };
}

async function queryDatabase(notionApiKey: string): Promise<NotionPage[]> {
  const response = await fetch(`https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${notionApiKey}`,
      'Content-Type': 'application/json',
      'Notion-Version': NOTION_API_VERSION
    },
    body: JSON.stringify({})
  });

  if (!response.ok) {
    throw new Error(`Failed to query database: ${response.statusText}`);
  }

  const data = await response.json();
  return data.results;
}

async function updatePage(notionApiKey: string, pageId: string, properties: Record<string, unknown>) {
  const response = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${notionApiKey}`,
      'Content-Type': 'application/json',
      'Notion-Version': NOTION_API_VERSION
    },
    body: JSON.stringify({ properties })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to update page: ${error}`);
  }

  return response.json();
}

function getPageTitle(page: NotionPage): string {
  const titleProp = page.properties.Name || page.properties.Title;
  if (titleProp && 'title' in titleProp && Array.isArray(titleProp.title)) {
    return titleProp.title.map(t => t.plain_text).join('');
  }
  return '';
}

async function main() {
  const notionApiKey = process.env.NOTION_API_KEY;

  if (!notionApiKey) {
    console.error('❌ NOTION_API_KEY environment variable is required');
    console.log('\nTo set up:');
    console.log('1. Create a Notion integration at https://www.notion.so/my-integrations');
    console.log('2. Copy the integration secret');
    console.log('3. Run: NOTION_API_KEY=your_secret bun run scripts/update-notion.ts');
    process.exit(1);
  }

  console.log('🔄 Fetching Notion database pages...');
  
  let pages: NotionPage[];
  try {
    pages = await queryDatabase(notionApiKey);
    console.log(`✅ Found ${pages.length} pages in database`);
  } catch (error) {
    console.error('❌ Failed to query database:', error);
    process.exit(1);
  }

  // Update each post
  for (const post of posts) {
    const page = pages.find(p => getPageTitle(p).includes(post.title.split(' ').slice(0, 3).join(' ')));
    
    if (!page) {
      console.log(`⚠️  Page not found for: ${post.title}`);
      continue;
    }

    console.log(`\n📝 Updating: ${post.title}`);
    
    try {
      const properties: Record<string, unknown> = {
        'Status': { select: { name: post.status } },
        'Stage': { select: { name: post.stage } },
        'Word Count': { number: post.wordCount }
      };

      if (post.publishDate) {
        properties['Publish Date'] = { date: { start: post.publishDate } };
      }

      await updatePage(notionApiKey, page.id, properties);
      console.log(`   ✅ Updated successfully`);
    } catch (error) {
      console.error(`   ❌ Failed to update:`, error);
    }
  }

  console.log('\n✨ Notion update complete!');
}

main().catch(console.error);
