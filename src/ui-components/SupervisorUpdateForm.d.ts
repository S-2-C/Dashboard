/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Supervisor } from "../API.ts";
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
export declare type SupervisorUpdateFormInputValues = {
    name?: string;
    profilePic?: string;
    email?: string;
};
export declare type SupervisorUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    profilePic?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SupervisorUpdateFormOverridesProps = {
    SupervisorUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    profilePic?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SupervisorUpdateFormProps = React.PropsWithChildren<{
    overrides?: SupervisorUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    supervisor?: Supervisor;
    onSubmit?: (fields: SupervisorUpdateFormInputValues) => SupervisorUpdateFormInputValues;
    onSuccess?: (fields: SupervisorUpdateFormInputValues) => void;
    onError?: (fields: SupervisorUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SupervisorUpdateFormInputValues) => SupervisorUpdateFormInputValues;
    onValidate?: SupervisorUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SupervisorUpdateForm(props: SupervisorUpdateFormProps): React.ReactElement;
