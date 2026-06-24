export interface Service {
  id: number;
  slug: string;
  title: string;
  iconName: string;
  shortDesc: string;
  longDesc: string;
  benefits: string[];
  duration: string;
  symptoms: string[];
  description?: string;
  image?: string;
}
