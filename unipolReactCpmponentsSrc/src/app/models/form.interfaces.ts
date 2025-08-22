import {
  FamilyFieldsEnum,
  HealthFieldsEnum,
  HouseFieldsEnum,
  MobilityFieldsEnum,
  PetFieldsEnum,
  PrevidenzaFieldsEnum,
  TravelsFieldsEnum,
  VehicleFieldsEnum,
} from "../form/forms-costants";

export enum UsHelpButtonType {
  default = "default",
  pu = "pu",
}

interface TSelectedItem {label:string, value:string}

/*
 * =================
 * PREVIDENZA FORM
 * =================
 */
export interface FormPreventivatorePrevidenzaProps {
  isLoading: boolean;
  privacyDisplayValue: string;
  disableMail: boolean;
  initialValueEmail: string;
  optionSelect: any[];
  showInformativaPrivacy():boolean;
  onPrivacyClick(): void;
  onRecuperaPreventivoClick(): void;
  onSubmit(formValue: any): void;
  onFocus(): void;
}
export type TFormPreventivatorePrevidenza = {
  [PrevidenzaFieldsEnum.WORKING_SECTOR]: string;
  [PrevidenzaFieldsEnum.EMAIL]: string;
};

/*
 * ===========
 * VIAGGI FORM
 * ===========
 */
export interface FormPreventivatoreViaggiProps {
  isLoading: boolean;
  disableMail: boolean;
  optionSelect: any[];
  initialValueEmail: string;
  showInformativaPrivacy():boolean;
  onPrivacyClick(): void;
  onRecuperaPreventivoClick(): void;
  onSubmit(formValue: any): void;
  onFocus(): void;
}

export type TFormPreventivatoreTravels = {
  [TravelsFieldsEnum.DESTINATION_COUNTRY]: string;
  [TravelsFieldsEnum.N_PEOPLE]: string;
  [TravelsFieldsEnum.EMAIL]: string;
};

/*
 * ============
 * SALUTE FORM
 * ============
 */
export type TFormPreventivatoreSalute = {
  [HealthFieldsEnum.BIRTHDAY]: string;
};

export interface FormPreventivatoreSaluteProps {
  isLoading: boolean;
  initialValueBirthdate: string;
  initialValueEmail: string;
  showInformativaPrivacy():boolean;
  onPrivacyClick(): void;
  onRecuperaPreventivoClick(): void;
  onSubmit(formValue: TFormPreventivatoreSalute): void;
  onFocus(): void;
}

/*
 * ===============
 * INFORTUNI FORM
 * ===============
 */

export interface FormPreventivatoreInfortuniProps {
  isLoading: boolean;
  initialValueBirthdate: string;
  initialValueEmail: string;
  initialValueCf: string;
  showInformativaPrivacy():boolean;
  onPrivacyClick(): void;
  onRecuperaPreventivoClick(): void;
  onSubmit(formValue: TFormPreventivatoreInfortuni): void;
  onFocus(): void;
}
export type TFormPreventivatoreInfortuni = {
  [HealthFieldsEnum.BIRTHDAY]: string;
  [HealthFieldsEnum.CF]: string;
};

/*
 * ===============
 * CASA FORM
 * ===============
 */

export interface FormPreventivatoreCasaProps {
    isLoading: boolean;
    isEditMode:boolean;
    optionSelect: any[];
    googleApiKey: string;
    initialValueEmail: string;
    showInformativaPrivacy():boolean;
    ToUsIndirizzoGooglePlaces(place: any): any;
    onPrivacyClick(): void;
    onRecuperaPreventivoClick(): void;
    onSubmit(formValue: any): void;
    onFocus(): void;
}

export type TFormPreventivatoreCasa = {
    [HouseFieldsEnum.DWELLING_TYPE]: TSelectedItem,
    [HouseFieldsEnum.DWELLING_ADDRESS]: string,
    [HouseFieldsEnum.SOLAR_PANELS]: boolean,
};

/*
 * ===============
 * FAMIGLIA FORM
 * ===============
 */

export interface FormPreventivatoreFamigliaProps {
    isLoading: boolean;
    optionSelect: any[];
    googleApiKey: string;
    isEditMode:boolean;
    initialValueEmail: string;
    showInformativaPrivacy():boolean;
    ToUsIndirizzoGooglePlaces(place: any): any;
    onPrivacyClick(): void;
    onRecuperaPreventivoClick(): void;
    onSubmit(formValue: any): void;
    onFocus(): void;
}

export type TFormPreventivatoreFamiglia = {
    [FamilyFieldsEnum.DWELLING_TYPE]: TSelectedItem ,
    [FamilyFieldsEnum.DWELLING_ADDRESS]: string,
    [FamilyFieldsEnum.SOLAR_PANELS]: boolean,
};

/*
 * ===============
 * PET FORM
 * ===============
 */

export interface FormPreventivatorePetProps {
    isLoading: boolean;
    optionSelect: any[];
    initialValueEmail: string;
    showInformativaPrivacy():boolean;
    onPrivacyClick(): void;
    onRecuperaPreventivoClick(): void;
    onSubmit(formValue: any): void;
    onFocus(): void;
}

export type TFormPreventivatorePet = {
    [PetFieldsEnum.AGE]: string,
    [PetFieldsEnum.TYPE]: TSelectedItem,
};

/*
 * ===============
 * MOBILITY FORM
 * ===============
 */

export interface FormPreventivatoreMobilityProps {
    isLoading: boolean;
    optionSelect: any[];
    googleApiKey: string;
    initialValueEmail: string;
    initialValueBirthdate: string;
    showInformativaPrivacy():boolean;
    ToUsIndirizzoGooglePlaces(place: any): any;
    onPrivacyClick(): void;
    onRecuperaPreventivoClick(): void;
    onSubmit(formValue: any): void;
    onFocus(): void;
}

export type TFormPreventivatoreMobility = {
    [MobilityFieldsEnum.BIRTHDAY]: string,
    [MobilityFieldsEnum.ADDRESS]: string,

};

/*
 * ===============
 * AUTO FORM
 * ===============
 */

export interface FormPreventivatoreAutoProps {
    isLoading: boolean;
    optionSelect: any[];
    googleApiKey: string;
    initialValueEmail: string;
    initialValueBirthdate: string;
    initialValuePlate: string;
    isEditMode:boolean;
    showInformativaPrivacy():boolean;
    ToUsIndirizzoGooglePlaces(place: any): any;
    onPrivacyClick(): void;
    onRecuperaPreventivoClick(): void;
    onSubmit(formValue: any): void;
    onFocus(): void;
}

export type TFormPreventivatoreAuto = {
    [VehicleFieldsEnum.BIRTHDAY]: string,
    [VehicleFieldsEnum.ADDRESS]: string,
    [VehicleFieldsEnum.PLATE]: string,
    [VehicleFieldsEnum.TYPE]: any,
    [VehicleFieldsEnum.TRANSFER_CLASS]: boolean,
    [VehicleFieldsEnum.PLATE_AVAIABLE]: boolean,
};
