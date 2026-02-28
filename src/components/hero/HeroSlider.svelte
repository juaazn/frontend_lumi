<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import SliderButton from "../ui/interactive/SliderButton.svelte";
  import type { HeroSlides } from "../../types/domain/heroSlider.types";

  export let slides: HeroSlides = [];
  export let fallbackImage = "";
  export let fallbackAlt = "Error al cargar la imagen del slider, se cargará una imagen genérica";
  export let autoplay = true;
  export let autoplayMs = 5000;

  let currentIndex = 0;
  let autoplayId: ReturnType<typeof setInterval> | undefined;

  $: hasSlides = slides.length > 0;
  $: if (hasSlides && currentIndex >= slides.length) {
    currentIndex = 0;
  }
  $: currentSlide = hasSlides ? slides[currentIndex] : null;

  onMount(() => {
    if (!autoplay || autoplayMs <= 0 || slides.length <= 1) return;

    autoplayId = setInterval(() => {
      if (slides.length <= 1) return;
      currentIndex = (currentIndex + 1) % slides.length;
    }, autoplayMs);
  });

  onDestroy(() => {
    if (!autoplayId) return;
    clearInterval(autoplayId);
    autoplayId = undefined;
  });

  function handlePrev() {
    if (!hasSlides) return;
    const nextIndex = (currentIndex - 1 + slides.length) % slides.length;
    currentIndex = nextIndex;
  }

  function handleNext() {
    if (!hasSlides) return;
    const nextIndex = (currentIndex + 1) % slides.length;
    currentIndex = nextIndex;
  }

  function goToSlide(index: number) {
    if (!hasSlides) return;
    currentIndex = index;
  }
</script>

<article class="hero">
  <div class="hero_container_banner">
    <img
      loading="lazy"
      src={currentSlide?.imageUrl || fallbackImage}
      alt={currentSlide?.alt || fallbackAlt}
      class="hero_banner"
    />
  </div>
  <h1 class="hero_name_product_title">{currentSlide?.title ?? ""}</h1>
  <h2 class="hero_subtitle">{currentSlide?.subtitle ?? ""}</h2>
  <div class="hero_description_product">
    <p class="hero_description">{currentSlide?.description ?? ""}</p>
  </div>
  <nav class="slider_interaction" aria-label="Controles del slider hero">
    <SliderButton
      props={{
        contentType: "img",
        imgSrc: "/icon_back_slider.svg",
        imgAlt: "Botón de retroceso",
        className: "button_primary",
        onClick: handlePrev,
        disabled: !hasSlides,
      }}
    />
    <div class="slider_indicators" aria-label="Indicadores de slide">
      {#each slides as _, index}
        <button
          type="button"
          class={`slider_indicator ${index === currentIndex ? "is-active" : ""}`.trim()}
          aria-label={`Ir al slide ${index + 1}`}
          aria-current={index === currentIndex ? "true" : undefined}
          on:click={() => goToSlide(index)}
          disabled={!hasSlides}
        ></button>
      {/each}
    </div>
    <SliderButton
      props={{
        contentType: "img",
        imgSrc: "/icon_next_slider.svg",
        imgAlt: "Botón de avance",
        className: "button_primary",
        onClick: handleNext,
        disabled: !hasSlides,
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
  }

  .hero_banner {
    width: 100%;
    height: 100%;
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
