import { extendTheme } from "@chakra-ui/react";
import facepaint from "facepaint";
const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,

  semanticTokens: {
    colors: {
      primary: {
        default: "#02aab0",
        _dark: "#00cdac",
      },
      secondary: {
        default: "#00cdac",
        _dark: "#02aab0",
      },
      darkGrey: {
        default: "#333333",
      },
    },
    bgGradient: {
      linearGradient: {
        default: "linear-gradient(135deg,#02aab0 0%,#00cdac 100%)",
      },
    },
  },
  fontSizes: {
    "3xs": "clamp(0.76rem, calc(0.76rem + 0.02vw), 0.77rem)",
    "2xs": "clamp(0.91rem, calc(0.89rem + 0.10vw), 0.96rem)",
    xs: "clamp(1.09rem, calc(1.05rem + 0.21vw), 1.20rem)",
    sm: "clamp(1.31rem, calc(1.23rem + 0.28vw), 1.50rem)",
    md: "clamp(1.58rem, calc(1.44rem + 0.45vw), 1.88rem)",
    lg: "clamp(1.89rem, calc(1.69rem + 0.68vw), 2.34rem)",
    xl: "clamp(2.27rem, calc(1.98rem + 0.99vw), 2.93rem)",
    "2xl": "clamp(2.72rem, calc(2.31rem + 1.41vw), 3.66rem)",
    "3xl": "clamp(3.27rem, calc(2.75rem + 2.56vw), 4.58rem),",
  },
});
const breakpoints = [480, 768, 992, 1280, 1536];
const sm = "(min-width: 480px)";
const md = "(min-width: 768px)";
const lg = "(min-width: 992px)";
const xl = "(min-width: 1280px)";
const xxl = "(min-width: 1536px)";
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));
export { breakpoints, mq, sm, md, lg, xl, xxl };
export default theme;
