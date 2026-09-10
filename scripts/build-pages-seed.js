const fs = require('fs');
const path = require('path');
const dataDir = path.resolve(__dirname, '..', 'server', 'data');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const pages = [];

// 1. Home Page
pages.push({
  slug: 'home',
  title: 'Home',
  category: 'main',
  metaTitle: 'Spaces & Places | Interior Designer & Architects in Lahore',
  metaDescription: 'Spaces & Places is Lahore\'s premier interior design, architectural planning, and turnkey construction studio. From luxury villas to commercial offices, explore our bespoke designs.',
  focusKeywords: 'Interior Designer Lahore, Architects in Lahore, House Construction Lahore, Luxury Interiors Pakistan',
  canonicalUrl: 'https://spacesandplaces.com.pk/',
  ogImage: '/uploads/living-eye-level.jpg',
  indexRobots: true,
  hero: {
    badge: 'SPACES & PLACES STUDIO',
    title: 'INTERIOR DESIGNER AND ARCHITECTS IN LAHORE',
    subtitle: 'From concept to completion, we combine creativity, precision, and craftsmanship to design breathtaking spaces that reflect your prestige and lifestyle.',
    bgImage: '/uploads/living-eye-level.jpg',
    bgVideo: '/uploads/hero-section-vedio.mp4',
    ctaText: "LET'S TALK",
    ctaLink: '/contact'
  },
  overview: {
    badge: 'WHO WE ARE',
    title: 'Mastering Architecture, Interior Aesthetics & Construction Since 2012',
    subtitle: 'Bridging imaginative architectural concepts with flawless engineering execution across Lahore and beyond.',
    paragraph1: 'Spaces & Places is an award-winning multidimensional design and architectural firm established in Lahore. We specialize in bespoke residential architecture, high-end commercial interiors, turn-key corporate headquarters, and precision furniture manufacturing.',
    paragraph2: 'Our collaborative team of licensed architects, interior designers, 3D visualizers, and project engineers ensure every marla is utilized to its pinnacle of aesthetic elegance and functional efficiency.',
    highlights: [
      '100% Turnkey Solutions from Soil Testing to Interior Decor',
      'Over 350+ Completed Luxury Residential & Corporate Projects',
      'In-house Custom Solid Wood & Metal Furniture Manufacturing',
      'Rigorous BOQ Transparency and Strict Timeline Guarantee'
    ],
    image: '/uploads/01-01-8.jpg'
  },
  sections: [
    {
      id: 'pillar-interior',
      title: 'Interior Design',
      subtitle: 'Residential & Commercial Elegance',
      description: 'Transforming interior spaces into harmonious sanctuaries using tailored lighting, marble accents, and ergonomic spatial flows.',
      icon: 'Palette',
      image: '/uploads/01-02-9.jpg',
      points: ['Residential Villas', 'Corporate Offices', 'Hospitality & Boutique Hotels', 'Restaurants & Retail Outlets']
    },
    {
      id: 'pillar-architecture',
      title: 'Architectural Designs',
      subtitle: 'Innovative & Sustainable Planning',
      description: 'Contemporary, Spanish, Classical, and Neo-modern architectural drafting with complete LDA and society compliance.',
      icon: 'Building2',
      image: '/uploads/01-03-7.jpg',
      points: ['Residential 10 Marla & 1 Kanal Villas', '3D Visual Walkthroughs', 'Facade & Elevation Design', 'Landscape Architecture']
    },
    {
      id: 'pillar-construction',
      title: 'Construction Services',
      subtitle: 'Uncompromising Structural Integrity',
      description: 'From foundation grey structure to A-grade luxury finishes, supervised by veteran structural engineers.',
      icon: 'HardHat',
      image: '/uploads/01-04-8.jpg',
      points: ['Full Scale Construction', 'Refurbishment & Renovations', 'Project Management & BOQs', 'Contract Administration']
    },
    {
      id: 'pillar-furniture',
      title: 'Bespoke Furniture',
      subtitle: 'Handcrafted Artistry',
      description: 'Custom manufactured solid wood, brass-accented, and designer upholstered furniture tailored specifically for your project.',
      icon: 'Armchair',
      image: '/uploads/01-05-6.jpg',
      points: ['Living Lounge Sofas', 'Executive Office Desks', 'Custom Dining Sets', 'Luxury Decor & Fixtures']
    }
  ],
  faqs: [
    {
      question: 'What makes Spaces & Places unique among architecture firms in Lahore?',
      answer: 'Spaces & Places delivers a fully unified lifecycle under one roof: architectural blueprints, 3D photorealistic visualizations, full-scale construction, interior decor, and custom furniture manufacturing. This eliminates contractor discrepancies and guarantees that the rendered design matches the final built reality 100%.'
    },
    {
      question: 'Do you work outside Lahore in other cities of Pakistan?',
      answer: 'Yes! While our primary design studio and manufacturing facility are based in Lahore (DHA and Gulberg), we design and consult on high-end residential and commercial projects across Islamabad, Rawalpindi, Faisalabad, Multan, and Karachi.'
    },
    {
      question: 'Can you assist with building regulatory approvals like LDA, DHA, and Bahria Town?',
      answer: 'Absolutely. Our senior architectural team prepares all structural drawings, MEP designs, and submission plans in strict adherence to DHA, Bahria Town, LDA, and Cantonment Board building bylaws.'
    }
  ],
  gallery: [
    { title: 'Executive Bahria Luxury Villa', image: '/uploads/01-01-8.jpg', category: 'Residential', alt: 'Luxury living room design' },
    { title: 'Modern Minimalist Lounge', image: '/uploads/01-02-9.jpg', category: 'Residential', alt: 'Modern dining and lounge' },
    { title: 'Gulberg Corporate Boardroom', image: '/uploads/01-03-7.jpg', category: 'Corporate', alt: 'Executive office boardroom' },
    { title: 'Chic Cafe Bahria Town', image: '/uploads/Display-9.jpg', category: 'Commercial', alt: 'Commercial restaurant interior' },
    { title: '1 Kanal Contemporary Elevation', image: '/uploads/01-04-8.jpg', category: 'Architectural', alt: 'Modern facade elevation' },
    { title: 'Handcrafted Designer Lounge Set', image: '/uploads/01-05-6.jpg', category: 'Furniture', alt: 'Bespoke custom furniture' }
  ],
  cta: {
    title: 'Let\'s Bring Your Architectural Vision to Life',
    subtitle: 'Book a discovery session with our lead architects and interior styling consultants in Lahore.',
    buttonText: "BOOK A CONSULTATION",
    buttonLink: '/contact'
  }
});

