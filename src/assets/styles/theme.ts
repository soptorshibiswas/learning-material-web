import { createTheme } from "styled-breakpoints";

const breakpoints = createTheme({
  mobile: "576px",
  tablet: "768px",
  desktop: "992px",
  lgDesktop: "1366px",
  xlgDesktop: "1536px",
  xxlgDesktop: "1920px",
});

export const theme = {
  ...breakpoints,
  breakpointsInt: {
    mobile: 576,
    tablet: 768,
    desktop: 992,
    lgDesktop: 1366,
    xlgDesktop: 1536,
    xxlgDesktop: 1920,
  },
  colors: {
    typography: {
      primary: "#0E5A49",
      textPrimary: "#333333",
      textSecondary: "#666666",
      white: "#FFFFFF",
      grey: "#BEBEBE",
      darkGrey: "#696969",
      ashDark: "#ADADAD",
      danger: "#F5222D",
    },
    primary: "#0E5A49",
    primaryLight: "#179C7E",
    primaryShadow: "#DFE6E5",
    smallCardShadow: "0px 1px 2px rgba(0, 14, 51, 0.25)",
    cardShadow: "0px 10px 20px rgba(0, 0, 0, 0.08)",
    border: "#D9D9D9",
    divider: "#F6F6F6",
    body: "#FFFFFF",
    dividerLight: "#E8E8E8",
    greyBg: "#F2F2F2",
    lightBg: "#F8F8F8",
    darkCover: "rgba(41, 45, 50, 0.55)",
    sketchBack: "#10B360",
    error: "#FF3333",
    success: "#27AE60",
    danger: "#F5222D",
    dark: "#333333",
    culturedBg: "#F4F4F4",
    black: "#000000",
    background: "#F5F5F5",
    primaryBadgeBG: "rgba(14, 90, 73, 0.28)",
  },
  zIndex: {
    zIndex1: 1,
    zIndex10: 10,
    zIndex100: 100,
    zIndex200: 200,
    zIndex300: 300,
    zIndex500: 500,
    zIndex600: 600,
    zIndex700: 700,
    zIndex800: 800,
    zIndex900: 900,
    zIndex1000: 1000,
  },
};

type TTheme = typeof theme;

export interface ITheme extends TTheme {
  additional: any;
}
