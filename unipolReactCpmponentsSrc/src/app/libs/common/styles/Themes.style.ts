import { TOUCHPOINTS, PAGE_COLORS } from "../mfe";

export const UnipolColors = {
  blueOne: "#0f3250",
  blueTwo: "rgba(15, 50, 80, 0.7)",
  blueThree: "#23527c",
  blueFour: "#255f90",
  blueFive: "#0169b4",
  blueSix: "#337ab7",
  blueSeven: "#5393bc",
  blueEight: "#00afcb",
  blueNine: "#e8f5ff",
  blueTen: "#e2f0f9",
  blueEleven: "rgba(226, 240, 249, 0.7)",
  blueTwelve: "rgba(83, 147, 188, 0.8)",
  blueThirteen: "#308992",
  white: "#fff",
  gray: "#fafafa"
};

// Currently touchpoint is not fully implemented throughout the code, it's just for demo purposes
export const Touchpoints = {
  // [TOUCHPOINTS.UNIPOLSAI]: {
  //   mainColor: "#0f3250",
  //   opaqueMainColor: "rgba(15, 50, 80, 0.7)",
  //   darkSecondaryColor: "#23527c",
  //   secondaryColor: "#255f90",
  //   darkTertiaryColor: "#0169b4",
  //   tertiaryColor: "#337ab7",
  //   darkQuaternaryColor: "#5393bc",
  //   quaternaryColor: "#00afcb",
  //   lightColor: "#e8f5ff",
  //   whitishColor: "#e2f0f9",
  //   opaqueWhitishColor: "rgba(226, 240, 249, 0.7)",
  // },
  [TOUCHPOINTS.BIMVITA]: {
    mainColor: "#8c472b",
    opaqueMainColor: "rgba(140, 71, 43, 0.7)",
    darkSecondaryColor: "#b86439",
    secondaryColor: "#b25a2e",
    darkTertiaryColor: "#b26431",
    tertiaryColor: "#c27431",
    darkQuaternaryColor: "#c47d47",
    quaternaryColor: "#b58a3e",
    lightColor: "#ffcb9d",
    whitishColor: "#f2d6c6",
    opaqueWhitishColor: "rgba(242, 214, 198, 0.7)",
  },
  [TOUCHPOINTS.WHITELABEL]: {
    mainColor: "#404040",
    opaqueMainColor: "rgba(64, 64, 64, 0.7)",
    darkSecondaryColor: "#707070",
    secondaryColor: "#747474",
    darkTertiaryColor: "#6e6e6e",
    tertiaryColor: "#6d6d6d",
    darkQuaternaryColor: "#808080",
    quaternaryColor: "#7f7f7f",
    lightColor: "#ebebeb",
    whitishColor: "#dcdcdc",
    opaqueWhitishColor: "rgba(220, 220, 220, 0.7)",
  },
};

export const PageColors = {
  // [PAGE_COLORS.DEFAULT]: {
  //   mainColor: "#5393bc",
  //   opaqueMainColor: "rgba(83, 147, 188, 0.8)",
  //   invertedMainColor: "#fff",
  //   lightColor: "#e2f0f9",
  //   opaqueLightColor: "rgba(226, 240, 249, 0.7)",
  // },
  [PAGE_COLORS.BLUE]: {
    mainColor: "#0169b4",
    opaqueMainColor: "rgba(1, 105, 180, 0.8);",
    invertedMainColor: "#fff",
    lightColor: "#e8f5ff",
    opaqueLightColor: "rgba(232, 245, 255, 0.7)",
  },
  [PAGE_COLORS.GREEN]: {
    mainColor: "#59a627",
    opaqueMainColor: "rgba(89, 166, 39, 0.8)",
    invertedMainColor: "#fff",
    lightColor: "#f5faed",
    opaqueLightColor: "rgba(245, 250, 237, 0.7)",
  },
  [PAGE_COLORS.ORANGE]: {
    mainColor: "#e94e10",
    opaqueMainColor: "rgb(233, 78, 16, 0.8)",
    invertedMainColor: "#fff",
    lightColor: "#fdf5f2",
    opaqueLightColor: "rgba(253, 245, 242, 0.7)",
  },
  [PAGE_COLORS.JELLYBEANBLUE]: {
    mainColor: "#51829A",
    opaqueMainColor: "rgba(81, 130, 154, 0.8);",
    invertedMainColor: "#fff",
    lightColor: "#f2fafd",
    opaqueLightColor: "rgba(232, 245, 255, 0.7)",
  }
};
