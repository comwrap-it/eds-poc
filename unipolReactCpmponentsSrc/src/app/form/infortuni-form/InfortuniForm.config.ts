import { HealthFieldsEnum } from "../forms-costants";
import { WARNING_CURRENT_AGE, WARNING_OVER_80 } from "../Form.data";

export const formConfig = (props: any):any => {
    return {
        [HealthFieldsEnum.BIRTHDAY]: {
            name: HealthFieldsEnum.BIRTHDAY,
            placeholder: 'gg/mm/aaaa',
            onFocusPlaceholder: 'gg/mm/aaaa',
            defaultValue: props.initialValueBirthdate,
            /*ALM 1238090
            readOnly: !!props.initialValueBirthdate,*/
            rules: {
                required: 'Il campo è obbligatorio',
                maxLength: 10,
                pattern: {
                    message: 'Formato data errato',
                    value: /^(0[1-9]|[12][0-9]|3[01])[\/](0[1-9]|1[012])[\/](19|20)[0-9]{2}$/
                },
                validate: (inputField: string) => {
                    const [day, month, year] = inputField.split("/").map(Number);
                    const testDate = new Date(year, month - 1, day);
                    const currentDate = new Date();
                    if(testDate >= currentDate){
                      return WARNING_CURRENT_AGE
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
                }
            },
        },
        [HealthFieldsEnum.CF]: {
            name: HealthFieldsEnum.CF,
            placeholder: 'Inserisci il codice fiscale',
            defaultValue: props.initialValueCf,
            rules: {
                pattern: {
                    message: "Il codice fiscale non è formalmente valido",
                    value: /^(?:[A-Z][AEIOU][AEIOUX]|[B-DF-HJ-NP-TV-Z]{2}[A-Z]){2}(?:[\dLMNP-V]{2}(?:[A-EHLMPR-T](?:[04LQ][1-9MNP-V]|[15MR][\dLMNP-V]|[26NS][0-8LMNP-U])|[DHPS][37PT][0L]|[ACELMRT][37PT][01LM]|[AC-EHLMPR-T][26NS][9V])|(?:[02468LNQSU][048LQU]|[13579MPRTV][26NS])B[26NS][9V])(?:[A-MZ][1-9MNP-V][\dLMNP-V]{2}|[A-M][0L](?:[1-9MNP-V][\dLMNP-V]|[0L][1-9MNP-V]))[A-Z]$/
                },
                validate: (inputField: string) => {
                    if(inputField === ""){
                        return "Il campo è obbligatorio"
                    }

                    if(inputField.length === 16){
                        if(cfWithoutHomocody(inputField)){
                            if(checkLetterCalculation(inputField)) {
                                return "Il codice fiscale non è formalmente valido"
                            }else if(valideteCFOverAge(inputField , 80)){
                                return WARNING_OVER_80
                            }
                        }
                    }
                }
            },
            
        },
        [HealthFieldsEnum.EMAIL]: {
            name: HealthFieldsEnum.EMAIL,
            placeholder: 'Inserisci indirizzo e-mail',
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
                    value: /^(([^<>()[\]\\.,;:\s@+"]+(\.[^<>()[\]\\.,;:\s@+"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                }
            }
        }
    }
};

const cfWithoutHomocody = (cf: string) : boolean => {
    const cfRegexNoHomocody = /[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}/;
    const codiceFiscale = cf.toUpperCase();
    if(cfRegexNoHomocody.test(codiceFiscale)) {
        return true
    }
    return false
} 

const valideteCFOverAge = (cf: string, maxAge: number) : boolean => {
    const MESICF = {
        A: "01",
        B: "02",
        C: "03",
        D: "04",
        E: "05",
        H: "06",
        L: "07",
        M: "08",
        P: "09",
        R: "10",
        S: "11",
        T: "12",
    };

    const codiceFiscale = cf.toUpperCase();
    let anno = codiceFiscale.substring(6, 8);
    let mese = MESICF[codiceFiscale.substring(8, 9) as keyof typeof MESICF];
    let giorno = codiceFiscale.substring(9, 11);    


    if (parseInt(giorno) > 40) {
        giorno = (parseInt(giorno) - 40).toString();
        giorno = giorno.length > 1 ? giorno : `0${giorno}`;
    }
    anno = (parseInt(anno) < 20 ? "20" : "19") + anno;

    const date = new Date(parseInt(anno), parseInt(mese) - 1, parseInt(giorno));

    const currentDay = new Date();

    const msDifference = (currentDay as any) - (date as any); 

    const millisecondsInAYear = 365.25 * 24 * 60 * 60 * 1000; // Include gli anni bisestili
    let age = Math.floor(msDifference / millisecondsInAYear);

    if(age >= 100) {
        age = age - 100;
    }

    if(age >= maxAge) {
        return true;
    }else {
        return false;
    }
}

const checkLetterCalculation = (cf: string) : boolean =>  {
    let esito = false;
    const fiscalCode = cf.toUpperCase();
    const rest = checkLetter(fiscalCode);
    const lastLetter = fiscalCode[fiscalCode.length - 1];
    esito = rest === letterNumberCf[lastLetter as keyof typeof letterNumberCf] ? false :  true;
    return esito
  } 

const checkLetter =(fiscalCode: string): number => {
    let totale = 0;
    for (let i = 0; i < fiscalCode.length - 1; i++) {
        if ((i + 1) % 2 == 0) {
        totale += (pari as any)[fiscalCode[i]];
        } else {
        totale += (dispari as any)[fiscalCode[i]];
        }
    }
    const rest = totale % 26;
    return rest;
}

const letterNumberCf = {
  A: 0,
  B: 1,
  C: 2,
  D: 3,
  E: 4,
  F: 5,
  G: 6,
  H: 7,
  I: 8,
  J: 9,
  K: 10,
  L: 11,
  M: 12,
  N: 13,
  O: 14,
  P: 15,
  Q: 16,
  R: 17,
  S: 18,
  T: 19,
  U: 20,
  V: 21,
  W: 22,
  X: 23,
  Y: 24,
  Z: 25,
};

const pari = {
  A: 0,
  B: 1,
  C: 2,
  D: 3,
  E: 4,
  F: 5,
  G: 6,
  H: 7,
  I: 8,
  J: 9,
  K: 10,
  L: 11,
  M: 12,
  N: 13,
  O: 14,
  P: 15,
  Q: 16,
  R: 17,
  S: 18,
  T: 19,
  U: 20,
  V: 21,
  W: 22,
  X: 23,
  Y: 24,
  Z: 25,
  '0': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
};

const dispari = {
  A: 1,
  B: 0,
  C: 5,
  D: 7,
  E: 9,
  F: 13,
  G: 15,
  H: 17,
  I: 19,
  J: 21,
  K: 2,
  L: 4,
  M: 18,
  N: 20,
  O: 11,
  P: 3,
  Q: 6,
  R: 8,
  S: 12,
  T: 14,
  U: 16,
  V: 10,
  W: 22,
  X: 25,
  Y: 24,
  Z: 23,
  '0': 1,
  '1': 0,
  '2': 5,
  '3': 7,
  '4': 9,
  '5': 13,
  '6': 15,
  '7': 17,
  '8': 19,
  '9': 21,
};