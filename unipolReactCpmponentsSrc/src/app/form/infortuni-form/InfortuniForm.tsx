import React from "react";
import { FormInfortuniContainer } from "./InfortuniForm.style";
import {
  FormPreventivatoreInfortuniProps,
  TFormPreventivatoreInfortuni,
} from "../../models/form.interfaces";
import { Controller, useForm } from "react-hook-form";
import { formConfig } from "./InfortuniForm.config";
import { HealthFieldsEnum } from "../forms-costants";
import ConfirmButton from "../common-components/confirm-button/ConfirmButton";
import {LabelTitle} from "../Form.style";
import { LABELS_FORM } from "../Form.data";
import { TpdLoading, UsInput } from "../../libs/react/components";

const FormPreventivatoreInfortuni = (
  props: FormPreventivatoreInfortuniProps
) => {
  const { isLoading, onSubmit, onFocus, onPrivacyClick,onRecuperaPreventivoClick, showInformativaPrivacy, initialValueEmail , initialValueCf } = props;
  const {
    control,
    formState: { isValid },
    getValues,
    setError,
    clearErrors,
    trigger
  } = useForm<TFormPreventivatoreInfortuni>({ mode: "all" });
  const getFormConfig = (prop: any) => formConfig(props)[prop];

  return isLoading ? (
    <div className="tpd-preventivatore-sticky-loader form-loader col-xs-24 col-md-10 col-lg-16">
      <TpdLoading isLoading={true} inlayedSpinner={true}></TpdLoading>
    </div>
  ) : (
      <FormInfortuniContainer>
        <div className="form-group">
          <div className="us-form-control">
            <>
              <LabelTitle>{LABELS_FORM.CODICE_FISCALE}</LabelTitle>
              <Controller
                control={control}
                {...getFormConfig(HealthFieldsEnum.CF)}
                name={HealthFieldsEnum.CF}
                render={({ field, fieldState }) => (
                  <UsInput
                    config={getFormConfig(HealthFieldsEnum.CF)}
                    {...getFormConfig(HealthFieldsEnum.CF)}
                    {...field}
                    {...fieldState}
                    onFocus={props.onFocus}
                    onChange={(event) => {
                      event.target.value = event.target.value.toUpperCase();
                      field.onChange(event);
                    }}
                  />
                )}
              />
            </>
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
            trigger={() => {
              trigger(HealthFieldsEnum.CF);
            }}
        />
      </FormInfortuniContainer>
);
};

export default FormPreventivatoreInfortuni;
