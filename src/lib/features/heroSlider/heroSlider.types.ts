export interface HeroSlideApiResponse {
  data: HeroSlideApi[];
}

export interface HeroSlideApi {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  order: number;
  imageProduct?: {
    url: string;
    alternativeText?: string;
  };
}

export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  order: number;
  imageUrl: string;
  alt: string;
}