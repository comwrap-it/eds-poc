import styled from "@emotion/styled";

export const UsHelpButtonContainer = styled.div`
    .DefaultUsButtonContainer {
        font-size: 16px;

        .help-button {
            width: 20px;
            height: 20px;
            margin-left: 5px;
            cursor: pointer;
        }
        }

        .titolo {
        font-size: 18px;
        font-family: $bold;
        }

        .contenuto {
        font-size: 18px;
        font-family: $normal;
        text-transform: none;
        }

        .PuUsButtonContainer {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;
        width: auto;
        height: auto;

        position: relative;

        //Descrive l'icona dellbutton
        > .usButtonIcon {
            aspect-ratio: 1 / 1;
            display: block;
            width: 20px;

            background-image: url("/NextAssets/icons/icon-Info.svg");
            background-position: center;
            background-repeat: no-repeat;

            cursor: pointer;

            border-radius: 50%;
        }

        //Descrive il contenitore della tooltip
        > .usButtonTooltipBody {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
            background-color: $main_color;
            border-radius: 24px;
            padding: 32px 20px;
            gap: 20px;
            font-family: "Unipol";
            font-weight: 500;
            font-size: 16px;
            color: white;

            /*position: absolute;
            top: 0;
            right: 0;
            transform: translateY(-110%);*/

            &.hidden {
            display: none;
            }

            > .content {
            display: block;
            max-width: 255px;
            width: 100%;
            }

            //Descrive il buttonX
            > .xButton {
            aspect-ratio: 1 / 1;
            display: block;
            width: 20px;
            position: relative;
            cursor: pointer;

            &::before,
            &::after {
                content: "";
                background: white;
                height: 100%;
                width: 3%;
                border-radius: 25%;
                position: absolute;
                top: 0;
                left: 50%;
            }

            &::before {
                transform: translateX(-50%) rotateZ(45deg);
            }

            &::after {
                transform: translateX(-50%) rotateZ(-45deg);
            }
            }
        }
        }
    
`;