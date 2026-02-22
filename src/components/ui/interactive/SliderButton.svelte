<script context="module" lang="ts">
  export type SliderButtonProps =
    | {
        contentType: "text";
        text: string;
        className?: string;
        disabled?: boolean;
        onClick?: () => void;
      }
    | {
        contentType: "img";
        imgSrc: string;
        imgAlt: string;
        className?: string;
        disabled?: boolean;
        onClick?: () => void;
      };
</script>

<script lang="ts">
  export let contentType: SliderButtonProps["contentType"];
  export let text: string | undefined = undefined;
  export let imgSrc: string | undefined = undefined;
  export let imgAlt = "";
  export let className = "";
  export let disabled = false;
  export let onClick: (() => void) | undefined = undefined;
</script>

<button class={`slider_button ${className}`.trim()} on:click={onClick} {disabled} type="button">
  {#if contentType === "text"}
    <span>{text}</span>
  {:else}
    <img src={imgSrc} alt={imgAlt} class="slider_button_image" />
  {/if}
</button>
