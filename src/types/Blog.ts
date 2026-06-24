export interface BlogSection {
  sectionTitle: string;
  text: string;
}

export interface Blog {
  slug: string;
  title: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  summary: string;
  content: BlogSection[];
}
