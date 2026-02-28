export interface HeroSlideApiResponse {
  data: HeroSlideApi[];
}

export interface HeroSlideApi {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  order: number;
  active: boolean;
  imageProduct: HeroImageApi[];
}

export interface HeroImageApi {
  id: number;
  url: string;
  alternativeText?: string | null;
  formats?: {
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
    thumbnail?: { url: string };
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

export type ImageSize = "small" | "medium" | "large" | "thumbnail" | "original";
