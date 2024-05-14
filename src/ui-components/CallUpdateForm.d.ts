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
export declare type CallUpdateFormInputValues = {
    ARN?: string;
    phone?: string;
    callStart?: number;
    callEnd?: number;
};
export declare type CallUpdateFormValidationValues = {
    ARN?: ValidationFunction<string>;
    phone?: ValidationFunction<string>;
    callStart?: ValidationFunction<number>;
    callEnd?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CallUpdateFormOverridesProps = {
    CallUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    ARN?: PrimitiveOverrideProps<TextFieldProps>;
    phone?: PrimitiveOverrideProps<TextFieldProps>;
    callStart?: PrimitiveOverrideProps<TextFieldProps>;
    callEnd?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CallUpdateFormProps = React.PropsWithChildren<{
    overrides?: CallUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    call?: any;
    onSubmit?: (fields: CallUpdateFormInputValues) => CallUpdateFormInputValues;
    onSuccess?: (fields: CallUpdateFormInputValues) => void;
    onError?: (fields: CallUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CallUpdateFormInputValues) => CallUpdateFormInputValues;
    onValidate?: CallUpdateFormValidationValues;
} & React.CSSProperties>;
export default function CallUpdateForm(props: CallUpdateFormProps): React.ReactElement;
