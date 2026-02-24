import type { HeroSlide, HeroSlideApiResponse } from './heroSlider.types';

export function mapHeroSlides(api: HeroSlideApiResponse): HeroSlide[] {
  return api.data.map((slide) => ({
    id: slide.id,
    title: slide.attributes.title,
    subtitle: slide.attributes.subtitle,
    description: slide.attributes.description,
    order: slide.attributes.order,
    imageUrl:
      slide.attributes.imageProduct?.data
        ? import.meta.env.STRAPI_URL +
          slide.attributes.imageProduct.data.attributes.url
        : "No Image",
    alt:
      slide.attributes.imageProduct?.data?.attributes.alternativeText ??
      "Image Product",
  }));
}