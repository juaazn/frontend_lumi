<script lang="ts">
import type { SliderButtonProps } from "../../../types/domain/sliderButton.types";

export let props: SliderButtonProps;
</script>

<button class={`slider_button ${props.className}`.trim()} on:click={props.onClick} disabled={props.disabled} type="button">
  {#if props.contentType === "text"}
    <span>{props.text}</span>
  {:else}
    <img src={props.imgSrc} alt={props.imgAlt} class="slider_button_image" />
  {/if}
</button>
