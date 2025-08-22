import styled from "@emotion/styled";
import * as Styles from "./libs/common/styles";

type BgProps = {
  bgColor: string;
};

type WidthProps = {
  widthDiscount: {
    rightPercentage: string;
    leftPercentage: string;
  };
};

export const ContainerDiv = styled.div`
    //font-family: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$normal"]};
    font-family: Helvetica, Arial, sans-serif;
    color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$space_cadet"]};
    background-color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$white"]};
    padding-top: 32px;
    box-sizing: content-box;
    position: relative;
    min-height: 525px;

    .sticky-placeholder {
        min-height: 525px;
    }

    &.only-one-adb {
        ${Styles.BreakpointsUtils.mobileOnly(`
            padding-top: 32px;
        `)}

        min-height: 425px;

        .open.sticky {
            min-height: 425px;
        }
    }

    ${Styles.BreakpointsUtils.tabletAndDesktopOnly(`
        margin: 0 auto 12px;
    `)}
    
    ${Styles.BreakpointsUtils.desktopOnly(`
        margin: 12px auto;
        padding-top: 12px;
    `)}

    ${Styles.BreakpointsUtils.mobileAndTabletOnly(`
        height: fit-content;

        &.only-one-adb {
            min-height: fit-content;
        }
    `)}
    
`;

export const ContainerWrapper = styled.div<{adbItems:boolean}>`
    background-color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$white"]};

    .wrapper-card {
        ${Styles.BreakpointsUtils.tabletAndDesktopOnly(`
            width: 280px;
        `)}
          
        ${Styles.BreakpointsUtils.desktopOnly(`
            width: 380px;
        `)}
        &.no-card{
            width: 0px;
        }
    }

    &.sticky {
        position: fixed !important;
        bottom: 0;
        top: auto !important;
        width: 100%;
        height: ${props => props.adbItems?"84px":"10px"};
        transition: all .3s ease-in;
        z-index: 949;
        box-shadow: 0 -2px 30px 0 rgba(0,0,0, 0.15);
        
        &.open {
            height: fit-content;
            min-height: 500px;
            max-height: calc(100vh - 70px);
            .body-container {
                overflow: auto;
                max-height: calc(-200px + 100vh);
                min-height: inherit;
            }
        }

        ${Styles.BreakpointsUtils.mobileOnly(`
            bottom: -40px;
            height: 0;
            &.open {
                .upsidedown {
                    top: -41px;
                }
            }
        `)}

        ${Styles.BreakpointsUtils.desktopOnly(`
            &.open {
                .body-container {
                    top: calc(-280px + 100vh);
                }
            }            
        `)}
        
        .wrapper-card {
            ${Styles.BreakpointsUtils.mobileOnly(`
                top: -40px;
            `)}
        }
    }
`;

export const TabButton = styled.div`
    background-color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$main_red"]};
    color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$white"]};
    //font-family: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$medium"]};
    font-family: Helvetica, Arial, sans-serif;
    font-weight: 500;
    font-size: 16px;
    box-shadow: 0px 2.87px 17.25px 0px rgba(196, 21, 28, 0.5);
    position: absolute;
    left: calc(50% - 102.5px);
    top: -43px;
    padding: 12px 44px 9px 16px;
    letter-spacing: 0.2px;
    border-radius: 10px 10px 0 0;
    text-transform: uppercase;
    cursor: pointer;
    z-index: 0;
    i {
        font-size: 38px;
        position: absolute;
        right: 5px;
        top: 3px;
    }

    ${Styles.BreakpointsUtils.mobileOnly(`
        top: -85px;
        border-radius: 0;
        width: 100%;
        left: 0;
        text-align: center;
        padding: 12px 16px 9px;
        i {
            font-size: 30px;
            background: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$main_red"]};
            box-shadow: 0px 2.87px 17.25px 0px rgba(196, 21, 28, 0.5);
            border-radius: 10px 10px 0 0;
            right: calc(50% + -20px);
            top: -27px;
            padding: 0 4px 0;
        }
    `)}
`;

export const ContentDiv = styled.div`
    background-color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$white"]};
    max-width: 1230px;
    margin: 0 auto;
    position: relative;
`;

export const NavBarContainer = styled.div`
    position: relative;
    &:after {
        content: '';
        background: rgb(138, 181, 209);
        display: block;
        position: absolute;
        bottom: 4px;
        height: 2px;
        width: 100%;
        z-index: 0;
    }
`;
export const NavBar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    overflow: auto hidden;
    padding-bottom: 4px;
    scroll-behavior: smooth;
`;
export const LoadingSticky = styled.div`
    background: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$white"]};
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    width: 100%;
    height: 400px;

    .tpd-loading-container {
        display: block;
        width: 60px;
        height: 60px;
        margin: -100px auto 0;
        .tpd-loading {
            position: relative;
            height: 100%;
            width: 100%;
            .sk-circle {
                margin: 0;
                width: 60px;
                height: 60px;
                .sk-child {
                    color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$space_cadet"]};
                }
            }
        }
    }
    
    ${Styles.BreakpointsUtils.tabletAndDesktopOnly(`
        height: 596px;
        .tpd-loading-container {
            height: 140px;
            width: 140px;
            .tpd-loading {
                .sk-circle {
                    width: 140px;
                    height: 140px;
                }
            }
        }
    `)}
