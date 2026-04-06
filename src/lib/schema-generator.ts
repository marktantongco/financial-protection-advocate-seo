// JSON-LD Schema Generator for Blog Posts
// Based on Mode E Schema Templates

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ArticleSchema {
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  imageUrl?: string;
  wordCount?: number;
  keywords?: string[];
}

export function generateArticleSchema(data: ArticleSchema) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": data.headline,
    "description": data.description,
    "image": data.imageUrl || "https://financialprotectionadvocate.ph/images/default-og.jpg",
    "author": {
      "@type": "Person",
      "name": "Marky Tantongco",
      "url": "https://financialprotectionadvocate.ph",
      "jobTitle": "Licensed Non-Life Insurance Agent",
      "worksFor": {
        "@type": "Organization",
        "name": "Financial Protection Advocate"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "Financial Protection Advocate",
      "logo": {
        "@type": "ImageObject",
        "url": "https://financialprotectionadvocate.ph/logo.png"
      }
    },
    "datePublished": data.datePublished,
    "dateModified": data.dateModified || data.datePublished,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": data.url
    },
    "wordCount": data.wordCount,
    "articleSection": "Health Insurance",
    "keywords": data.keywords || []
  };
}

export function generateFAQSchema(faqItems: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };
}

export function generateBreadcrumbSchema(items: { name: string; url?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      ...(item.url && { "item": item.url })
    }))
  };
}

export function generateCombinedSchema(article: ArticleSchema, faqs: FAQItem[], breadcrumbs: { name: string; url?: string }[]) {
  return [
    generateArticleSchema(article),
    generateFAQSchema(faqs),
    generateBreadcrumbSchema(breadcrumbs)
  ];
}

// Pre-built schemas for completed posts
export const pacificCrossReviewFAQs: FAQItem[] = [
  {
    question: "Is Pacific Cross a legitimate insurance provider?",
    answer: "Yes. Pacific Cross is registered with the Insurance Commission of the Philippines and has been operating since 1995. They are a legitimate non-life insurance provider for health coverage with over 1,600 accredited doctors and hospitals nationwide."
  },
  {
    question: "How much does Pacific Cross FlexiShield cost per month?",
    answer: "Monthly premiums range from approximately ₱1,500 for basic coverage to ₱10,000+ for premium plans. The exact cost depends on your age, health history, and chosen benefit limit."
  },
  {
    question: "Can I use Pacific Cross at any hospital?",
    answer: "Cashless hospitalization is available at accredited hospitals only. At non-accredited hospitals, you'll need to pay upfront and file for reimbursement."
  },
  {
    question: "What happens if I have a pre-existing condition?",
    answer: "Pre-existing conditions are covered after a 6-12 month waiting period. You must disclose all conditions during application to avoid claim denial."
  },
  {
    question: "Will my premium increase after I file a claim?",
    answer: "Possibly. Pacific Cross may apply premium loading based on your claims history. This is standard practice for indemnity insurance."
  },
  {
    question: "Can I stack Pacific Cross with PhilHealth and an HMO?",
    answer: "Yes, this is recommended. PhilHealth covers the base, HMO handles routine care, and Pacific Cross provides catastrophic coverage and portability."
  }
];

export const hmoVsInsuranceFAQs: FAQItem[] = [
  {
    question: "Can I have both HMO and health insurance?",
    answer: "Yes, and I recommend it. They complement each other. Use HMO for routine care and health insurance for catastrophic protection and renewability guarantee."
  },
  {
    question: "Is health insurance more expensive than HMO?",
    answer: "Generally yes. Personal health insurance costs more than employer-subsidized HMO. However, it offers guarantees that HMOs don't — particularly renewability and portability."
  },
  {
    question: "Which has better hospital coverage?",
    answer: "HMOs have larger networks. But health insurance offers more flexibility — you can go to any hospital, though non-accredited ones require reimbursement."
  },
  {
    question: "What if I have a pre-existing condition?",
    answer: "Corporate HMOs often cover pre-existing conditions immediately. Health insurance has a 6-12 month waiting period. If you have a serious condition, keep your HMO as long as possible."
  },
  {
    question: "Can I convert my HMO to health insurance?",
    answer: "No, they're different products from different regulatory frameworks. You need to apply for health insurance separately."
  }
];

export const preExistingConditionsFAQs: FAQItem[] = [
  {
    question: "Can I get health insurance with pre-existing conditions in the Philippines?",
    answer: "Yes, you can get health insurance with pre-existing conditions. Most Philippine providers offer coverage with waiting periods (typically 6–12 months) before your pre-existing condition becomes covered."
  },
  {
    question: "What is the standard waiting period for pre-existing conditions?",
    answer: "The standard waiting period is 6–12 months in the Philippines. Minor conditions often have 6-month waiting periods, while chronic conditions typically have 12-month waiting periods."
  },
  {
    question: "Will my premium be higher if I have a pre-existing condition?",
    answer: "Possibly. Some providers apply premium loading (higher rates) for certain conditions. This varies by provider — some charge 20–50% extra for controlled diabetes, while others don't offer loading at all."
  },
  {
    question: "What happens if I don't disclose my medical history?",
    answer: "Non-disclosure can result in claim denial, policy cancellation, and difficulty getting future coverage. Insurers investigate claims thoroughly."
  },
  {
    question: "Can I appeal a pre-existing condition exclusion?",
    answer: "Yes, you can request reconsideration, especially if your condition improves or you have new medical evidence. Some providers allow appeals after 1–2 years of demonstrated good health management."
  },
  {
    question: "Which Philippine health insurance is best for pre-existing conditions?",
    answer: "Pacific Cross is often considered most flexible for pre-existing conditions, with case-by-case underwriting. Etiqa offers clear, predictable policies. The 'best' provider depends on your specific condition and needs."
  }
];
