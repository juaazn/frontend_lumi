import type { HeroSlides } from "./heroSlider.types";

export type CurrentSlide = HeroSlides[number] | null;

export interface SliderNavigation {
  readonly currentIndex: number;
  readonly slideCount: number;
  readonly hasSlides: boolean;
  readonly currentSlide: CurrentSlide;
  prev: () => void;
  next: () => void;
  goTo: (index: number) => void;
}

export interface CreateSliderNavigationOptions {
  getSlides: () => HeroSlides;
}

export interface SliderAutoplay {
  restart: () => void;
}

export interface CreateSliderAutoplayOptions {
  isEnabled: () => boolean;
  getDelayMs: () => number;
  getSlideCount: () => number;
  onTick: () => void;
}

export interface SliderSwipe {
  handleTouchStart: (event: TouchEvent) => void;
  handleTouchMove: (event: TouchEvent) => void;
  handleTouchEnd: () => void;
}

export interface CreateSliderSwipeOptions {
  canSwipe: () => boolean;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  minSwipeDistance?: number;
}
