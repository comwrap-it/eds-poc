import {
  IMPROVE_ADDRESS,
  STRING,
  WARNING_ADDRESS,
  WARNING_CURRENT_AGE,
  WARNING_OVER_80,
} from "../Form.data";
import { MobilityFieldsEnum } from "../forms-costants";

export const formConfig = (props: any): any => {
  const { initialValueBirthdate, ToUsIndirizzoGooglePlaces, getValues } = props;

  return {
    [MobilityFieldsEnum.BIRTHDAY]: {
      name: MobilityFieldsEnum.BIRTHDAY,
      placeholder: "gg/mm/aaaa",
      onFocusPlaceholder: "gg/mm/aaaa",
      defaultValue: initialValueBirthdate,
      /*ALM 1238090
      readOnly: !!initialValueBirthdate,*/
      rules: {
        required: "Il campo è obbligatorio",
        maxLength: 10,
        pattern: {
          message: "Formato data errato",
          value:
            /^(0[1-9]|[12][0-9]|3[01])[\/](0[1-9]|1[012])[\/](19|20)[0-9]{2}$/,
        },
        validate: (inputField: string) => {
          const [day, month, year] = inputField.split("/").map(Number);
          const testDate = new Date(year, month - 1, day);
          const currentDate = new Date();
          if (testDate >= currentDate) {
            return WARNING_CURRENT_AGE;
          } else {
            let age = currentDate.getFullYear() - testDate.getFullYear();
            // Check if the birthday has already passed
            if (
              currentDate.getMonth() < testDate.getMonth() ||
              (currentDate.getMonth() === testDate.getMonth() &&
                currentDate.getDate() < testDate.getDate())
            ) {
              age--;
            }
            if (age >= 80) {
              return WARNING_OVER_80;
            }
          }
        },
      },
    },
    [MobilityFieldsEnum.EMAIL]: {
      name: MobilityFieldsEnum.EMAIL,
      placeholder: "Inserisci indirizzo e-mail",
      defaultValue: props.initialValueEmail,
      /*ALM 1238090
        readOnly: !!props.initialValueEmail,*/
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
