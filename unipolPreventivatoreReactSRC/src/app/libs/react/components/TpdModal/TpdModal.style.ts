import styled from "@emotion/styled";
import * as Styles from "../../../common/styles";

export const TpdModalContainer = styled.div`

    &.tpd-modal-overlay {
        transition: opacity 0.2s ease-out;
        background: rgba(25, 58, 86, 0.8);
        position: fixed;
        opacity: 1;
        inset: 0;
        z-index: 100;
        overflow-y: hidden;
        display: block !important;
        max-width: 100vw;
        max-height: 100vh;
        width: 100%;
        height: 100%;
        z-index: 1000;

        .close {
            font-size: 21px;
            font-weight: 700;
            line-height: 1;
            color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$black"]};
            text-shadow: 0 1px 0 ${Styles.GlobalStyleVariables.widgetVariablesStyle["$white"]};
            opacity: 0.2;
            display: flex;
            margin-left: auto;
            margin-right: 30px;

            &:hover {
                text-decoration: none;
                cursor: pointer;
                opacity: 0.5;
            }
        }
    }
    
    .tpd-modal {
        &-title {
            color: #333333;
            font-family: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$bold"]};
            font-size: 30px;
        }

        &-footer {
            button {
                padding: 10px 80px;
                background-color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$main_red"]};
                color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$white"]};
                font-family: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$bold"]};
                border: none;
            }
        }
        
        &-container {
            background: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$white"]};
            box-shadow: 0 10px 20px rgb(0 0 0 / 20%);
            left: 50%;
            max-width: 80%;
            top: 50%;
            transform: translate(-50%, -50%);
            text-align: left;
            max-height: 90vh;
            display: flex;
            flex-direction: column;

            .tpd-modal-content,
            .tpd-modal-footer {
                font-family: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$normal"]};
            }

            &-custom {
                background: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$white"]};
                box-shadow: 0 10px 20px rgb(0 0 0 / 20%);
                left: 50%;
                max-width: 80%;
                position: absolute;
                top: 50%;
                transform: translate(-50%, -50%);
                text-align: left;
                max-height: 90vh;
                display: flex;
                flex-direction: column;

                .tpd-modal-content,
                .tpd-modal-footer {
                    font-family: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$normal"]};
                }
            }
        }
    }

    //RESPONSIVE
    ${Styles.BreakpointsUtils.mobileOnly(`    
        .tpd-modal {
            padding: 20px;
            position: relative;
            overflow: hidden;
        
            .title {
                  font-family: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$bold"]};
                  font-size: 25px;
            }
            .form-group {
                 padding: 50px 0;
            }
            .content {
                button {
                    padding: 4px 20px;
                    width: 100%;
                    height: 100%;
                    background-color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$medium-light-blue"]};
                    color: white;
                    font-family: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$bold"]};
                    border: none;
                }
                .subtitle {
                    color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$medium-light-blue"]};
                    padding: 10px 0;
                }
            }
            .footer {
                background-color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$white"]};
                button {
                    padding: 10px 80px;
                    background-color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$main_red"]};
                    color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$white"]};
                    font-family: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$bold"]};
                    border: none;
                }
                button[disabled] {
                    background-color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$grey"]};
                    color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$grey"]};
                }
            }
        }
    `)} 
                    
    ${Styles.BreakpointsUtils.tabletOnly(`
        .tpd-modal {
            .content {
                padding: 0 100px;
                button {
                    padding: 10px 30px;
                }
            }
        }
    `)}
`;