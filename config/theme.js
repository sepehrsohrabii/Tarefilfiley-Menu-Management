import loadFont from "./fonts";

loadFont();

const theme = {
  typography: {
    heading1: {
      fontSize: "48px",
      fontFamily: "IS_Bold",
    },
    heading2: {
      fontSize: "48px",
      fontFamily: "IS_Bold",
    },
    heading3: {
      fontSize: "32px",
      fontFamily: "IS_Bold",
    },
    heading4: {
      fontSize: "24px",
      fontFamily: "IS_Bold",
    },
    heading5: {
      fontSize: "18px",
      fontFamily: "IS_Bold",
    },
    heading6: {
      fontSize: "14px",
      fontFamily: "IS_Bold",
    },
    label: {
      fontSize: "16px",
      fontFamily: "IS",
    },
    subTitle: {
      fontSize: "16px",
      fontFamily: "IS",
    },
    subTitle_M: {
      fontSize: "16px",
      fontFamily: "IS_Medium",
    },
    paragraph1: {
      fontSize: "18px",
      fontFamily: "IS",
    },
    paragraph2: {
      fontSize: "16px",
      fontFamily: "IS",
    },
    paragraph3: {
      fontSize: "14px",
      fontFamily: "IS",
    },
    productTitle: {
      fontSize: "14px",
      fontFamily: "IS_Medium",
    },
    productSubTitle: {
      fontSize: "12px",
      fontFamily: "IS",
    },
    productPrice: {
      fontSize: "16px",
      fontFamily: "IS_Medium",
    },
    small: {
      fontSize: "14px",
      fontFamily: "IS_UltraLight",
    },
    smallest: {
      fontSize: "12px",
      fontFamily: "IS_UltraLight",
    },
  },
  colors: {
    one: "#184D47",
    two: "#96BB7C",
    three: "#FAD586",
    four: "#C64756",
    fourWithOpacity: "rgba(198, 71, 86, 0.3)",
    darkGray: "#303030",
    lightGray: "#e0e0e0",
    lightTextColor: "#8e8e8e",
    defaultTextColor: "#353740",
    darkTextColor: "#202123",
    white: "#FFFFFF",
    black: "#000000",
  },
};
export default theme;
