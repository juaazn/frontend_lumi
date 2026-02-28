<script lang="ts">
  import SliderButton from "../ui/interactive/SliderButton.svelte";
  import type { HeroSlides } from "../../types/domain/heroSlider.types";
  import imageGeneric from "../../assets/image_generic.png";

  export let slides: HeroSlides = [];
  export let fallbackImage = "" + imageGeneric;
  export let fallbackAlt = "Error al cargar la imagen del slider, se cargará una imagen genérica";

  let currentIndex = 0;

  $: hasSlides = slides.length > 0;
  $: if (hasSlides && currentIndex >= slides.length) {
    currentIndex = 0;
  }
  $: currentSlide = hasSlides ? slides[currentIndex] : null;

  function handlePrev() {
    if (!hasSlides) return;
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  }

  function handleNext() {
    if (!hasSlides) return;
    currentIndex = (currentIndex + 1) % slides.length;
  }
</script>

<article class="hero">
  <div class="hero_container_banner">
    <img
      src={currentSlide?.imageUrl || fallbackImage}
      alt={currentSlide?.alt || fallbackAlt}
      class="hero_banner"
    />
  </div>
  <h1 class="hero_name_product_title">{currentSlide?.title ?? ""}</h1>
  <h2 class="hero_subtitle">{currentSlide?.subtitle ?? ""}</h2>
  <div class="hero_description_product">
    <strong><p class="hero_description">{currentSlide?.description ?? ""}</p></strong>
  </div>
</article>

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
    margin: 0 auto;
    width: 90vw;
    display: flex;
    justify-content: left;
    gap: 10rem;
    margin-top: 1rem;
  }
</style>