// 2. About Us Page
pages.push({
  slug: 'about-us',
  title: 'About Us',
  category: 'main',
  metaTitle: 'About Spaces & Places | Top Architects & Interior Designers in Lahore',
  metaDescription: 'Discover the story behind Spaces & Places. Leading Lahore architectural design studio, luxury interior specialists, and premium construction firm with over a decade of excellence.',
  focusKeywords: 'About Spaces & Places, Lahore Interior Designers, Top Architects Pakistan, Construction Studio Lahore',
  canonicalUrl: 'https://spacesandplaces.com.pk/about-us',
  ogImage: '/uploads/01-01-8.jpg',
  indexRobots: true,
  hero: {
    badge: 'OUR HERITAGE & VISION',
    title: 'CRAFTING TIMELESS ARCHITECTURE & REFINED INTERIORS',
    subtitle: 'Over 12 years of delivering transcendent spaces that celebrate Pakistani architectural heritage with modern Scandinavian and European luxury.',
    bgImage: '/uploads/01-01-8.jpg',
    ctaText: 'MEET OUR TEAM',
    ctaLink: '/contact'
  },
  overview: {
    badge: 'OUR PHILOSOPHY',
    title: 'Where Creative Inspiration Meets Precision Engineering',
    subtitle: 'We believe architecture is not merely about erecting walls; it is about orchestrating light, volume, materials, and human experience.',
    paragraph1: 'Founded in Lahore, Spaces & Places was born out of a desire to eliminate the traditional disconnect between architectural blueprints, construction contractors, and interior finishers. Our multidisciplinary studio bridges all three domains seamlessly.',
    paragraph2: 'Whether envisioning a private palace in DHA Phase 6, an innovative tech incubator in Gulberg, or a bespoke boutique hotel, our team applies rigorous thermodynamic analysis, acoustic modeling, and bespoke material craftsmanship to every square foot.',
    highlights: [
      'Over 14+ International & Domestic Architectural Honors',
      'Full In-House Workshop for Joinery, Metalwork, and Fine Upholstery',
      'Dedicated Structural Engineers & Project Management Experts',
      'Sustainable Green Building & Energy Efficient Passive Cooling'
    ],
    image: '/uploads/01-06-6.jpg'
  },
  sections: [
    {
      id: 'about-values-1',
      title: 'Our Design Values',
      subtitle: 'Uncompromising Quality',
      description: 'Every line drawn on paper and every stone laid on site reflects our commitment to longevity, structural resilience, and aesthetic permanence.',
      icon: 'Sparkles',
      image: '/uploads/01-08-6.jpg',
      points: ['Harmonious Spatial Proportions', 'Authentic Natural Stone & Wood', 'Custom Lighting Architecture', 'Zero-Wastage Project Management']
    },
    {
      id: 'about-values-2',
      title: 'Our Proven Process',
      subtitle: 'Concept to Handover',
      description: 'We follow a structured 5-phase execution framework guaranteeing transparency, budget control, and zero unexpected delays.',
      icon: 'CheckCircle',
      image: '/uploads/01-09-5.jpg',
      points: ['Discovery & Site Analysis', 'Concept Schematics & 3D Renders', 'Detailed Working Drawings & BOQs', 'Site Supervision & Handover']
    }
  ],
  faqs: [
    {
      question: 'Where is the Spaces & Places studio located?',
      answer: 'Our main design gallery and architecture studio are located in Lahore, Pakistan. We welcome clients by appointment to review samples, 3D virtual reality models, and material swatches.'
    },
    {
      question: 'Do you offer turnkey construction with guaranteed fixed pricing?',
      answer: 'Yes. We prepare comprehensive itemized Bill of Quantities (BOQs) with fixed milestone-based payment schedules, giving you complete peace of mind with no hidden costs.'
    }
  ],
  gallery: [
    { title: 'Studio Showcase Detail', image: '/uploads/01-08-6.jpg', category: 'Studio', alt: 'Studio library detail' },
    { title: 'Material Craftsmanship', image: '/uploads/01-09-5.jpg', category: 'Materials', alt: 'Marble and wood craftsmanship' },
    { title: 'Architectural Blueprint Review', image: '/uploads/01-10-4.jpg', category: 'Process', alt: 'Architectural drawings' }
  ],
  cta: {
    title: 'Partner with Lahore\'s Finest Design Studio',
    subtitle: 'Contact us today to discuss your prospective residential or commercial endeavor.',
    buttonText: 'GET IN TOUCH',
    buttonLink: '/contact'
  }
});

