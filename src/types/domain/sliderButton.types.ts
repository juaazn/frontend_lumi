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