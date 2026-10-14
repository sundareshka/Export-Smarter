export interface SlideItem {
  id: string;
  slideNumber: number;
  category: 'Overview' | 'Prompting' | 'Market & Money' | 'Brand & Marketing' | 'Daily Operations' | 'Safety & Action Plan';
  title: string;
  subtitle: string;
  timeSlot?: string;
  recommendedTool?: string;
  whyItMatters: string;
  howToDoIt: string[];
  prompts: {
    title: string;
    text: string;
    description?: string;
  }[];
  tableData?: {
    headers: string[];
    rows: string[][];
  };
  importantRule?: string;
  keyTakeaways: string[];
  speakerNotes: string;
}

export const PRESENTATION_METADATA = {
  title: 'Export Smarter: AI & Digital Marketing Strategies',
  subtitle: 'A practical handbook with ready-to-use prompts for finding customers, pricing, branding, documents and daily export work.',
  organization: 'YOU EXPORT | Agri & All Trade Chamber, Madurai',
  audience: 'Online Class for Budding Exporters',
  speaker: 'Sundaresh Kamaraj',
  speakerRole: 'Founder & CEO, Elysium Groups',
  speakerWebsite: 'elysiumgroups.com',
  speakerBlog: 'sundaresh.blog',
  speakerBlogUrl: 'https://sundaresh.blog',
  speakerEmail: 'ka.sundaresh@gmail.com',
  speakerLocation: 'Madurai, Tamil Nadu, India',
  speakerBio: 'Sundaresh Kamaraj is an Indian entrepreneur, author, technologist and founder and CEO of Elysium Group of Companies, based in Madurai, Tamil Nadu. He founded Elysium Technologies in 1999 and has over 25 years of experience in the IT industry. He studied Electronics and Communication Engineering and Information Technology. He is known for his contributions to IT education, software development, skill training and entrepreneurship. His vision is to empower young people through technology, innovation and education.',
  date: '16 October 2026',
  time: '4:30 PM to 6:00 PM | Online Session',
  caseStudy: 'Organic Moringa Leaf Powder from Madurai',
};

