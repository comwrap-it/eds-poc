import React from "react";
import {FormPreventivatorePrevidenzaProps, TFormPreventivatorePrevidenza,} from "../../models/form.interfaces";
import {Controller, useForm} from "react-hook-form";
import {FormPrevidenzaContainer} from "./PrevidenzaForm.style";
import {formConfig} from "./PrevidenzaForm.config";
import {PrevidenzaFieldsEnum} from "../forms-costants";
import ConfirmButton from "../common-components/confirm-button/ConfirmButton";
import {LabelTitle} from "../Form.style";
import {LABELS_FORM} from "../Form.data";
import { TpdLoading, UsInput, UsSelect } from "../../libs/react/components";

const FormPreventivatorePrevidenza = (
    props: FormPreventivatorePrevidenzaProps
) => {
    const {isLoading, onSubmit, onPrivacyClick,onRecuperaPreventivoClick, showInformativaPrivacy} = props;
    const {
        control,
        formState: {isValid},
        getValues,
    } = useForm<TFormPreventivatorePrevidenza>({mode: "all"});

    const getFormConfig = (prop: any) => formConfig(props)[prop];
    return isLoading ? (
        <div className="tpd-preventivatore-sticky-loader form-loader col-xs-24 col-md-10 col-lg-16">
            <TpdLoading isLoading={true} inlayedSpinner={true}></TpdLoading>
        </div>
    ) : (
        <FormPrevidenzaContainer>
          <div className="form-group">
            <div className="us-form-control">
                <LabelTitle>{LABELS_FORM.SETTORE}</LabelTitle>
                <Controller
                    control={control}
                    {...getFormConfig(PrevidenzaFieldsEnum.WORKING_SECTOR)}
                    name={PrevidenzaFieldsEnum.WORKING_SECTOR}
                    render={({field, fieldState}) => (
                        <UsSelect
                            config={getFormConfig(PrevidenzaFieldsEnum.WORKING_SECTOR)}
                            {...getFormConfig(PrevidenzaFieldsEnum.WORKING_SECTOR)}
                            {...field}
                            {...fieldState}
                            onFocus={props.onFocus}
                        />
                    )}
                />
            </div>

            <div className="us-form-control">
                <LabelTitle>{LABELS_FORM.INDIRIZZO_MAIL}</LabelTitle>
                <Controller
                    control={control}
                    {...getFormConfig(PrevidenzaFieldsEnum.EMAIL)}
                    name={PrevidenzaFieldsEnum.EMAIL}
                    render={({field, fieldState}) => (
                        <UsInput
                            config={getFormConfig(PrevidenzaFieldsEnum.EMAIL)}
                            {...getFormConfig(PrevidenzaFieldsEnum.EMAIL)}
                            {...field}
                            {...fieldState}
                            onFocus={props.onFocus}
                        />
                    )}
                />
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
        </FormPrevidenzaContainer>
    );
};

export default FormPreventivatorePrevidenza;
