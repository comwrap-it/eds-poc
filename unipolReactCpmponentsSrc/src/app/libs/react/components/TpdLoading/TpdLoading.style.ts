import styled from "@emotion/styled";
import * as Styles from "../../../common/styles";

export const TpdLoadingContainer = styled.div`

    .marginUnibox {
        margin-left: 34%;
    }

    .loading-text {
        text-align: center;
        width: 77.5vw;
        position: fixed;
        top: 65%;
        z-index: 10000;
        color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$white"]};
    }

    .overLayer {
        background-color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$black"]};
        width: 100vw;
        height: 100%;
        opacity: 0.5;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 9999;
        overflow: hidden;
        -webkit-overflow-scrolling: touch;
        outline: 0;
        text-align: center;
        display: block;
        padding-left: 0px;
        & > .sk-circle {
            display: inline-block;
            text-align: left;
            vertical-align: middle;
        }
    }

    .fixedHeight {
        min-height: 300px;
    }

    .fixedHeightSmall {
        min-height: 80px;
    }

    .smallDiv {
        margin-top: 0px !important;
        margin-bottom: 0px !important;
        width: 80px !important;
        height: 80px !important;
    }

    /* SPINNER COMPONENT */

    .inLayer {
        height: 100%;
        width: 100%;
        .tpd-loading {
            position: static;
            height: 100%;
            width: 100%;
            .sk-circle {
                margin: 0 auto;
                height: 100%;
                width: 100%;
            }
        }
    }

    .tpd-loading {
        text-align: center;
        color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$grey_border_form"]};
        position: fixed;
        height: 100vh;
        width: 100%;
        left: 0;
        z-index: 999;
        
        &.hide {
            display: none;
        }

        .sk-circle {
            margin: 100px auto;
            width: 140px;
            height: 140px;
            position: relative;
        }

        .sk-circle .sk-child {
            color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$grey_border_form"]};
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
        }

        .sk-circle .sk-child:before {
            content: "";
            display: block;
            margin: 0 auto;
            width: 15%;
            height: 15%;
            background-color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$grey_border_form"]};
            border-radius: 100%;
            animation: sk-circleBounceDelay 1.2s infinite ease-in-out both;
            -webkit-animation: sk-circleBounceDelay 1.2s infinite ease-in-out both;
        }

        .sk-circle .sk-circle2 {
            transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            -webkit-transform: rotate(45deg);
        }

        .sk-circle .sk-circle3 {
            transform: rotate(90deg);
            -ms-transform: rotate(90deg);
            -webkit-transform: rotate(90deg);
        }

        .sk-circle .sk-circle4 {
            transform: rotate(135deg);
            -ms-transform: rotate(135deg);
            -webkit-transform: rotate(135deg);
        }

        .sk-circle .sk-circle5 {
            transform: rotate(180deg);
            -ms-transform: rotate(180deg);
            -webkit-transform: rotate(180deg);
        }

        .sk-circle .sk-circle6 {
            transform: rotate(225deg);
            -ms-transform: rotate(225deg);
            -webkit-transform: rotate(225deg);
        }

        .sk-circle .sk-circle7 {
            transform: rotate(270deg);
            -ms-transform: rotate(270deg);
            -webkit-transform: rotate(270deg);
        }

        .sk-circle .sk-circle8 {
            transform: rotate(315deg);
            -ms-transform: rotate(315deg);
            -webkit-transform: rotate(315deg);
        }

        .sk-circle .sk-circle2:before {
            animation-delay: -1.1s;
            -webkit-animation-delay: -1.1s;
        }

        .sk-circle .sk-circle3:before {
            animation-delay: -1s;
            -webkit-animation-delay: -1s;
        }

        .sk-circle .sk-circle4:before {
            animation-delay: -0.9s;
            -webkit-animation-delay: -0.9s;
        }

        .sk-circle .sk-circle5:before {
            animation-delay: -0.8s;
            -webkit-animation-delay: -0.8s;
        }

        .sk-circle .sk-circle6:before {
            animation-delay: -0.7s;
            -webkit-animation-delay: -0.7s;
        }

        .sk-circle .sk-circle7:before {
            animation-delay: -0.6s;
            -webkit-animation-delay: -0.6s;
        }

        .sk-circle .sk-circle8:before {
            animation-delay: -0.5s;
            -webkit-animation-delay: -0.5s;
        }

        @-webkit-keyframes sk-circleBounceDelay {
            0%,
            80%,
            100% {
                transform: scale(0);
                -webkit-transform: scale(0);
            }

            40% {
                transform: scale(1);
                -webkit-transform: scale(1);
            }
        }

        @keyframes sk-circleBounceDelay {
            0%,
            80%,
            100% {
                transform: scale(0);
                -webkit-transform: scale(0);
            }

            40% {
                transform: scale(1);
                -webkit-transform: scale(1);
            }
        }
    }

    //RESPONSIVE    
    ${Styles.BreakpointsUtils.tabletAndDesktopOnly(`
        .overLayer:before {
            display: inline-block;
            vertical-align: middle;
            content: " ";
            height: 100%;
          }
    `)}
`;