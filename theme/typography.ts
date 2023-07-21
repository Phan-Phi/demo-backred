import { RobotoFont, BungeeFont, JuraFont } from "@/libs";
import { TypographyOptions } from "@mui/material/styles/createTypography";

type OmitProperties = "fontSize" | "fontWeight" | "lineHeight" | "letterSpacing";

const createTypographyProperties = (
  props: {
    fontSize: string | number;
    fontWeight: string | number;
    lineHeight: string | number;
    letterSpacing?: string | number;
    color?: string;
  } & Omit<React.CSSProperties, OmitProperties>
) => {
  const { fontSize, fontWeight, letterSpacing, lineHeight, ...restProps } = props;

  return {
    fontSize,
    fontWeight,
    lineHeight,
    letterSpacing,
    ...restProps,
  };
};

export const typographyTheme: TypographyOptions = {
  fontFamily: RobotoFont.style.fontFamily,
  h_large: createTypographyProperties({
    fontFamily: RobotoFont.style.fontFamily,
    fontWeight: 500,
    fontSize: "52px",
    lineHeight: "56px",
  }),
  h_small: createTypographyProperties({
    fontFamily: RobotoFont.style.fontFamily,
    fontWeight: 500,
    fontSize: "44px",
    lineHeight: "48px",
  }),
  h1: createTypographyProperties({
    fontFamily: RobotoFont.style.fontFamily,
    fontWeight: 500,
    fontSize: "40px",
    lineHeight: "48px",
  }),
  h2: createTypographyProperties({
    fontFamily: RobotoFont.style.fontFamily,
    fontWeight: 500,
    fontSize: "36px",
    lineHeight: "44px",
  }),
  h3: createTypographyProperties({
    fontFamily: RobotoFont.style.fontFamily,
    fontWeight: 500,
    fontSize: "32px",
    lineHeight: "40px",
  }),
  h4: createTypographyProperties({
    fontFamily: RobotoFont.style.fontFamily,
    fontWeight: 500,
    fontSize: "28px",
    lineHeight: "36px",
  }),
  h5: createTypographyProperties({
    fontFamily: RobotoFont.style.fontFamily,
    fontWeight: 500,
    fontSize: "24px",
    lineHeight: "32px",
  }),
  h6: createTypographyProperties({
    fontFamily: RobotoFont.style.fontFamily,
    fontWeight: 500,
    fontSize: "20px",
    lineHeight: "28px",
  }),

  p_large: createTypographyProperties({
    fontFamily: RobotoFont.style.fontFamily,
    fontWeight: 400,
    fontSize: "18px",
    lineHeight: "28px",
  }),
  p_medium: createTypographyProperties({
    fontFamily: RobotoFont.style.fontFamily,
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "24px",
  }),
  p_small: createTypographyProperties({
    fontFamily: RobotoFont.style.fontFamily,
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "20px",
  }),
  p_xSmall: createTypographyProperties({
    fontFamily: RobotoFont.style.fontFamily,
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "20px",
  }),

  menu_header: createTypographyProperties({
    fontFamily: JuraFont.style.fontFamily,
    fontWeight: 700,
    fontSize: "20px",
    lineHeight: "24px",
  }),

  JuraText: createTypographyProperties({
    fontFamily: JuraFont.style.fontFamily,
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "24px",
  }),

  BungeeText: createTypographyProperties({
    fontFamily: BungeeFont.style.fontFamily,
    fontWeight: 400,
    fontSize: "48px",
    lineHeight: "57.6px",
    letterSpacing: "-0.96px",
  }),
};
