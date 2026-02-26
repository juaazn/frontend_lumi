import type { HomePage, HomeApiResponse } from './home.types';
import { fetchStrapiData } from '../../services/strapi.service';
import { mapHomePage } from './home.mapper';

export async function getHome(): Promise<HomePage> {
  const response: HomeApiResponse = await fetchStrapiData('/home-page?populate=*');
  return mapHomePage(response);
}
