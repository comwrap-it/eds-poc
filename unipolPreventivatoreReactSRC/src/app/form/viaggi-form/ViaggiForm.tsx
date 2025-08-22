import React from "react";
import {Controller, useForm} from "react-hook-form";
import {FormPreventivatoreViaggiProps, TFormPreventivatoreTravels,} from "../../models/form.interfaces";
import {formConfig} from "./ViaggiForm.config";
import {FormViaggiContainer} from "./ViaggiForm.style";
import {TravelsFieldsEnum} from "../forms-costants";
import ConfirmButton from "../common-components/confirm-button/ConfirmButton";
import {LABELS_FORM} from "../Form.data";
import {LabelTitle} from "../Form.style";
import { UsInput, UsSelect } from "../../libs/react/components";

const FormPreventivatoreViaggio = (props: FormPreventivatoreViaggiProps) => {
    const {optionSelect, onSubmit, onPrivacyClick,onRecuperaPreventivoClick, showInformativaPrivacy, initialValueEmail} = props;
    const {
        control,
        formState: {isValid},
        getValues,
        trigger
    } = useForm<TFormPreventivatoreTravels>({mode: "all"});

    const optionSelectValue = optionSelect[0].dropDownItems;
    const getFormConfig = (prop: any) => formConfig(optionSelectValue, initialValueEmail)[prop];

    return (
        <FormViaggiContainer>
          <div className="form-group">
            <div className="us-form-control">
                <LabelTitle>{LABELS_FORM.N_VIAGGIATORI}</LabelTitle>
                <Controller
                    control={control}
                     {...getFormConfig(TravelsFieldsEnum.N_PEOPLE)}
                    name={TravelsFieldsEnum.N_PEOPLE}
                    render={({field, fieldState}) => (
                        <UsSelect
                            config={getFormConfig(TravelsFieldsEnum.N_PEOPLE)}
                             {...getFormConfig(TravelsFieldsEnum.N_PEOPLE)}
                            {...field}
                            {...fieldState}
                            onFocus={props.onFocus}
                            onBlur={(event:any)=>{event.preventDefault()}}
                        />
                    )}
                />
            </div>

            <div className="us-form-control">
              <>
                <LabelTitle>{LABELS_FORM.EMAIL}</LabelTitle>
                <Controller
                  control={control}
                  {...getFormConfig(TravelsFieldsEnum.EMAIL)}
                  name={TravelsFieldsEnum.EMAIL}
                  render={({ field, fieldState }) => (
                    <UsInput
                      config={getFormConfig(TravelsFieldsEnum.EMAIL)}
                      {...getFormConfig(TravelsFieldsEnum.EMAIL)}
                      {...field}
                      {...fieldState}
                      onFocus={props.onFocus}
                    />
                  )}
                />
              </>
            </div>
          </div>

          <ConfirmButton
              showInformativaPrivacy={showInformativaPrivacy}
              onSubmit={onSubmit}
              onPrivacyClick={onPrivacyClick}
              onRecuperaPreventivoClick={onRecuperaPreventivoClick}
              isValid={isValid}
              getValues={getValues}
              trigger={() => trigger(TravelsFieldsEnum.N_PEOPLE)}
          />
        </FormViaggiContainer>
    );
};

export default FormPreventivatoreViaggio;
