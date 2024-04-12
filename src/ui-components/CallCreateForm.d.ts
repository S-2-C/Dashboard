/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CallCreateFormInputValues = {
    ARN?: string;
    phone?: string;
    callStart?: number;
    callEnd?: number;
};
export declare type CallCreateFormValidationValues = {
    ARN?: ValidationFunction<string>;
    phone?: ValidationFunction<string>;
    callStart?: ValidationFunction<number>;
    callEnd?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CallCreateFormOverridesProps = {
    CallCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    ARN?: PrimitiveOverrideProps<TextFieldProps>;
    phone?: PrimitiveOverrideProps<TextFieldProps>;
    callStart?: PrimitiveOverrideProps<TextFieldProps>;
    callEnd?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CallCreateFormProps = React.PropsWithChildren<{
    overrides?: CallCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CallCreateFormInputValues) => CallCreateFormInputValues;
    onSuccess?: (fields: CallCreateFormInputValues) => void;
    onError?: (fields: CallCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CallCreateFormInputValues) => CallCreateFormInputValues;
    onValidate?: CallCreateFormValidationValues;
} & React.CSSProperties>;
export default function CallCreateForm(props: CallCreateFormProps): React.ReactElement;
