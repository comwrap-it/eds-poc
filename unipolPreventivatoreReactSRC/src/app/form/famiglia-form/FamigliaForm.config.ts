import { FamilyFieldsEnum } from "../forms-costants";

export const formConfig = (
  ToUsIndirizzoGooglePlaces: any,
  getValues: any,
  optionSelect:any,
  initialValueEmail: any
): any => {
  const dwelling_type_options =
    optionSelect.find(({ code } : any) => code === "TIPOABITAZ").dropDownItems || [];

  return {
    [FamilyFieldsEnum.DWELLING_TYPE]: {
      name: FamilyFieldsEnum.DWELLING_TYPE,
      placeholder: "Seleziona tipo di abitazione",
      options: dwelling_type_options,
      rules: {
        required: {
          message: "Specificare il tipo di abitazione",
          value: true,
        },
      },
    },
    [FamilyFieldsEnum.EMAIL]: {
      name: FamilyFieldsEnum.EMAIL,
      placeholder: "Inserisci indirizzo e-mail",
      defaultValue: initialValueEmail,
      /*ALM 1238090
      readOnly: !!initialValueEmail,*/
      rules: {
        // required: {
        //     message: 'Campo obbligatorio',
        //     value: true
        // },
        pattern: {
          message: "L'indirizzo email non è formalmente valido",
          value: /^(([^<>()[\]\\.,;:\s@+"]+(\.[^<>()[\]\\.,;:\s@+"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        },
      },
    },
  };
};
