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
  image_slide: HeroImageApi | null;
}

export interface HeroImageApi {
  id: number;
  url: string;
  alternativeText?: string | null;
  formats?: HeroImageFormats | null;
}

export interface HeroImageFormats {
  thumbnail?: HeroImageFormat;
  small?: HeroImageFormat;
  medium?: HeroImageFormat;
  large?: HeroImageFormat;
}

export interface HeroImageFormat {
  url: string;
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

export type ImageSize = "thumbnail" | "small" | "medium" | "large" | "original";