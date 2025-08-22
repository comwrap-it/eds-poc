import React, { useState } from "react";
import { UsHelpButtonContainer } from "./UsHelpButton.style";
import { TpdModal } from "../TpdModal/TpdModal";

export enum UsHelpButtonType {
    default = "default",
    pu = "pu",
}

interface UsHelpButtonProps {
    title: string;
    content: string | undefined;
    icon?: "info" | "question";
    labelButton?: string;
    type: UsHelpButtonType;
}

export const UsHelpButton = (props: UsHelpButtonProps) => {

    const {
        icon = 'info', 
        type = UsHelpButtonType.default,
        labelButton,
        content,
        title
    } = props;

    const [ isHelpModalVisible, setIsHelpModalVisible ] = useState<boolean>(false);

    const switchHelpModalVisibility = (): void => {
        setIsHelpModalVisible(!isHelpModalVisible)
    }

    return (
        <UsHelpButtonContainer className="widget-global-style">
            { type === UsHelpButtonType.default && 
                <div className="DefaultUsButtonContainer">
                    { labelButton && <span  dangerouslySetInnerHTML={{__html: labelButton}}></span> }
                    { icon === 'question' &&
                        <img
                        src="/TpdPortalCommons/build/assets/questionCircle.png"
                        alt=""
                        width="15"
                        height="15"
                        className="help-button"
                        data-testid="help-button"
                        onClick={() => switchHelpModalVisibility()}/>
                    }
                    { icon === 'info' &&
                        <img
                        src="/TpdPortalCommons/build/assets/icon-20-tooltip.png"
                        alt=""
                        className="help-button"
                        data-testid="help-button"
                        onClick={() => switchHelpModalVisibility()}/>
                    }
                    { isHelpModalVisible &&
                        <TpdModal
                            className={"modal-help-button"}
                            onClose={() => switchHelpModalVisibility()}
                            buttonCloseOn={false}
                            type={"custom"}
                            title={(
                                <div className="modal-title-container">
                                    <div className="titolo bold">{title}</div>
                                </div>
                                )}
                            content={(
                                <div className="modal-content-container">
                                    <div className="contenuto" dangerouslySetInnerHTML={{__html: content ? content : ''}}></div>
                                </div>
                            )}
                        ></TpdModal>
                    }
                </div>
            }
            {
                type === UsHelpButtonType.pu && 
                <div className="PuUsButtonContainer">
                    <div className={`usButtonTooltipBody ${!isHelpModalVisible ? "hidden" : ""}`}>
                        <span className="content" dangerouslySetInnerHTML={{__html: content ? content : ''}}></span>
                        <span className="xButton" onClick={() => switchHelpModalVisibility()}></span>
                    </div>
                    <span className="usButtonIcon" onClick={() => switchHelpModalVisibility()}></span>
                </div>
            }
        </UsHelpButtonContainer>
    )
}


