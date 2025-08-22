import React, { useEffect } from 'react';
import {TpdModalContainer} from "./TpdModal.style";

export interface TpdModalProps {
    className: string;
    buttonCloseOn: boolean;
    internalAnalytics?: any;
    type: "default" | "custom";

    title: React.ReactNode;
    content: React.ReactNode;
    footer: React.ReactNode;

    onOpen?(): void;
    onClose?(): void;
}

export const TpdModal = (props: TpdModalProps) => {

    useEffect(() => {
        // on modal open
        if (typeof document === "object") {
            const body = document.querySelector("body");
            if (body) body.style.overflow = "hidden";
            props.onOpen && props.onOpen();
        }

        return () =>{
            // on destroy
            // on modal close
            close();
        }
    }, [props.internalAnalytics]);

    const close = (): void => {
        if (typeof document === "object") {
            const body = document.querySelector("body");
            if (body) body.style.overflow = "auto";
        }
        props.onClose && props.onClose();
    }

    return (
        <TpdModalContainer className={`${props.className} tpd-modal-overlay`}>
            <div
                className={`${props.type === 'default' ? 'tpd-modal-container' : ''} ${props.type === 'custom' ? 'tpd-modal-container-custom' : ''} tpd-modal`}
                role="dialog"
            >
                <div className="tpd-modal-title title text-center">
                    <>{props.title}</>
                </div>
                {props.buttonCloseOn && (
                    <span className="close" onClick={close}>X</span>
                )}
                <div className="tpd-modal-content content">
                    <>{props.content}</>
                </div>
                <div className="tpd-modal-footer footer text-center">
                    <>{props.footer}</>
                </div>
            </div>
        </TpdModalContainer>
    )
}

TpdModal.defaultProps = {
    className: '',
    buttonCloseOn: true,
    title: <></>,
    content: <></>,
    footer: <></>,
    type: 'default'
}