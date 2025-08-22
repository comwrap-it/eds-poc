import { AmbitoDiBisognoCode } from "../PreventivatoreSticky.data";
import iconCross from "../icons/cross-select.svg"
import iconCalendar from "../icons/app-icon-20-calendar.svg";

export const INFORMATIVA_PRIVACY = "Informativa sulla Privacy";
export const RECUPERA_PREVENTIVO = "Riprendi il preventivo";
export const CALCOLA_PREVENTIVO = "Calcola il Preventivo";
export const checkbox = "checkbox";
export const DELETE_CONTENT_BACKWARD = "deleteContentBackward";

export const ICONS = {
  CROSS: iconCross,
  CALENDAR: iconCalendar
}

export const WARNING_ADDRESS = "Assicurati di aver inserito un indirizzo valido";
export const IMPROVE_ADDRESS = "Inserisci i dati aggiuntivi";
export const WARNING_CURRENT_AGE = "La data di nascita é successiva alla data odierna";
export const WARNING_ADULT_AGE = "La data di nascita non é valida";
export const WARNING_OVER_80 = "Gli assicurati devono avere un'età inferiore agli 80 anni";
export const WARNING_OVER_75 = "Gli assicurati devono avere un'età inferiore ai 75 anni"
export const STRING = "string";
export const ADDRESS_FIELDS = {
  STREET_NUMBER: "street_number",
  ROUTE: "route",
  LOCALITY: "locality",
  AAL2: "administrative_area_level_3",
  POSTAL_CODE: "postal_code",
};

export const selectorOptions = {
  PUPREVIDENZA: {
    label: "previdenza",
    icon: "icon-Clessidra",
    showRetrieveEstimate: false,
    redirectTo: "/pensione-integrativa-su-misura",
    code: 'PU'+AmbitoDiBisognoCode.PREVIDENZA,
  },
};

export enum LABELS_FORM {
  TARGA = "Targa",
  SOLAR_PANELS = "Ho i pannelli solari",
  DATA_DI_NASCITA = "Data di nascita",
  INDIRIZZO_MAIL = "Indirizzo email",
  INDIRIZZO_RESIDENZA = "Indirizzo di residenza",
  FASCIA_ETA = "Fascia di età",
  "Casa e Famiglia" = "Tipo di abitazione",
  Pet = "Quale amico a quattro zampe vuoi assicurare?",
  TRANSFER_CLASS = "Voglio trasferire la classe di merito ad un altro veicolo",
  NO_PLATE = "Non ho la targa",
  HAI_P_IVA = "Hai la partita iva o sei titolare di una società?",
  ABITAZIONE_LEGNO_BIOEDILIZIA = "L'abitazione è costruita in legno o bioediliza?",
  VAI_QUI = "Vai qui",
  FAI_PREVENTIVO_QUI = "Fai il preventivo qui",
  TIPO_VEICOLO = "Tipo veicolo",
  INDIRIZZO_ABITAZIONE = "Indirizzo dell'abitazione",
  TIPO_ANIMALE = "Tipologia animale",
  PAESE_DESTINAZIONE = "Paese di destinazione",
  SETTORE = "Settore",
  EMAIL = "Indirizzo email",
  N_VIAGGIATORI = "Numero di viaggiatori",
  CODICE_FISCALE = "Codice fiscale",
}
