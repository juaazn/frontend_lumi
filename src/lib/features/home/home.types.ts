export interface HomePage {
  title: string;
  imagenFondoHomePage: string;
  alternativeText: string;
}

export interface HomeApiResponse {
  data: {
    title: string;
    imagenFondoHomePage: {
      formats: {
        small: {
          url: string;
      }
    };
    alternativeText: string | null;
    } | null;
  };
}
