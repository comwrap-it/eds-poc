import styled from "@emotion/styled";
import * as Styles from "../libs/common/styles";

export const FormContainer = styled.div`
    display:flex;
    flex-direction: column;
    justify-content : center;

    .form-group {
        display: flex;
        flex-direction: column;
        > * {
            width: 100%;
        }
        ${Styles.BreakpointsUtils.tabletAndDesktopOnly(`
            flex-direction: row;
            gap: 16px;
        `)}
    
        ${Styles.BreakpointsUtils.desktopOnly(`
            gap: 16px;
            
            >.us-form-control:first-child {
                max-width: 260px; 
            }
        `)}
    }

    .tpd-preventivatore-sticky-loader{
      &.form-loader{
        margin: 0 auto;
        .tpd-loading-container{
          width: 100px;
          height: 100px;
          margin: 0 auto;
        }        
      }
    }
        
    .us-form-control {
        margin-bottom: 16px;
        ${Styles.BreakpointsUtils.tabletAndDesktopOnly(`
            margin-bottom: 24px;
        `)}

        &--link {
            font-family: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$medium"]};
            color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$space_cadet"]}
            text-decoration: underline;
            cursor: pointer;
        }
    }
        
    .plate-control {
        margin-top: 10px;
    }

    input.dwelling-address,
    input.address {
        //font-family: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$medium"]};
        font-family: Helvetica, Arial, sans-serif;
        background-color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$white"]};
        width: 100%;
        padding: 6px 10px;
        box-sizing: border-box;
        border: 1px solid rgb(25, 58, 86);
        height: 44px;
        text-overflow: ellipsis;
        font-size: 16px;
        outline: none;
        color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$middle-grey-pu"]};
    }
    .us-input-container {
        .us-input-wrapper {
            .us-input-real {
                input {
                    //font-family: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$medium"]};
                    font-family: Helvetica, Arial, sans-serif;
                    color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$middle-grey-pu"]} !important;
                        
                    &:-webkit-autofill {
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$middle-grey-pu"]};
                        -webkit-box-shadow: 0 0 0 30px white inset !important;
                    }
                        
                    &::placeholder {
                        color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$grey"]};
                    }
                }
            }
            .us-input-fake {
                //font-family: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$medium"]};
                font-family: Helvetica, Arial, sans-serif;
                &.placeholder-label {
                    color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$grey"]} !important;
                }
            }
        }
    }

    .us-input-errors-wrapper {
        //font-family: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$normal"]};
        font-family: Helvetica, Arial, sans-serif;
        color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$white"]};
        background-color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$error_red"]};
        padding: 5px;
        min-height: 18px;
        display: none;
        font-size: 12px;
        &.active {
            display: block;
        }
    }

    .submit-container {
        margin: 0 auto 8px;
        max-width: 217px;
        padding-top: 8px;
        ${Styles.BreakpointsUtils.desktopOnly(`
            margin: 0 0 20px auto;
        `)}
    }

    .privacy-link-container {
        font-size: 13px;
        line-height: 13px;
        text-align: center;
        a,.informativa-privacy-link {
            cursor: pointer;
            background: transparent;
            text-decoration: underline;
            border: none;
            display: inline-block;
            padding: 8px 8px;
            //font-family: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$medium"]};
            color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$space_cadet"]};
        }
    }
    .recupera-preventivo-link-container {
        &-body {
          margin-top: 8px;
          background-color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$light_blue"]};
          padding: 8px 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          color: #5C5C5C;
          //font-family: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$medium"]};
          font-family: Helvetica, Arial, sans-serif;
          font-weight: bold;
        }

        a {
            display: inline-block;
            color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$space_cadet"]};
            //font-family: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$bold"]};
            font-family: Helvetica, Arial, sans-serif;
            font-weight: bold;
            text-decoration: underline;
        }

        ${Styles.BreakpointsUtils.tabletAndDesktopOnly(`            
            &-body {
                flex-direction: row;
                justify-content:center;
                gap: 8px;
                padding: 16px 12px;
                max-width: 407px;
                margin: 16px auto 0;
            }
        `)}
    }

    //Modal Informativa Privacy
    .modal-informativa-privacy {
        .tpd-modal {
            max-width: 1060px !important;
            width: 100%;
            overflow: auto;

            .modal-title-container {
                padding: 0 0 0 40px;
                background-color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$light_blue"]};
                color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$body_color"]};
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                .title {
                    font-size: 30px;
                }

                #modal-close-btn {
                    font-size: 16px;
                    font-family:${Styles.GlobalStyleVariables.widgetVariablesStyle["$bold"]};
                    cursor: pointer;
                    padding: 29px;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    font-weight: bold;
                    color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$main_color"]};

                    i {
                        font-size: 34px;
                    }
                }
            }

            .modal-content-container {
                padding: 40px 40px 0;
                color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$light_grey"]};
                font-size: 18px;
                line-height: 23px;
            }

            .modal-footer-container {
                padding: 20px 40px 40px;
                color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$light_grey"]};
                font-size: 13px;
                line-height: 23px;
            }
        }
    }
`

export const LabelTitle = styled.div`
    //font-family: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$bold"]};
    font-family: Helvetica, Arial, sans-serif;
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.02em;
    color: #164874;
    margin-bottom: 4px;
`

//SERVER SIDE RENDERING
export const ServerSideContainer = styled.div`
    width: 100%;
    background-color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$white"]};
    padding: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    min-height: 150px;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`
