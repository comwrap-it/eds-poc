
import React, { useEffect, useState } from "react";
import { AutoFormContainer } from "./AutoForm.style";
import {
  FormPreventivatoreAutoProps,
  TFormPreventivatoreAuto,
} from "../../models/form.interfaces";
import { Controller, useForm, useWatch } from "react-hook-form";
import ConfirmButton from "../common-components/confirm-button/ConfirmButton";
import { formConfig, triggerAuto } from "./AutoForm.config";
import { LabelTitle } from "../Form.style";
import { VehicleFieldsEnum } from "../forms-costants";
import { LABELS_FORM } from "../Form.data";
import UsCheckBox from "../common-components/us-checkbox/UsCheckbox";
import UsDateInput from "../common-components/us-input-date/UsDateInput";
import { PATH_AUTO, PATH_MOTO } from "../../path/path";
import { TpdLoading, UsInput, UsSelect } from "../../libs/react/components";


const FormPreventivatoreAuto = (props: FormPreventivatoreAutoProps) => {
  const {
    isLoading,
    optionSelect,
    googleApiKey,
    initialValueEmail,
    initialValueBirthdate,
    initialValuePlate,
    ToUsIndirizzoGooglePlaces,
    onSubmit,
    onPrivacyClick,
    onRecuperaPreventivoClick,
    onFocus,
    showInformativaPrivacy,
  } = props;
  const {
    control,
    trigger,
    formState: { isValid },
    getValues,
    setValue,
    setError,
    clearErrors,
  } = useForm<TFormPreventivatoreAuto>({ mode: "all" });

  const vehicleTypeValue = useWatch({
    control,
    name: VehicleFieldsEnum.TYPE,
  })

  const birthdayDateValue = useWatch({
    control,
    name: VehicleFieldsEnum.BIRTHDAY,
  })

  const [isChecked, setIsChecked] = useState(false);
  const [transferClass, setTransferClass] = useState(false);
  const vehicle_type_options = [
    {
      "label": "Auto",
      "value": "1"
    },
    {
      "label": "Moto",
      "value": "8"
    },
    {
      "label": "Altri veicoli",
      "value": "4L"
    }
  ];

  const [vehicleOptions, setVehicleOptions] = useState(vehicle_type_options);

  const handleAvaiablePlate = (newCheckedState: any) => {
    setIsChecked(newCheckedState);
    setValue(VehicleFieldsEnum.PLATE, '');
    setValue(VehicleFieldsEnum.PLATE_AVAIABLE, newCheckedState);
    // const analyticsToSend = {
    //   "action_name": newCheckedState ? "selezione non ho la targa" : "deselezione non ho la targa",
    //   "action_effect": "scelta su targa",
    //   "action_detail": "scelta su targa"
    // };
    // console.log("analytics to send", analyticsToSend);
    // const analyticsService = Providers.AnalyticsService.getInstance();
    // analyticsService.triggerLink(analyticsToSend);
    triggerAuto(trigger, true);
  };

  const getFormConfig = (prop: any) =>
    formConfig(
      vehicleOptions,
      ToUsIndirizzoGooglePlaces,
      initialValueEmail,
      initialValueBirthdate,
      initialValuePlate,
      isChecked,
      getValues
    )[prop];

  const filterTypeOptions = () => {
    const url = window.location.href;
  
    if(PATH_AUTO.some(path => url.includes(path))) {
      setVehicleOptions([ {
        "label": "Auto",
        "value": "1"
      }])
    } else if (PATH_MOTO.some(path => url.includes(path))) {
      setVehicleOptions([{
        "label": "Moto",
        "value": "8"
      }])
    }    
  }

  useEffect(() => {
    if (vehicleOptions.length <= 1) {
      setValue(VehicleFieldsEnum.TYPE, vehicleOptions[0].value)
    }
  },[vehicleOptions])

  useEffect(() => {
    setValue(VehicleFieldsEnum.TRANSFER_CLASS, transferClass);
    setValue(VehicleFieldsEnum.PLATE_AVAIABLE, isChecked);

    filterTypeOptions();
    if (!getValues(VehicleFieldsEnum.TYPE)) {
      setValue(VehicleFieldsEnum.TYPE, vehicleOptions[0].value)
    }

  }, []);

  // Trigger validation on birthday date when vheicle type changes 
  // Allowed at least 14 years old for altriveicoli , 18 for auto and moto
  useEffect(() => {
    if (vehicleTypeValue && birthdayDateValue) {
      setValue(VehicleFieldsEnum.BIRTHDAY, birthdayDateValue, { shouldValidate: true });
    }

    const plateValue = getValues(VehicleFieldsEnum.PLATE);
    if(plateValue)
      trigger(VehicleFieldsEnum.PLATE);
  }, [vehicleTypeValue])




  return isLoading ? (
    <div className="tpd-preventivatore-sticky-loader form-loader col-xs-24 col-md-10 col-lg-16">
      <TpdLoading isLoading={true} inlayedSpinner={true}></TpdLoading>
    </div>
  ) : (
    <AutoFormContainer>
      <div className="form-group">
        {vehicleOptions?.length > 1 && <>
          <div className="us-form-control form-type">
            <LabelTitle>{LABELS_FORM.TIPO_VEICOLO}</LabelTitle>
            <Controller
              control={control}
              {...getFormConfig(VehicleFieldsEnum.TYPE)}
              name={VehicleFieldsEnum.TYPE}
              render={({field, fieldState}) => (
                <UsSelect
                  config={getFormConfig(VehicleFieldsEnum.TYPE)}
                  {...getFormConfig(VehicleFieldsEnum.TYPE)}
                  {...field}
                  {...fieldState}
                  onFocus={props.onFocus}
                />
              )}
            />
          </div>
        </>}

        <div className="us-form-control form-plate">
          <LabelTitle>{LABELS_FORM.TARGA}</LabelTitle>
          <Controller
            control={control}
            {...getFormConfig(VehicleFieldsEnum.PLATE)}
            name={VehicleFieldsEnum.PLATE}
            render={({ field, fieldState }) => (
              <UsInput
                config={getFormConfig(VehicleFieldsEnum.PLATE)}
                {...getFormConfig(VehicleFieldsEnum.PLATE)}
                {...field}
                {...fieldState}
                onFocus={props.onFocus}
              />
            )}
          />
          <div className="plate-control">
            <UsCheckBox
              label={LABELS_FORM.NO_PLATE}
              onChange={handleAvaiablePlate}/>
          </div>
        </div>
        <div className="us-form-control form-birthday">
          <LabelTitle>{LABELS_FORM.DATA_DI_NASCITA}</LabelTitle>
          <Controller
            control={control}
            {...getFormConfig(VehicleFieldsEnum.BIRTHDAY)}
            name={VehicleFieldsEnum.BIRTHDAY}
            render={({ field, fieldState }) => (
              <UsDateInput
                config={getFormConfig(VehicleFieldsEnum.BIRTHDAY)}
                {...field}
                {...fieldState}
                setError={setError}
                clearErrors={clearErrors}
              />
            )}
          />
        </div>
      </div>

      <div className="form-group double-row">
        <div className="us-form-control form-email">
          <>
            <LabelTitle>{LABELS_FORM.EMAIL}</LabelTitle>
            <Controller
              control={control}
              {...getFormConfig(VehicleFieldsEnum.EMAIL)}
              name={VehicleFieldsEnum.EMAIL}
              render={({ field, fieldState }) => (
                <UsInput
                  config={getFormConfig(VehicleFieldsEnum.EMAIL)}
                  {...getFormConfig(VehicleFieldsEnum.EMAIL)}
                  {...field}
                  {...fieldState}
                  onFocus={props.onFocus}
                />
              )}
            />
          </>
        </div>

        <ConfirmButton
          showInformativaPrivacy={showInformativaPrivacy}
          onSubmit={onSubmit}
          onPrivacyClick={onPrivacyClick}
          onRecuperaPreventivoClick={onRecuperaPreventivoClick}
          isValid={isValid}
          getValues={getValues}
          trigger={async () => await triggerAuto(trigger)}
        />
      </div>
    </AutoFormContainer>
  );
};

export default FormPreventivatoreAuto;
