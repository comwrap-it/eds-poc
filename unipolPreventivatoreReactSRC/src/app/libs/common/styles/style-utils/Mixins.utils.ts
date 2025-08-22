import { widgetVariablesStyle } from "../global/widgetVariables.style";
import { tabletAndDesktopOnly } from "./Breakpoints.utils";

export const mainTransition = `
    -webkit-transition: all 0.25s ease-out 0s;
    -moz-transition: all 0.25s ease-out 0s;
    -ms-transition: all 0.25s ease-out 0s;
    -o-transition: all 0.25s ease-out 0s;
    transition: all 0.25s ease-out 0s;
`;

export const btnHeightAdapt = `
    min-height: 45px;
    height: auto;
    width: 100%;
    line-height: normal;
    white-space: normal;
`;

export const mainTabBtnWhite = `
    border-radius: 0;
    border: none;
    color: ${widgetVariablesStyle["$blue"]};
    text-align: center;
    font-family: ${widgetVariablesStyle["$bold"]};
    font-size: 16px;
    background-color: ${widgetVariablesStyle["$white"]};
    min-height: 45px;
    line-height: 19px;
    padding: 14px 14px 12px 14px;
    vertical-align: middle;

    &:hover {
        cursor: pointer;
        border: 1px solid ${widgetVariablesStyle["$blue"]};
        opacity: 0.8;
    }

    &:disabled {
        color: ${widgetVariablesStyle["$grey"]};
        cursor: not-allowed;
    }

    ${tabletAndDesktopOnly(mainTransition)}
`;

export const mainLinkWhite = `
    color: ${widgetVariablesStyle["$white"]};
    text-decoration: underline;
    font-size: 16px;
    font-family: ${widgetVariablesStyle["$bold"]};

    &:hover {
        color: ${widgetVariablesStyle["$main_color"]};
        opacity: 0.8;

        ${tabletAndDesktopOnly(mainTransition)}
    }
`;

export const usInputReadOnly = `
    color: ${widgetVariablesStyle["$grey"]} !important;
    background-color: ${widgetVariablesStyle["$soft-grey"]};
    border-color: ${widgetVariablesStyle["$ivory"]};
    cursor: not-allowed;
`;
