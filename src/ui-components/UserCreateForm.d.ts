/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, SelectFieldProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type UserCreateFormInputValues = {
    id?: string;
    arn?: string;
    name?: string;
    profilePic?: string;
    role?: string;
    needsHelp?: boolean;
    isOnCall?: boolean;
};
export declare type UserCreateFormValidationValues = {
    id?: ValidationFunction<string>;
    arn?: ValidationFunction<string>;
    name?: ValidationFunction<string>;
    profilePic?: ValidationFunction<string>;
    role?: ValidationFunction<string>;
    needsHelp?: ValidationFunction<boolean>;
    isOnCall?: ValidationFunction<boolean>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserCreateFormOverridesProps = {
    UserCreateFormGrid?: FormProps<GridProps>;
    id?: FormProps<TextFieldProps>;
    arn?: FormProps<TextFieldProps>;
    name?: FormProps<TextFieldProps>;
    profilePic?: FormProps<TextFieldProps>;
    role?: FormProps<SelectFieldProps>;
    needsHelp?: FormProps<SwitchFieldProps>;
    isOnCall?: FormProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type UserCreateFormProps = React.PropsWithChildren<{
    overrides?: UserCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: UserCreateFormInputValues) => UserCreateFormInputValues;
    onSuccess?: (fields: UserCreateFormInputValues) => void;
    onError?: (fields: UserCreateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: UserCreateFormInputValues) => UserCreateFormInputValues;
    onValidate?: UserCreateFormValidationValues;
}>;
export default function UserCreateForm(props: UserCreateFormProps): React.ReactElement;
