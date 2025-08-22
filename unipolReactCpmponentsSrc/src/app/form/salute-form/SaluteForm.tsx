import React from "react";
import { FormSaluteContainer } from "./SaluteForm.style";
import {
  FormPreventivatoreSaluteProps,
  TFormPreventivatoreSalute,
} from "../../models/form.interfaces";
import { Controller, useForm } from "react-hook-form";
import { HealthFieldsEnum } from "../forms-costants";
import { formConfig } from "./SaluteForm.config";
import ConfirmButton from "../common-components/confirm-button/ConfirmButton";
import { LabelTitle } from "../Form.style";
import { LABELS_FORM } from "../Form.data";
import UsDateInput from "../common-components/us-input-date/UsDateInput";
import { TpdLoading, UsInput } from "../../libs/react/components";

const FormPreventivatoreSalute = (props: FormPreventivatoreSaluteProps) => {
  const {
    isLoading,
    onSubmit,
    onFocus,
    onPrivacyClick,
    onRecuperaPreventivoClick,
    showInformativaPrivacy,
    initialValueEmail
  } = props;

  const {
    control,
    formState: { isValid },
    getValues,
    setError,
    clearErrors,
    trigger
  } = useForm<TFormPreventivatoreSalute>({ mode: "all" });

  const getFormConfig = (prop: any) => formConfig(props)[prop];

  return isLoading ? (
    <div className="tpd-preventivatore-sticky-loader form-loader col-xs-24 col-md-10 col-lg-16">
      <TpdLoading isLoading={true} inlayedSpinner={true}></TpdLoading>
    </div>
  ) : (
    <FormSaluteContainer>
      <div className="form-group">
        <div className="us-form-control">
          <LabelTitle>{LABELS_FORM.DATA_DI_NASCITA}</LabelTitle>
          <Controller
            control={control}
            {...getFormConfig(HealthFieldsEnum.BIRTHDAY)}
            name={HealthFieldsEnum.BIRTHDAY}
            render={({ field, fieldState }) => (
              <UsDateInput
                config={getFormConfig(HealthFieldsEnum.BIRTHDAY)}
                {...field}
                {...fieldState}
                setError={setError}
                clearErrors={clearErrors}
              />
            )}
          />
        </div>

        <div className="us-form-control">
          <>
            <LabelTitle>{LABELS_FORM.EMAIL}</LabelTitle>
            <Controller
              control={control}
              {...getFormConfig(HealthFieldsEnum.EMAIL)}
              name={HealthFieldsEnum.EMAIL}
              render={({ field, fieldState }) => (
                <UsInput
                  config={getFormConfig(HealthFieldsEnum.EMAIL)}
                  {...getFormConfig(HealthFieldsEnum.EMAIL)}
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
        trigger={() => trigger(HealthFieldsEnum.BIRTHDAY)}
      />
    </FormSaluteContainer>
  );
};

export default FormPreventivatoreSalute;
