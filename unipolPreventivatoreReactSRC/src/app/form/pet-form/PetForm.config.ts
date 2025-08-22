import { PetFieldsEnum } from "../forms-costants";

export const formConfig = (optionSelect: any, initialValueEmail: any): any => {
    // const pet_age_options = optionSelect.find(({ code }) => code === "ETA").dropDownItems || [];
    const pet_type_options = optionSelect.find(({ code }: any) => code === "TIPORISC").dropDownItems || [];
  
    return {
      [PetFieldsEnum.TYPE]: {
        name: PetFieldsEnum.TYPE,
        placeholder: "Seleziona tipologia animale",
        options: pet_type_options,
        rules: {
          required: {
            message: "Specificare la tipologia di animale",
            value: true,
          }
        },
      },
      /*[PetFieldsEnum.AGE]: {
        name: PetFieldsEnum.AGE,
        placeholder: "Seleziona",
        options: pet_age_options,
        wholeOptionAsValue: true,
        rules: {
          required: {
            message: "Specificare una fascia d'eta",
            value: true,
          },
        },
      },*/
      [PetFieldsEnum.EMAIL]: {
        name: PetFieldsEnum.EMAIL,
        placeholder: 'Inserisci indirizzo e-mail',
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
                value: /^(([^<>()[\]\\.,;:\s@+"]+(\.[^<>()[\]\\.,;:\s@+"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            }
        }
    }
    };
  };
