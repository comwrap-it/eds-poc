import React, { useEffect, useState } from "react";
import { FormFamigliaContainer } from "./FamigliaForm.style";
import { Controller, useForm } from "react-hook-form";
import {
  FormPreventivatoreFamigliaProps,
  TFormPreventivatoreFamiglia,
} from "../../models/form.interfaces";
import { formConfig } from "./FamigliaForm.config";
import {DWELLING_TYPE, FamilyFieldsEnum} from "../forms-costants";
import ConfirmButton from "../common-components/confirm-button/ConfirmButton";
import { LabelTitle } from "../Form.style";
import { LABELS_FORM } from "../Form.data";
import { TpdLoading , UsInput, UsSelect } from "../../libs/react/components";


const FormPreventivatoreFamiglia = (props: FormPreventivatoreFamigliaProps) => {
  const {
    isLoading,
    showInformativaPrivacy,
    googleApiKey,
    optionSelect,
    isEditMode,
    initialValueEmail,
    ToUsIndirizzoGooglePlaces,
    onPrivacyClick,
    onRecuperaPreventivoClick,
    onSubmit,
  } = props;
  const {
    control,
    formState: { isValid },
    getValues,
    setValue,
    setError,
    clearErrors,
    trigger,
    watch,
  } = useForm<TFormPreventivatoreFamiglia>({ mode: "all" });
  const getFormConfig = (prop: any) => formConfig(ToUsIndirizzoGooglePlaces, getValues, optionSelect, initialValueEmail)[prop];
  const [showCheckPannelliSolari, setShowCheckPannelliSolari] = useState(false);

  const dwelling_type_options = optionSelect.find(({ code }) => code === "TIPOABITAZ").dropDownItems || [];

  const dwellingType = watch(FamilyFieldsEnum.DWELLING_TYPE);
  const handleSolarPanelsCheck = (newCheckedState: any) => {
    setValue(FamilyFieldsEnum.SOLAR_PANELS, newCheckedState);
  };

  useEffect(() => {
    if (dwellingType)
      setShowCheckPannelliSolari(
        dwellingType["label"] !== DWELLING_TYPE.APPARTAMENTO
      );
  }, [dwellingType]);

  useEffect(() => {  
    if (!getValues(FamilyFieldsEnum.DWELLING_TYPE)) {
      setValue(FamilyFieldsEnum.DWELLING_TYPE, dwelling_type_options[0].value);
      trigger(FamilyFieldsEnum.DWELLING_TYPE);
    }
  }, []);

  useEffect(() => setValue(FamilyFieldsEnum.SOLAR_PANELS, false), []);

  return isLoading ? (
    <div className="tpd-preventivatore-sticky-loader form-loader col-xs-24 col-md-10 col-lg-16">
      <TpdLoading isLoading={true} inlayedSpinner={true}></TpdLoading>
    </div>
  ) : (
    <FormFamigliaContainer>
      <div className="form-group">
        <div className="us-form-control">
          <LabelTitle>{LABELS_FORM["Casa e Famiglia"]}</LabelTitle>
          <Controller
            control={control}
            {...getFormConfig(FamilyFieldsEnum.DWELLING_TYPE)}
            name={FamilyFieldsEnum.DWELLING_TYPE}
            render={({field, fieldState}) => (
              <UsSelect
                config={getFormConfig(FamilyFieldsEnum.DWELLING_TYPE)}
                {...getFormConfig(FamilyFieldsEnum.DWELLING_TYPE)}
                {...field}
                {...fieldState}
                onFocus={props.onFocus}
              />
            )}
          />
        </div>

      {/* {showCheckPannelliSolari && (
        <div className="solar-panels-checkbox">
          <UsCheckBox
            label={LABELS_FORM.SOLAR_PANELS}
            onChange={handleSolarPanelsCheck}
          />
        </div>
      )} */}
      {/* <div className="us-form-control">
        <LabelTitle>{LABELS_FORM.INDIRIZZO_ABITAZIONE}</LabelTitle>
        <Controller
          control={control}
          {...getFormConfig(FamilyFieldsEnum.DWELLING_ADDRESS)}
          name={FamilyFieldsEnum.DWELLING_ADDRESS}
          render={({ field, fieldState }) => (
            <UsInputGooglePlaces
              googleApiKey={googleApiKey}
              config={getFormConfig(FamilyFieldsEnum.DWELLING_ADDRESS)}
              {...field}
              {...fieldState}
              setError={setError}
              clearErrors={clearErrors}
            />
          )}
        />
      </div> */}
        <div className="us-form-control">
          <>
            <LabelTitle>{LABELS_FORM.EMAIL}</LabelTitle>
            <Controller
              control={control}
              {...getFormConfig(FamilyFieldsEnum.EMAIL)}
              name={FamilyFieldsEnum.EMAIL}
              render={({ field, fieldState }) => (
                <UsInput
                  config={getFormConfig(FamilyFieldsEnum.EMAIL)}
                  {...getFormConfig(FamilyFieldsEnum.EMAIL)}
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
    </FormFamigliaContainer>
  );
};

export default FormPreventivatoreFamiglia;
