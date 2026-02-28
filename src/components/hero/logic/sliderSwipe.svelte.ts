import type {
  CreateSliderSwipeOptions,
  SliderSwipe,
} from "../../../types/domain/heroSlider.logic.types";

export function createSliderSwipe(options: CreateSliderSwipeOptions): SliderSwipe {
  let touchStartX = $state(0);
  let touchStartY = $state(0);
  let touchDeltaX = $state(0);
  let touchDeltaY = $state(0);

  const minSwipeDistance = options.minSwipeDistance ?? 40;

  function resetTouch() {
    touchStartX = 0;
    touchStartY = 0;
    touchDeltaX = 0;
    touchDeltaY = 0;
  }

  function handleTouchStart(event: TouchEvent) {
    const touch = event.touches[0];
    if (!touch) return;

    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    touchDeltaX = 0;
    touchDeltaY = 0;
  }

  function handleTouchMove(event: TouchEvent) {
    const touch = event.touches[0];
    if (!touch) return;

    touchDeltaX = touch.clientX - touchStartX;
    touchDeltaY = touch.clientY - touchStartY;
  }

  function handleTouchEnd() {
    if (!options.canSwipe()) {
      resetTouch();
      return;
    }

    const isHorizontalSwipe = Math.abs(touchDeltaX) > Math.abs(touchDeltaY);
    const hasEnoughDistance = Math.abs(touchDeltaX) >= minSwipeDistance;
    if (!isHorizontalSwipe || !hasEnoughDistance) {
      resetTouch();
      return;
    }

    if (touchDeltaX > 0) {
      options.onSwipeRight();
      resetTouch();
      return;
    }

    options.onSwipeLeft();
    resetTouch();
  }

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
}
