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
export declare type SupervisorCreateFormInputValues = {
    name?: string;
    profilePic?: string;
    email?: string;
};
export declare type SupervisorCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    profilePic?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SupervisorCreateFormOverridesProps = {
    SupervisorCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    profilePic?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SupervisorCreateFormProps = React.PropsWithChildren<{
    overrides?: SupervisorCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SupervisorCreateFormInputValues) => SupervisorCreateFormInputValues;
    onSuccess?: (fields: SupervisorCreateFormInputValues) => void;
    onError?: (fields: SupervisorCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SupervisorCreateFormInputValues) => SupervisorCreateFormInputValues;
    onValidate?: SupervisorCreateFormValidationValues;
} & React.CSSProperties>;
export default function SupervisorCreateForm(props: SupervisorCreateFormProps): React.ReactElement;
