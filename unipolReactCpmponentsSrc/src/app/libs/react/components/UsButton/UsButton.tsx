import React, {useMemo} from "react";
import {UsButtonContainer} from "./UsButton.style";

export enum UsButtonTypeEnum {
    UNICO_BACKGROUND = "unicoBackground",
    BORDER_BOTTOM = "borderBottom",
    FLAT = "flat",
    TEXT_UNDERLINE = "text-underline",
    TEXT_NO_UNDERLINE = "text-no-underline",
    LIGHT_BLUE = "lightBlue",
}

export enum UsButtonColorsEnum {
    ROSSO = "rosso",
    ROSSO_DISABLED_GREY = "rosso-disabled-grey",
    AZZURRO_AR = "azzurro-ar",
    AZZURRO_AR_CTA = "azzurro-ar-cta",
    BLU_UNIPOL = "blu-unipol",
}

export interface UsButtonProps {
    disabled: boolean;
    versione: UsButtonTypeEnum;
    colore: UsButtonColorsEnum;
    width: string;
    radius: string;
    type: "button" | "submit";
    padding: string;
    style: object;
    fontsize: string;
    children: any;

    onClick(): void;
}

interface UsButtonStyle {
    width?: string;
    radius?: string;
    "border-radius"?: string;
    padding?: string;
    "font-size"?: string;
}

export const UsButton = (props: UsButtonProps) => {

    const buttonStyle = useMemo<UsButtonStyle>(() => {
        let style: UsButtonStyle = {
            width: props.width,
            "border-radius": props.radius,
            "font-size": props.fontsize,
            ...props.style,
        };
        if (props.padding) {
            style = {...props.style, padding: props.padding};
        }
        return style;
    }, [props.padding, props.style, props.width, props.radius, props.fontsize]);

    return (
        <UsButtonContainer
            role="button"
            type={props.type}
            className={`us-button ${props.versione} ${props.colore}`}
            disabled={props.disabled}
            onClick={props.onClick}
            style={buttonStyle}
        >
            {props.children}
        </UsButtonContainer>
    );
}

UsButton.defaultProps = {
    disabled: false,
    versione: UsButtonTypeEnum.UNICO_BACKGROUND,
    colore: UsButtonColorsEnum.ROSSO,
    width: "100%",
    radius: "0px",
    padding: "",
    style: {},
    fontsize: "16px",
    type: "button"
}