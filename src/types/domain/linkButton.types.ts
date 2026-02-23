type BaseProps = {
  href: string;
  className?: string;
};

type IconProps = BaseProps & {
  contentType: "icon";
  iconSrc: string;
  iconAlt: string;
};

type TextProps = BaseProps & {
  contentType: "text";
  label: string;
};

export type Props = TextProps | IconProps;