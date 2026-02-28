<svelte:options runes={true} />
<script lang="ts">
  import SliderButton from "../ui/interactive/SliderButton.svelte";
  import { createSliderAutoplay } from "./logic/sliderAutoplay.svelte";
  import { createSliderNavigation } from "./logic/sliderNavigation.svelte";
  import { createSliderSwipe } from "./logic/sliderSwipe.svelte";
  import type { HeroSliderProps } from "../../types/domain/heroSlider.types";

  let {
    slides = [],
    fallbackImage = "",
    fallbackAlt = "Error al cargar la imagen del slider, se cargará una imagen genérica",
    autoplay = true,
    autoplayMs = 5000,
  }: HeroSliderProps = $props();

  const navigation = createSliderNavigation({
    getSlides: () => slides,
  });

  const autoplayController = createSliderAutoplay({
    isEnabled: () => autoplay,
    getDelayMs: () => autoplayMs,
    getSlideCount: () => navigation.slideCount,
    onTick: () => navigation.next(),
  });

  const swipe = createSliderSwipe({
    canSwipe: () => navigation.slideCount > 1,
    onSwipeLeft: () => {
      navigation.next();
      autoplayController.restart();
    },
    onSwipeRight: () => {
      navigation.prev();
      autoplayController.restart();
    },
  });

  const trackStyle = $derived(`transform: translateX(-${navigation.currentIndex * 100}%);`);

  function navigateWithAutoplayRestart(action: () => void) {
    action();
    autoplayController.restart();
  }
</script>

<article class="hero">
  <div
    role="region"
    aria-label="Imagen del slider hero" 
    class="hero_container_banner"
    ontouchstart={swipe.handleTouchStart}
    ontouchmove={swipe.handleTouchMove}
    ontouchend={swipe.handleTouchEnd}
    ontouchcancel={swipe.handleTouchEnd}
  >
    {#if navigation.hasSlides}
      <div class="hero_banner_track" style={trackStyle}>
        {#each slides as slide, index}
          <img
            loading={index === 0 ? "eager" : "lazy"}
            src={slide.imageUrl || fallbackImage}
            alt={slide.alt || fallbackAlt}
            class="hero_banner"
            aria-hidden={index !== navigation.currentIndex}
          />
        {/each}
      </div>
    {:else}
      <img loading="eager" src={fallbackImage} alt={fallbackAlt} class="hero_banner" />
    {/if}
  </div>
  <h1 class="hero_name_product_title">{navigation.currentSlide?.title ?? ""}</h1>
  <h2 class="hero_subtitle">{navigation.currentSlide?.subtitle ?? ""}</h2>
  <div class="hero_description_product">
    <p class="hero_description">{navigation.currentSlide?.description ?? ""}</p>
  </div>
  <nav class="slider_interaction" aria-label="Controles del slider hero">
    <SliderButton
      props={{
        contentType: "img",
        imgSrc: "/icon_back_slider.svg",
        imgAlt: "Botón de retroceso",
        className: "button_primary",
        onClick: () => navigateWithAutoplayRestart(navigation.prev),
        disabled: !navigation.hasSlides,
      }}
    />
    <div class="slider_indicators" aria-label="Indicadores de slide">
      {#each slides as _, index}
        <button
          type="button"
          class={`slider_indicator ${index === navigation.currentIndex ? "is-active" : ""}`.trim()}
          aria-label={`Ir al slide ${index + 1}`}
          aria-current={index === navigation.currentIndex ? "true" : undefined}
          onclick={() => navigateWithAutoplayRestart(() => navigation.goTo(index))}
          disabled={!navigation.hasSlides}
        ></button>
      {/each}
    </div>
    <SliderButton
      props={{
        contentType: "img",
        imgSrc: "/icon_next_slider.svg",
        imgAlt: "Botón de avance",
        className: "button_primary",
        onClick: () => navigateWithAutoplayRestart(navigation.next),
        disabled: !navigation.hasSlides,
      }}
    />
  </nav>
</article>

<style>
  .hero {
    margin: 0 auto;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    width: 90vw;
    display: flex;
    flex-direction: column;
  }

  .hero_name_product_title {
    margin: 0;
    font-family: var(--font-title);
    font-weight: var(--font-bold);
  }

  .hero_subtitle {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    font-family: var(--font-title);
    font-weight: var(--font-semibold);
  }

  .hero_description {
    margin: 0;
    font-family: var(--font-title);
    font-weight: var(--font-medium);
  }

  .hero_description_product {
    display: flex;
    gap: 0.5rem;
  }

  .hero_container_banner {
    width: 100%;
    height: 20rem;
    overflow: hidden;
    touch-action: pan-y;
    position: relative;
  }

  .hero_banner_track {
    width: 100%;
    height: 100%;
    display: flex;
    transition: transform 0.45s ease;
    will-change: transform;
  }

  .hero_banner {
    width: 100%;
    height: 100%;
    min-width: 100%;
    flex: 0 0 100%;
    object-fit: cover;
  }

  .slider_interaction {
    width: 70vw;
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .slider_indicator {
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 999px;
    border: 1px solid var(--color-black);
    background-color: transparent;
    cursor: pointer;
    margin: 0 0.2rem;

    transition:
      width 0.3s ease,
      background-color 0.3s ease,
      transform 0.2s ease;
  }

  .slider_indicator.is-active {
    width: 1.8rem;
    background-color: var(--color-black);
    animation: pulse 1s ease;
    transform: scale(1.05);
  }

  @media (prefers-reduced-motion: reduce) {
    .hero_banner_track {
      transition: none;
    }

    .slider_indicator {
      transition: none;
      width: 1.8rem;
      height: 0.35rem;
      border-radius: 999px;
    }

    .slider_indicator.is-active {
      transform: none;
    }
  }
</style>
