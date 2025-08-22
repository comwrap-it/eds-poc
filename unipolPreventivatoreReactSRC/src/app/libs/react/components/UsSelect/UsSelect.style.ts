import styled from "@emotion/styled";
import * as Styles from "../../../common/styles";

export const UsSelectContainer = styled.div`

    .us-select-container {
        position: relative;
        color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$body_color"]};

        .us-select-wrapper {
            margin: 0px;
            list-style: none;
            padding: 0px;
            border: 1px solid ${Styles.GlobalStyleVariables.widgetVariablesStyle["$main_color"]};
            //font-family: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$normal"]};
            font-family: Helvetica, Arial, sans-serif;
            font-size: 16px;
            display: none;
            position: absolute;
            top: 43px;
            left: 0;
            z-index: 10;
            background-color: white;
            width: 100%;
            overflow: auto;
            max-height: 250px;

            &.opened {
                display: block;
            }

            &.withLabel {
                top: 73px;
            }

            &.no-space-top {
                top: 25px;
            }

            &.top-overlay {
                top: unset;
                bottom: 43px;
            }

            .us-option-wrapper {
                border-bottom: 1px solid ${Styles.GlobalStyleVariables.widgetVariablesStyle["$grey"]};
                padding: 10px;
                cursor: pointer;

                &:hover {
                    background-color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$grey"]};
                }

                &.active {
                    color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$main_color"]};
                    //font-family: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$bold"]};
                    font-family: Helvetica, Arial, sans-serif;
                    font-weight: bold;
                    border: 2px solid ${Styles.GlobalStyleVariables.widgetVariablesStyle["$light_blue"]};
                }
            }
        }
    }
`;