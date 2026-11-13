export interface Service {
  id: string;
  title: string;
  icon: string;
  iconSubtle?: string;
  description: string;
  timeline: { phase: string; description: string }[];
  solutions: string[];
  strategies: string[];
}
