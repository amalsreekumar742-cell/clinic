export interface BeforeAfter {
  before: string;
  after: string;
}

export interface Testimonial {
  id: number;
  name: string;
  rating: number;
  condition: string;
  review: string;
  beforeAfter: BeforeAfter;
  location: string;
  videoUrl: string;
  hasVideo: boolean;
}

export interface SuccessMetric {
  value: string;
  label: string;
}
