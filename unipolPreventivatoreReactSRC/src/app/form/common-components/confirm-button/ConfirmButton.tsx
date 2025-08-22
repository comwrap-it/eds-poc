import React from "react";
import {CALCOLA_PREVENTIVO, INFORMATIVA_PRIVACY} from "../../Form.data";
import { UsButton, UsButtonColorsEnum, UsButtonTypeEnum } from "../../../libs/react/components";

const ConfirmButton = (props: any) => {
    const {onSubmit, onPrivacyClick,onRecuperaPreventivoClick, isValid, getValues, showInformativaPrivacy, trigger} = props;
    return (
        <>
            <div id="submit-container" className="submit-container">
                <UsButton
                    colore={UsButtonColorsEnum.ROSSO_DISABLED_GREY}
                    onClick={async () => {
                      await (trigger && trigger());
                      isValid && onSubmit(getValues())
                    }}
                    versione={UsButtonTypeEnum.UNICO_BACKGROUND}
                >
                    {CALCOLA_PREVENTIVO}
                </UsButton>
            </div>
            { showInformativaPrivacy() && <div className="privacy-link-container">
                <button onClick={onPrivacyClick} className="informativa-privacy-link">{INFORMATIVA_PRIVACY}</button>
            </div>}
            <div id="recupera-preventivo-link-container" className="recupera-preventivo-link-container">
                <div className="recupera-preventivo-link-container-body">
                    <div>Hai già fatto un preventivo?</div>
                    {/* <ReactMFE.Link
                      __deps__={React}
                      href={Helpers.EnvironmentHelper.isClientSide() && Helpers.LoginHelper.userLogged ? "/area_riservata/preventivi" : "/recupera-preventivo"}
                      onMouseDown={(e) => onRecuperaPreventivoClick()}
                    >
                      {RECUPERA_PREVENTIVO}
                    </ReactMFE.Link> */}
                    <a href="/recupera-preventivo">Recupera Preventivo</a>
                </div>
            </div>
        </>
    );
};

export default ConfirmButton;
