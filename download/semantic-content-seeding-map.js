const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, 
        Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType, 
        ShadingType, VerticalAlign, PageNumber, LevelFormat } = require('docx');
const fs = require('fs');

// Color Palette - "Midnight Code" for tech/SEO focus
const colors = {
  primary: "020617",      // Midnight Black
  bodyText: "1E293B",     // Deep Slate Blue
  secondary: "64748B",    // Cool Blue-Gray
  accent: "94A3B8",       // Steady Silver
  tableBg: "F8FAFC",      // Glacial Blue-White
  tableHeaderBg: "E2E8F0" // Lighter silver for headers
};

const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: "CBD5E1" };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

// Pillar Page H2 Outline
const pillarOutline = [
  { section: "H2: What is Health Insurance for Self-Employed Filipinos?", description: "Define the concept clearly. Explain how it differs from corporate HMO coverage. Cover the fundamental differences between individual health insurance and group plans. Establish the core vocabulary readers need to understand the rest of the guide. Include statistics on self-employed Filipinos and their coverage gaps." },
  { section: "H2: HMO vs Health Insurance — Which is Better for Freelancers?", description: "Create a detailed comparison table. Explain prepaid healthcare vs indemnity coverage. Address the year-to-year renewal risk of HMOs. Cover guaranteed renewability provisions in insurance. Discuss portability benefits when switching jobs or losing employment." },
  { section: "H2: Top 10 Health Insurance Providers in the Philippines (2024)", description: "Provide a comparison matrix of Pacific Cross, MediCard, PhilCare, Etiqa, ValuCare, Oona Insurance, iCare, Cocolife, IMS Wellthcare, and Keystone. Include network sizes (1,600–30,000 doctors), annual benefit limits, pre-existing condition policies, and price ranges. Highlight which providers specialize in self-employed individuals." },
  { section: "H2: How to Choose the Right Plan When You're Self-Employed", description: "Create a step-by-step decision framework. Cover age brackets, health history, family status, budget constraints, and network accessibility. Include a checklist for evaluating plan documents. Provide guidance on reading the fine print on exclusions and waiting periods." },
  { section: "H2: Understanding Pre-Existing Conditions and Waiting Periods", description: "Explain the 6–12 month waiting period standard. Cover disclosure requirements and the consequences of non-disclosure. Address common conditions: hypertension, diabetes, asthma, and previous surgeries. Provide real examples of claim denials due to non-disclosure." },
  { section: "H2: The Stacking Strategy: PhilHealth + HMO + Health Insurance", description: "Explain the three-layer protection model. Show how PhilHealth covers the base, HMO handles routine care, and insurance covers catastrophic events. Provide a visual diagram concept. Include sample scenarios with cost breakdowns showing the benefit of stacking." },
  { section: "H2: Premium Loading and What It Means for Your Wallet", description: "Address the Pacific Cross pain point about premiums jumping 50% after claims. Explain why insurers do this and how to prepare for it. Compare providers with more stable premium structures. Provide strategies to minimize premium loading impact." },
  { section: "H2: OFW Families: Protecting Your Loved Ones While Abroad", description: "Cover the unique challenges OFWs face when buying coverage for family members in the Philippines. Discuss coordination between overseas workers and local dependents. Address currency considerations and premium payment logistics. Include provider recommendations for OFW family plans." },
  { section: "H2: Common Mistakes First-Time Buyers Make (And How to Avoid Them)", description: "List the top 7 buyer mistakes: choosing cheapest over best coverage, not disclosing conditions, ignoring network size, misunderstanding cashless vs reimbursement, skipping the fine print, not planning for premium increases, and forgetting about deductibles. Provide actionable prevention tips for each." },
  { section: "H2: How to File a Claim Without the Headache", description: "Walk through the Letter of Authorization process. Explain cashless hospitalization step-by-step. Cover reimbursement claims with a checklist of required documents. Provide typical processing timelines per provider. Include common reasons for claim delays and how to prevent them." }
];