// 3. Our Clients Page
pages.push({
  slug: 'our-clients',
  title: 'Our Clients',
  category: 'main',
  metaTitle: 'Our Prestigious Clients | Spaces & Places Architecture & Interiors',
  metaDescription: 'Explore the corporate enterprises, commercial brands, and private homeowners who have trusted Spaces & Places for architectural planning and interior execution.',
  focusKeywords: 'Spaces and Places Clients, Corporate Interior Clients Lahore, Commercial Architecture Portfolio',
  canonicalUrl: 'https://spacesandplaces.com.pk/our-clients',
  ogImage: '/uploads/01-03-7.jpg',
  indexRobots: true,
  hero: {
    badge: 'TRUSTED BY INDUSTRY LEADERS',
    title: 'OUR ESTEEMED CORPORATE & COMMERCIAL CLIENTS',
    subtitle: 'From multinational corporations to boutique luxury brands, we take pride in delivering architectural excellence that enhances enterprise value.',
    bgImage: '/uploads/01-03-7.jpg',
    ctaText: 'START A PROJECT',
    ctaLink: '/contact'
  },
  overview: {
    badge: 'COLLABORATIONS',
    title: 'Building Longstanding Partnerships Built on Integrity',
    subtitle: 'Our client roster includes premier names across industrial manufacturing, banking, hospitality, automotive, and fashion retail.',
    paragraph1: 'We have executed state-of-the-art corporate offices, showroom spaces, factory headquarters, and fine dining establishments for top-tier organizations in Lahore and throughout Pakistan.',
    paragraph2: 'Every commercial project is engineered to foster brand presence, employee productivity, and customer engagement through purposeful architectural zoning and acoustic balance.',
    highlights: [
      'Over 85+ Commercial & Corporate Enterprises Served',
      'Specialized Healthcare & Hospitality Interior Expertise',
      'ISO Compliant Fire-Safety & Energy Management Implementations',
      'High-Speed Fast-Track Construction for Urgent Commercial Launches'
    ],
    image: '/uploads/01-02-10.jpg'
  },
  sections: [
    {
      id: 'client-sectors',
      title: 'Sectors We Serve',
      subtitle: 'Diverse Commercial Capabilities',
      description: 'Our portfolio spans key commercial sectors requiring specialized MEP, acoustic, and spatial planning.',
      icon: 'Briefcase',
      image: '/uploads/Display-9.jpg',
      points: ['Paint & Chemical Corporations (Brighto, Jotun)', 'Engineering Conglomerates (Descon, Ha Steels)', 'Hospitality & Restaurants (Shawarma Stop, Cafes)', 'Automotive & Lifestyle (Prestige Cars, Leisure Salon)']
    }
  ],
  faqs: [
    {
      question: 'Can you furnish commercial client references and site visits?',
      answer: 'Yes! We frequently arrange guided tours of our completed commercial offices, retail outlets, and residential sites for prospective clients upon request.'
    }
  ],
  gallery: [
    { title: 'Brighto Paints Corporate Wing', image: '/uploads/brighto-logo.png', category: 'Client', alt: 'Brighto Paints' },
    { title: 'Descon Engineering Facility', image: '/uploads/descon-logo.png', category: 'Client', alt: 'Descon' },
    { title: 'Jotun Paints Experience Center', image: '/uploads/jotun-logo.png', category: 'Client', alt: 'Jotun' },
    { title: 'HA Steels Executive Office', image: '/uploads/ha-steels-logo.png', category: 'Client', alt: 'HA Steels' }
  ],
  cta: {
    title: 'Elevate Your Corporate Identity Today',
    subtitle: 'Schedule a discovery meeting for your corporate office, retail brand, or hospitality property.',
    buttonText: "CONTACT COMMERCIAL TEAM",
    buttonLink: '/contact'
  }
});

