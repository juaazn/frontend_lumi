import type { HomeApiResponse, HomePage } from "../../../types/services/home.types";
import imagenAlternativa from "../../../assets/imagen_alternativa_principal.png";

export function mapHomePage (api: HomeApiResponse): HomePage {
  return {
    title: api.data?.title,
    imagenFondoHomePage: `${import.meta.env.STRAPI_URL}${api.data?.imagenFondoHomePage?.formats?.small?.url || imagenAlternativa}`,
    alternativeText: api.data?.imagenFondoHomePage?.alternativeText || 'Imagen principal'
  };
}
