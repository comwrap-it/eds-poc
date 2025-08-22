import {ValidationRule} from "react-hook-form";
import {UsHelpButtonType} from "../components/UsHelpButton/UsHelpButton";

export interface IFormConfig {
    [key: string]: IFormFieldConfig
}

export interface IFormFieldConfig {
    name: string;
    label?: string;
    placeholder?: string;
    readOnly?: boolean;
    disabled?: boolean;
    defaultValue?: string;
    rules?: {
        required?: ValidationRule<boolean>;
        pattern?: ValidationRule<RegExp>;
        minLength?: ValidationRule<number>;
        maxLength?: ValidationRule<number>;
    };
    tooltip?: string;
    tooltipType?: UsHelpButtonType;
    options?: Array<ISelectOption>;
    wholeOptionAsValue?: boolean;
    backgroundColor?: string;
    overlayPosition?: 'top' | 'bottom';
    transform?: {
        input?(value?: any): any,
        output?(value?: any): any,
    }
}

export interface ISelectOption {
    label: string;
    value: string;
}