// 4. Contact Us Page
pages.push({
  slug: 'contact',
  title: 'Contact Us',
  category: 'main',
  metaTitle: 'Contact Spaces & Places | Architecture & Interior Design Studio Lahore',
  metaDescription: 'Get in touch with Spaces & Places in Lahore. Call +92 300 1999967 or visit our studio in Gulberg/DHA for architectural design, interior planning, and turnkey construction consultations.',
  focusKeywords: 'Contact Spaces and Places, Architecture Office Lahore, Interior Designer Phone Lahore, Lahore Architect Appointment',
  canonicalUrl: 'https://spacesandplaces.com.pk/contact',
  ogImage: '/uploads/living-eye-level.jpg',
  indexRobots: true,
  hero: {
    badge: 'CONNECT WITH US',
    title: 'LET\'S DISCUSS YOUR NEXT ARCHITECTURAL MASTERPIECE',
    subtitle: 'Our studio is ready to translate your ambitions into inspiring physical spaces. Reach out by phone, WhatsApp, or schedule an in-person consultation.',
    bgImage: '/uploads/living-eye-level.jpg',
    ctaText: 'CALL +92 300 1999967',
    ctaLink: 'tel:+923001999967'
  },
  overview: {
    badge: 'VISIT OUR STUDIO',
    title: 'Experience Material Swatches, 3D Walkthroughs & Design Consultations',
    subtitle: 'Conveniently located in Lahore with private meeting lounges for residential and commercial client consultations.',
    paragraph1: 'Whether you are constructing a new 1-Kanal villa in DHA, renovating an executive corporate floor in Gulberg, or looking for bespoke furniture, our senior principals are available to provide direct technical input.',
    paragraph2: 'Fill out our inquiry form or give us a direct call. We respond to all inquiries within 24 business hours with initial project scope evaluations and consultation timings.',
    highlights: [
      'Direct Access to Principal Architects & Interior Leads',
      'Comprehensive Initial Feasibility & Cost Assessment',
      'Sample Library with Hundreds of Imported & Local Finishes',
      'Virtual Zoom Consultations Available for Overseas Pakistanis'
    ],
    image: '/uploads/01-01-8.jpg'
  },
  sections: [
    {
      id: 'contact-details',
      title: 'Studio Coordinates',
      subtitle: 'Direct Communication Channels',
      description: 'Reach our customer service and architectural team via our direct hotline or digital channels.',
      icon: 'PhoneCall',
      image: '/uploads/01-04-9.jpg',
      points: [
        'Direct Phone: +92 300 1999967',
        'WhatsApp: +92 300 1999967',
        'Email: info@spacesandplaces.com.pk',
        'Operating Hours: Monday – Saturday (9:00 AM – 7:00 PM PKT)'
      ]
    }
  ],
  faqs: [
    {
      question: 'How do I prepare for our first consultation meeting?',
      answer: 'Bringing plot dimensions, society bylaws (DHA/Bahria/LDA), architectural references, or mood board images you love is very helpful.'
    },
    {
      question: 'Do you work with overseas Pakistani clients?',
      answer: 'Extensively! A large percentage of our high-end residential villas are commissioned by overseas Pakistanis in the UK, USA, UAE, and Canada. We provide weekly video progress updates, digital approvals, and complete transparency.'
    }
  ],
  gallery: [],
  cta: {
    title: 'Ready for Immediate Assistance?',
    subtitle: 'Give us a call directly at +92 300 1999967 to speak with our lead architect.',
    buttonText: 'CALL NOW',
    buttonLink: 'tel:+923001999967'
  }
});

