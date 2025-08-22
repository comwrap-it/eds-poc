import {
  WARNING_ADULT_AGE,
  WARNING_CURRENT_AGE,
} from "../Form.data";
import { VehicleFieldsEnum } from "../forms-costants";

export const triggerAuto = async (
  trigger: (name: any) => Promise<boolean>,
  onlyPlate = false
) => {
  await trigger(VehicleFieldsEnum.PLATE);
  if (!onlyPlate) {
    await trigger(VehicleFieldsEnum.BIRTHDAY);
    await trigger(VehicleFieldsEnum.EMAIL);
  }
};


export const regexTargaTipoVeicolo = (tipoVeicolo: string): RegExp => {
  let regex: RegExp;

  switch (tipoVeicolo) {
    //Autovetture, Taxi, Quadricicli pesanti, Autocarri leggeri
    case "1":
    case "3":
    case "10":
    case "4L":
      regex = new RegExp("^[A-Z]{2}\\d{3}[A-Z]{2}$");
      break;
    //Ciclomotore
    case "9":
      regex = new RegExp(
        "^X[A-Z0-9]{5}$"
      );
      break;
    //Quadriciclo leggero
    case "11":
      regex = new RegExp("^[A-Z]\\d{3}[A-Z]{2}$");
      break;
    //Motociclo e motocarro
    case "8":
    case "5":
      regex = new RegExp("^[A-Z]{2}\\d{5}$");
      break;
    //Ciclomotore per il trasporto di cose
    case "6":
      // vecchia regex rimossa per il defect 1256020
      //regex = new RegExp("^[A-Z]\\d{3}[A-Z]{3}$");
      // matcha tutto tranne stringa vuota
      regex = new RegExp("^.+$");
      break;
    default:
      regex = new RegExp("^[A-Z]{2}\\d{3}[A-Z]{2}$");
      break;
  }

  return regex;
}

export const formConfig = (
  vehicleOptions: any,
  ToUsIndirizzoGooglePlaces: any,
  initialValueEmail: any,
  initialValueBirthdate: any,
  initialValuePlate: any,
  noPlateChecked: any,
  getValues : any
): any => {
  const vehicle_type_options = vehicleOptions || [];

  return {
    [VehicleFieldsEnum.TYPE]: {
      name: VehicleFieldsEnum.TYPE,
      placeholder: "Tipo veicolo",
      options: vehicle_type_options,
      rules: {
        required: {
          message: "Specificare il tipo di veicolo",
          value: true,
        },
      },
    },
    [VehicleFieldsEnum.PLATE]: {
      name: VehicleFieldsEnum.PLATE,
      placeholder: "Inserisci targa",
      defaultValue: initialValuePlate,
      readOnly: noPlateChecked,
      rules: {
        /*
            ALM 1235057 -> Non si aspettavano l'obbligatorietà della targa.
            required: {
                message: 'Inserire il numero di targa',
                value: true
            },
             */
        maxLength: {
          value: 10,
          message: "Il numero massimo di caratteri è 10",
        },
        validate: (inputField: string) => {
          if (inputField.length > 0) {
            let regexFormato = new RegExp("^[A-Za-z0-9]{3,}$");

            const tipoVeicolo = getValues(VehicleFieldsEnum?.TYPE);
            if (tipoVeicolo !== "4L") {
              regexFormato = regexTargaTipoVeicolo(tipoVeicolo);
            }

            if (!regexFormato.test(inputField.toUpperCase().trim()))
              return "Formato targa errato";
            else return null;
          } else return null;
        },
      },
    },
    [VehicleFieldsEnum.BIRTHDAY]: {
      name: VehicleFieldsEnum.BIRTHDAY,
      placeholder: "gg/mm/aaaa",
      onFocusPlaceholder: "gg/mm/aaaa",
      defaultValue: initialValueBirthdate,
      /*ALM 1238090
        readOnly: !!initialValueBirthdate,*/
      rules: {
        required: {
          value: true,
          message: " Inserire la data di nascita",
        },
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
          const tipoVeicolo = getValues(VehicleFieldsEnum?.TYPE);
          const ageLimit = tipoVeicolo === "4L" ? 14 : 18;
          let age = currentDate.getFullYear() - testDate.getFullYear();
          // Check if the birthday has already passed
          if (
            currentDate.getMonth() < testDate.getMonth() ||
            (currentDate.getMonth() === testDate.getMonth() &&
              currentDate.getDate() < testDate.getDate())
          ) {
            age--;
          }
          const isAdult = age >= ageLimit;
          return testDate >= currentDate
            ? WARNING_CURRENT_AGE
            : !isAdult
            ? WARNING_ADULT_AGE
            : undefined;
        },
      },
    },
    [VehicleFieldsEnum.EMAIL]: {
      name: VehicleFieldsEnum.EMAIL,
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
