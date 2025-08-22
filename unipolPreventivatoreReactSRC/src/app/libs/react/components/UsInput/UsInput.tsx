import React, {useMemo, useState} from "react";
import {UsInputContainer} from "./UsInput.style";
import {FieldError} from "react-hook-form";
import {UsHelpButton, UsHelpButtonType} from "../UsHelpButton/UsHelpButton";
import {IFormFieldConfig} from "../../interfaces/form-config.interfaces";

declare module "react" {
    interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
        unbluCapturingHint?: 'block' | null;
    }
}

export enum UsInputTypeEnum {
    TEXT = 'text',
    PASSWORD = 'password',
    EMAIL = 'email',
    NUMBER = 'number'
}

export enum UsSelectValueStyleEnum {
    DEFAULT = '',
    LABEL_FORM = 'label-form'
}

export enum UsSelectStyleEnum {
    DEFAULT = '',
    NO_BORDER = 'no-border',
    NO_BORDER_UNDERLINED = 'no-border underlined',
    NO_BORDER_UNDERLINED_CENTERED = 'no-border underlined centered'
}

export interface UsEmitErrorsInterface {
    controlName: string;
    errorMsg: string;
}

export interface UsInputProps {
    unbluHintBlock: boolean;

    config: IFormFieldConfig;

    // fieldProps
    disabled?: boolean;
    required?: boolean;
    value: string;
    name?: string
    // fieldState
    invalid?: boolean;
    isTouched?: boolean;
    isDirty?: boolean;
    error?: FieldError;
    // old props
    charToPinEnd?: string; // usata per mostrare un qualsiasi simbolo alla fine del campo di input
    hideErrorsInline?: boolean; // usata per nascondere gli errori sotto l'input e mostrarli magari esterni al componente
    // new props
    readOnly?: boolean;
    maxLength?: number;
    minLength?: number;
    placeholder?: string;
    onFocusPlaceholder?: string;
    type?: UsInputTypeEnum; // text - password - email
    className?: string;

    onBlur?(): void;

    onChange?(value?: any): void;

    onClick?(): void; // viene utilizzato da select e datePicker
    onFocus?(): void;

    onKeyDown?(): void;

    onInput?(): void;

    onKeyUp?(): void;
}

const eyeHiddenSrc = '/TpdPortalCommons/build/assets/ico_hidePassword.png';
const eyeOpenSrc = '/TpdPortalCommons/build/assets/ico_showPassword.png';

export const UsInput = (props: UsInputProps) => {

    const isTypePassword = useMemo<boolean>(() => props.type === UsInputTypeEnum.PASSWORD, [props.type]);
    const [showPassword, setShowPassword] = useState(false);
    const [isOnFocus, setIsOnFocus] = React.useState(false);
    // const isInvalid = useMemo<boolean>(() => !!props.fieldError, [props.fieldError]);

    const handlerClick = (e: any): void => {
        if (!props.disabled) props.onClick && props.onClick();
    }

    const handlerFocus = (e: any): void => {
        if (!props.disabled) {
            setIsOnFocus(true);
            props.onFocus && props.onFocus();
        }
    }

    const handlerBlur = (e: any): void => {
        setIsOnFocus(false);
        props.onBlur && props.onBlur();
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <UsInputContainer className={`us-input ${props.className}`}>
            <div className={`us-input-container`} data-testid="us-input-container">
                {/* Label */}
                {props.config.label && (
                    <div className="us-input-label">
                        <label htmlFor={props.config.name}>
                            {props.config.rules?.required && (<span> * </span>)}
                            {props.config.label}
                            {props.config.tooltip && (
                                <UsHelpButton
                                    title={props.config.label}
                                    content={props.config.tooltip}
                                    type={props.config.tooltipType ?? UsHelpButtonType.default}
                                />
                            )}
                        </label>
                    </div>
                )}

                {/* Input */}
                <div
                    className="us-input-wrapper"
                    style={{backgroundColor: props.config.backgroundColor ?? 'transparent'}}
                >
                    <div className="us-input-real">
                        <input
                            data-testid="us-input"
                            name={props.name}
                            value={props.value}
                            onChange={props.onChange}
                            disabled={props.disabled}
                            minLength={props.minLength}
                            maxLength={props.maxLength}

                            id={props.config.name}
                            type={props.type === UsInputTypeEnum.PASSWORD ?
                                (showPassword ? UsInputTypeEnum.TEXT : UsInputTypeEnum.PASSWORD) : props.type}
                            required={props.required}
                            placeholder={isOnFocus ? props.onFocusPlaceholder ?? props.placeholder : props.placeholder}
                            readOnly={props.readOnly}
                            onClick={handlerClick}
                            onFocus={handlerFocus}
                            onBlur={handlerBlur}
                            unbluCapturingHint={props.unbluHintBlock ? 'block' : null}
                            className={`
                                            ${props.invalid ? 'us-input-wrapper-errors' : ''}
                                            ${props.config.rules?.required && !props.invalid ? 'us-input-wrapper-valid' : ''}
                                            ${props.disabled ? 'us-input-disabled' : ''}
                                        `}
                        />

                        {props.charToPinEnd && (
                            <div className="us-currency">{props.charToPinEnd}</div>
                        )}

                        {isTypePassword && (
                            <div>
                                <img
                                    data-testid="us-input-type-password"
                                    src={showPassword ? eyeOpenSrc : eyeHiddenSrc}
                                    className="us-occhietto-pwd"
                                    onClick={togglePasswordVisibility}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Errors */}
                {!props.hideErrorsInline && props.invalid && props.error && (
                    <div className={`us-input-errors-wrapper active`}>
                        <span>{props.error?.message}</span>
                    </div>
                )}

            </div>
        </UsInputContainer>
    )
}

UsInput.defaultProps = {
    unbluHintBlock: false,
    type: UsInputTypeEnum.TEXT,
    required: false,
    disabled: false,
    readOnly: false,
    placeholder: '',
    className: '',
}