// 5. Privacy Policy (AdSense Compliant)
pages.push({
  slug: 'privacy-policy',
  title: 'Privacy Policy',
  category: 'legal',
  metaTitle: 'Privacy Policy | Spaces & Places Lahore',
  metaDescription: 'Official Privacy Policy of Spaces & Places. Details cookie usage, Google AdSense, DoubleClick DART cookies, analytics data handling, and GDPR/CCPA user rights.',
  focusKeywords: 'Spaces and Places Privacy Policy, AdSense Cookie Disclosure, Website Privacy',
  canonicalUrl: 'https://spacesandplaces.com.pk/privacy-policy',
  ogImage: '/uploads/01-01-8.jpg',
  indexRobots: true,
  hero: {
    badge: 'TRANSPARENCY & DATA PROTECTION',
    title: 'PRIVACY POLICY & COOKIE DISCLOSURE',
    subtitle: 'Your privacy is paramount. Read our comprehensive data processing, cookie policies, and Google AdSense compliance terms.',
    bgImage: '/uploads/01-01-8.jpg',
    ctaText: 'BACK TO HOME',
    ctaLink: '/'
  },
  overview: {
    badge: 'POLICY OVERVIEW',
    title: 'Our Commitment to Protecting Your Personal Information',
    subtitle: 'Effective Date: January 1, 2026 | Last Updated: September 10, 2026',
    paragraph1: 'At Spaces & Places (accessible from our official web domain), one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Spaces & Places and how we use it.',
    paragraph2: 'If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at info@spacesandplaces.com.pk.',
    highlights: [
      'Full AdSense & DoubleClick DART Cookie Compliance',
      'Strict Adherence to GDPR and CCPA Data Privacy Rights',
      'No Sharing or Selling of Personal Inquiries to Third Parties',
      'Encrypted SSL Transmission Across All Web Interactions'
    ],
    image: '/uploads/01-08-6.jpg'
  },
  sections: [
    {
      id: 'privacy-cookies',
      title: 'Cookies and Web Beacons',
      subtitle: 'Advertising & Analytics Technologies',
      description: 'Like any other website, Spaces & Places uses "cookies". These cookies are used to store information including visitors\' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users\' experience by customizing our web page content based on visitors\' browser type and other information.',
      icon: 'ShieldCheck',
      points: [
        'Google is a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet.',
        'Visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at https://policies.google.com/technologies/ads',
        'Some of our advertising partners may also use cookies and web beacons. Our advertising partners include Google AdSense.'
      ]
    },
    {
      id: 'privacy-gdpr',
      title: 'GDPR & CCPA Privacy Rights',
      subtitle: 'User Data Autonomy',
      description: 'We want to make sure you are fully aware of all of your data protection rights under international data protection regulations.',
      icon: 'Lock',
      points: [
        'The right to access – You have the right to request copies of your personal data.',
        'The right to rectification – You have the right to request that we correct any information you believe is inaccurate.',
        'The right to erasure – You have the right to request that we erase your personal data, under certain conditions.',
        'The right to opt-out of personal information sale (CCPA).'
      ]
    }
  ],
  faqs: [],
  gallery: [],
  cta: {
    title: 'Questions Regarding Your Personal Data?',
    subtitle: 'Reach out to our Data Privacy Officer at privacy@spacesandplaces.com.pk.',
    buttonText: 'CONTACT PRIVACY DESK',
    buttonLink: '/contact'
  }
});

// 6. Terms & Conditions
pages.push({
  slug: 'terms-conditions',
  title: 'Terms & Conditions',
  category: 'legal',
  metaTitle: 'Terms & Conditions | Spaces & Places Architecture Studio',
  metaDescription: 'Terms and conditions governing the use of Spaces & Places website, architectural consulting agreements, and construction quotation frameworks.',
  focusKeywords: 'Terms of Service Spaces and Places, Architecture Contract Terms',
  canonicalUrl: 'https://spacesandplaces.com.pk/terms-conditions',
  ogImage: '/uploads/01-01-8.jpg',
  indexRobots: true,
  hero: {
    badge: 'LEGAL FRAMEWORK',
    title: 'TERMS OF USE & SERVICE AGREEMENTS',
    subtitle: 'Please review the standard terms governing your access to our online platform and architectural consulting services.',
    bgImage: '/uploads/01-01-8.jpg',
    ctaText: 'CONTACT LEGAL',
    ctaLink: '/contact'
  },
  overview: {
    badge: 'TERMS OVERVIEW',
    title: 'Guidelines for Using Our Architectural Platform',
    subtitle: 'Clear terms designed to protect both clients and our design practice.',
    paragraph1: 'By accessing this website, you accept these terms and conditions in full. Do not continue to use Spaces & Places if you do not agree to take all of the terms and conditions stated on this page.',
    paragraph2: 'All intellectual property rights for architectural drawings, 3D renderings, floor plans, and photography showcased on this website are reserved by Spaces & Places.',
    highlights: [
      'All Architectural Renders & Photography Copyright Protected',
      'Quotations Valid for 30 Days from Issuance Date',
      'Bylaw Compliance Subject to Local Municipal Society Approval',
      'Standard Construction Milestones Governed by PEC Standards'
    ],
    image: '/uploads/01-09-5.jpg'
  },
  sections: [],
  faqs: [],
  gallery: [],
  cta: {
    title: 'Need a Formal Contract Review?',
    subtitle: 'Our legal and contract administration team is available to assist you.',
    buttonText: 'INQUIRE TODAY',
    buttonLink: '/contact'
  }
});

