import React from "react";
import {MobilitaFormContainer} from "./MobilitaForm.style";
import {Controller, useForm} from "react-hook-form";
import {FormPreventivatoreMobilityProps, TFormPreventivatoreMobility,} from "../../models/form.interfaces";
import {formConfig} from "./MobilitaForm.config";
import ConfirmButton from "../common-components/confirm-button/ConfirmButton";
import { LabelTitle } from "../Form.style";
import { MobilityFieldsEnum } from "../forms-costants";
import { LABELS_FORM } from "../Form.data";
import UsDateInput from "../common-components/us-input-date/UsDateInput";
import { TpdLoading, UsInput } from "../../libs/react/components";


const FormPreventivatoreMobilita = (props: FormPreventivatoreMobilityProps) => {
  const {
    isLoading,
    googleApiKey,
    onPrivacyClick,
    onRecuperaPreventivoClick,
    onSubmit,
    initialValueEmail,
    onFocus,
    showInformativaPrivacy,
  } = props;

  const getFormConfig = (prop: any) => formConfig(props)[prop];

  const {
    control,
    formState: { isValid },
    getValues,
    setError,
    clearErrors,
    trigger
  } = useForm<TFormPreventivatoreMobility>({ mode: "all" });
  return isLoading ? (
    <div className="tpd-preventivatore-sticky-loader form-loader col-xs-24 col-md-10 col-lg-16">
      <TpdLoading isLoading={isLoading} inlayedSpinner={true} />
    </div>
  ) : (
    <MobilitaFormContainer>
      <div className="form-group">
        <div className="us-form-control">
          <LabelTitle>{LABELS_FORM.DATA_DI_NASCITA}</LabelTitle>
          <Controller
            control={control}
            {...getFormConfig(MobilityFieldsEnum.BIRTHDAY)}
            name={MobilityFieldsEnum.BIRTHDAY}
            render={({ field, fieldState }) => (
              <UsDateInput
                config={getFormConfig(MobilityFieldsEnum.BIRTHDAY)}
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
              {...getFormConfig(MobilityFieldsEnum.EMAIL)}
              name={MobilityFieldsEnum.EMAIL}
              render={({ field, fieldState }) => (
                <UsInput
                  config={getFormConfig(MobilityFieldsEnum.EMAIL)}
                  {...getFormConfig(MobilityFieldsEnum.EMAIL)}
                  {...field}
                  {...fieldState}
                  onFocus={props.onFocus}
                />
              )}
            />
          </>
        </div>
      </div>

      {/* <div className="us-form-control">
        <LabelTitle>{LABELS_FORM.INDIRIZZO_RESIDENZA}</LabelTitle>
        <Controller
          control={control}
          {...getFormConfig(MobilityFieldsEnum.ADDRESS)}
          name={MobilityFieldsEnum.ADDRESS}
          render={({field, fieldState}) => (
            <UsInputGooglePlaces
              googleApiKey={googleApiKey}
              config={getFormConfig(MobilityFieldsEnum.ADDRESS)}
              {...field}
              {...fieldState}
              setError={setError}
              clearErrors={clearErrors}
            />
          )}
        />
      </div> */}

      <ConfirmButton
        showInformativaPrivacy={showInformativaPrivacy}
        onSubmit={onSubmit}
        onPrivacyClick={onPrivacyClick}
        onRecuperaPreventivoClick={onRecuperaPreventivoClick}
        isValid={isValid}
        getValues={getValues}
        trigger={() => trigger("birthday")}
      />
    </MobilitaFormContainer>
  );
};

export default FormPreventivatoreMobilita;
