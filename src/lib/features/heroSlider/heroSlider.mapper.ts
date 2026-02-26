import type { HeroSlide, HeroSlideApiResponse } from '../../../types/services/heroSlider.types';

export function mapHeroSlides(api: HeroSlideApiResponse): HeroSlide[] {
  return api.data.map((slide) => ({
    id: slide.id,
    title: slide.title,
    subtitle: slide.subtitle,
    description: slide.description,
    order: slide.order,
    imageUrl: slide.imageProduct?.url ?? "",
    alt: slide.imageProduct?.alternativeText ?? "",
  }));
}
