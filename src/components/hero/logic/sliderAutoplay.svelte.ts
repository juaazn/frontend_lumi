import type {
  CreateSliderAutoplayOptions,
  SliderAutoplay,
} from "../../../types/domain/heroSlider.logic.types";

export function createSliderAutoplay(options: CreateSliderAutoplayOptions): SliderAutoplay {
  let restartToken = $state(0);

  function restart() {
    restartToken += 1;
  }

  $effect(() => {
    restartToken;

    const isEnabled = options.isEnabled();
    const delayMs = options.getDelayMs();
    const slideCount = options.getSlideCount();
    if (!isEnabled || delayMs <= 0 || slideCount <= 1) return;

    const autoplayId = setInterval(() => {
      if (options.getSlideCount() <= 1) return;
      options.onTick();
    }, delayMs);

    return () => {
      clearInterval(autoplayId);
    };
  });

  return {
    restart,
  };
}