// Cluster Posts by Buyer Journey Stage
const clusterPosts = [
  // Awareness Stage
  { stage: "Awareness", title: "7 Signs You Need Health Insurance (Even If You're Young and Healthy)", keyword: "health insurance Philippines", intent: "Help readers recognize they have a problem" },
  { stage: "Awareness", title: "What Happens When You Lose Your Company HMO: A Freelancer's Guide", keyword: "company HMO vs personal health insurance", intent: "Trigger awareness of coverage gaps" },
  // Consideration Stage
  { stage: "Consideration", title: "Pacific Cross FlexiShield Review: Is It Worth It for Self-Employed Filipinos?", keyword: "Pacific Cross health insurance review", intent: "Deep dive into one provider" },
  { stage: "Consideration", title: "HMO or Health Insurance? The Complete Comparison for Filipino Professionals", keyword: "HMO vs health insurance Philippines", intent: "Help buyers compare options" },
  { stage: "Consideration", title: "Best Health Insurance for OFW Families: 2024 Provider Comparison", keyword: "health insurance for OFW families Philippines", intent: "Address specific audience segment" },
  // Decision Stage
  { stage: "Decision", title: "How to Buy Health Insurance in the Philippines: Step-by-Step Application Guide", keyword: "how to apply for health insurance Philippines", intent: "Ready to take action" },
  { stage: "Decision", title: "Pre-Existing Conditions? Here's Which Providers Will Still Cover You", keyword: "health insurance pre-existing conditions Philippines", intent: "Overcome final objection" },
  { stage: "Decision", title: "Health Insurance Cost Calculator: Estimate Your Monthly Premium in 5 Minutes", keyword: "health insurance cost Philippines", intent: "Final price evaluation" }
];

// People Also Ask Questions
const paaQuestions = [
  { question: "What is the best health insurance for self-employed in the Philippines?", searchVolume: "2,400/month", competition: "Medium" },
  { question: "How much is health insurance in Philippines per month?", searchVolume: "3,100/month", competition: "High" },
  { question: "Is Pacific Cross a good health insurance provider?", searchVolume: "880/month", competition: "Low" },
  { question: "What is the difference between HMO and health insurance Philippines?", searchVolume: "1,900/month", competition: "Medium" },
  { question: "Can I get health insurance with pre-existing conditions Philippines?", searchVolume: "1,200/month", competition: "Low" },
  { question: "How does PhilHealth work with private health insurance?", searchVolume: "1,600/month", competition: "Low" },
  { question: "What is the waiting period for health insurance Philippines?", searchVolume: "720/month", competition: "Low" },
  { question: "Which health insurance has the largest hospital network in Philippines?", searchVolume: "590/month", competition: "Medium" }
];

// Semantic Seed Terms
const semanticTerms = [
  { term: "pre-existing condition", context: "Use in sections about waiting periods, disclosures, and claim denials" },
  { term: "premium loading", context: "Essential for Pacific Cross content and post-claim scenarios" },
  { term: "Letter of Authorization", context: "Claims process, hospital admission procedures" },
  { term: "annual benefit limit", context: "Plan comparisons, coverage maximums" },
  { term: "cashless hospitalization", context: "Convenience selling point, network requirements" },
  { term: "health card Philippines", context: "Product terminology, card-based access" },
  { term: "non-life insurance IC Philippines", context: "Regulatory compliance, trust signals" },
  { term: "HMO accredited hospitals", context: "Network size comparisons, provider differentiation" },
  { term: "guaranteed renewability", context: "Long-term value proposition vs HMOs" },
  { term: "reimbursement claim process", context: "Alternative to cashless, out-of-pocket scenarios" },
  { term: "IC Philippines licensed agent", context: "Trust signal, compliance mention" },
  { term: "PhilHealth coordination", context: "Stacking strategy, layered protection" },
  { term: "waiting period waiver", context: "Premium feature, underwriting considerations" },
  { term: "portability benefit", context: "Self-employed advantage over corporate HMOs" },
  { term: "deductible and co-pay", context: "Cost-sharing explanation, total cost of ownership" }
];

