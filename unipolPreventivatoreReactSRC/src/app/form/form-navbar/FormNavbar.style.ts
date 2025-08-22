import styled from "@emotion/styled";
import * as Styles from "../../libs/common/styles";

type colorProps = {
    colorADB: string;
};

export const SubmenuContainer = styled.div`
    display:flex;
    flex-direction: row;
    justify-content : space-between;
    align-items: center;
    margin-bottom: 24px;
    gap: 16px;
    overflow: auto hidden;
`

export const SubmenuButton = styled.div<colorProps>`
    font-family: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$medium"]};
    letter-spacing: 0.2px;
    font-size: 14px;
    border: 2px solid ${(props) => props.colorADB};
    background: ${Styles.Themes.UnipolColors.white};
    color: ${(props) => props.colorADB};
    border-radius: 8px;
    min-width: 140px;
    line-height: 21px;
    width: 100%;
    padding: 9px 10px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;

    &.selected {
        background: ${(props) => props.colorADB};
        border-color: ${(props) => props.colorADB};
        color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$white"]};
    }
    
    ${Styles.BreakpointsUtils.tabletAndDesktopOnly(`
        min-width: 116px;
    `)}
    
    ${Styles.BreakpointsUtils.desktopOnly(`
        min-width: 180px;
    `)}

`