// 7. Disclaimer
pages.push({
  slug: 'disclaimer',
  title: 'Disclaimer',
  category: 'legal',
  metaTitle: 'Disclaimer | Spaces & Places Lahore',
  metaDescription: 'Official architectural, engineering, and construction advisory disclaimer for Spaces & Places.',
  focusKeywords: 'Spaces and Places Disclaimer, Architectural Advisory Notice',
  canonicalUrl: 'https://spacesandplaces.com.pk/disclaimer',
  ogImage: '/uploads/01-01-8.jpg',
  indexRobots: true,
  hero: {
    badge: 'IMPORTANT NOTICE',
    title: 'PROFESSIONAL DISCLAIMER & ADVISORY',
    subtitle: 'Important disclosures regarding architectural representations, cost estimates, and structural specifications.',
    bgImage: '/uploads/01-01-8.jpg',
    ctaText: 'BACK TO HOME',
    ctaLink: '/'
  },
  overview: {
    badge: 'LEGAL NOTICE',
    title: 'Accuracy of Architectural Renderings & Quotations',
    subtitle: 'Information provided on this website is for general informational and conceptual guidance.',
    paragraph1: 'While Spaces & Places strives for 100% accuracy in all published materials, construction costs and timelines fluctuate based on soil conditions, society bylaws, inflation, and material availability.',
    paragraph2: 'Formal structural integrity calculations and electrical/plumbing designs require signed contracts and site-specific soil testing reports before physical execution.',
    highlights: [
      '3D Renderings are Artistic Concepts Subject to Field Conditions',
      'BOQ Estimates Subject to Site Specific Survey & Soil Tests',
      'Society Approvals are Granted Exclusively by Respective Authorities'
    ],
    image: '/uploads/01-10-4.jpg'
  },
  sections: [],
  faqs: [],
  gallery: [],
  cta: {
    title: 'Request a Site-Specific Evaluation',
    subtitle: 'Book our senior civil and architectural engineers for an on-site inspection.',
    buttonText: 'BOOK SITE SURVEY',
    buttonLink: '/contact'
  }
});

