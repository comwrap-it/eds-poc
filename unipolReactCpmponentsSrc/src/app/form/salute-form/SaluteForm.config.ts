import { HealthFieldsEnum } from "../forms-costants";
import { WARNING_CURRENT_AGE, WARNING_OVER_75 } from "../Form.data";

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
                        if (age >= 75) {
                            return WARNING_OVER_75;
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
