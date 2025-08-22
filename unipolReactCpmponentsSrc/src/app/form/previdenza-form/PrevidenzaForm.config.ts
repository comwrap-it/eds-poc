import { PrevidenzaFieldsEnum } from "../forms-costants";

export const formConfig = (props: any): any => {
    const {initialValueEmail, optionSelect, disableMail} = props;
    const employee_type_options = optionSelect.find(({ code } : any) => code === "TIPODIP").dropDownItems || [];

    return {
        [PrevidenzaFieldsEnum.WORKING_SECTOR]: {
            name: PrevidenzaFieldsEnum.WORKING_SECTOR,
            placeholder: 'Seleziona settore lavorativo',
            options: employee_type_options,
            // rules:{
            //     required:{
            //         message: 'Specificare settore lavorativo',
            //         value: true
            //     }
            // }
        },
        [PrevidenzaFieldsEnum.EMAIL]: {
            name: PrevidenzaFieldsEnum.EMAIL,
            placeholder: 'Inserisci indirizzo e-mail',
            // disabled: props.disableMail,
            readOnly: disableMail || !!initialValueEmail,
            defaultValue: initialValueEmail,
            rules: {
                //required: 'Il campo è obbligatorio',
                pattern: {
                    message: 'Formato email errato',
                    value: /^(([^<>()[\]\\.,;:\s@+"]+(\.[^<>()[\]\\.,;:\s@+"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                }
            }
        }
    }
};