`;

export const Body = styled.div`
    padding: 20px 22px 10px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    min-height: 300px;
  
    ${Styles.BreakpointsUtils.tabletAndDesktopOnly(`
        padding: 48px 40px 10px;
        gap: 24px
    `)}
    
    ${Styles.BreakpointsUtils.desktopOnly(`
        padding: 24px 0 10px;
        gap: 40px
    `)}

    &.no-card{
        gap: 0px
    }
`;

export const WrapperCard = styled.div`
    ${Styles.BreakpointsUtils.mobileOnly(`
        position: absolute;
        top: -40px;
        left: 0;
        right: 0;
        width: 100%;
        z-index: 1;
    `)}
`;

export const WrapperForm = styled.div`
    width: 100%;
    flex: 1;
    min-width: 1px;
  
    &.multiple-adb {
      
    }

    &.single-adb {
        ${Styles.BreakpointsUtils.desktopOnly(`
            .form-plate {
                max-width: 50%;
            }
        `)}
    }
`;

export const BoxWrapper = styled.div<{
    numItems:number
}>`
    min-width: 115px;
    width: 100%;
    padding-top: 10px;
    position: relative;
    z-index: 1;
`

export const MarketingCardPreventivatore = styled.div`
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

    ${Styles.BreakpointsUtils.tabletAndDesktopOnly(`
      max-width: 280px;
    `)}

    ${Styles.BreakpointsUtils.desktopOnly(`
      max-width: 380px;
    `)}

  .mobile {
    ${Styles.BreakpointsUtils.tabletAndDesktopOnly(`
      display:none;
    `)}
  }

  .desktop {
    ${Styles.BreakpointsUtils.mobileOnly(`
      display:none;
    `)}
  }
`

export const ImageWrapper = styled.div`
  height: 150px;
  width: 100%;
  position: sticky;
  z-index: 2; 
  img{
    height:150px;
    max-width: 100%;
    object-fit: cover;
    object-position: center bottom;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
  }

  &.margin-bottom-40 {
    margin-bottom: -40px;
  }

  &.border-radius {
     img{
      border-radius: 10px 10px 0 0;
     }
  }
`;

export const TitleWrapper = styled.div<BgProps>`
  width: 100%;
  height: fit-content;
  background: ${(props) => props.bgColor};
  box-sizing: border-box;
  color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$white"]};
  display: flex;
  flex-direction: row;
  padding: 8px 16px;
`;

export const IconWrapper = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  img{
    height: 24px;
    margin-bottom: 5px;
  }
`;

export const LabelTitle = styled.div`
  color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$white"]};
  margin-left: 5px;
  font-size: 18px;
  line-height: 18px;
  //font-family: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$bold"]};
  font-family: Helvetica, Arial, sans-serif;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;

  ${Styles.BreakpointsUtils.mobileOnly(`
    font-size: 16px;
  `)}
`;

export const DiscountWrapper = styled.div<BgProps>`
  width: 100%;
  background: ${(props) => props.bgColor};
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding-top: 10px;

  .rich-text-preview-mode-container {
    p {
      max-height: 92px;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom:0px;
      ${Styles.BreakpointsUtils.desktopOnly(`
        padding: 16px 0;
      `)}
    }
  }
`;

export const LeftDivDiscount = styled.div<WidthProps>`
  width: ${(props) => props.widthDiscount.leftPercentage};
  height: 100%;
  min-height: 90px;
  color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$space_cadet"]};
  font-family: Helvetica, Arial, sans-serif;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
    span {
        font-size: 24px !important;
        padding: 0 12px;
        display: block;
    }

  ${Styles.BreakpointsUtils.tabletOnly(`
     * {
        font-size: 22px !important;
        line-height: 27px !important;
     }
  `)}
`;

export const RightDivDiscount = styled.div<WidthProps>`
  width: ${(props) => props.widthDiscount.rightPercentage};
  font-family: Helvetica, Arial, sans-serif;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  justify-content: center;
    position: relative;
    strong {
        position: absolute;
        top: 10px;
        left: 10px;
    }
  
  ${Styles.BreakpointsUtils.tabletOnly(`
   
  `)}
`;

export const ContentWrapper = styled.div<BgProps>`
  width: 100%;
  height: auto;
  overflow: auto;
  max-height: 180px;
  font-size: 18px;
  line-height: 27px;
    > div {
        padding: 0 8px;
    }

  background: ${(props) => props.bgColor};
  &.border-radius {
    border-radius: 0 0 10px 10px;
  }

  ${Styles.BreakpointsUtils.tabletOnly(`
     font-size: 16px;
     line-height: 24px;
  `)}

  scrollbar-width: none; 
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
