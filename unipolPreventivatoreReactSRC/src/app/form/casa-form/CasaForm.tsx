import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { formConfig } from "./CasaForm.config";
import { DWELLING_TYPE, HouseFieldsEnum } from "../forms-costants";
import { CasaFormContainer } from "./CasaForm.style";
import {
  FormPreventivatoreCasaProps,
  TFormPreventivatoreCasa,
} from "../../models/form.interfaces";
import ConfirmButton from "../common-components/confirm-button/ConfirmButton";
import { LabelTitle } from "../Form.style";
import { LABELS_FORM } from "../Form.data";
import { TpdLoading , UsInput, UsSelect } from "../../libs/react/components";

const FormPreventivatoreCasa = (props: FormPreventivatoreCasaProps) => {
  const {
    isLoading,
    googleApiKey,
    optionSelect,
    showInformativaPrivacy,
    onSubmit,
    onPrivacyClick,
    onRecuperaPreventivoClick,
    ToUsIndirizzoGooglePlaces,
    initialValueEmail,
  } = props;
  const {
    control,
    formState: { isValid },
    getValues,
    setValue,
    watch,
    setError,
    clearErrors,
    trigger
  } = useForm<TFormPreventivatoreCasa>({ mode: "all" });

  const getFormConfig = (prop: any) => formConfig(ToUsIndirizzoGooglePlaces, getValues, optionSelect, initialValueEmail)[prop];
  const [showCheckPannelliSolari, setShowCheckPannelliSolari] = useState(false);

  const dwelling_type_options = optionSelect.find(({ code }) => code === "TIPOABITAZ").dropDownItems || [];

  const dwellingType = watch(HouseFieldsEnum.DWELLING_TYPE);
  const handleSolarPanelsCheck = (newCheckedState: any) => {
    setValue(HouseFieldsEnum.SOLAR_PANELS, newCheckedState);
  };

  useEffect(() => {
    if (dwellingType)
      setShowCheckPannelliSolari(
        dwellingType["label"] !== DWELLING_TYPE.APPARTAMENTO
      );
  }, [dwellingType]);

  useEffect(() => {  
    if (!getValues(HouseFieldsEnum.DWELLING_TYPE)) {
      setValue(HouseFieldsEnum.DWELLING_TYPE, dwelling_type_options[0].value);
      trigger(HouseFieldsEnum.DWELLING_TYPE);
    }
  }, []);

  useEffect(() => setValue(HouseFieldsEnum.SOLAR_PANELS, false), []);

  return isLoading ? (
    <div className="tpd-preventivatore-sticky-loader form-loader col-xs-24 col-md-10 col-lg-16">
      <TpdLoading isLoading={props.isLoading} inlayedSpinner={true} />
    </div>
  ) : (
    <CasaFormContainer>
      <div className="form-group">
        <div className="us-form-control">
          <LabelTitle>{LABELS_FORM["Casa e Famiglia"]}</LabelTitle>
          <Controller
            control={control}
            {...getFormConfig(HouseFieldsEnum.DWELLING_TYPE)}
            name={HouseFieldsEnum.DWELLING_TYPE}
            render={({field, fieldState}) => (
              <UsSelect
                config={getFormConfig(HouseFieldsEnum.DWELLING_TYPE)}
                {...getFormConfig(HouseFieldsEnum.DWELLING_TYPE)}
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
              {...getFormConfig(HouseFieldsEnum.EMAIL)}
              name={HouseFieldsEnum.EMAIL}
              render={({ field, fieldState }) => (
                <UsInput
                  config={getFormConfig(HouseFieldsEnum.EMAIL)}
                  {...getFormConfig(HouseFieldsEnum.EMAIL)}
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
    </CasaFormContainer>
  );
};

export default FormPreventivatoreCasa;
