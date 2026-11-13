import { ServicePageContent } from '../../../shared/components/service-page/service-page.model';

/**
 * Land Development service page content.
 *
 * Sources: the RCE Employee Training Manual (services, workflow, QA/QC) and RCE
 * project records (project types and jurisdictions). Reviewed Nov 2026.
 * Jurisdictions and project types are only listed where project records support
 * them; see the internal content audit for the evidence behind each entry.
 */
export const LAND_DEVELOPMENT_CONTENT: ServicePageContent = {
  id: 'land-development',
  theme: {
    accent: '#1e3a8a',
    accentDark: '#1e40af',
    accentRgb: '30, 58, 138',
    texture: '/assets/generated-images/bg_texture_land.png',
    heroClass: 'land-development-theme',
  },

  hero: {
    title: 'Land Development Engineering',
    subtitle: 'We Move Projects from Concept to Construction — Efficiently.',
    subtitleIcon: { src: 'assets/home icons/construction.svg', alt: 'Construction' },
    description:
      "Land development is not just design — it's entitlement navigation, risk management, and execution. " +
      'We understand the regulatory landscape in Texas and structure every project to move through review agencies with clarity and purpose.',
    image: { src: 'assets/land v3.png', alt: 'Illustration of a land development site' },
  },

  intro: {
    icon: '✓',
    title: 'We Design With Approval in Mind',
    text:
      "Plans are prepared for constructability and to the reviewing agency's criteria. " +
      'Common review items are addressed before submittal to reduce review cycles.',
    points: [
      'Drainage & stormwater compliance',
      'Site grading optimization',
      'Utility coordination',
      'Permit-ready construction documents',
      'Engineering reports with documented calculations',
    ],
  },

  contextImage: { src: 'assets/generated-images/land_development.png', alt: 'Illustration of site grading equipment' },

  approach: {
    title: 'Our Approach',
    items: [
      {
        label: 'Jurisdictional Criteria',
        text: 'Working knowledge of Texas jurisdictions and their criteria helps avoid surprises in review. We flag permitting risks early to protect your schedule and budget.',
      },
      {
        label: 'Responsive Coordination',
        text: 'Coordination with the owner, architect, surveyor, and reviewing agencies throughout design.',
      },
      {
        label: 'Constructability Review',
        text: 'Grading, utility, and drainage conflicts are checked across sheets before plans are issued.',
      },
      {
        label: 'Project Engineer Coordination',
        text: "A designated project engineer manages day-to-day coordination; plans are checked under RCE's QA/QC procedure before submittal.",
      },
    ],
  },

  projectTypes: {
    title: 'Project Types We Serve',
    items: [
      { icon: '🏘️', label: 'Residential Subdivisions', note: 'Austin · San Antonio · Travis County' },
      { icon: '🏢', label: 'Multifamily & Townhomes', note: 'Austin · Leander · Cedar Park · San Antonio' },
      { icon: '⛽', label: 'Convenience Stores & Fuel Stations', note: 'Schertz · Converse · Round Rock' },
      { icon: '🍽️', label: 'Restaurants & Drive-Thrus', note: 'San Antonio · Seguin · Kenedy · Floresville' },
      { icon: '🏬', label: 'Commercial & Retail Centers', note: 'Porter · Leander · Cedar Park · Liberty Hill' },
      { icon: '🏗️', label: 'Office & Business Parks', note: 'Cedar Park' },
    ],
  },

  coreServices: {
    title: 'Core Services',
    columns: [
      {
        title: 'Design & Analysis',
        items: [
          'Preliminary Engineering & Site Feasibility',
          'Site Due Diligence & Constraints Analysis',
          'Conceptual Site Planning & Layout',
          'Preliminary Grading & Drainage',
          'Utility Availability & Infrastructure Assessment',
          'Civil Site Design & Engineering',
        ],
      },
      {
        title: 'Engineering',
        items: [
          'Digital Terrain Modeling (DTM)',
          'Grading & Drainage Systems',
          'Water, Wastewater & Fire Line Design',
          'Paving & Access Management',
        ],
      },
      {
        title: 'Entitlements & Construction Support',
        items: [
          'Rezoning & Special Use Permits',
          'Platting & Subdivision Plats',
          'Site Development Permits',
          'Construction RFIs & Site Visits',
        ],
      },
    ],
  },

  tools: {
    title: 'Tools & Standards',
    intro: 'Software, data sources, and checklists used in design',
    items: [
      { icon: '📐', title: 'Civil 3D', text: 'Surface & grading models' },
      { icon: '🗺️', title: 'GIS & FEMA Data', text: 'Floodplain and site constraint mapping' },
      { icon: '✅', title: 'QA/QC Checklists', text: 'Project-type checks before submittal' },
    ],
  },

  process: {
    title: 'Project Process',
    steps: [
      { label: 'Feasibility', text: 'Site data collection, constraints review, and preliminary analysis' },
      { label: 'Design', text: 'Grading, drainage, and utility design with plan production' },
      { label: 'Permitting', text: 'Agency submittals, comment responses, and approval tracking' },
      { label: 'Support', text: 'Construction-phase RFIs, clarifications, and site observation visits' },
    ],
  },

  quality: {
    title: 'Quality & Accountability',
    items: [
      {
        label: 'Internal Review',
        text: 'Plan sets are self-checked and peer-reviewed; Engineer of Record approval is required before sealing.',
      },
      { label: 'Conflict Checking', text: 'Utility, drainage, and grading conflicts are identified and resolved during design.' },
      { label: 'Documented Deliverables', text: 'Every report and plan set documents its criteria, methods, and assumptions.' },
      { label: 'Direct Engineering Contact', text: 'Clients work directly with the project engineer responsible for the design.' },
    ],
  },

  commitment: {
    title: 'Our Commitment to You',
    columns: [
      {
        title: 'Schedule Focus',
        items: ['Early identification of review issues', 'Documented RFI responses', 'Project phasing and sequencing', 'Milestone-based schedule'],
      },
      {
        title: 'Technical Precision',
        items: [
          'QA/QC-checked earthwork models',
          'Designs to applicable codes and criteria',
          'Jurisdiction-specific criteria applied',
          'Documented QA/QC procedures',
        ],
      },
      {
        title: 'Owner Interests',
        items: [
          'Site layouts that support the development program',
          'Early identification of site constraints and risks',
          'Prompt notice of scope or schedule impacts',
          'Easements and access for long-term maintenance',
        ],
      },
    ],
  },

  expertise: {
    title: 'Regulatory & Technical Expertise',
    standards: {
      title: 'Design Standards',
      items: [
        'AutoCAD Civil 3D',
        'Digital Terrain Modeling (DTM)',
        'City & County Criteria Manuals',
        'ADA / TAS Accessibility Rules',
        'TPDES Stormwater Compliance',
      ],
    },
    jurisdictions: {
      title: 'Jurisdictions Served',
      columns: [
        [
          { region: 'San Antonio Area', text: 'San Antonio, Schertz, Converse, Seguin, Floresville, Kenedy' },
          { region: 'Austin Area', text: 'Austin, Cedar Park, Leander, Round Rock, Liberty Hill, Travis County' },
          { region: 'Hill Country', text: 'Burnet, Comal & Hays Counties' },
        ],
        [
          { region: 'Houston Area', text: 'Houston (Harris County), Porter (Montgomery County)' },
          { region: 'Dallas / Fort Worth Area', text: 'Fort Worth (Tarrant County), Greenville (Hunt County)' },
          { text: 'TxDOT Access & Driveway Permits' },
          { text: 'TCEQ Compliance' },
        ],
      ],
    },
  },

  cta: {
    text: 'Planning a site? Start with a feasibility review.',
    primary: { label: 'Request a Feasibility Review', link: '/contact' },
    secondary: { label: 'Talk to an Engineer', link: '/contact' },
  },
};
