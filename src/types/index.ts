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
