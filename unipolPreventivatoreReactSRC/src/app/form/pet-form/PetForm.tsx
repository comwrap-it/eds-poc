import React, { useEffect } from "react";
import { PetFormContainer } from "./PetForm.style";
import { Controller, useForm } from "react-hook-form";
import {
  FormPreventivatorePetProps,
  TFormPreventivatorePet,
} from "../../models/form.interfaces";
import { formConfig } from "./PetForm.config";
import ConfirmButton from "../common-components/confirm-button/ConfirmButton";
import {LabelTitle} from "../Form.style";
import { LABELS_FORM } from "../Form.data";
import { PetFieldsEnum } from "../forms-costants";
import { TpdLoading , UsInput, UsSelect } from "../../libs/react/components";

const FormPreventivatorePet = (props: FormPreventivatorePetProps) => {
  const { isLoading, optionSelect, onSubmit, onPrivacyClick,onRecuperaPreventivoClick, showInformativaPrivacy, initialValueEmail} = props;
  const {
    control,
    formState: { isValid },
    getValues,
    setValue,
    trigger,
  } = useForm<TFormPreventivatorePet>({ mode: "all" });
  const pet_type_options = optionSelect.find(({ code }) => code === "TIPORISC").dropDownItems || [];

  const getFormConfig = (prop: any) => formConfig(optionSelect, initialValueEmail)[prop];

  useEffect(() => {  
    if (!getValues(PetFieldsEnum.TYPE)) {
      setValue(PetFieldsEnum.TYPE, pet_type_options[0].value);
      trigger(PetFieldsEnum.TYPE);
    }
  }, []);

  return isLoading ? (
    <div className="tpd-preventivatore-sticky-loader form-loader col-xs-24 col-md-10 col-lg-16">
      <TpdLoading isLoading={isLoading} inlayedSpinner={true} />
    </div>
  ) : (
      <PetFormContainer>
        <div className="form-group">
          <div className="us-form-control">
            <LabelTitle>{LABELS_FORM.TIPO_ANIMALE}</LabelTitle>
            <Controller
              control={control}
              {...getFormConfig(PetFieldsEnum.TYPE)}
              name={PetFieldsEnum.TYPE}
              render={({field, fieldState}) => (
                <UsSelect
                  config={getFormConfig(PetFieldsEnum.TYPE)}
                  {...getFormConfig(PetFieldsEnum.TYPE)}
                  {...field}
                  {...fieldState}
                  onFocus={props.onFocus}
                />
              )}
            />
          </div>

          <div className="us-form-control">
            <>
              <LabelTitle>{LABELS_FORM.EMAIL}</LabelTitle>
              <Controller
                control={control}
                {...getFormConfig(PetFieldsEnum.EMAIL)}
                name={PetFieldsEnum.EMAIL}
                render={({ field, fieldState }) => (
                  <UsInput
                    config={getFormConfig(PetFieldsEnum.EMAIL)}
                    {...getFormConfig(PetFieldsEnum.EMAIL)}
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
        />
      </PetFormContainer>
);
};

export default FormPreventivatorePet;
