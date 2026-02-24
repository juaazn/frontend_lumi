export interface HeroSlideApiItem {
  id: number;
  attributes: {
    title: string;
    subtitle: string;
    description: string;
    order: number;
    active: boolean;
    imageProduct: {
      data: {
        attributes: {
          url: string;
          alternativeText: string | null;
        };
      } | null;
    };
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

export interface HeroSlideApiResponse {
  data: HeroSlideApiItem[];
}