export const MAPPING_ADB_CONTENTID = {
  VEICOLI: "de15a629-14fa-4701-9a08-68eee60e6806",
  MOBILITA: "de15a629-14fa-4701-9a08-68eee60e6806",
  AUTO: "de15a629-14fa-4701-9a08-68eee60e6806",
  FAMIGLIA: "85f299db-cebd-419d-a697-db89eca14502",
  CASA: "85f299db-cebd-419d-a697-db89eca14502",
  PROTEZIONE: "9cc177ae-cc7b-4f40-b3a0-6d64c22f11ca",
  INFORTUNI: "9cc177ae-cc7b-4f40-b3a0-6d64c22f11ca",
};

export const KEYS_LOCALSTORAGE = {
  ADB_STORED_RESPONSE_KEY: "adb_stored_response",
  CONFIG_CARDS_KEY: "config_cards_stored_response",
};

export const PREVIDENZA = {
  id: "b42e5a4d-33e0-453e-ae44-34e546f84563",
  entityLabel: "PREVIDENZA",
  entityKey: {
    code: "PUPREVIDENZA",
    description: "Prodotto Unico - Previdenza",
  },
  domains: [
    {
      code: "TIPODIP",
      type: "DROPDOWN",
      dropDownItems: [
        {
          value: "1_Dipendente privato",
          label: "Dipendente privato",
        },
        {
          value: "1_Dipendente pubblico",
          label: "Dipendente pubblico",
        },
        {
          value: "2_Lavoratore autonomo",
          label: "Lavoratore autonomo",
        },
        {
          value: "5_Libero professionista",
          label: "Libero professionista",
        },
        {
          value: "43_Altro",
          label: "Altro",
        },
      ],
    },
  ],
};

export const MAPPING_ADB = {
  NAME: {
    PUCASA: "Casa",
    PUFAMIGLIA: "Famiglia",
    PUAUTO: "Veicoli",
    PUVEICOLO: "Veicoli",
    MOTO: "Veicoli",
    AUTOCARRO: "Veicoli",
    PUPET: "Cane e Gatto",
    PUVIAGGI: "Viaggi",
    PUMOBILITA: "Mobilità",
    PUINFORTUNI: "Infortuni",
    PUSALUTE: "Salute",
    PUPREVIDENZA: "Previdenza",
  },
  ICON: {
    PUCASA: "Casa",
    PUFAMIGLIA: "Famiglia",
    AUTO: "Veicoli",
    PUVEICOLO: "Veicoli",
    MOTO: "Veicoli",
    AUTOCARRO: "Veicoli",
    PUPET: "Cane e Gatto",
    PUVIAGGI: "Viaggio",
    PUMOBILITA: "Mobilita",
    PUINFORTUNI: "Infortuni",
    PUSALUTE: "Salute",
    PUPREVIDENZA: "Previdenza",
  },
};

export enum AmbitoDiBisognoCodePreselect {
  CASA = "PUCASA",
  FAMIGLIA = "PUFAMIGLIA",
  AUTO = "PUAUTO",
  VEICOLO = "PUAUTO",
  MOTO = "PUAUTO",
  AUTOCARRO = 'PUAUTO',
  // ANIMALE = "ANIMALE",
  VIAGGI = "PUVIAGGI",
  MOBILITA = "PUMOBILITA",
  INFORTUNI = "PUINFORTUNI",
  SALUTE = "PUSALUTE",
  PREVIDENZA = "PUPREVIDENZA",
  PET = "PUPET",
  // CASA_FAMIGLIA = "Casa e Famiglia",
  // CANE_GATTO = "Cane e Gatto",
  // VEICOLI_MOBILITA = "Veicoli e Mobilita",
  "VIAGGIO TEMPORANEO" = "PUVIAGGI",
}

export enum AmbitoDiBisognoCode {
  CASA = "PUCASA",
  FAMIGLIA = "PUFAMIGLIA",
  AUTO = "PUAUTO",
  VEICOLO = "PUVEICOLO",
  MOTO = "PUMOTO",
  AUTOCARRO = 'PUAUTOCARRO',
  ANIMALE = "PUPET",
  VIAGGIO_TEMPORANEO = "PUVIAGGI",
  MOBILITA = "PUMOBILITA",
  INFORTUNI = "PUINFORTUNI",
  SALUTE = "PUSALUTE",
  PREVIDENZA = "PUPREVIDENZA",
  PET = "PUPET",
  CASA_FAMIGLIA = "Casa e Famiglia",
  CANE_GATTO = "Cane e Gatto",
  VEICOLI_MOBILITA = "Veicoli e Mobilita",
}

export enum BeniAmbitoCode {
  AUTO = "PUVEICOLO",
  VEICOLO = "PUVEICOLO",
  MOTO = "PUVEICOLO",
  AUTOCARRO = "PUVEICOLO",
  CASA = "PUCASA",
  FAMIGLIA = "PUFAMIGLIA",
  INFORTUNI = "PUINFORTUNI",
  MOBILITA = "PUMOBILITA",
  ANIMALE = "PUPET",
  SALUTE = "PUSALUTE",
  "VIAGGIO TEMPORANEO" = "PUVIAGGI"
}

export enum AmbitoDiBisongnoCmsData{
  GENERALE = 'Generale',
  UNICA = 'Unica',
  VEICOLI_MOBILITA = 'Veicoli e Mobilita',
  CASA_FAMIGLIA = 'Casa e Famiglia',
  PERSONA = 'Persona',
  RISPARMIO_PREVIDENZA = 'Risparmio e Previdenza',
  VEICOLI = 'Veicoli',
  MOBILITA = 'Mobilita',
  CASA = 'Casa',
  FAMIGLIA = 'Famiglia',
  PET = 'Pet',
  VIAGGIO = 'Viaggio',
  INFORTUNI = 'Infortuni',
  SALUTE = 'Salute',
  AUTO = 'Auto',
  MOTO = 'Moto',
  AUTOCARRO = 'Autocarro'
}

export const AmbitoDiBisognoCmsDataPlainArray = [
  AmbitoDiBisongnoCmsData.GENERALE,
  AmbitoDiBisongnoCmsData.UNICA,
  AmbitoDiBisongnoCmsData.VEICOLI_MOBILITA,
  AmbitoDiBisongnoCmsData.CASA_FAMIGLIA,
  AmbitoDiBisongnoCmsData.PERSONA,
  AmbitoDiBisongnoCmsData.RISPARMIO_PREVIDENZA,
  AmbitoDiBisongnoCmsData.VEICOLI,
  AmbitoDiBisongnoCmsData.MOBILITA,
  AmbitoDiBisongnoCmsData.CASA,
  AmbitoDiBisongnoCmsData.FAMIGLIA,
  AmbitoDiBisongnoCmsData.PET,
  AmbitoDiBisongnoCmsData.VIAGGIO,
  AmbitoDiBisongnoCmsData.INFORTUNI,
  AmbitoDiBisongnoCmsData.SALUTE,
  AmbitoDiBisongnoCmsData.AUTO,
  AmbitoDiBisongnoCmsData.MOTO,
  AmbitoDiBisongnoCmsData.AUTOCARRO,
]


//DISCOUNTS
export const PERCENTAGE_DISCOUNT_DIV = {
  FIFTY_FIFTY: {
    LABEL: "50-50",
    CONFIG: {
      rightPercentage: "50%",
      leftPercentage: "50%",
    },
  },
  SIXTY_FOURTY: {
    LABEL: "60-40",
    CONFIG: {
      leftPercentage: "60%",
      rightPercentage: "40%",
    },
  },
};