// Dropdown subpages definitions
const subpagesData = [
  // 1. Interior Design (8 pages)
  {
    slug: 'residential-interior',
    title: 'Residential Interior',
    cat: 'interior-design',
    hero: 'LUXURY RESIDENTIAL INTERIOR DESIGN IN LAHORE',
    sub: 'Creating serene, opulent, and functionally optimized homes that reflect your family\'s personality and refined taste.',
    img: '/uploads/01-01-8.jpg'
  },
  {
    slug: 'corporate-interior',
    title: 'Corporate Interior',
    cat: 'interior-design',
    hero: 'EXECUTIVE CORPORATE INTERIORS IN LAHORE',
    sub: 'Designing intelligent corporate environments that stimulate innovation, impress global clients, and enhance workforce productivity.',
    img: '/uploads/01-03-7.jpg'
  },
  {
    slug: 'commercial-interior',
    title: 'Commercial Interior',
    cat: 'interior-design',
    hero: 'HIGH-IMPACT COMMERCIAL INTERIORS IN LAHORE',
    sub: 'Strategic retail and commercial space architecture engineered to captivate shoppers, amplify brand identity, and maximize profitability.',
    img: '/uploads/Display-9.jpg'
  },
  {
    slug: 'hospitality-interior',
    title: 'Hospitality Interior',
    cat: 'interior-design',
    hero: 'BESPOKE HOSPITALITY INTERIORS IN LAHORE',
    sub: 'Elevating guest journeys through sensory design, opulent textures, and unforgettable hospitality environments.',
    img: '/uploads/01-02-10.jpg'
  },
  {
    slug: 'restaurant-design',
    title: 'Restaurant Design',
    cat: 'interior-design',
    hero: 'IMMERSIVE RESTAURANT & CAFE DESIGN IN LAHORE',
    sub: 'Crafting vibrant culinary destinations where exquisite gastronomy meets unforgettable architectural atmosphere.',
    img: '/uploads/01-01-9.jpg'
  },
  {
    slug: 'industrial-design',
    title: 'Industrial Design',
    cat: 'interior-design',
    hero: 'REFINED INDUSTRIAL DESIGN IN LAHORE',
    sub: 'Balancing raw structural honesty with refined contemporary comforts for modern offices, creative studios, and industrial headquarters.',
    img: '/uploads/01-06-7.jpg'
  },
  {
    slug: 'corporate-design',
    title: 'Corporate Design',
    cat: 'interior-design',
    hero: 'STRATEGIC CORPORATE DESIGN IN LAHORE',
    sub: 'Aligning corporate architectural spaces with brand culture, organizational agility, and talent recruitment prestige.',
    img: '/uploads/01-03-8.jpg'
  },
  {
    slug: 'interior-furnishings',
    title: 'Interior Furnishings',
    cat: 'interior-design',
    hero: 'LUXURY INTERIOR FURNISHINGS IN LAHORE',
    sub: 'The finishing touch of perfection: curated fabrics, imported wall coverings, sculptural lighting, and handcrafted artisan accessories.',
    img: '/uploads/01-05-6.jpg'
  },

  // 2. Architectural Designs (7 pages)
  {
    slug: 'architectural-residential-planning',
    title: 'Architectural Residential Planning',
    cat: 'architectural-designs',
    hero: 'ARCHITECTURAL RESIDENTIAL PLANNING IN LAHORE',
    sub: 'Designing intelligent, climate-responsive, and spatially luxurious residential blueprints compliant with all local building authorities.',
    img: '/uploads/01-04-8.jpg'
  },
  {
    slug: '3d-architectural-design-lahore',
    title: '3D Architectural Design Lahore',
    cat: 'architectural-designs',
    hero: 'HYPER-REALISTIC 3D ARCHITECTURAL DESIGN LAHORE',
    sub: 'Visualize every architectural curve, lighting condition, and material texture with cinematic 3D realism.',
    img: '/uploads/01-03-7.jpg'
  },
  {
    slug: 'space-planning-services-lahore',
    title: 'Space Planning Services Lahore',
    cat: 'architectural-designs',
    hero: 'OPTIMIZED SPACE PLANNING SERVICES IN LAHORE',
    sub: 'Eliminating wasted square footage through scientific circulation analysis, ergonomic furniture spacing, and natural light optimization.',
    img: '/uploads/01-06-6.jpg'
  },
  {
    slug: 'architectural-animation-services-lahore',
    title: 'Architectural Animation Services Lahore',
    cat: 'architectural-designs',
    hero: 'CINEMATIC ARCHITECTURAL ANIMATION SERVICES',
    sub: 'Bring architectural concepts to vibrant life with 4K motion graphics, dynamic drone perspectives, and photorealistic ambient sounds.',
    img: '/uploads/01-08-6.jpg'
  },
  {
    slug: 'landscape-design',
    title: 'Landscape Design',
    cat: 'architectural-designs',
    hero: 'LUXURY LANDSCAPE ARCHITECTURE IN LAHORE',
    sub: 'Harmonizing outdoor living with indigenous flora, architectural hardscapes, ambient illumination, and private water sanctuaries.',
    img: '/uploads/01-09-5.jpg'
  },
  {
    slug: 'facade-elevation-design',
    title: 'Facade / Elevation Design',
    cat: 'architectural-designs',
    hero: 'STUNNING FACADE & ELEVATION DESIGN IN LAHORE',
    sub: 'Making unforgettable architectural statements with geometrically bold, material-rich exterior front elevations.',
    img: '/uploads/01-10-4.jpg'
  },
  {
    slug: 'midrise-highrise-planning',
    title: 'Midrise / Highrise Planning',
    cat: 'architectural-designs',
    hero: 'MIDRISE & HIGHRISE ARCHITECTURAL PLANNING',
    sub: 'Engineering high-density commercial towers and residential complexes with structural mastery, wind load analysis, and seismic safety.',
    img: '/uploads/01-04-8.jpg'
  },

  // 3. Construction Services (4 pages)
  {
    slug: 'refurbishment-services-in-lahore',
    title: 'Refurbishment Services in Lahore',
    cat: 'construction-services',
    hero: 'HOME & COMMERCIAL REFURBISHMENT IN LAHORE',
    sub: 'Breathing vibrant new life into aging structures through structural reinforcement, spatial reconfiguration, and modern luxury finishes.',
    img: '/uploads/01-01-8.jpg'
  },
  {
    slug: 'project-management-in-lahore',
    title: 'Project Management in Lahore',
    cat: 'construction-services',
    hero: 'EXPERT CONSTRUCTION PROJECT MANAGEMENT IN LAHORE',
    sub: 'Eliminating cost overruns and delays with rigorous on-site supervision, milestone tracking, and quality assurance protocols.',
    img: '/uploads/01-02-9.jpg'
  },
  {
    slug: 'contract-administration-services-lahore',
    title: 'Contract Administration Services Lahore',
    cat: 'construction-services',
    hero: 'CONTRACT ADMINISTRATION SERVICES IN LAHORE',
    sub: 'Protecting your financial investment with transparent contractor agreements, BOQ verification, and interim payment certifications.',
    img: '/uploads/01-03-7.jpg'
  },
  {
    slug: 'full-scale-construction-company-in-lahore',
    title: 'Full Scale Construction Company in Lahore',
    cat: 'construction-services',
    hero: 'FULL SCALE TURNKEY CONSTRUCTION IN LAHORE',
    sub: 'Constructing enduring residential and commercial monuments from excavation to final coat of paint with ironclad guarantees.',
    img: '/uploads/01-04-8.jpg'
  },

  // 4. Furniture (4 pages)
  {
    slug: 'residential-furniture',
    title: 'Residential Furniture',
    cat: 'furniture',
    hero: 'HANDCRAFTED RESIDENTIAL FURNITURE IN LAHORE',
    sub: 'Bespoke artisan furniture designed to harmonize perfectly with your home\'s architectural interior layout.',
    img: '/uploads/01-05-6.jpg'
  },
  {
    slug: 'customized-furniture',
    title: 'Customized Furniture',
    cat: 'furniture',
    hero: 'BESPOKE CUSTOMIZED FURNITURE IN LAHORE',
    sub: 'Every home has unique dimensions. We build one-of-a-kind furniture pieces tailored precisely to your spatial specifications.',
    img: '/uploads/01-06-6.jpg'
  },
  {
    slug: 'commercial-furniture',
    title: 'Commercial Furniture',
    cat: 'furniture',
    hero: 'DURABLE COMMERCIAL FURNITURE IN LAHORE',
    sub: 'High-durability, ergonomically certified commercial furniture built to withstand rigorous corporate and retail usage.',
    img: '/uploads/01-02-10.jpg'
  },
  {
    slug: 'decor',
    title: 'Decor',
    cat: 'furniture',
    hero: 'CURATED LUXURY HOME DECOR IN LAHORE',
    sub: 'Infusing personality and refined taste into your rooms with statement mirrors, artisan sculptures, and ambient lighting.',
    img: '/uploads/01-08-6.jpg'
  }
];