const RAW_SLIDES_DATA: SlideItem[] = [
  {
    id: 'slide-1',
    slideNumber: 1,
    category: 'Overview',
    title: 'Export Smarter: AI & Digital Marketing Strategies',
    subtitle: 'A practical handbook with ready-to-use prompts for finding customers, pricing, branding, documents and daily export work.',
    timeSlot: '4:30 PM Welcome',
    whyItMatters: 'Global trade is moving at lightning speed. For a new exporter, AI functions as a 24/7 multi-role department: market researcher, costing clerk, designer, copywriter, and documentation officer.',
    howToDoIt: [
      'Welcome budding exporters across Tamil Nadu & India',
      'Examine the real-world case study: Moringa leaf powder from Madurai',
      'Learn actionable, battle-tested prompt templates you can deploy immediately',
      'Implement safe, verified AI workflows that protect your reputation and capital',
    ],
    prompts: [
      {
        title: 'Session Anchor Prompt',
        text: 'Act as an export consultant for a first-time agri exporter from Madurai, Tamil Nadu. Provide structured, verified guidance using international trade standards and simple English.',
      },
    ],
    keyTakeaways: [
      'Presented by Sundaresh Kamaraj, Founder & CEO, Elysium Groups',
      'Organized by You Export & Agri & All Trade Chamber, Madurai',
      'Focus on real-world execution, zero fluff, and zero unverified hallucination',
    ],
    speakerNotes: 'Welcome everyone to this practical masterclass. Today is not about theoretical artificial intelligence; it is about practical tools to land purchase orders, accurately price shipments, and look like a 20-year-old conglomerate from Day 1.',
  },
  {
    id: 'slide-speaker-profile',
    slideNumber: 2,
    category: 'Overview',
    title: 'Speaker Profile: Sundaresh Kamaraj',
    subtitle: 'Founder & CEO, Elysium Group of Companies | 25+ Years IT Industry Leader | sundaresh.blog',
    timeSlot: 'Speaker Introduction',
    whyItMatters: 'Sundaresh Kamaraj is an Indian entrepreneur, author, technologist and founder and CEO of Elysium Group of Companies, based in Madurai, Tamil Nadu. He founded Elysium Technologies in 1999 and has over 25 years of experience in the IT industry.',
    howToDoIt: [
      'Founded Elysium Technologies in 1999; over 25 years of experience in the IT industry',
      'Studied Electronics and Communication Engineering and Information Technology',
      'Widely recognized for contributions to IT education, software development, skill training and entrepreneurship',
      'Vision: To empower young people through technology, innovation and education',
      'Personal Blog & AI Trade Resources: sundaresh.blog (Scan QR Code to connect)',
    ],
    prompts: [],
    tableData: {
      headers: ['Profile Milestone', 'Background & Leadership'],
      rows: [
        ['Speaker', 'Sundaresh Kamaraj (Indian entrepreneur, author & technologist)'],
        ['Enterprise', 'Founder & CEO, Elysium Group of Companies (Madurai, Tamil Nadu)'],
        ['Established', 'Founded Elysium Technologies in 1999 (25+ Years in IT Industry)'],
        ['Education', 'Electronics & Communication Engineering & Information Technology'],
        ['Key Contributions', 'IT Education, Software Development, Skill Training & Entrepreneurship'],
        ['Vision', 'Empowering young people through technology, innovation and education'],
        ['Connect', 'sundaresh.blog | Direct: ka.sundaresh@gmail.com'],
      ],
    },
    keyTakeaways: [
      '25+ years IT industry leadership, founding Elysium Technologies in 1999',
      'Known for pioneering contributions to IT education, software development & skill training',
      'Visionary mission: Empowering young people through technology, innovation and education',
      'Personal blog: sundaresh.blog — scan the QR code to visit',
    ],
    speakerNotes: 'Introduce your 25+ year journey in the IT industry starting with Elysium Technologies in 1999 in Madurai, your engineering background in Electronics & Communication and IT, and your ongoing mission to empower youth, entrepreneurs, and exporters through practical AI and technology. Invite attendees to scan the QR code for sundaresh.blog.',
  },
  {
    id: 'slide-2',
    slideNumber: 3,
    category: 'Overview',
    title: '90-Minute Masterclass Session Plan',
    subtitle: 'Step-by-step roadmap designed for immediate execution by first-time exporters.',
    timeSlot: '4:30 – 6:00 PM',
    whyItMatters: 'Every stage of international trade requires distinct intelligence, from finding qualified buyers to customs clearance.',
    howToDoIt: [
      '4:30 – 4:45: AI Basics & The R-T-C-F Prompt Formula',
      '4:45 – 5:10: Market & Money (Buyers, Detailing, Costing, Currency)',
      '5:10 – 5:35: Brand & Marketing (Naming, Logos, Video, Web, Pitch Decks)',
      '5:35 – 5:50: Daily Export Work (Quotations, Email Triage, Checklists)',
      '5:50 – 6:00: Safe AI Guardrails & 7-Day Action Plan',
    ],
    tableData: {
      headers: ['Time', 'Module', 'Core Deliverables'],
      rows: [
        ['4:30 – 4:45', 'AI Basics', 'What is AI, tool matrix, R-T-C-F prompt formula'],
        ['4:45 – 5:10', 'Market & Money', 'Find customers, product detailing, FOB/CIF pricing, multi-currency, competitor & complaints analysis'],
        ['5:10 – 5:35', 'Brand & Marketing', 'Brand names, logo & taglines, social media images, product video, voice description, company presentation, website'],
        ['5:35 – 5:50', 'Daily Export Work', 'Quotations & proposals, email summary & smart replies, export process worksheet & checklist'],
        ['5:50 – 6:00', 'Wrap-up', 'Safe use of AI, 7-day action plan, live Q&A'],
      ],
    },
    prompts: [],
    keyTakeaways: [
      'Comprehensive 4-part framework in every topic: Why it matters, Tool to use, Step-by-step method, and Ready prompts',
      'All examples anchored around Organic Moringa Leaf Powder from Madurai',
    ],
    speakerNotes: 'Notice how each module flows naturally into the next: First understanding the tools, then doing market intelligence, building your international brand, running daily documentation, and ending with an actionable 7-day checklist.',
  },
  {
    id: 'slide-3',
    slideNumber: 3,
    category: 'Overview',
    title: 'What is AI for an Exporter? (The Mental Model)',
    subtitle: 'Think of AI as an ultra-fast, well-read junior employee. You remain the CEO.',
    whyItMatters: 'AI never tires and has read billions of pages of trade data, but lacks context on your physical inventory unless you provide it.',
    howToDoIt: [
      'AI understands and replies in natural language: you type or speak a request (prompt)',
      'It writes, calculates, designs, drafts, and summarizes in seconds',
      'It can be confidently wrong (hallucinate) on trade laws, tariff codes, and prices',
      'You are the manager: you give clear instructions and audit every deliverable before sending to buyers',
    ],
    tableData: {
      headers: ['AI Junior Employee', 'You (The Exporter & Manager)'],
      rows: [
        ['Drafts 10 email versions in 15 seconds', 'Selects tone and verifies buyer credibility'],
        ['Calculates complex multi-currency tables', 'Confirms live bank rates and exchange spread'],
        ['Suggests 20 brand names and taglines', 'Conducts Indian trademark & MCA search'],
        ['Creates product specification structures', 'Supplies verified NABL lab test parameters'],
      ],
    },
    prompts: [],
    importantRule: 'Never let AI invent specifications, certificates, or awards. Lab values, test reports, and shelf life must come from physical tests.',
    keyTakeaways: [
      'AI executes; the exporter validates',
      'Confidence in tone does not guarantee factual accuracy',
      'Clearer briefs lead to dramatically superior outputs',
    ],
    speakerNotes: 'Explain the junior employee metaphor: You wouldn’t let a week-one intern sign a container contract without checking the numbers. Treat AI the exact same way—it drafts, you sign off.',
  },
  {
    id: 'slide-4',
    slideNumber: 4,
    category: 'Overview',
    title: 'The Exporter’s AI Tool Matrix',
    subtitle: 'Choosing the right tool for the right export task saves hours of friction.',
    whyItMatters: 'No single tool does everything best. Using the wrong model for calculations or video yields frustrating results.',
    howToDoIt: [
      'ChatGPT: Ideal for creative naming, fast email variations, brainstorming, and logo ideas',
      'Claude: Superior for long documents, contracts, Excel costing sheets, checklists, and rigorous nuance',
      'Gemini: Live Google web search integration, multi-modal image analysis, and video generation',
      'NotebookLM: Generates grounded audio overviews and FAQs exclusively from your own uploaded documents',
      'Google AI Studio: Instant full-stack exporter website and interactive catalog generation',
    ],
    tableData: {
      headers: ['Tool', 'Best Used For', 'Topics in This Masterclass'],
      rows: [
        ['ChatGPT', 'General questions, ideas, emails, names, images', 'Brand names, email replies, logo and post images'],
        ['Claude', 'Long documents, careful writing, Word / Excel / PDF files', 'Quotations, proposals, worksheets, checklists, email summary'],
        ['Gemini', 'Google-connected work, images, video generation', 'Social media images, product ad video'],
        ['NotebookLM', 'Answers and audio made only from your own documents', 'Voice product description & audio FAQ'],
        ['Google AI Studio', 'Building websites or small apps by describing them', 'AI website design & quote calculators'],
      ],
    },
    prompts: [],
    keyTakeaways: [
      'All 5 tools offer powerful free tiers to begin with',
      'Master one tool first, gain operational fluency, then branch into specialized tools',
    ],
    speakerNotes: 'Emphasize that you don’t need paid subscriptions on Day 1. Start with the free tier of Claude or ChatGPT, master the prompting mechanics, and then scale up.',
  },
  {
    id: 'slide-5',
    slideNumber: 5,
    category: 'Prompting',
    title: 'The Master Prompt Formula: R – T – C – F',
    subtitle: 'A structured prompt yields world-class answers. Avoid vague one-line prompts.',
    whyItMatters: 'Vague prompts produce generic, useless replies. The R-T-C-F formula grounds the AI in your exact business reality.',
    howToDoIt: [
      'R – Role: Define who the AI should act as (e.g., Export Marketing Consultant)',
      'T – Task: Specify the exact output desired (e.g., List top 5 importing countries)',
      'C – Context: Supply your unique business parameters (e.g., Madurai exporter, 2 tons/month, organic certified)',
      'F – Format: Specify how the answer must be structured (e.g., Markdown table with entry difficulty, simple English)',
    ],
    tableData: {
      headers: ['Part', 'Meaning', 'Example in Action'],
      rows: [
        ['R – Role', 'Who should AI act as?', 'Act as an export marketing consultant.'],
        ['T – Task', 'What exactly do you want?', 'List the top 5 countries to export moringa powder.'],
        ['C – Context', 'Your business details', 'I am a new exporter in Madurai with 2 tons monthly capacity and organic certificate.'],
        ['F – Format', 'How should the answer look?', 'Give a table with country, reason, and entry difficulty. Simple English.'],
      ],
    },
    prompts: [
      {
        title: 'Weak vs Strong Prompt Comparison',
        text: 'WEAK: "How to export moringa?"\n\nSTRONG: "Act as an export consultant. I am a first-time exporter from Madurai with 2 tons per month of organic moringa leaf powder. Explain, step by step, how I can get my first order from the UAE. Give a 10-step action plan in a table with the time needed for each step. Use simple English."',
      },
      {
        title: 'Reverse Prompting: Let AI Interview You',
        text: 'I want to start exporting [PRODUCT] from Tamil Nadu. Before you answer, ask me 8 questions one by one to understand my business. After I answer, give me a personalised 90-day export starting plan.',
      },
    ],
    keyTakeaways: [
      'Garbage In, Garbage Out: Context is king in export prompting',
      'Reverse prompting turns the AI into an expert consultant who extracts the right details',
    ],
    speakerNotes: 'Walk through the Weak vs Strong slide with the audience. Show them how the weak prompt produces a generic essay, while the R-T-C-F prompt delivers a board-ready operational roadmap.',
  },
  {
    id: 'slide-6',
    slideNumber: 6,
    category: 'Prompting',
    title: '5 Habits of a Successful AI Exporter',
    subtitle: 'Simple operational principles that elevate your results above 95% of competitors.',
    whyItMatters: 'Efficiency comes from working symbiotically with language models, treating each interaction as a continuous dialogue.',
    howToDoIt: [
      '1. Give deep details: The more trade context you supply, the sharper the strategy',
      '2. Continue the thread: Never start a new chat if you just need tweaks; instruct it to refine',
      '3. Feed your real assets: Upload actual test certificates, specification drafts, and photos',
      '4. Demand actionable business formats: Explicitly request tables, Excel matrices, or checklists',
      '5. Rigorously verify: Double-check HS codes, shipping rates, and foreign import guidelines before making commitments',
    ],
    prompts: [
      {
        title: 'Rapid Iteration Modifier Prompts',
        text: '• "Make it shorter and more direct for a German buyer."\n• "Explain like I am a beginner in customs clearance."\n• "Convert this calculation into an Excel-ready table with formulas."\n• "Translate this offer letter into business Tamil / Arabic."\n• "What assumptions did you make? Which points must I verify with my CHA?"',
      },
    ],
    keyTakeaways: [
      'Prompting is an iterative conversation, not a single lottery ticket',
      'Always prompt AI to list its own assumptions so you know what to audit',
    ],
    speakerNotes: 'The fifth habit is what separates professional exporters from amateurs. When an AI outputs an HS code or a port fee, your immediate next step is to confirm it with your CHA (Customs House Agent) or bank.',
  },
  {
    id: 'slide-7',
    slideNumber: 7,
    category: 'Market & Money',
    title: '1. Finding Qualified Buyers & Importers',
    subtitle: 'Identify target countries, buyer personas, and outreach channels with precision.',
    recommendedTool: 'ChatGPT, Gemini, or Claude (with Web Search)',
    whyItMatters: 'Finding legitimate international buyers is the hardest barrier. AI maps demand patterns, buyer types, and direct discovery tactics.',
    howToDoIt: [
      'Step 1: Ask AI which countries import your product most and analyze their import motives',
      'Step 2: Map the ecosystem of buyer types: bulk importers, distributors, retail chains, and e-commerce brands',
      'Step 3: Uncover specific channels: trade directories, B2B portals, LinkedIn keywords, and embassy commercial desks',
      'Step 4: Draft crisp, cultural-appropriate introduction emails and 3-line WhatsApp messages',
    ],
    prompts: [
      {
        title: 'Prompt: Identify Target Export Markets',
        text: 'Act as an export market research expert. I am a new exporter from Madurai, Tamil Nadu, India. My product is [MORINGA LEAF POWDER]. List the top 10 importing countries for this product. For each country give: why demand is high, type of buyers, typical quality or certificate expected, and how difficult it is for a beginner (Easy / Medium / Hard). Give the answer as a simple table. Mention the source for each fact so I can verify.',
      },
      {
        title: 'Prompt: Buyer Persona & Discovery Channels',
        text: 'For [MORINGA LEAF POWDER] in [GERMANY], describe my ideal buyer: type of company, size, what they care about most, and the job title of the person who decides. Then list 10 practical ways to find such buyers: trade directories, B2B portals, trade fairs, associations, LinkedIn search words and Google search words I can type.',
      },
      {
        title: 'Prompt: Cold Introduction Email & WhatsApp',
        text: 'Write a short, polite first email to an importer in [GERMANY] introducing my company [COMPANY NAME], Madurai, India. We supply [PRODUCT] with [CERTIFICATES]. Minimum order is [MOQ]. Keep it under 120 words, simple English, no exaggeration, end with one clear question. Also give 3 subject lines and a 3-line WhatsApp version.',
      },
    ],
    importantRule: 'AI can hallucinate company names and email addresses. Use AI to discover buyer profiles and search keywords; always verify contacts on LinkedIn or official corporate sites.',
    keyTakeaways: [
      'Focus on beginner-friendly markets with established trade corridors',
      'Keep initial outreach under 120 words; foreign buyers ignore dense sales pitches',
    ],
    speakerNotes: 'Remind participants: Never blindly send money or samples to an unverified buyer name provided by an AI. Always cross-check their VAT number, website, and company registry.',
  },
  {
    id: 'slide-8',
    slideNumber: 8,
    category: 'Market & Money',
    title: '2. Product Detailing & Technical Spec Sheets',
    subtitle: 'International buyers judge your credibility by your technical specification sheet.',
    recommendedTool: 'ChatGPT or Claude',
    whyItMatters: 'Foreign importers do not buy on phone calls or WhatsApp chats; they buy against technical specification sheets and certificates of analysis (COA).',
    howToDoIt: [
      'Step 1: Provide all known parameters in simple words (Tamil or English): moisture, mesh size, colour, shelf life',
      'Step 2: Instruct AI to format these into an international buyer-ready technical data sheet',
      'Step 3: Conduct a market-specific SWOT analysis for your target destination',
      'Step 4: Generate the top 15 technical questions buyers will ask, complete with model answers',
    ],
    prompts: [
      {
        title: 'Prompt: Product Specification Sheet',
        text: 'Act as an export documentation expert. Create a one-page product specification sheet for a foreign buyer. Product: [MORINGA LEAF POWDER]. Origin: [MADURAI, INDIA]. Details I know: [COLOUR: VIBRANT GREEN, MOISTURE: <7%, MESH SIZE: 80 MESH, SHELF LIFE: 24 MONTHS, PACKING SIZES: 25 KG HDPE DRUMS, CERTIFICATES: APEDA, ORGANIC, MONTHLY CAPACITY: 2 TONS]. Use a table with: Product description, Specifications, Packing, Shelf life, Storage, MOQ, Lead time, Certificates. Mark anything I have not given as "To be confirmed". Do not invent values.',
      },
      {
        title: 'Prompt: SWOT Analysis & Application Uses',
        text: 'Do a simple SWOT analysis for exporting [MORINGA LEAF POWDER] from Tamil Nadu to [GERMANY]. Use simple words. Then list 8 uses of the product (nutraceuticals, tea blending, capsules, animal feed) and which type of customer buys it for each use.',
      },
      {
        title: 'Prompt: Anticipating 15 Importer Questions',
        text: 'List 15 questions an importer in [GERMANY] will usually ask about [MORINGA LEAF POWDER] before placing a first order. Write a short model answer for each, leaving blanks where my own data is needed.',
      },
    ],
    importantRule: 'Lab values, pesticide residue thresholds, and shelf life must come strictly from authorized NABL test reports. Never allow AI to invent chemical parameters.',
    keyTakeaways: [
      'A clean spec sheet answers 90% of buyer concerns before negotiations start',
      'Mark missing metrics as "To be confirmed" rather than leaving blank spaces',
    ],
    speakerNotes: 'Show the importance of 80 mesh size and moisture under 7% in moringa powder. When your spec sheet looks international, buyers treat you like a tier-one supplier.',
  },
  {
    id: 'slide-9',
    slideNumber: 9,
    category: 'Market & Money',
    title: '3. Export Pricing Analysis: Ex-Works, FOB & CIF',
    subtitle: 'Never lose money on an export deal by omitting hidden logistics and port fees.',
    recommendedTool: 'ChatGPT or Claude (Claude excels at building formula tables)',
    whyItMatters: 'Budding exporters frequently quote prices that fail to account for container stuffing, CHA charges, CFS handling, or ocean transit surcharges.',
    howToDoIt: [
      'Step 1: Collate all raw domestic costs: farmgate price, primary packing, inland trucking to port',
      'Step 2: Add export overhead: CHA customs clearance, CFS handling, fumigation, documentation fees (FOB)',
      'Step 3: Add international shipping: Ocean freight, bunker adjustment factor (BAF), marine insurance (CIF)',
      'Step 4: Formulate volume slabs for 500 kg, 1,000 kg, 5,000 kg, and 20ft Full Container Load (FCL)',
    ],
    prompts: [
      {
        title: 'Prompt: Complete Export Costing Sheet',
        text: 'Act as an export costing consultant. Build a step-by-step export price calculation for [MORINGA LEAF POWDER], quantity [1,000 KG] in [25 KG BAGS], shipped from [TUTICORIN PORT] to [HAMBURG]. My costs: product cost Rs [180] per kg, packing Rs [15], local transport Rs [8,000 total], CHA and port charges Rs [12,000 total], freight USD [650], insurance [0.5]%, bank charges [1]%, profit margin [20]%. Show Ex-Works, FOB and CIF price per kg in INR and USD in a table. List any cost I have missed. Show every formula so I can check it.',
      },
      {
        title: 'Prompt: Volume-Based Price Slabs',
        text: 'Using the above costing, prepare a price slab table for 500 kg, 1 ton, 5 tons and a full container (14 tons). Explain in one line each why the price per kg reduces.',
      },
      {
        title: 'Prompt: Defending Price Against Low-Cost Competitors',
        text: 'My FOB price for [MORINGA LEAF POWDER] is USD [4.50] per kg. Explain how I can check if this is competitive in [GERMANY], which public sources show import prices, and 5 ways to justify a higher price without discounting.',
      },
    ],
    importantRule: 'Exchange rates and ocean freight rates fluctuate daily. Always get final freight quotes from your freight forwarder on the exact quotation date.',
    keyTakeaways: [
      'Ex-Works = Factory Gate | FOB = Tuticorin Port onboard | CIF = Destination Port with Freight & Insurance',
      'Volume slabs show buyers you understand economies of scale',
    ],
    speakerNotes: 'Walk the class through Tuticorin Port (V.O. Chidambaranar Port). Emphasize how fixed port and CHA costs get diluted across higher tonnages, lowering the per-kilogram FOB rate.',
  },
  {
    id: 'slide-10',
    slideNumber: 10,
    category: 'Market & Money',
    title: '4. Multi-Currency Pricing & Exchange Risk',
    subtitle: 'Quote in your buyer’s local currency with ironclad validity and exchange buffers.',
    recommendedTool: 'ChatGPT, Gemini, or Claude',
    whyItMatters: 'European and Middle Eastern buyers prefer quotes in EUR, USD, or AED. A single currency swing can wipe out your entire profit margin.',
    howToDoIt: [
      'Step 1: Establish base costing in INR or USD with clear margins',
      'Step 2: Obtain live exchange rates from your authorized dealer (AD) bank',
      'Step 3: Generate a neat multi-currency price matrix across different packaging SKUs',
      'Step 4: Model currency sensitivity (+/- INR 1 to 3) and embed standard 15-day validity terms',
    ],
    prompts: [
      {
        title: 'Prompt: Multi-Currency Price Matrix',
        text: 'My FOB price is USD [3.20] per kg for [MORINGA LEAF POWDER]. Use these rates: 1 USD = Rs [84.00], 1 EUR = Rs [91.50], 1 GBP = Rs [109.00], 1 AED = Rs [22.85], 1 SGD = Rs [64.20]. Create a price list table in USD, EUR, GBP, AED and SGD for 3 pack sizes: [250 G, 1 KG, 25 KG]. Round prices neatly. Add the line "Prices valid for 15 days, subject to exchange rate on date of order".',
      },
      {
        title: 'Prompt: Exchange Rate Fluctuation Impact',
        text: 'I quoted USD [3.20] per kg when 1 USD = Rs [84.00]. Show in a small table my profit or loss per kg if the rupee moves 1, 2 and 3 rupees stronger or weaker. Then explain in simple words 4 ways a small exporter can protect against this.',
      },
    ],
    importantRule: 'Always stamp quotations with: "Prices valid for 15 days, subject to exchange rate fluctuations exceeding +/- 2% on date of advance receipt."',
    keyTakeaways: [
      'Multi-currency ease shortens buyer sales cycles',
      'Hedging options for small exporters include EEFC accounts, forward contracts, and short validity windows',
    ],
    speakerNotes: 'Explain the risk of currency appreciation: If USD drops from Rs 84 to Rs 81 before you receive payment, you lose Rs 3 per dollar. Adding validity clauses protects your baseline.',
  },
  {
    id: 'slide-11',
    slideNumber: 11,
    category: 'Market & Money',
    title: '5. Competitor Analysis & Niche Positioning',
    subtitle: 'Analyze international competitors to identify market gaps and define unique selling propositions.',
    recommendedTool: 'ChatGPT, Gemini, or Claude (with Web Search)',
    whyItMatters: 'Entering a foreign market blindly leads to price wars. Understanding competitor packaging, certifications, and weak spots allows you to position on value.',
    howToDoIt: [
      'Step 1: Collect URLs or listings of 3 to 5 competing exporters in your target destination',
      'Step 2: Request an objective side-by-side comparison of product grades, packaging, and certifications',
      'Step 3: Identify unmet market gaps (e.g., faster lead times, organic traceability, smaller MOQs)',
      'Step 4: Synthesize a sharp, 1-sentence value proposition for your brochure and website',
    ],
    prompts: [
      {
        title: 'Prompt: Competitor Matrix & Market Gaps',
        text: 'Act as a market analyst. Visit these competitor websites: [LINK 1], [LINK 2], [LINK 3]. They sell [MORINGA LEAF POWDER]. Compare them in a table: products, pack sizes, certificates, countries served, price if shown, main selling message, weak points. Then tell me 5 gaps I can use as a new exporter from Madurai.',
      },
      {
        title: 'Prompt: Crafting Your Positioning Statement',
        text: 'Based on this comparison, suggest 3 ways my company can be different. For each, write one positioning sentence I can use on my website and brochure.',
      },
      {
        title: 'Prompt: Country-Level Origin Comparison',
        text: 'Which other countries export [MORINGA LEAF POWDER] to [GERMANY]? Compare India with them on price, quality image and delivery time. Mention sources.',
      },
    ],
    importantRule: 'Always paste real text or links from actual competitor sites. Without specific inputs, AI provides generic high-level industry generalizations.',
    keyTakeaways: [
      'Compete on reliability, origin storytelling, and certifications rather than purely race-to-the-bottom pricing',
      'Differentiate by highlighting Madurai’s native agro-climatic superiority for moringa cultivation',
    ],
    speakerNotes: 'Madurai and Southern Tamil Nadu have the world’s ideal soil and sunlight for moringa. Position your origin as a premium regional advantage, just like Champagne in France.',
  },
  {
    id: 'slide-12',
    slideNumber: 12,
    category: 'Market & Money',
    title: '6. Complaints Analysis & Crisis De-escalation',
    subtitle: 'Turn shipment issues and buyer disputes into long-term customer loyalty.',
    recommendedTool: 'ChatGPT or Claude',
    whyItMatters: 'Cargo damages, moisture ingress, or transit delays happen in global trade. Handling complaints professionally preserves buyer trust and repeats orders.',
    howToDoIt: [
      'Step 1: Collate anonymized complaint messages or competitor product reviews',
      'Step 2: Categorize issues into root causes (packaging integrity, shipping delay, moisture)',
      'Step 3: Draft polite, solution-oriented replies accepting legitimate responsibility without making excuses',
      'Step 4: Formulate proactive quality checkpoints to prevent recurrence',
    ],
    prompts: [
      {
        title: 'Prompt: Categorize Customer Complaints',
        text: 'Below are [20] customer complaints we received in the last 6 months. Group them into categories such as quality, packing, delay, documents, communication. Show a table with category, number of complaints, example, likely root cause and corrective action. Finally tell me the top 3 things to fix first.\n[PASTE COMPLAINTS]',
      },
      {
        title: 'Prompt: Professional Response to Damaged Cargo',
        text: 'A buyer in [GERMANY] complains that [10 BAGS ARRIVED DAMP]. The facts: [CARGO WAS SEALED AT TUTICORIN, CONTAINER EXPERIENCED TRANSIT DELAY IN COLOMBO]. Write a polite, professional reply that accepts responsibility where it is ours, asks for photos and batch number, and offers [REPLACEMENT / CREDIT NOTE]. No excuses, under 150 words.',
      },
      {
        title: 'Prompt: Extracting Flaws from Competitor Amazon Reviews',
        text: 'Here are customer reviews of similar products on [AMAZON / OTHER SITE]: [PASTE REVIEWS]. List what customers love, what they complain about, and 5 improvements I can make in my product or packing.',
      },
    ],
    importantRule: 'Strip all private customer identifiers, bank coordinates, and confidential invoice numbers before pasting dispute records into AI models.',
    keyTakeaways: [
      'Never argue or make excuses with international buyers; ask for evidence and provide corrective action',
      'Learning from competitor reviews helps you design superior packaging from day one',
    ],
    speakerNotes: 'If 10 bags arrive damp, arguing about Colombo port rains will lose you the buyer forever. Acknowledge, ask for batch photos, offer a credit note on the next shipment, and reinforce your inner liner specs.',
  },
  {
    id: 'slide-13',
    slideNumber: 13,
    category: 'Brand & Marketing',
    title: '7. Brand & Product Naming for Global Markets',
    subtitle: 'Develop memorable brand names with international phonetic and cross-language safety.',
    recommendedTool: 'ChatGPT',
    whyItMatters: 'A name that sounds pleasant in Tamil or English might carry an offensive or confusing meaning in German, Arabic, or Spanish.',
    howToDoIt: [
      'Step 1: Define brand ethos, product category, target geographies, and customer perceptions',
      'Step 2: Generate 20 distinct names across 4 creative pillars (Heritage, Modern, Nature, Premium)',
      'Step 3: Conduct multi-language linguistic safety checks across target export regions',
      'Step 4: Manually audit domain name availability and trademark registries (IP India & Madrid System)',
    ],
    prompts: [
      {
        title: 'Prompt: 20 International Brand Name Ideas',
        text: 'Act as a brand naming expert. Suggest 20 brand names for [ORGANIC MORINGA AND SPICE PRODUCTS] from Madurai, India, to be sold in [EUROPE AND MIDDLE EAST]. Give 5 names in each style: Tamil or Indian heritage, modern short names, nature based, premium sounding. Each name must be easy to pronounce for foreigners and within 2 to 3 syllables. Give the meaning in one line.',
      },
      {
        title: 'Prompt: Linguistic Safety & Phonetic Audit',
        text: 'For these 5 names: [NAME 1, NAME 2, NAME 3, NAME 4, NAME 5], check if any of them has a bad, funny or awkward meaning in English, Arabic, German, French or Spanish. Suggest a matching .com domain idea for each. Tell me which 2 are strongest and why.',
      },
    ],
    importantRule: 'AI cannot verify legal trademark availability. Always search the IP India Trademark Public Search portal and WIPO Global Brand Database before investing in packaging.',
    keyTakeaways: [
      'Keep export brand names under 2-3 syllables for effortless international pronunciation',
      'Check meanings across English, Arabic, German, French, and Spanish',
    ],
    speakerNotes: 'Share classic international branding mistakes where automotive or food brands launched words that meant something inappropriate abroad. The safety prompt prevents expensive rebranding.',
  },
  {
    id: 'slide-14',
    slideNumber: 14,
    category: 'Brand & Marketing',
    title: '8. Company Logo Design & Memorable Taglines',
    subtitle: 'Generate clean export logo concepts and crisp taglines without expensive agencies.',
    recommendedTool: 'ChatGPT (Image / DALL-E) or Gemini',
    whyItMatters: 'Export cartons require clean, bold, flat vector logos that print cleanly with high contrast on corrugated export boxes and shipping labels.',
    howToDoIt: [
      'Step 1: Brainstorm 15 international taglines under 5 words communicating purity and reliability',
      'Step 2: Generate clean, minimalist vector-style logo concepts suitable for carton printing',
      'Step 3: Iterate on specific elements (leaf geometry, color palette, tagline placement)',
      'Step 4: Hand the finalized concept to a local DTP operator or graphic artist for vectorization (.AI / .SVG)',
    ],
    prompts: [
      {
        title: 'Prompt: 15 Export Taglines (Max 5 Words)',
        text: 'Write 15 taglines for [BRAND NAME], an exporter of [MORINGA LEAF POWDER] from India. Maximum 5 words each. Mix of trust, purity, heritage and health themes. Simple English that a non-native speaker understands.',
      },
      {
        title: 'Prompt: Carton-Ready Flat Logo Concept',
        text: 'Create a clean, modern, flat logo for an export brand called "[BRAND NAME]". Products: [MORINGA AND SPICES]. Use a simple leaf symbol, colours deep green and gold, white background, bold readable lettering, no small details, suitable for printing on a carton box. Show the brand name spelled exactly as given.',
      },
      {
        title: 'Prompt: Single-Attribute Refinement',
        text: 'Keep the same logo. Change only this: [MAKE THE LEAF SIMPLER / CHANGE GOLD TO ORANGE / ADD THE TAGLINE "PURE FROM THE SOURCE" BELOW].',
      },
    ],
    importantRule: 'Always verify spelling inside AI-generated logos carefully. Keep graphics minimalist; complex gradients fail when screen-printed on corrugated kraft boxes.',
    keyTakeaways: [
      'Simplicity scales: Minimalist logos print crisply on drums, cartons, and pallet wraps',
      'Taglines should be under 5 words in universally understandable English',
    ],
    speakerNotes: 'Show that fancy 3D shiny gradients look terrible when printed on brown 5-ply corrugated export cartons. A bold 2-color vector design looks prestigious and prints cost-effectively.',
  },
  {
    id: 'slide-15',
    slideNumber: 15,
    category: 'Brand & Marketing',
    title: '9. Social Media Branding & 30-Day B2B Content',
    subtitle: 'Transform mobile photos into studio-grade product showcases and structured B2B authority.',
    recommendedTool: 'Gemini and ChatGPT Image',
    whyItMatters: 'Foreign buyers conduct digital due diligence on LinkedIn and Instagram before replying to your quotations.',
    howToDoIt: [
      'Step 1: Capture clear, well-lit smartphone photos of your raw leaves, powder, and packaging in natural daylight',
      'Step 2: Use AI image generation to place the product in pristine European kitchen or apothecary studio settings',
      'Step 3: Create structured B2B social graphics with origin stamps and certification badges',
      'Step 4: Generate a 30-day calendar covering farm origin, processing rigor, quality lab tests, and team ethics',
    ],
    prompts: [
      {
        title: 'Prompt: Smartphone Photo to Studio Hero Shot',
        text: 'Use the uploaded photo of my product pack. Keep the pack, label and text exactly the same. Place it on a clean wooden table with fresh moringa leaves around, soft natural light, white background, premium look. Square format for Instagram.',
      },
      {
        title: 'Prompt: B2B Export Social Media Post Design',
        text: 'Create a square social media post for [BRAND NAME]. Heading: "[PURE MORINGA POWDER – EXPORT QUALITY]". Small line: "[FROM THE FARMS OF TAMIL NADU]". Colours green and gold, modern clean design, product image in the centre, space at the bottom for contact details.',
      },
      {
        title: 'Prompt: 30-Day B2B Authority Content Plan',
        text: 'Write a LinkedIn caption and an Instagram caption for this post, under 60 words each, with 8 hashtags aimed at importers. Then give me a 30-day posting calendar with one idea per day: product, process, quality, people, customer and festival posts.',
      },
    ],
    importantRule: 'Never display certification marks (USDA Organic, ISO 22000, Halal) in social graphics unless you hold active certificates. Importers will demand audit copies.',
    keyTakeaways: [
      'B2B social media is about proof of consistency, hygienic processing, and origin transparency',
      'One high-quality daylight smartphone photo is all you need to start',
    ],
    speakerNotes: 'Encourage participants to post "behind-the-scenes" process photos: solar drying, vibrating sifter sorting, vacuum sealing. Overseas buyers love to see hygiene and traceability.',
  },
  {
    id: 'slide-16',
    slideNumber: 16,
    category: 'Brand & Marketing',
    title: '10. Product Video Ads & B2B Storyboarding',
    subtitle: 'Produce captivating short video clips and storyboards showcasing farm-to-port authenticity.',
    recommendedTool: 'Gemini Video Generation',
    whyItMatters: 'Video content generates 5x higher engagement on LinkedIn and WhatsApp when pitching international purchasing managers.',
    howToDoIt: [
      'Step 1: Structure a 4-scene narrative arc: farm origin, hygienic processing, tamper-proof packing, finished product',
      'Step 2: Generate specific camera, lighting, and textural video generation prompts per scene',
      'Step 3: Upload real pack photography to anchor the packaging in reality',
      'Step 4: Splice 4-second clips in free mobile editors (CapCut/VN) and overlay your logo and WhatsApp coordinates',
    ],
    prompts: [
      {
        title: 'Prompt: Scene 1 – Farm Origin & Harvesting',
        text: 'Create a short cinematic video. Early morning in a green moringa farm in South India, a farmer gently plucking fresh leaves, sunlight through the trees, slow camera movement, natural sounds, warm and authentic mood.',
      },
      {
        title: 'Prompt: Scene 2 – Product Texture & Purity',
        text: 'Using the uploaded product photo, create a short product advertisement video. The pack stands on a wooden table, green moringa powder is poured into a bowl beside it, slow rotating camera, soft studio light, premium feel, no text on screen.',
      },
      {
        title: 'Prompt: 30-Second B2B Storyboard Script',
        text: 'Write a 30-second product ad script for [MORINGA LEAF POWDER] aimed at importers in [GERMANY]. Give 4 scenes in a table: what we see, voice-over line, on-screen text. Then write a separate video generation prompt for each scene.',
      },
    ],
    importantRule: 'Keep AI clips concise (3–5 seconds each). Blend generated cinematic scenes with real mobile footage of your actual processing facility for maximum authenticity.',
    keyTakeaways: [
      'Foreign buyers value farm-to-table traceability and cleanliness above flashy marketing',
      'Short 30-second video clips are ideal for sending directly via WhatsApp Business',
    ],
    speakerNotes: 'Show how easy it is to assemble 4 short clips into a 20-second WhatsApp status. When a European buyer sees green fields and gentle morning sun, emotional connection is established.',
  },
  {
    id: 'slide-17',
    slideNumber: 17,
    category: 'Brand & Marketing',
    title: '11. Voice Product Overviews with NotebookLM',
    subtitle: 'Turn dense test reports and brochures into conversational audio podcasts for busy buyers.',
    recommendedTool: 'NotebookLM (Google)',
    whyItMatters: 'Busy international procurement managers rarely read 12-page PDF brochures. An audio summary can be listened to in transit or during commutes.',
    howToDoIt: [
      'Step 1: Create a notebook inside Google NotebookLM',
      'Step 2: Upload your technical spec sheet, company brochure, lab test reports, and website copy',
      'Step 3: Select Audio Overview and customize instructions specifying target buyer profile',
      'Step 4: Download the synthesized audio file to share via WhatsApp, and generate an instant buyer FAQ',
    ],
    prompts: [
      {
        title: 'Prompt: Audio Overview Customization',
        text: 'Explain this product to a food importer who has never bought from India. Focus on product quality, certificates, packing options and how to order. Keep it short, clear and professional. Do not add any claim that is not in the uploaded documents.',
      },
      {
        title: 'Prompt: Document-Grounded Buyer FAQ',
        text: 'From the uploaded documents, prepare a 10-point FAQ for buyers with short answers. Tell me which important buyer questions are NOT answered in my documents.',
      },
      {
        title: 'Prompt: 45-Second WhatsApp Voice Script',
        text: 'Write a 45-second voice script introducing [MORINGA LEAF POWDER] from [COMPANY NAME], in friendly simple English, that I can record in my own voice for WhatsApp.',
      },
    ],
    importantRule: 'NotebookLM only answers from what you upload. The more accurate and comprehensive your source documents, the higher the fidelity of the audio.',
    keyTakeaways: [
      'Grounded strictly in your source documents: zero unwanted hallucinations',
      'Uncovers critical blind spots missing from your product literature',
    ],
    speakerNotes: 'Play an excerpt of a NotebookLM Audio Overview during the talk. Explain how two AI hosts discuss your moringa powder as if reviewing a fine wine, blowing buyers away with professionalism.',
  },
  {
    id: 'slide-18',
    slideNumber: 18,
    category: 'Brand & Marketing',
    title: '12. Company Profile Pitch Decks & Flyers',
    subtitle: 'Standard 10-slide international exporter structure that wins serious institutional buyers.',
    recommendedTool: 'Claude, ChatGPT, or Gemini',
    whyItMatters: 'Every serious buyer, buying agent, and supermarket procurement committee demands a formal company deck before issuing an RFQ.',
    howToDoIt: [
      'Step 1: Compile core corporate facts: founding year, product portfolio, processing capacity, certificates, contact info',
      'Step 2: Request the standardized 10-to-12 slide international exporter deck structure',
      'Step 3: Keep slides under 30 words with high scannability and strong visual suggestions',
      'Step 4: Export to Google Slides and embed genuine photographs of your facility and leadership',
    ],
    prompts: [
      {
        title: 'Prompt: 10-Slide Exporter Pitch Deck',
        text: 'Act as a presentation designer. Create a 10-slide company presentation for [COMPANY NAME], an exporter of [MORINGA PRODUCTS] from Madurai, India, for foreign buyers. Slides: Cover, About us, Products, Quality and certificates, Process, Packing, Capacity and lead time, Markets served, Why choose us, Contact. Company facts: [PASTE FACTS]. Maximum 30 words per slide, simple English, suggest one photo for each slide. Do not invent facts; mark missing ones as "To be added".',
      },
      {
        title: 'Prompt: One-Page Product Flyer',
        text: 'Create a one-page product flyer for [MORINGA LEAF POWDER] with headline, 5 key benefits, specification table, packing options and contact section.',
      },
    ],
    importantRule: 'Always use real photos of your team, farm, and warehouse in the final presentation. Authentic photos build 10x more trust than generic stock imagery.',
    keyTakeaways: [
      'Rule of 30: Never exceed 30 words per slide on business presentation decks',
      'Institutional buyers prioritize capacity, quality certifications, and lead times over fluff',
    ],
    speakerNotes: 'Show how this app itself allows you to export this entire deck to Google Slides with one click! That is the exact workflow exporters will use for their own company profiles.',
  },
  {
    id: 'slide-19',
    slideNumber: 19,
    category: 'Brand & Marketing',
    title: '13. AI-Powered Exporter Website Design',
    subtitle: 'Build a mobile-friendly digital visiting card that passes international due diligence.',
    recommendedTool: 'Google AI Studio (Build)',
    whyItMatters: 'Before replying to any email or wire transfer, foreign importers Google your company name. An absent or broken website is an immediate red flag.',
    howToDoIt: [
      'Step 1: Open Google AI Studio and select the Build environment',
      'Step 2: Describe your site requirements: product cards, spec tables, certifications, and WhatsApp inquiry buttons',
      'Step 3: Interactively refine the live preview by requesting specific enhancements in plain English',
      'Step 4: Export code or deploy to your custom domain via Cloud Run or Netlify',
    ],
    prompts: [
      {
        title: 'Prompt: Build Exporter Website in AI Studio',
        text: 'Build a modern, mobile-friendly export company website for [COMPANY NAME], Madurai, India. We export [MORINGA PRODUCTS]. Pages: Home, About Us, Products (with a card for each product showing specifications and packing), Quality & Certificates, Contact with enquiry form and WhatsApp button. Style: clean, green and white, large product photos, simple English. Add a "Request a Quote" button on every page.',
      },
      {
        title: 'Prompt: Add Lead Capture & Global Trade Features',
        text: 'Add a product enquiry form that asks for name, company, country, product, quantity and message. Add a section "Countries We Serve" and a FAQ section with 6 questions buyers usually ask.',
      },
      {
        title: 'Prompt: High-Trust Website Copywriting',
        text: 'Write the Home page and About Us content for my export website. Company facts: [PASTE FACTS]. Tone: trustworthy and simple. Include a headline, a 2-line introduction and 4 reasons to choose us.',
      },
    ],
    importantRule: 'Before publishing, manually audit every phone number, email ID, postal address, IEC number, and certificate name on the site.',
    keyTakeaways: [
      'A website is your 24/7 digital passport in global commerce',
      'Ensure clear WhatsApp and direct RFQ inquiry triggers are prominent on mobile devices',
    ],
    speakerNotes: 'Highlight that with Google AI Studio, budding exporters no longer need to spend Rs 50,000 and wait two months for an agency to build a simple catalog site. You can generate it in minutes.',
  },
  {
    id: 'slide-20',
    slideNumber: 20,
    category: 'Daily Operations',
    title: '14. Automated Quotations & Proforma Invoices',
    subtitle: 'Generate legally structured quotations, proforma invoices, and B2B proposals in minutes.',
    recommendedTool: 'Claude',
    whyItMatters: 'The exporter who submits a clean, error-free quotation within 2 hours of an inquiry often captures the buyer’s initial commitment.',
    howToDoIt: [
      'Step 1: Provide baseline trade details: IEC number, GSTIN, buyer coordinates, Incoterm, and payment terms',
      'Step 2: Instruct Claude to format into an international commercial quotation document',
      'Step 3: Transform agreed quotations into binding Proforma Invoices with HS codes and banking particulars',
      'Step 4: Draft 2-page customized proposals for supermarket chains and bulk commodity distributors',
    ],
    prompts: [
      {
        title: 'Prompt: Export Quotation Document',
        text: 'Act as an export sales executive. Create a professional export quotation as a Word document. Seller: [COMPANY, ADDRESS, IEC NUMBER, GST]. Buyer: [NAME, COUNTRY]. Product: [MORINGA LEAF POWDER], Specification: [80 MESH, <7% MOISTURE], Quantity: [1,000 KG], Price: USD [4.20] per kg [FOB TUTICORIN], Packing: [25 KG HDPE DRUMS], Payment terms: [30% ADVANCE, 70% AGAINST BL COPY], Delivery: [15] days, Validity: 15 days. Include a quotation number, date, price table with total, terms and conditions, bank details section and signature block.',
      },
      {
        title: 'Prompt: Institutional Supply Proposal',
        text: 'Write a 2-page supply proposal to [BUYER COMPANY], a [SUPERMARKET CHAIN / DISTRIBUTOR] in [GERMANY], for regular monthly supply of [MORINGA LEAF POWDER]. Sections: Understanding your need, Our offer, Quality assurance, Pricing and terms, Why us, Next steps. Use only these facts: [PASTE FACTS].',
      },
      {
        title: 'Prompt: Conversion to Proforma Invoice',
        text: 'Convert the above quotation into a Proforma Invoice with the same details. Add HS code [12119099], country of origin [INDIA], port of loading [TUTICORIN PORT], port of discharge [HAMBURG] and Incoterm [FOB TUTICORIN].',
      },
    ],
    importantRule: 'Double check every numerical figure, HS code, and bank SWIFT/IBAN coordinate before dispatching. AI drafts; the exporter bears legal responsibility.',
    keyTakeaways: [
      'Standardized payment terms: 30% advance with 70% against Bill of Lading (BL) copy via bank',
      'Speed wins deals: Fast, professional responses set the tone for the entire business relationship',
    ],
    speakerNotes: 'Emphasize payment terms: Never agree to 100% credit or open account terms on your first shipment with an unknown buyer. Advance + BL scan copy is the golden standard for budding exporters.',
  },
  {
    id: 'slide-21',
    slideNumber: 21,
    category: 'Daily Operations',
    title: '15. Email Summaries & High-EQ Follow-ups',
    subtitle: 'Triage multi-message buyer threads, eliminate misunderstandings, and draft firm yet polite replies.',
    recommendedTool: 'ChatGPT and Claude',
    whyItMatters: 'Foreign buyers write terse emails with complex requirements. Misunderstanding a delivery milestone or packing clause causes shipment rejections.',
    howToDoIt: [
      'Step 1: Paste long email threads to instantly extract buyer requirements, deadlines, and hidden risks',
      'Step 2: Input your raw constraints in simple Tamil or English',
      'Step 3: Instruct AI to generate two distinct drafts: a firm corporate version and a friendly collaborative version',
      'Step 4: Deploy gentle 7-day automated follow-up sequences for quotations that have gone cold',
    ],
    prompts: [
      {
        title: 'Prompt: 5-Bullet Email Thread Summary',
        text: 'Summarise this email chain in 5 bullet points. Then list: what the buyer is asking, deadlines, what I must do next, and any risk or unclear point I should clarify.\n[PASTE EMAILS]',
      },
      {
        title: 'Prompt: Dual-Tone Smart Reply (Under 120 Words)',
        text: 'Write a reply to this buyer. What I want to say: [WE CAN SUPPLY 2 TONS, DELIVERY IN 20 DAYS, PRICE CANNOT BE REDUCED BUT WE CAN GIVE FREE SAMPLES FOR LAB TESTING]. Tone: polite, confident, short. Under 120 words. Give me two versions: one firm, one friendly.',
      },
      {
        title: 'Prompt: Tamil-to-English Business Email & Follow-Up',
        text: 'I will type in Tamil. Convert it into a professional business email in simple English: [TAMIL TEXT]. Also write a gentle follow-up email for a buyer who has not replied for 7 days after receiving my quotation.',
      },
    ],
    importantRule: 'Never paste sensitive corporate passwords, bank login credentials, or confidential government contracts into free AI tools.',
    keyTakeaways: [
      'Never hesitate to express your thoughts in Tamil; AI converts colloquial input into polished international business English',
      '7-day polite follow-ups revive up to 40% of seemingly abandoned buyer inquiries',
    ],
    speakerNotes: 'Many Tamil Nadu exporters are brilliant farmers and producers but feel hesitant writing in corporate English. Emphasize that language is no longer a barrier: Speak in Tamil, and AI writes the queen’s English.',
  },
  {
    id: 'slide-22',
    slideNumber: 22,
    category: 'Daily Operations',
    title: '16. Export Process Worksheet & Pre-Shipment Checklists',
    subtitle: 'Eliminate port detention and customs delays with exhaustive step-by-step documentation trackers.',
    recommendedTool: 'Claude',
    whyItMatters: 'A single typographical error on a Bill of Lading or missing Certificate of Origin can hold a container at the port, racking up heavy demurrage charges.',
    howToDoIt: [
      'Step 1: Feed your product, destination country, port of loading, and payment terms to Claude',
      'Step 2: Generate an end-to-end milestone tracker from enquiry to final bank realization',
      'Step 3: Construct a pre-shipment document checklist detailing the issuing authority for every document',
      'Step 4: Prepare a one-time regulatory registration checklist for first-time exporters in India',
    ],
    prompts: [
      {
        title: 'Prompt: Operational Export Process Worksheet',
        text: 'Act as an export operations manager. Prepare a step-by-step export process worksheet for shipping [MORINGA LEAF POWDER] from [MADURAI] through [TUTICORIN PORT] to [GERMANY] on [FOB] terms with [30% ADVANCE + 70% BALANCE AGAINST DOCUMENTS] payment. Create it as an Excel sheet with columns: Step number, Activity, Responsible person, Document needed, Days required, Status, Remarks. Cover enquiry, quotation, order confirmation, production, quality check, packing, documents, customs clearance, shipment, bank documents and payment follow-up.',
      },
      {
        title: 'Prompt: Pre-Shipment Document Checklist',
        text: 'Prepare a pre-shipment document checklist for the same order with tick boxes. For each document mention who issues it and at what stage. Include commercial invoice, packing list, shipping bill, bill of lading, certificate of origin and any product-specific certificate. Mark clearly which items I must confirm with my CHA or the buyer.',
      },
      {
        title: 'Prompt: One-Time Exporter Registration Checklist',
        text: 'I am a first-time exporter in Tamil Nadu. Prepare a simple checklist of registrations and accounts I need before my first shipment, with the purpose of each in one line.',
      },
    ],
    importantRule: 'Regulations differ by product and destination country. Always treat AI checklists as a first draft and validate with your Customs House Agent (CHA) and Export Promotion Council.',
    keyTakeaways: [
      'Essential Indian registrations: PAN, GST, IEC (DGFT), RCMC (APEDA/Spices Board), AD Code registration with port customs, and LUT (Letter of Undertaking)',
      'Organized checklists protect you from costly port demurrage fees',
    ],
    speakerNotes: 'Explain the role of the CHA (Customs House Agent) at Tuticorin port. The CHA files your Shipping Bill through ICEGATE. Having your documents checked against this list saves days of waiting.',
  },
  {
    id: 'slide-23',
    slideNumber: 23,
    category: 'Safety & Action Plan',
    title: 'Using AI Safely: The Exporter’s Do’s & Don’ts',
    subtitle: 'Protect your money, legal compliance, and business reputation with these strict operational rules.',
    whyItMatters: 'Blindly trusting AI output without human verification in international trade can lead to customs seizures, fraud, and financial ruin.',
    howToDoIt: [
      'Review the side-by-side rules before issuing any quotations or contracts',
      'Establish a strict internal verification checklist for all regulatory parameters',
    ],
    tableData: {
      headers: ['DO (Mandatory Best Practices)', 'DO NOT (Dangerous Pitfalls)'],
      rows: [
        ['Verify buyers, HS codes, duty rates, and import rules with official sources, your CHA, and your bank', 'Trust a buyer name, price, or regulation only because AI stated it'],
        ['Provide your real product data, actual NABL test reports, and factory photos', 'Let AI invent specifications, certificates, or quality awards'],
        ['Remove private personal details before pasting emails and customer disputes', 'Share bank passwords, login tokens, or confidential trade contracts'],
        ['Read every single email, quotation, and document thoroughly before sending', 'Blindly copy and send AI output without review'],
        ['Save your best-performing prompts in a master notebook and refine them', 'Start from zero with blank, unstructured prompts every time'],
      ],
    },
    prompts: [],
    importantRule: 'Never authorize wire transfers or ship consignments based purely on unverified AI buyer suggestions.',
    keyTakeaways: [
      'AI is an accelerator, not an authority: Ultimate legal and financial responsibility rests with you',
      'Never input sensitive financial access credentials into any generative model',
    ],
    speakerNotes: 'Pause on this slide and read every item. Stress that if AI invents a certificate and a German buyer requests an audit copy, getting caught with false documentation can get your IEC blacklisted.',
  },
  {
    id: 'slide-24',
    slideNumber: 24,
    category: 'Safety & Action Plan',
    title: 'Your 7-Day AI Exporter Action Plan',
    subtitle: 'From zero to sending your first 10 verified buyer outreach emails in exactly one week.',
    whyItMatters: 'Knowledge without execution is useless. This structured 7-day sprint takes you from theory to operational launch.',
    howToDoIt: [
      'Follow the daily milestone progression diligently',
      'Dedicate 60–90 minutes each day to complete each task',
    ],
    tableData: {
      headers: ['Day', 'Milestone Task', 'Recommended Tool'],
      rows: [
        ['Day 1', 'Create AI accounts and test the R-T-C-F formula with your own product parameters', 'ChatGPT, Claude, Gemini'],
        ['Day 2', 'Draft comprehensive technical product specification sheet & SWOT analysis', 'ChatGPT or Claude'],
        ['Day 3', 'Shortlist 3 high-demand target countries & map ideal buyer personas and channels', 'Any tool with web search'],
        ['Day 4', 'Build complete Ex-Works -> FOB -> CIF export costing sheet & multi-currency price list', 'Claude'],
        ['Day 5', 'Finalize brand name, international tagline, flat logo concept, and 5 B2B social posts', 'ChatGPT, Gemini'],
        ['Day 6', 'Generate 10-slide company presentation deck, NotebookLM voice overview & simple website', 'Claude, NotebookLM, Google AI Studio'],
        ['Day 7', 'Prepare standardized quotation format, export checklist, and send 10 introduction emails', 'Claude, ChatGPT'],
      ],
    },
    prompts: [],
    keyTakeaways: [
      'Execution beats perfection: Complete each daily task in under 90 minutes',
      'By Day 7, your entire export infrastructure is ready for global commerce',
    ],
    speakerNotes: 'Encourage every participant to commit to this sprint starting tomorrow morning. Day 1: Open free accounts. Day 7: Hit "Send" on 10 targeted buyer emails. Momentum is everything.',
  },
  {
    id: 'slide-25',
    slideNumber: 25,
    category: 'Safety & Action Plan',
    title: 'The Master Exporter System Prompt',
    subtitle: 'Copy and paste this master anchor prompt at the start of every new chat session.',
    whyItMatters: 'Instead of re-explaining your company details in every interaction, this master prompt anchors the AI in your business DNA.',
    howToDoIt: [
      'Step 1: Fill in your company credentials inside the bracketed placeholders below',
      'Step 2: Save this snippet in your phone’s Notes or desktop clipboard manager',
      'Step 3: Paste it as the first message whenever starting a new conversation with ChatGPT, Claude, or Gemini',
    ],
    prompts: [
      {
        title: 'Master Exporter System Prompt (Save This)',
        text: 'You are my export business assistant. My company: [NAME], Madurai, India. Product: [ORGANIC MORINGA LEAF POWDER]. Capacity: [2 TONS/MONTH]. Certificates: [APEDA, SPICES BOARD, ORGANIC]. Target markets: [EUROPE, UAE]. Minimum order: [500 KG]. Always answer in simple English, use tables where useful, never invent facts about my company, and tell me clearly which points I should verify with official sources.',
      },
    ],
    importantRule: 'Update your master prompt as your capacity, certificates, and target markets evolve.',
    keyTakeaways: [
      'Anchors model memory and eliminates repeated explanation',
      'Forces the AI to acknowledge its assumptions and flag items needing official verification',
      'Closing Credo: "AI will not replace exporters. Exporters who use AI will move faster than those who do not."',
    ],
    speakerNotes: 'Conclude the presentation with the core motto: AI will not replace exporters. Exporters who use AI will move faster than those who do not. Thank the Agri & All Trade Chamber, Madurai, and open for Q&A.',
  },
];

export const SLIDES_DATA: SlideItem[] = RAW_SLIDES_DATA.map((slide, index) => ({
  ...slide,
  slideNumber: index + 1,
}));
