import { TravelsFieldsEnum } from "../forms-costants";

const createOptionNumberPeople = (peopleNumber: any) => {
  const optionsPeopleNumber = [];
  for (let people = 1; people <= peopleNumber; people++) {
    const option = {
      label: people,
      value: people,
    };
    optionsPeopleNumber.push(option);
  }

  return optionsPeopleNumber;
};

export const formConfig = (options: any, initialValueEmail : any): any => {
  return {
    // [TravelsFieldsEnum.DESTINATION_COUNTRY]: {
    //   name: TravelsFieldsEnum.DESTINATION_COUNTRY,
    //         placeholder: 'Seleziona',
    //   options,
    //         rules:{
    //             required:{
    //                 message: 'Specificare un paese di destinazione',
    //                 value: true
    //             }
    //         }
    // },
    [TravelsFieldsEnum.N_PEOPLE]: {
      name: TravelsFieldsEnum.N_PEOPLE,
      placeholder: "Seleziona numero di viaggiatori",
      options: createOptionNumberPeople(4),
      rules: {
        required: {
          message: "Specificare il numero dei viaggiatori",
          value: true,
        },
      },
    },
    [TravelsFieldsEnum.EMAIL]: {
      name: TravelsFieldsEnum.EMAIL,
            placeholder: 'Inserisci indirizzo e-mail',
      defaultValue: initialValueEmail,
      /*ALM 1238090
      readOnly: !!initialValueEmail,*/
      rules: {
        // required: {
        //             message: 'Campo obbligatorio',
        //             value: true
        // },
        pattern: {
          message: "L'indirizzo email non è formalmente valido",
          value: /^(([^<>()[\]\\.,;:\s@+"]+(\.[^<>()[\]\\.,;:\s@+"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        }
      }
    }
  }
}
