import React, {useEffect, useState, useRef} from "react";
import {TpdLoadingContainer} from "./TpdLoading.style";

export interface TpdLoadingProps {
    overlayedSpinner?: boolean;
    inlayedSpinner?: boolean;
    fixedHeight?: boolean;
    fixedHeightSmall?: boolean;
    marginUnibox?: boolean;
    overlayTitle?: string;
    customCirleStyle?: object;
    delay?: number;
    isLoading: boolean;
}

export const TpdLoading = (props: TpdLoadingProps) => {

    const currentTimeout = useRef<any>(null);
    const [isDelayedRunning, setDelayedRunning] = useState<boolean>(false);
    const [isSvil, setSvil] = useState<boolean>(false);
    const isLoadingCalled = useRef<boolean>(false);

    // on props.isLoading change
    useEffect((): void => {
        isLoadingCalled.current = true;
        if (!props.isLoading) {
            cancelTimeout();
            setDelayedRunning(false);
            return;
        }
        if (currentTimeout.current) return;
        currentTimeout.current = setTimeout((): void => {
            setDelayedRunning(props.isLoading);
            cancelTimeout();
        }, props.delay);
    }, [props.isLoading]);

    const cancelTimeout = (): void => {
        clearTimeout(currentTimeout.current);
        currentTimeout.current = undefined;
    }

    useEffect(() => {
        if (!isLoadingCalled.current) {
            throw new Error(
                '[isLoading] is missing! Usage: <tpd-loading [isLoading]="isLoading"></tpd-loading>.'
            );
        }
        return () => {
            // on unmount
            cancelTimeout();
        }
    }, []);


    return (
        <TpdLoadingContainer className={"tpd-loading-container"}>
            <div
                className={`${props.fixedHeight ? 'fixedHeight' : ''}
                ${props.fixedHeightSmall ? 'fixedHeightSmall' : ''}
                ${props.marginUnibox ? 'marginUnibox' : ''}
                ${props.inlayedSpinner ? 'inLayer' : ''}`}>
                <div
                    data-testid="loading-spinner"
                    className={`col-xs-24 tpd-loading ${props.overlayedSpinner ? 'overLayer' : ''}`}
                >
                    <div
                        className={`sk-circle ${props.fixedHeightSmall ? 'smallDiv' : ''}`}
                        style={props.customCirleStyle}
                    >
                        <div className="sk-circle1 sk-child"></div>
                        <div className="sk-circle2 sk-child"></div>
                        <div className="sk-circle3 sk-child"></div>
                        <div className="sk-circle4 sk-child"></div>
                        <div className="sk-circle5 sk-child"></div>
                        <div className="sk-circle6 sk-child"></div>
                        <div className="sk-circle7 sk-child"></div>
                        <div className="sk-circle8 sk-child"></div>
                    </div>
                </div>
                {
                    isSvil && props.overlayTitle && props.overlayTitle != '' && isDelayedRunning && (
                        <div className="loading-text" data-testid="loading-text">
                            {props.overlayTitle}...
                        </div>
                    )
                }
            </div>
        </TpdLoadingContainer>
    )
}

TpdLoading.defaultProps = {
    overlayedSpinner: false,
    inlayedSpinner: false,
    fixedHeightSmall: false,
    delay: 300
};