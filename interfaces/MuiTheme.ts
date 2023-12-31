declare module "@mui/material/styles/createTypography" {
  interface Typography {
    h_large?: TypographyStyle;
    h_small?: TypographyStyle;

    m_h1?: TypographyStyle;
    m_h2?: TypographyStyle;
    m_h3?: TypographyStyle;
    m_h4?: TypographyStyle;
    m_h5?: TypographyStyle;
    m_h6?: TypographyStyle;

    p_large?: TypographyStyle;
    p_medium?: TypographyStyle;
    p_small?: TypographyStyle;
    p_xSmall?: TypographyStyle;
    overline?: TypographyStyle;

    BungeeText?: TypographyStyle;
    JuraText?: TypographyStyle;
    menu_header?: TypographyStyle;
  }

  interface TypographyOptions {
    h_large?: TypographyStyle;
    h_small?: TypographyStyle;

    m_h1?: TypographyStyle;
    m_h2?: TypographyStyle;
    m_h3?: TypographyStyle;
    m_h4?: TypographyStyle;
    m_h5?: TypographyStyle;
    m_h6?: TypographyStyle;

    p_large?: TypographyStyle;
    p_medium?: TypographyStyle;
    p_small?: TypographyStyle;
    p_xSmall?: TypographyStyle;
    overline?: TypographyStyle;

    BungeeText?: TypographyStyle;
    JuraText?: TypographyStyle;
    menu_header?: TypographyStyle;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    text_large: true;
    text_small: true;

    m_h1: true;
    m_h2: true;
    m_h3: true;
    m_h4: true;
    m_h5: true;
    m_h6: true;

    p_large: true;
    p_medium: true;
    p_small: true;
    p_xSmall: true;
    overline: true;

    BungeeText: true;
    JuraText: true;
    menu_header: true;
  }
}

declare module "@mui/material/styles/createPalette" {
  interface Palette {
    skeleton: {
      main: string;
    };
  }

  interface PaletteOptions {
    skeleton: {
      main: string;
    };
  }
}

declare module "@mui/material/SvgIcon" {
  interface SvgIconPropsColorOverrides {
    white: true;
  }
}

declare module "@mui/material/Select" {
  interface SelectClasses {
    root: string;
  }
}

export {};
// brandColor: {
//   blue: string;
//   orange: string;
// };
// secondaryColor: {
//   lightBlue: string;
//   darkBlue: string;
//   background: string;
// };
// gradientColor: {
//   gradientOrange: string;
//   gradientBlue: string;
//   gradientBlue30: string;
//   gradientWhite50: string;
// };  // secondaryColor: {
//   lightBlue: string;
//   darkBlue: string;
//   background: string;
// };
// gradientColor: {
//   gradientOrange: string;
//   gradientBlue: string;
//   gradientBlue30: string;
//   gradientWhite50: string;
// };