// Internal Link Map
const internalLinks = [
  { from: "Pacific Cross Review", to: "Pillar Page", anchor: "health insurance for self-employed", priority: "High" },
  { from: "Pacific Cross Review", to: "HMO vs Insurance", anchor: "difference between HMO and health insurance", priority: "Medium" },
  { from: "HMO vs Insurance", to: "Pillar Page", anchor: "complete guide to health protection", priority: "High" },
  { from: "HMO vs Insurance", to: "7 Signs You Need Insurance", anchor: "coverage gaps", priority: "Low" },
  { from: "OFW Family Guide", to: "Pillar Page", anchor: "health insurance for self-employed", priority: "Medium" },
  { from: "OFW Family Guide", to: "Provider Comparison", anchor: "top health insurance providers", priority: "High" },
  { from: "Step-by-Step Application", to: "Pillar Page", anchor: "choosing the right plan", priority: "High" },
  { from: "Step-by-Step Application", to: "Cost Calculator", anchor: "estimate your premium", priority: "High" },
  { from: "Pre-Existing Conditions", to: "Pillar Page", anchor: "waiting periods and exclusions", priority: "High" },
  { from: "Pre-Existing Conditions", to: "Pacific Cross Review", anchor: "Pacific Cross pre-existing condition policy", priority: "Medium" },
  { from: "Cost Calculator", to: "Pillar Page", anchor: "health insurance for self-employed Filipinos", priority: "High" },
  { from: "Cost Calculator", to: "Provider Comparison", anchor: "provider pricing comparison", priority: "Medium" },
  { from: "7 Signs You Need Insurance", to: "Pillar Page", anchor: "comprehensive health protection guide", priority: "High" },
  { from: "Losing Company HMO", to: "Pillar Page", anchor: "health insurance options for freelancers", priority: "High" },
  { from: "Losing Company HMO", to: "HMO vs Insurance", anchor: "HMO vs health insurance", priority: "High" }
];

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Times New Roman", size: 22 } } },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal",
        run: { size: 48, bold: true, color: colors.primary, font: "Times New Roman" },
        paragraph: { spacing: { before: 0, after: 200 }, alignment: AlignmentType.CENTER } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, color: colors.primary, font: "Times New Roman" },
        paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, color: colors.bodyText, font: "Times New Roman" },
        paragraph: { spacing: { before: 300, after: 150 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, color: colors.secondary, font: "Times New Roman" },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 } }
    ]
  },
  numbering: {
    config: [
      { reference: "bullet-list",
        levels: [{ level: 0, format: LevelFormat.Bullet, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-pillar",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }
    ]
  },
  sections: [{
    properties: {
      page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } }
    },
    headers: {
      default: new Header({ children: [new Paragraph({ 
        alignment: AlignmentType.RIGHT,
        children: [new TextRun({ text: "Financial Protection Advocate | SEO Content Strategy", color: colors.secondary, size: 18 })]
      })] })
    },
    footers: {
      default: new Footer({ children: [new Paragraph({ 
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Page ", size: 18 }), new TextRun({ children: [PageNumber.CURRENT], size: 18 }), new TextRun({ text: " of ", size: 18 }), new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18 })]
      })] })
    },
    children: [
      // Title
      new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun("Semantic Content Seeding Map")] }),
      new Paragraph({ 
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
        children: [new TextRun({ text: "Mode C — Pacific Cross / Non-Life Insurance / HMO Philippines", size: 24, color: colors.secondary })] 
      }),
      new Paragraph({ 
        alignment: AlignmentType.CENTER,
        spacing: { after: 600 },
        children: [new TextRun({ text: "Core Topic: Health Insurance for Self-Employed Filipinos", size: 22, italics: true, color: colors.bodyText })] 
      }),

      // Section 1: Pillar Page
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("1. PILLAR PAGE: Complete H2 Outline")] }),
      new Paragraph({ 
        spacing: { after: 200 },
        children: [new TextRun({ text: "Pillar Page Title: ", bold: true }), new TextRun("\"The Ultimate Guide to Health Insurance for Self-Employed Filipinos: HMO vs Insurance vs Stacking Strategies\"")] 
      }),
      new Paragraph({ 
        spacing: { after: 300 },
        children: [new TextRun({ text: "Target Word Count: ", bold: true }), new TextRun("4,000–5,000 words | Primary Keyword: health insurance for self-employed Philippines")] 
      }),

      // Pillar Outline Table
      new Table({
        columnWidths: [2800, 6560],
        margins: { top: 100, bottom: 100, left: 180, right: 180 },
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({
                borders: cellBorders,
                width: { size: 2800, type: WidthType.DXA },
                shading: { fill: colors.tableHeaderBg, type: ShadingType.CLEAR },
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Section", bold: true, size: 22 })] })]
              }),
              new TableCell({
                borders: cellBorders,
                width: { size: 6560, type: WidthType.DXA },
                shading: { fill: colors.tableHeaderBg, type: ShadingType.CLEAR },
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Content Description & SEO Notes", bold: true, size: 22 })] })]
              })
            ]
          }),
          ...pillarOutline.map(item => new TableRow({
            children: [
              new TableCell({
                borders: cellBorders,
                width: { size: 2800, type: WidthType.DXA },
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ children: [new TextRun({ text: item.section, bold: true, size: 20 })] })]
              }),
              new TableCell({
                borders: cellBorders,
                width: { size: 6560, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: item.description, size: 20 })] })]
              })
            ]
          }))
        ]
      }),
      new Paragraph({ spacing: { after: 400 }, children: [new TextRun({ text: "Table 1: Pillar Page H2 Outline with Content Descriptions", italics: true, size: 18, color: colors.secondary })] }),

      // Section 2: Cluster Posts
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("2. CLUSTER POSTS: 8 Long-Tail Titles by Buyer Journey")] }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun("These cluster posts support the pillar page and target specific search intents across the buyer journey funnel.")] }),

      // Cluster Posts Table
      new Table({
        columnWidths: [1500, 5200, 2660],
        margins: { top: 100, bottom: 100, left: 180, right: 180 },
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({
                borders: cellBorders,
                width: { size: 1500, type: WidthType.DXA },
                shading: { fill: colors.tableHeaderBg, type: ShadingType.CLEAR },
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Stage", bold: true, size: 22 })] })]
              }),
              new TableCell({
                borders: cellBorders,
                width: { size: 5200, type: WidthType.DXA },
                shading: { fill: colors.tableHeaderBg, type: ShadingType.CLEAR },
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Post Title", bold: true, size: 22 })] })]
              }),
              new TableCell({
                borders: cellBorders,
                width: { size: 2660, type: WidthType.DXA },
                shading: { fill: colors.tableHeaderBg, type: ShadingType.CLEAR },
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Primary Keyword", bold: true, size: 22 })] })]
              })
            ]
          }),
          ...clusterPosts.map(item => new TableRow({
            children: [
              new TableCell({
                borders: cellBorders,
                width: { size: 1500, type: WidthType.DXA },
                verticalAlign: VerticalAlign.CENTER,
                shading: { fill: item.stage === "Awareness" ? "DBEAFE" : item.stage === "Consideration" ? "FEF3C7" : "D1FAE5", type: ShadingType.CLEAR },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: item.stage, bold: true, size: 20 })] })]
              }),
              new TableCell({
                borders: cellBorders,
                width: { size: 5200, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: item.title, size: 20 })] })]
              }),
              new TableCell({
                borders: cellBorders,
                width: { size: 2660, type: WidthType.DXA },
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: item.keyword, size: 18, italics: true })] })]
              })
            ]
          }))
        ]
      }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: "Table 2: Cluster Posts Mapped to Buyer Journey Stages", italics: true, size: 18, color: colors.secondary })] }),

      // Stage Legend
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Buyer Journey Stage Definitions")] }),
      new Paragraph({ 
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "Awareness: ", bold: true }), new TextRun("Readers don't know they have a problem yet. Content triggers realization of coverage gaps or risks.")] 
      }),
      new Paragraph({ 
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "Consideration: ", bold: true }), new TextRun("Readers are comparing options. Content provides detailed comparisons, reviews, and provider deep-dives.")] 
      }),
      new Paragraph({ 
        numbering: { reference: "bullet-list", level: 0 },
        spacing: { after: 400 },
        children: [new TextRun({ text: "Decision: ", bold: true }), new TextRun("Readers are ready to buy. Content provides step-by-step guides, cost calculators, and final objection handlers.")] 
      }),

      // Section 3: People Also Ask
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("3. PEOPLE ALSO ASK: 8 Questions for FAQ Optimization")] }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun("These questions are optimized for Google's People Also Ask feature and FAQPage schema implementation.")] }),

      new Table({
        columnWidths: [5500, 1800, 2060],
        margins: { top: 100, bottom: 100, left: 180, right: 180 },
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({
                borders: cellBorders,
                width: { size: 5500, type: WidthType.DXA },
                shading: { fill: colors.tableHeaderBg, type: ShadingType.CLEAR },
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Question", bold: true, size: 22 })] })]
              }),
              new TableCell({
                borders: cellBorders,
                width: { size: 1800, type: WidthType.DXA },
                shading: { fill: colors.tableHeaderBg, type: ShadingType.CLEAR },
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Search Volume", bold: true, size: 22 })] })]
              }),
              new TableCell({
                borders: cellBorders,
                width: { size: 2060, type: WidthType.DXA },
                shading: { fill: colors.tableHeaderBg, type: ShadingType.CLEAR },
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Competition", bold: true, size: 22 })] })]
              })
            ]
          }),
          ...paaQuestions.map((item, index) => new TableRow({
            children: [
              new TableCell({
                borders: cellBorders,
                width: { size: 5500, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: `${index + 1}. ${item.question}`, size: 20 })] })]
              }),
              new TableCell({
                borders: cellBorders,
                width: { size: 1800, type: WidthType.DXA },
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: item.searchVolume, size: 20 })] })]
              }),
              new TableCell({
                borders: cellBorders,
                width: { size: 2060, type: WidthType.DXA },
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: item.competition, size: 20 })] })]
              })
            ]
          }))
        ]
      }),
      new Paragraph({ spacing: { after: 400 }, children: [new TextRun({ text: "Table 3: People Also Ask Questions with Search Volume Data", italics: true, size: 18, color: colors.secondary })] }),

      // Section 4: Semantic Seed Terms
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("4. SEMANTIC SEED TERMS: 15 Terms for Body Copy")] }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun("Plant these terms naturally throughout body copy to build topical authority and semantic relevance. Avoid keyword stuffing—each term should appear 2-4 times per 2,000-word article.")] }),

      new Table({
        columnWidths: [2800, 6560],
        margins: { top: 100, bottom: 100, left: 180, right: 180 },
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({
                borders: cellBorders,
                width: { size: 2800, type: WidthType.DXA },
                shading: { fill: colors.tableHeaderBg, type: ShadingType.CLEAR },
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Semantic Term", bold: true, size: 22 })] })]
              }),
              new TableCell({
                borders: cellBorders,
                width: { size: 6560, type: WidthType.DXA },
                shading: { fill: colors.tableHeaderBg, type: ShadingType.CLEAR },
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Context & Placement Strategy", bold: true, size: 22 })] })]
              })
            ]
          }),
          ...semanticTerms.map((item, index) => new TableRow({
            children: [
              new TableCell({
                borders: cellBorders,
                width: { size: 2800, type: WidthType.DXA },
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ children: [new TextRun({ text: `${index + 1}. ${item.term}`, bold: true, size: 20 })] })]
              }),
              new TableCell({
                borders: cellBorders,
                width: { size: 6560, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: item.context, size: 20 })] })]
              })
            ]
          }))
        ]
      }),
      new Paragraph({ spacing: { after: 400 }, children: [new TextRun({ text: "Table 4: Semantic Seed Terms with Contextual Placement Strategies", italics: true, size: 18, color: colors.secondary })] }),

      // Section 5: Internal Link Map
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("5. INTERNAL LINK MAP: Link Equity Distribution")] }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun("This internal linking structure distributes link equity from cluster posts to the pillar page, reinforcing topical authority. High-priority links should use exact-match anchor text; medium/low priority can use partial match or natural language anchors.")] }),

      new Table({
        columnWidths: [2500, 2500, 3000, 1360],
        margins: { top: 100, bottom: 100, left: 180, right: 180 },
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({
                borders: cellBorders,
                width: { size: 2500, type: WidthType.DXA },
                shading: { fill: colors.tableHeaderBg, type: ShadingType.CLEAR },
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "From Page", bold: true, size: 22 })] })]
              }),
              new TableCell({
                borders: cellBorders,
                width: { size: 2500, type: WidthType.DXA },
                shading: { fill: colors.tableHeaderBg, type: ShadingType.CLEAR },
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "To Page", bold: true, size: 22 })] })]
              }),
              new TableCell({
                borders: cellBorders,
                width: { size: 3000, type: WidthType.DXA },
                shading: { fill: colors.tableHeaderBg, type: ShadingType.CLEAR },
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Anchor Text", bold: true, size: 22 })] })]
              }),
              new TableCell({
                borders: cellBorders,
                width: { size: 1360, type: WidthType.DXA },
                shading: { fill: colors.tableHeaderBg, type: ShadingType.CLEAR },
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Priority", bold: true, size: 22 })] })]
              })
            ]
          }),
          ...internalLinks.map(item => new TableRow({
            children: [
              new TableCell({
                borders: cellBorders,
                width: { size: 2500, type: WidthType.DXA },
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ children: [new TextRun({ text: item.from, size: 20 })] })]
              }),
              new TableCell({
                borders: cellBorders,
                width: { size: 2500, type: WidthType.DXA },
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ children: [new TextRun({ text: item.to, size: 20 })] })]
              }),
              new TableCell({
                borders: cellBorders,
                width: { size: 3000, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: `"${item.anchor}"`, size: 18, italics: true })] })]
              }),
              new TableCell({
                borders: cellBorders,
                width: { size: 1360, type: WidthType.DXA },
                verticalAlign: VerticalAlign.CENTER,
                shading: { fill: item.priority === "High" ? "D1FAE5" : item.priority === "Medium" ? "FEF3C7" : "F3F4F6", type: ShadingType.CLEAR },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: item.priority, bold: true, size: 20 })] })]
              })
            ]
          }))
        ]
      }),
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: "Table 5: Internal Link Map with Anchor Text and Priority Levels", italics: true, size: 18, color: colors.secondary })] }),

      // Implementation Notes
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Implementation Notes")] }),
      new Paragraph({ 
        spacing: { after: 150 },
        children: [new TextRun({ text: "Link Equity Priority: ", bold: true }), new TextRun("All cluster posts must link to the pillar page within the first 300 words. This establishes the pillar as the canonical source on the topic and passes maximum link equity.")] 
      }),
      new Paragraph({ 
        spacing: { after: 150 },
        children: [new TextRun({ text: "Cluster-to-Cluster Linking: ", bold: true }), new TextRun("Consideration-stage posts should link to Decision-stage posts to guide readers through the funnel. Avoid linking Decision posts back to Awareness content.")] 
      }),
      new Paragraph({ 
        spacing: { after: 150 },
        children: [new TextRun({ text: "Anchor Text Distribution: ", bold: true }), new TextRun("Maintain a 40% exact match, 40% partial match, 20% branded/natural ratio to avoid over-optimization penalties.")] 
      }),
      new Paragraph({ 
        spacing: { after: 400 },
        children: [new TextRun({ text: "Entity Stacking: ", bold: true }), new TextRun("Each internal link context should include at least one entity mention (Financial Protection Advocate, Pacific Cross, IC Philippines) to reinforce AI search associations.")] 
      }),

      // Provider Entity Reference
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Provider Entity Reference List")] }),
      new Paragraph({ spacing: { after: 150 }, children: [new TextRun("Include these provider names throughout content to build entity associations:")] }),
      new Paragraph({ 
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Pacific Cross Philippines — Primary provider for detailed reviews")] 
      }),
      new Paragraph({ 
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("MediCard — HMO comparison reference")] 
      }),
      new Paragraph({ 
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("PhilCare — Network size comparison")] 
      }),
      new Paragraph({ 
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Etiqa — Guaranteed renewability example")] 
      }),
      new Paragraph({ 
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("ValuCare — Mid-tier pricing option")] 
      }),
      new Paragraph({ 
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Oona Insurance — Digital-first alternative")] 
      }),
      new Paragraph({ 
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("IMS Wellthcare — Wellness-focused coverage")] 
      }),
      new Paragraph({ 
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("iCare — Budget-conscious option")] 
      }),
      new Paragraph({ 
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Cocolife — Life + health bundling")] 
      }),
      new Paragraph({ 
        numbering: { reference: "bullet-list", level: 0 },
        spacing: { after: 400 },
        children: [new TextRun("Keystone — Broker/aggregator platform reference")] 
      }),

      // Brand Compliance Footer
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Brand Compliance Reminder")] }),
      new Paragraph({ 
        spacing: { after: 150 },
        children: [new TextRun("All content produced from this seeding map must comply with IC Philippines regulations. Avoid guaranteed returns language, misleading claims about coverage, or comparative statements that cannot be substantiated. The brand voice should remain trustworthy, direct, empowering, and faith-driven. Taglish is acceptable in callout boxes and FAQ sections for Filipino audience resonance.")] 
      })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('/home/z/my-project/download/Financial_Protection_Advocate_Semantic_Content_Seeding_Map.docx', buffer);
  console.log('Document created successfully: Financial_Protection_Advocate_Semantic_Content_Seeding_Map.docx');
});
