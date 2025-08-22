import React, {RefObject, useMemo, useRef} from "react";
import {UsSelectStyleEnum, UsSelectValueStyleEnum} from "../UsInput/UsInput";
import {FieldError} from "react-hook-form";
import {UsHelpButton, UsHelpButtonType} from "../UsHelpButton/UsHelpButton";
import {UsSelectContainer} from "./UsSelect.style";
import {UsInputContainer} from "../UsInput/UsInput.style";
import {useOnClickOutside} from "../../hooks";
import {IFormFieldConfig, ISelectOption} from "../../interfaces/form-config.interfaces";

export enum UsSelectStyleUlEnum {
    DEFAULT = "",
    NO_SPACE_TOP = "no-space-top",
}

export interface UsSelectProps {

    // fieldProps
    disabled?: boolean;
    required?: boolean;
    value: any;
    name?: string

    onBlur?(): void;

    onChange?(value?: any): void;

    // fieldState
    invalid?: boolean;
    isTouched?: boolean;
    isDirty?: boolean;
    error?: FieldError;

    // old
    selectStyle: UsSelectStyleEnum;
    usSelectStyleClassUl: UsSelectStyleUlEnum;
    usSelectValueStyle: UsSelectValueStyleEnum;

    // new
    config: IFormFieldConfig;
    options: ISelectOption[];
    className: string;
    readOnly: boolean;
    overlayPosition: 'top' | 'bottom';
    hideErrorsInline: boolean;
    wholeOptionAsValue: boolean;

    onInput?(): void;

    onClick?(): void;

    onFocus?(): void;

    onKeyDown?(): void;

    onKeyUp?(): void;
}

export const UsSelect = (props: UsSelectProps) => {

    const [isMenuOpen, setMenuOpen] = React.useState<boolean>(false);
    const selectedOption = useMemo<ISelectOption | undefined>(() =>
        props.options.find((opt) =>
            props.value && (props.value === opt.value) || (props.value?.value === opt.value)
        ), [props.value]);
    const selectedIndexOption = useMemo<number>(() =>
        props.options.findIndex((opt) =>
            props.value && (props.value === opt.value) || (props.value?.value === opt.value)
        ), [props.value]);

    const closeMenu = () => setMenuOpen(false);
    const toggleMenu = () => setMenuOpen(!isMenuOpen);

    const onSelect = (opt: ISelectOption) => {
        props.onChange && props.onChange(props.wholeOptionAsValue ? opt : opt.value);
        closeMenu();
    }

    const ref = useRef<HTMLDivElement>(null);
    const handleClickOutside = () => {
        if (isMenuOpen) closeMenu();
    }
    useOnClickOutside(ref as RefObject<HTMLElement>, handleClickOutside);

    const handleClick = (e: any): void => {
        if (!props.disabled) props.onClick && props.onClick();
        toggleMenu();
    }

    const handleBlur = (e: any): void => {
        if (!props.disabled) props.onBlur && props.onBlur();
    }

    const handleFocus = (e: any): void => {
        if (!props.disabled) props.onFocus && props.onFocus();
    }

    const handleInput = (e: any): void => {
        if (!props.disabled) props.onInput && props.onInput();
    }

    const handleKeyUp = (e: any): void => {
        if (!props.disabled) props.onKeyUp && props.onKeyUp();
    }

    const handleKeyDown = (e: any): void => {
        if (!props.disabled) props.onKeyDown && props.onKeyDown();
    }


    return (
        <UsSelectContainer className={`us-select ${props.className}`}>
            <div ref={ref} className={`us-select-container`} data-testid="us-select-container">

                <UsInputContainer className="us-input">

                    {/* Input - Real (Hidden) */}
                    {/*<input*/}
                    {/*    style={{display: "none"}}*/}
                    {/*    disabled={props.disabled}*/}
                    {/*    value={props.value}*/}
                    {/*    onChange={props.onChange}*/}
                    {/*    onBlur={props.onBlur}*/}
                    {/*    name={props.name}*/}
                    {/*/>*/}

                    {/* Input - Fake (Visual) */}
                    <div className="us-input-container">

                        {/* Label */}
                        {props.config.label && (
                            <div className="us-input-label">
                                <label htmlFor={props.config.name}>
                                    {props.required && (<span> * </span>)}
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
                            style={{backgroundColor: props.config.backgroundColor}}
                        >
                            <div
                                className={`us-input-fake
                                    ${props.invalid ? 'us-input-wrapper-errors' : ''}
                                    ${props.disabled ? 'us-input-fake-disabled' : ''}
                                    ${props.required && !props.invalid ? 'us-input-wrapper-valid' : ''}
                                    ${(!selectedOption && props.config.placeholder) ? 'placeholder-label' : ''}
                                `.replace(/ +(?= )/g, '')}
                                onClick={handleClick}
                                onBlur={handleBlur}
                                onFocus={handleFocus}
                                onInput={handleInput}
                                onKeyUp={handleKeyUp}
                                onKeyDown={handleKeyDown}
                                id={`combo${props.config.name}`}
                                role="combobox"
                                aria-haspopup="listbox"
                                aria-controls={`listbox${props.config.name}`}
                                aria-expanded={isMenuOpen}
                                aria-labelledby={`combo${props.config.name}`}
                                aria-activedescendant={`${isMenuOpen ? 'combo' + selectedIndexOption + '-' + props.config.name : ''}`}
                                tabIndex={0}
                                data-testid="us-select-toggle"
                            >
                                {/* Selected Label */}
                                <div className="us-input-fake-valore">
                                    {selectedOption?.label ?? props.config.placeholder}
                                </div>
                                {/* Icone - Select*/}
                                <div className="us-input-fake-icona">
                                    <i className={isMenuOpen ? 'icon-Freccia-up' : 'icon-Freccia-down'}/>
                                </div>
                            </div>

                            {/* Select Menu */}
                            <ul
                                className={`us-select-wrapper 
                                    ${props.usSelectStyleClassUl} 
                                    ${isMenuOpen ? 'opened' : ''} 
                                    ${props.config.label ? 'withLabel' : ''} 
                                    ${props.overlayPosition === 'top' ? 'top-overlay' : ''}
                                `}
                                data-testid="us-select-menu"
                                role="listbox"
                                id={`listbox ${props.config.name}`}
                                aria-labelledby={`combo-${props.config.name}`}
                            >
                                {props.options.map((option, i) => (
                                    <li
                                        data-testid="us-select-option"
                                        className={`us-option-wrapper ${selectedOption?.value === option.value ? 'active' : ''}`}
                                        role="option"
                                        onClick={() => onSelect(option)}
                                        id={`combo${i}-${props.config.name}`}
                                        aria-selected={selectedOption?.value === option.value}
                                    >
                                        {option.label}
                                    </li>
                                ))}
                            </ul>

                            {/* Errors */}
                            {!props.hideErrorsInline && props.invalid && props.error && (
                                <div className={`us-input-errors-wrapper active`}>
                                    <span>{props.error?.message}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </UsInputContainer>

            </div>
        </UsSelectContainer>
    )
}

UsSelect.defaultProps = {
    selectStyle: UsSelectStyleEnum.DEFAULT,
    usSelectStyleClassUl: UsSelectStyleUlEnum.DEFAULT,
    usSelectValueStyle: UsSelectValueStyleEnum.DEFAULT,

    className: '',
    options: [],
    wholeOptionAsValue: false,
    overlayPosition: 'bottom',
    hideErrorsInline: false,
    disabled: false,
    required: false,
    readOnly: false,
}