// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import svelte from "@astrojs/svelte";

export default defineConfig({
  integrations: [svelte()],
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Libre Caslon Condensed",
      cssVariable: "--font-libre-caslon-condensed",
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/LibreCaslonCondensed.woff2"],
            weight: "200 900",
            style: "normal",
            display: "swap",
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Instrument Sans",
      cssVariable: "--font-instrument-sans",
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/InstrumentSans-VariableFont_wdth,wght.woff2"],
            weight: "200 900",
            style: "normal",
            display: "swap",
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "SourGummy",
      cssVariable: "--font-sour-gummy",
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/SourGummy-Italic-VariableFont_wdth,wght.ttf"],
            weight: "100 900",
            style: "italic",
            display: "swap",
            stretch: "75% 125%",
          },
        ],
      },
    },
  ],
});