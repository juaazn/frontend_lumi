import type { 
  HeroSlide, 
  HeroSlideApiResponse, 
  ImageSize 
} from "./heroSlider.types";

export function mapHeroSlides(api: HeroSlideApiResponse, size: ImageSize = "small"): HeroSlide[] {
  const baseUrl = import.meta.env.STRAPI_URL;

  return api.data.map((slide) => {
    const image = slide.imageProduct?.[0];

    let imagePath = "";

    if (size === "original") {
      imagePath = image?.url ?? "";
    } else {
      imagePath =
        image?.formats?.[size]?.url ??
        image?.url ??
        "";
    }

    return {
      id: slide.id,
      title: slide.title ?? "",
      subtitle: slide.subtitle ?? "",
      description: slide.description ?? "",
      order: slide.order ?? 0,
      imageUrl: imagePath ? `${baseUrl}${imagePath}` : "",
      alt: image?.alternativeText ?? "",
    };
  });
}
