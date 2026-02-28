import type {
  CreateSliderNavigationOptions,
  SliderNavigation,
} from "../../../types/domain/heroSlider.logic.types";

export function createSliderNavigation(options: CreateSliderNavigationOptions): SliderNavigation {
  let currentIndex = $state(0);

  const slideCount = $derived(options.getSlides().length);
  const hasSlides = $derived(slideCount > 0);
  const currentSlide = $derived(hasSlides ? options.getSlides()[currentIndex] : null);

  $effect(() => {
    if (!hasSlides) {
      if (currentIndex !== 0) currentIndex = 0;
      return;
    }

    if (currentIndex >= slideCount) {
      currentIndex = 0;
    }
  });

  function prev() {
    if (!hasSlides) return;
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
  }

  function next() {
    if (!hasSlides) return;
    currentIndex = (currentIndex + 1) % slideCount;
  }

  function goTo(index: number) {
    if (!hasSlides) return;
    const normalizedIndex = ((index % slideCount) + slideCount) % slideCount;
    currentIndex = normalizedIndex;
  }

  return {
    get currentIndex() {
      return currentIndex;
    },
    get slideCount() {
      return slideCount;
    },
    get hasSlides() {
      return hasSlides;
    },
    get currentSlide() {
      return currentSlide;
    },
    prev,
    next,
    goTo,
  };
}
