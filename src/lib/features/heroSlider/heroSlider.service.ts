import qs from 'qs';
import type { HeroSlide, HeroSlideApiResponse } from './heroSlider.types';
import { fetchStrapiData } from '../../services/strapi.service';
import { mapHeroSlides } from './heroSlider.mapper';

export async function getHeroSlides(): Promise<HeroSlide[]> {
  const query = qs.stringify(
    {
      filters: {
        active: { $eq: true },
      },
      sort: ["order:asc"],
      fields: ["title", "subtitle", "description", "order"],
      populate: {
        imageProduct: {
          fields: ["url", "alternativeText"],
        },
      },
    },
    { encodeValuesOnly: true }
  );

  const response = await fetchStrapiData<HeroSlideApiResponse>(
    `/hero-slides?${query}`
  );

  return mapHeroSlides(response);
}
