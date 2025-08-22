import { AmbitoDiBisognoCode, AmbitoDiBisongnoCmsData } from "../PreventivatoreSticky.data";

export const mapAmbitoCodeToUrlAmbito = (ambitoCode: any) => {
    let amb = "";
    switch (ambitoCode) {
      case AmbitoDiBisognoCode.AUTO:
        amb = "veicolo";
        break;
      case AmbitoDiBisognoCode.CASA:
        amb = "casa";
        break;
      case AmbitoDiBisognoCode.FAMIGLIA:
        amb = "famiglia";
        break;
      case AmbitoDiBisognoCode.ANIMALE:
        amb = "pet";
        break;
      case AmbitoDiBisognoCode.VIAGGIO_TEMPORANEO:
        amb = "viaggi";
        break;
      case AmbitoDiBisognoCode.MOBILITA:
        amb = "mobilita";
        break;
      case AmbitoDiBisognoCode.SALUTE:
        amb = "salute";
        break;
      case AmbitoDiBisognoCode.INFORTUNI:
        amb = "infortuni";
        break;
      case AmbitoDiBisognoCode.PREVIDENZA:
        amb = "previdenza";
        break;
    }
    return amb;
  }

  export const filterADBFromCMSData = (cmsData: AmbitoDiBisongnoCmsData): (el: any) => boolean => {
    let esito = (el: any) => false;

    switch (cmsData){
      case AmbitoDiBisongnoCmsData.AUTO:
        esito = (el) => el.entityKey.code === 'PUAUTO';
        break;
      case AmbitoDiBisongnoCmsData.AUTOCARRO:
        esito = (el) => el.entityKey.code === 'PUAUTO';
        break;
      case AmbitoDiBisongnoCmsData.CASA:
        esito = (el) => el.entityKey.code === 'PUCASA';
        break;
      case AmbitoDiBisongnoCmsData.CASA_FAMIGLIA:
        esito = (el) => el.entityKey.code === 'PUCASA' || el.entityKey.code === 'PUFAMIGLIA' || el.entityKey.code === 'PUPET' || el.entityKey.code === "PUVIAGGI";
        break;
      case AmbitoDiBisongnoCmsData.FAMIGLIA:
        esito = (el) => el.entityKey.code === 'PUFAMIGLIA';
        break;
      case AmbitoDiBisongnoCmsData.GENERALE:
        esito = () => true;
        break;
      case AmbitoDiBisongnoCmsData.INFORTUNI:
        esito = (el) => el.entityKey.code === "PUINFORTUNI";
        break;
      case AmbitoDiBisongnoCmsData.MOBILITA:
        esito = (el) => el.entityKey.code === 'PUMOBILITA';
        break;
      case AmbitoDiBisongnoCmsData.MOTO:
        esito = (el) => el.entityKey.code === 'PUAUTO';
        break;
      case AmbitoDiBisongnoCmsData.PERSONA:
        esito = (el) => el.entityKey.code === "PUSALUTE" || el.entityKey.code === "PUINFORTUNI";
        break;
      case AmbitoDiBisongnoCmsData.PET:
        esito = (el) => el.entityKey.code === 'PUPET';
        break;
      case AmbitoDiBisongnoCmsData.RISPARMIO_PREVIDENZA:
        esito = (el) => el.entityKey.code === 'PUPREVIDENZA';
        break;
      case AmbitoDiBisongnoCmsData.SALUTE:
        esito = (el) => el.entityKey.code === "PUSALUTE";
        break;
      case AmbitoDiBisongnoCmsData.UNICA:
        esito = (el) => el.entityKey.code !== 'PUPREVIDENZA';
        break;
      case AmbitoDiBisongnoCmsData.VEICOLI:
        esito = (el) => el.entityKey.code === 'PUAUTO';
        break;
      case AmbitoDiBisongnoCmsData.VEICOLI_MOBILITA:
        esito = (el) => el.entityKey.code === 'PUAUTO' || el.entityKey.code === 'PUMOBILITA';
        break;
      case AmbitoDiBisongnoCmsData.VIAGGIO:
        esito = (el) => el.entityKey.code === 'PUVIAGGI';
        break;
      default:
        esito = () => true;
        break;
    }

    return esito;
  }

export type TContainer = "body" | "title" | "discount";

