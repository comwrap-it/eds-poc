import styled from "@emotion/styled";
import * as Styles from "../../../common/styles";

export const UsInputContainer = styled.div`
    
    .us-input-container {
        display: flex;
        flex-direction: column;

        .us-input-label {
            font-size: 16px;
            font-family: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$medium"]};
            color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$main_color"]};
            min-height: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$input-label-height"]};
            padding-bottom: 10px;

            label {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: flex-end;
            }
        }

        .us-input-wrapper {
            .us-input-real {
                position: relative;

                .us-occhietto-pwd {
                    height: 23px;
                    top: 10px;
                    width: 30px;
                    position: absolute;
                    right: 18px;
                }

                .us-currency {
                    top: 10px;
                    font-size: 18px;
                    position: absolute;
                    right: 8px;
                }

                & .us-input-disabled {
                    ${Styles.MixinsUtils.usInputReadOnly}
                }
            }

            .us-input-fake,
            input {
                background-color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$white"]};
                color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$body_color"]} !important;
                width: 100%;
                box-sizing: border-box;
                padding: 6px 10px;
                border: 1px solid ${Styles.GlobalStyleVariables.widgetVariablesStyle["$main_color"]};
                height: 44px;
                text-overflow: ellipsis;

                &.us-input-wrapper-errors {
                    border-color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$error_red"]};
                }

                &.us-input-wrapper-placeholder {
                    color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$light_grey"]};
                }

                &.us-input-wrapper-valid {
                    border-color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$green_success"]};
                }
            }

            input {
                outline: none;
                color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$body_color"]} !important;
                &:read-only {
                    ${Styles.MixinsUtils.usInputReadOnly}
                }
            }

            .us-input-fake {
                block-size: 44px;
                position: relative;
                cursor: pointer;
                display: flex;
                align-items: center;

                & .us-input-disabled {
                    ${Styles.MixinsUtils.usInputReadOnly}
                }

                &.label-form {
                    color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$main_color"]};
                    font-weight: 700;
                }

                .us-input-fake-valore {
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    margin-right: 20px;
                }

                .us-input-fake-icona {
                    position: absolute;
                    font-size: 35px;
                    right: 0px;
                    top: 0px;
                    height: 100%;
                    display: flex;
                    align-items: center;

                    img {
                        margin-right: 10px;
                        height: 20px;
                        width: 20px;
                    }
                }
            }
        }

        .us-input-errors-wrapper {
            padding: 5px;
            //font-family: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$normal"]};
            font-family: Helvetica, Arial, sans-serif;
            color: white;
            min-height: 28px;
            background-color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$error_red"]};
            display: none;
            font-size: 12px;

            &.active {
                display: block;
            }
        }

        &.no-border {
            .us-input-wrapper {
                .us-input-fake {
                    border: 0;
                    height: 30px;
                    text-align: left;
                    padding: 0;
                    margin-bottom: 9px;
                    //margin-top: 10px;
                    //font-family: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$medium"]};
                    font-family: Helvetica, Arial, sans-serif;
                    .us-input-fake-valore {
                        margin-right: 30px;
                    }
                }

                .us-input-fake-icona {
                    width: 25px;
                }
            }
        }
        &.underlined {
            .us-input-wrapper {
                .us-input-fake {
                    text-decoration: underline;
                }
            }
        }
        &.centered {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }
`;