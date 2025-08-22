import styled from "@emotion/styled";
import * as Styles from "../../../common/styles";

export const UsButtonContainer = styled.button`
    
    min-width: 100px;
    width: 100%;
    //font-family: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$bold"]};
    font-family: Helvetica, Arial, sans-serif;
    font-weight: bold;
    border: none;
    cursor: pointer;
    padding: 10px 30px;
    min-height: 44px;

    &.lightBlue {
        &:disabled {
            opacity: 0.3;
        }
    }

    &.unicoBackground {
        color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$white"]};
        transition: 0.2s;

        &.rosso {
            background-color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$main_red"]};

            &:hover {
                background-color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$main_red"]};
            }
        }

        &.rosso-disabled-grey {
            background-color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$main_red"]};

            &:disabled {
                color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$grey"]};
                background-color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$ivory"]};
                opacity: 1 !important;
            }
        }

        &.azzurro-ar {
            background-color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$light_blue"]};

            &:hover {
                background-color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$light_blue"]};
            }
        }

        &.azzurro-ar-cta {
            background-color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$medium-light-blue"]};

            &:hover {
                background-color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$medium-light-blue"]};
            }
        }

        &.blu-unipol {
            background-color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$main_color"]};

            &:hover {
                background-color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$main_color"]};
            }
        }

        &:disabled {
            opacity: 0.3;
            cursor: not-allowed;
        }
    }

    &.borderBottom {
        background-color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$white"]};
        color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$main_color"]};
        border: 1px solid ${Styles.GlobalStyleVariables.widgetVariablesStyle["$grey"]};
        border-bottom: 4px solid ${Styles.GlobalStyleVariables.widgetVariablesStyle["$main_red"]};

        &:hover {
            border-bottom-color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$main_red_hover"]};
        }
    }

    &.flat {
        background-color: transparent;
        color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$main_color"]};
        border: none;
    }

    &.text-underline,
    &.text-no-underline {
        background-color: transparent;
        padding: 0px !important; // deve sovrascrivere quello di default
        border: none;
        color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$main_color"]};
        font-size: 16px;
        text-decoration: underline;

        &.text-underline {
            text-decoration: underline;
        }
    }
`;