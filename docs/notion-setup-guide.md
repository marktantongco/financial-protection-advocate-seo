# Notion Database Setup Guide

## Database ID: 3245ac674b2780e9a52cea36d416c82c

### Required Properties

Add these properties to your Notion database:

| Property Name | Type | Options/Format |
|--------------|------|----------------|
| **Name** | Title | (default) |
| **Status** | Select | Pending, In Progress, Completed |
| **Stage** | Select | Awareness, Consideration, Decision |
| **Word Count** | Number | (default number) |
| **Publish Date** | Date | (default date) |
| **Keyword** | Text | (default text) |
| **Provider** | Multi-select | Pacific Cross, MediCard, PhilCare, Etiqa, ValuCare, Oona Insurance, IMS Wellthcare, iCare, Cocolife, Keystone, Multiple |
| **Search Volume** | Text | e.g., "880/mo" |
| **Slug** | Text | URL-friendly slug |

### Setup Instructions

1. **Open your Notion database**
   - Go to: https://www.notion.so/3245ac674b2780e9a52cea36d416c82c

2. **Add missing properties**
   - Click the "+" button in the header row
   - Select the property type
   - Name it exactly as shown above
   - For Select properties, add the options listed

3. **Create Notion Integration**
   - Go to: https://www.notion.so/my-integrations
   - Click "+ New integration"
   - Name it: "FPA Content Engine"
   - Copy the "Internal Integration Secret"

4. **Share database with integration**
   - In your Notion database, click "..." (more options)
   - Select "Add connections"
   - Find and select your "FPA Content Engine" integration

5. **Run the update script**
   ```bash
   NOTION_API_KEY=your_integration_secret bun run scripts/update-notion.ts
   ```

### Current Data to Sync

| Title | Status | Word Count | Publish Date | Stage |
|-------|--------|------------|--------------|-------|
| Pacific Cross FlexiShield Review | Completed | 1650 | 2025-01-15 | Consideration |
| HMO vs Health Insurance Philippines | Completed | 1850 | 2025-01-18 | Consideration |
| Pre-Existing Conditions Guide | Completed | 1700 | 2025-01-20 | Decision |
| 7 Signs You Need Insurance | Pending | 0 | - | Awareness |
| Health Insurance Cost Philippines | Pending | 0 | - | Decision |
| OFW Family Health Insurance | Pending | 0 | - | Consideration |
| How to Buy Health Insurance | Pending | 0 | - | Decision |
| Losing Company HMO Guide | Pending | 0 | - | Awareness |

### Progress Summary

- **Completed:** 3 posts (37.5%)
- **Pending:** 5 posts (62.5%)
- **Total Word Count:** 5,200 words