subpagesData.forEach(sub => {
  pages.push({
    slug: sub.slug,
    title: sub.title,
    category: sub.cat,
    metaTitle: sub.title + ' in Lahore | Spaces & Places Architecture & Interiors',
    metaDescription: 'Premier ' + sub.title + ' in Lahore by Spaces & Places. Exceptional craftsmanship, modern architectural precision, and turnkey delivery.',
    focusKeywords: sub.title + ' Lahore, Spaces and Places, Architecture Lahore, Luxury Interiors Pakistan',
    canonicalUrl: 'https://spacesandplaces.com.pk/' + sub.slug,
    ogImage: sub.img,
    indexRobots: true,
    hero: {
      badge: 'SPACES & PLACES EXPERTISE',
      title: sub.hero,
      subtitle: sub.sub,
      bgImage: sub.img,
      ctaText: 'REQUEST CONSULTATION',
      ctaLink: '/contact'
    },
    overview: {
      badge: 'CRAFTSMANSHIP & INNOVATION',
      title: 'Mastering ' + sub.title + ' in Lahore',
      subtitle: 'Precision engineering, certified materials, and distinctive luxury design.',
      paragraph1: 'At Spaces & Places, our specialized ' + sub.title + ' studio combines innovative design techniques with meticulous attention to detail. Every project is tailored to the client\'s exact spatial dimensions and lifestyle requirements.',
      paragraph2: 'We utilize state-of-the-art materials, environmental sustainability principles, and master artisan execution to ensure your space stands the test of time.',
      highlights: [
        'Dedicated Senior Architectural & Design Oversight',
        'Custom 2D/3D Concept Proposals Prior to Execution',
        'Transparent BOQs with Zero Unforeseen Cost Surprises',
        'Strict Adherence to International Quality & Safety Standards'
      ],
      image: sub.img
    },
    sections: [
      {
        id: 'service-deliverables',
        title: 'Key Capabilities & Deliverables',
        subtitle: 'Uncompromising Quality and Care',
        description: 'Our comprehensive workflow guarantees that each phase of your project is delivered with perfection.',
        icon: 'Layers',
        image: sub.img,
        points: [
          'Initial Site Inspection & Spatial Diagnostic',
          'Detailed CAD Working Blueprints & 3D Visual Renderings',
          'Material Sourcing from Certified Tier-1 Manufacturers',
          'Turnkey On-Site Execution and Final Handover'
        ]
      },
      {
        id: 'service-materials',
        title: 'Premium Materials & Finishes',
        subtitle: 'Built for Longevity and Distinction',
        description: 'We source only certified hardwoods, anti-corrosion metals, high-grade stones, and European fittings.',
        icon: 'Sparkles',
        image: '/uploads/01-01-8.jpg',
        points: [
          'Kiln-Dried Hardwoods & Luxury Veneers',
          'PVD Titanium Gold & Matte Black Hardware',
          'Eco-Friendly Low VOC Finishing Stains',
          'Pressure Tested Plumbing & High-Amp Wiring'
        ]
      }
    ],
    faqs: [
      {
        question: 'How do I start a ' + sub.title + ' project with Spaces & Places?',
        answer: 'You can reach out via our contact form or call +92 300 1999967. We will arrange a discovery meeting to review your plot, floor plan, or room requirements and prepare a custom proposal.'
      },
      {
        question: 'Do you provide on-site supervision during execution?',
        answer: 'Yes! All our projects include dedicated project managers and site engineers who oversee daily progress, quality control, and contractor coordination.'
      }
    ],
    gallery: [
      { title: sub.title + ' - Project View 1', image: sub.img, category: sub.cat, alt: sub.title },
      { title: sub.title + ' - Architectural Detail', image: '/uploads/01-02-9.jpg', category: sub.cat, alt: sub.title }
    ],
    cta: {
      title: 'Ready to Transform Your Space with ' + sub.title + '?',
      subtitle: 'Schedule a discovery session with our expert architects and designers today.',
      buttonText: 'BOOK A CONSULTATION',
      buttonLink: '/contact'
    }
  });
});

fs.writeFileSync(path.join(dataDir, 'defaultPages.json'), JSON.stringify(pages, null, 2));
console.log('Successfully generated defaultPages.json with ' + pages.length + ' complete pages!');
