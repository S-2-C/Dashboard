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
export declare type AgentUpdateFormInputValues = {
    name?: string;
    profilePic?: string;
    email?: string;
    needsHelp?: boolean;
};
export declare type AgentUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    profilePic?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    needsHelp?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AgentUpdateFormOverridesProps = {
    AgentUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    profilePic?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    needsHelp?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type AgentUpdateFormProps = React.PropsWithChildren<{
    overrides?: AgentUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    agent?: any;
    onSubmit?: (fields: AgentUpdateFormInputValues) => AgentUpdateFormInputValues;
    onSuccess?: (fields: AgentUpdateFormInputValues) => void;
    onError?: (fields: AgentUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AgentUpdateFormInputValues) => AgentUpdateFormInputValues;
    onValidate?: AgentUpdateFormValidationValues;
} & React.CSSProperties>;
export default function AgentUpdateForm(props: AgentUpdateFormProps): React.ReactElement;
