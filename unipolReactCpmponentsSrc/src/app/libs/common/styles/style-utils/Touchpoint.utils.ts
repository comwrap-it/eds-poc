import { TOUCHPOINTS, getTouchpointThemeClass } from "../../mfe";
import { Touchpoints } from "../Themes.style";

// Currently touchpoint is not fully implemented throughout the code, it's just for demo purposes
export function touchpointThemeOnly(
  themeFunction: (touchpoint: any) => string
): string {
  return `
    ${bimvitaOnly(themeFunction)}
    ${whitelabelOnly(themeFunction)}
  `;
}

export function bimvitaOnly(
  themeFunction: (touchpoint: any) => string
): string {
  const touchpoint = Touchpoints[TOUCHPOINTS.BIMVITA];
  return `
    .${getTouchpointThemeClass(TOUCHPOINTS.BIMVITA)} & {
      ${themeFunction(touchpoint)}
    }
  `;
}

export function whitelabelOnly(
  themeFunction: (touchpoint: any) => string
): string {
  const touchpoint = Touchpoints[TOUCHPOINTS.WHITELABEL];
  return `
    .${getTouchpointThemeClass(TOUCHPOINTS.WHITELABEL)} & {
      ${themeFunction(touchpoint)}
    }
  `;
}
