import { bootstrapStyle } from "./bootstrap.style";
import { listStyle } from "./list.style";
import { fontStyle } from "./font.style";
import { iconStyle } from "./icon.style";
import { loaderStyle } from "./loader.style";
import { toolbarStyle } from "./toolbar.style";
import { bodyStyle } from "./body.style";
import { htmlStyle } from "./html.style";
import { AutocompleteGoogleStyle } from "./autocomplete-google";
import { colorGlobalVariables } from "./colorGlobalVariables.style";
import { widgetGlobalStyle } from "./widgetGlobal.style";

export const GlobalStyle = `
  ${colorGlobalVariables}
  ${bootstrapStyle}
  ${widgetGlobalStyle}
  ${fontStyle}
  ${iconStyle}
  ${loaderStyle}
  ${listStyle}
  ${toolbarStyle}
  ${bodyStyle}
  ${htmlStyle}
  ${AutocompleteGoogleStyle}
`;
