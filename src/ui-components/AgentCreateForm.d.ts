/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type AgentCreateFormInputValues = {
    name?: string;
    profilePic?: string;
    email?: string;
    needsHelp?: boolean;
};
export declare type AgentCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    profilePic?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    needsHelp?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AgentCreateFormOverridesProps = {
    AgentCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    profilePic?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    needsHelp?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type AgentCreateFormProps = React.PropsWithChildren<{
    overrides?: AgentCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: AgentCreateFormInputValues) => AgentCreateFormInputValues;
    onSuccess?: (fields: AgentCreateFormInputValues) => void;
    onError?: (fields: AgentCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AgentCreateFormInputValues) => AgentCreateFormInputValues;
    onValidate?: AgentCreateFormValidationValues;
} & React.CSSProperties>;
export default function AgentCreateForm(props: AgentCreateFormProps): React.ReactElement;
