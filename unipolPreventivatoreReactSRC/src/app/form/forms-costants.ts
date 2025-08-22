export enum HealthFieldsEnum {
  BIRTHDAY = "birthday",
  EMAIL = "email",
  CF = "cf"
}
export enum PrevidenzaFieldsEnum {
  WORKING_SECTOR = "working-sector",
  EMAIL = "email",
}
export enum TravelsFieldsEnum {
  DESTINATION_COUNTRY = "destination-country",
  EMAIL = "email",
  N_PEOPLE = "number-people"
}
export enum HouseFieldsEnum {
  DWELLING_TYPE = "dwelling-type",
  DWELLING_ADDRESS = "dwelling-address",
  SOLAR_PANELS = "solar-panels",
  EMAIL = "email"
}

export const FamilyFieldsEnum = HouseFieldsEnum;

export enum PetFieldsEnum {
  AGE = "age",
  TYPE = "type",
  EMAIL = "email"
}

export enum UsIndirizzoEnum {
  INDIRIZZO = "route",
  CIVICO = "street_number",
  REGIONE = "administrative_area_level_1",
  PROVINCIA = "administrative_area_level_2",
  COMUNE = "administrative_area_level_3",
  CAP = "postal_code",
  STATO = "country",
}

export enum PrivacyContent {
  viaggi = "Informativa_Viaggi",
  salute = "Informativa_Salute",
  infortuni = "Informativa_Infortuni",
  casa = "Informativa_Casa",
  famiglia = "Informativa_Famiglia",
  pet = "Informativa_CaneGatto",
  mobilita = "Informativa_Mobilita",
  auto = "Informativa_Auto",
}

export enum VehicleFieldsEnum {
  TYPE = "type",
  PLATE = "plate",
  PLATE_AVAIABLE = "plate-avaiable",
  TRANSFER_CLASS = "transfer-class",
  BIRTHDAY = "birthday",
  ADDRESS = "address",
  EMAIL = "email"
}

export enum MobilityFieldsEnum {
  BIRTHDAY = "birthday",
  ADDRESS = "address",
  EMAIL = "email"
}

export enum DWELLING_TYPE {
  APPARTAMENTO = "Appartamento",
  VILLA_SINGOLA = "Villa singola",
  VILLA_SCHIERA = "Villa a schiera",
}
