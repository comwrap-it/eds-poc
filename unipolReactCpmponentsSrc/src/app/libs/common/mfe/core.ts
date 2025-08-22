import { PAGE_COLORS, TOUCHPOINTS } from "./constants";

export function getTouchpointThemeClass(
  touchpoint: string | null = null
): string {
  let tp = TOUCHPOINTS.UNIPOLSAI;
  if (touchpoint) {
    if (Object.values(TOUCHPOINTS).includes(touchpoint)) {
      tp = touchpoint;
    } else {
      console.error(`Touchpoint ${touchpoint} not supported!`);
    }
  }
  return `touchpoint-theme-${tp}`;
}

export function getPageColorThemeClass(
  pageColor: string | null = null
): string {
  let pc = "default";
  if (pageColor && pageColor !== "mainColor") {
    //Se ci sono spazi li sotituisce con "-"
    pageColor = pageColor.trim().replace(/\s+/g, '-');
    if (Object.values(PAGE_COLORS).includes(pageColor)) {
      pc = pageColor;
    } else {
      console.error(`Page color ${pageColor} not supported!`);
    }
  }
  return `page-color-theme-${pc}`;
}
