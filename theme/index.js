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
});
const breakpoints = ["30em", "48em", "62em", "80em", "96em"];
const sm = "(min-width: 30em)";
const md = "(min-width: 48em)";
const lg = "(min-width: 62em)";
const xl = "(min-width: 80em)";
const xxl = "(min-width: 96em)";
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp})`));
export { breakpoints, mq, sm, md, lg, xl, xxl };
export default theme;
