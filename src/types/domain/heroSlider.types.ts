export type HeroSlide = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  order: number;
  imageUrl: string;
  alt: string;
};

export type HeroSlides = HeroSlide[];

export interface HeroSliderProps {
  slides?: HeroSlides;
  fallbackImage?: string;
  fallbackAlt?: string;
  autoplay?: boolean;
  autoplayMs?: number;
}
