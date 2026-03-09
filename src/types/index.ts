export interface TextPart {
  style: "bold" | "none";
  text: string;
}

export interface CareerCard {
  imgurl: string;
  title: string;
  subtitle: string;
  datePeriod: string;
  techstack: string[];
  points: TextPart[][];
  logoColor: string;
  tier: "featured" | "compact";
}

export interface ProjectUrls {
  projectUrl: string;
  codeUrl: string;
}

export interface ProjectData {
  title: string;
  imgurl: string;
  urls: ProjectUrls;
  text: string;
  techstack: string[];
  tags: string[];
  featured?: boolean;
}

export interface TitleInfo {
  preamble: string;
  title: string;
  subtitle: string;
  texts: string[];
  description: string;
}

export interface ContactInfo extends TitleInfo {
  subject: string;
}

export interface ImpactMetric {
  value: string;
  label: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}
