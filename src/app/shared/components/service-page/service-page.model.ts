/**
 * Content for one service page. Every service page uses the same template
 * (ServicePageComponent); a service supplies only this data.
 *
 * Content rule: every factual statement must be supported by the RCE Employee
 * Training Manual or by RCE project records. No guarantees of approvals,
 * review outcomes or timelines.
 */

/** Visual identity of a service: the only styling that differs between pages. */
export interface ServiceTheme {
  /** Accent colour, e.g. '#1e3a8a'. */
  accent: string;
  /** Second accent colour, used at the end of gradients. */
  accentDark: string;
  /** The accent colour as "r, g, b", for translucent shadows. */
  accentRgb: string;
  /** Background texture behind the Core Services section. */
  texture: string;
  /** Extra class on the hero section. */
  heroClass?: string;
}

export interface ServiceImage {
  src: string;
  /** Must describe the image accurately (illustrations are called illustrations). */
  alt: string;
}

export interface LabelledText {
  label: string;
  text: string;
}

export interface ListColumn {
  title: string;
  items: string[];
}

export interface ProjectType {
  icon: string;
  label: string;
  /** Real locations, each backed by an RCE project record. */
  note?: string;
}

export interface ToolItem {
  icon: string;
  title: string;
  text: string;
}

export interface JurisdictionItem {
  /** Highlighted region name, e.g. 'Austin Area'. Omit for a plain line. */
  region?: string;
  text: string;
}

export interface ServicePageContent {
  /** Matches the id used by the service HUD and navigator, e.g. 'land-development'. */
  id: string;
  theme: ServiceTheme;

  hero: {
    title: string;
    subtitle: string;
    subtitleIcon: ServiceImage;
    description: string;
    image: ServiceImage;
  };

  /** Intro band with a short statement and key points. */
  intro: {
    icon: string;
    title: string;
    text: string;
    points: string[];
  };

  contextImage?: ServiceImage;

  approach: { title: string; items: LabelledText[] };
  projectTypes: { title: string; items: ProjectType[] };
  coreServices: { title: string; columns: ListColumn[] };
  tools: { title: string; intro: string; items: ToolItem[] };
  process: { title: string; steps: LabelledText[] };
  quality: { title: string; items: LabelledText[] };
  commitment: { title: string; columns: ListColumn[] };

  expertise: {
    title: string;
    standards: ListColumn;
    jurisdictions: {
      title: string;
      /** Two columns of jurisdiction lines. */
      columns: JurisdictionItem[][];
    };
  };

  cta: {
    text: string;
    primary: { label: string; link: string };
    secondary: { label: string; link: string };
  };
}
