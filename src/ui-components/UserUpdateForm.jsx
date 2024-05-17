/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { fetchByPath, validateField } from "./utils";
import { User } from "../models";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import {
  Button,
  Flex,
  Grid,
  SelectField,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { DataStore } from "aws-amplify";
export default function UserUpdateForm(props) {
  const {
    id,
    user,
    onSuccess,
    onError,
    onSubmit,
    onCancel,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    id: undefined,
    arn: undefined,
    name: undefined,
    profilePic: undefined,
    role: undefined,
    needsHelp: false,
    isOnCall: false,
  };
  const [id, setId] = React.useState(initialValues.id);
  const [arn, setArn] = React.useState(initialValues.arn);
  const [name, setName] = React.useState(initialValues.name);
  const [profilePic, setProfilePic] = React.useState(initialValues.profilePic);
  const [role, setRole] = React.useState(initialValues.role);
  const [needsHelp, setNeedsHelp] = React.useState(initialValues.needsHelp);
  const [isOnCall, setIsOnCall] = React.useState(initialValues.isOnCall);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = { ...initialValues, ...userRecord };
    setId(cleanValues.id);
    setArn(cleanValues.arn);
    setName(cleanValues.name);
    setProfilePic(cleanValues.profilePic);
    setRole(cleanValues.role);
    setNeedsHelp(cleanValues.needsHelp);
    setIsOnCall(cleanValues.isOnCall);
    setErrors({});
  };
  const [userRecord, setUserRecord] = React.useState(user);
  React.useEffect(() => {
    const queryData = async () => {
      const record = id ? await DataStore.query(User, id) : user;
      setUserRecord(record);
    };
    queryData();
  }, [id, user]);
  React.useEffect(resetStateValues, [userRecord]);
  const validations = {
    id: [{ type: "Required" }, { type: "Email" }],
    arn: [{ type: "Required" }],
    name: [],
    profilePic: [],
    role: [{ type: "Required" }],
    needsHelp: [{ type: "Required" }],
    isOnCall: [{ type: "Required" }],
  };
  const runValidationTasks = async (fieldName, value) => {
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          id,
          arn,
          name,
          profilePic,
          role,
          needsHelp,
          isOnCall,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          await DataStore.save(
            User.copyOf(userRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...rest}
      {...getOverrideProps(overrides, "UserUpdateForm")}
    >
      <TextField
        label="Id"
        isRequired={true}
        isReadOnly={false}
        defaultValue={id}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id: value,
              arn,
              name,
              profilePic,
              role,
              needsHelp,
              isOnCall,
            };
            const result = onChange(modelFields);
            value = result?.id ?? value;
          }
          if (errors.id?.hasError) {
            runValidationTasks("id", value);
          }
          setId(value);
        }}
        onBlur={() => runValidationTasks("id", id)}
        errorMessage={errors.id?.errorMessage}
        hasError={errors.id?.hasError}
        {...getOverrideProps(overrides, "id")}
      ></TextField>
      <TextField
        label="Arn"
        isRequired={true}
        isReadOnly={false}
        defaultValue={arn}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id,
              arn: value,
              name,
              profilePic,
              role,
              needsHelp,
              isOnCall,
            };
            const result = onChange(modelFields);
            value = result?.arn ?? value;
          }
          if (errors.arn?.hasError) {
            runValidationTasks("arn", value);
          }
          setArn(value);
        }}
        onBlur={() => runValidationTasks("arn", arn)}
        errorMessage={errors.arn?.errorMessage}
        hasError={errors.arn?.hasError}
        {...getOverrideProps(overrides, "arn")}
      ></TextField>
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        defaultValue={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id,
              arn,
              name: value,
              profilePic,
              role,
              needsHelp,
              isOnCall,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Profile pic"
        isRequired={false}
        isReadOnly={false}
        defaultValue={profilePic}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id,
              arn,
              name,
              profilePic: value,
              role,
              needsHelp,
              isOnCall,
            };
            const result = onChange(modelFields);
            value = result?.profilePic ?? value;
          }
          if (errors.profilePic?.hasError) {
            runValidationTasks("profilePic", value);
          }
          setProfilePic(value);
        }}
        onBlur={() => runValidationTasks("profilePic", profilePic)}
        errorMessage={errors.profilePic?.errorMessage}
        hasError={errors.profilePic?.hasError}
        {...getOverrideProps(overrides, "profilePic")}
      ></TextField>
      <SelectField
        label="Role"
        placeholder="Please select an option"
        isDisabled={false}
        value={role}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id,
              arn,
              name,
              profilePic,
              role: value,
              needsHelp,
              isOnCall,
            };
            const result = onChange(modelFields);
            value = result?.role ?? value;
          }
          if (errors.role?.hasError) {
            runValidationTasks("role", value);
          }
          setRole(value);
        }}
        onBlur={() => runValidationTasks("role", role)}
        errorMessage={errors.role?.errorMessage}
        hasError={errors.role?.hasError}
        {...getOverrideProps(overrides, "role")}
      >
        <option
          children="Agent"
          value="AGENT"
          {...getOverrideProps(overrides, "roleoption0")}
        ></option>
        <option
          children="Supervisor"
          value="SUPERVISOR"
          {...getOverrideProps(overrides, "roleoption1")}
        ></option>
      </SelectField>
      <SwitchField
        label="Needs help"
        defaultChecked={false}
        isDisabled={false}
        isChecked={needsHelp}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              id,
              arn,
              name,
              profilePic,
              role,
              needsHelp: value,
              isOnCall,
            };
            const result = onChange(modelFields);
            value = result?.needsHelp ?? value;
          }
          if (errors.needsHelp?.hasError) {
            runValidationTasks("needsHelp", value);
          }
          setNeedsHelp(value);
        }}
        onBlur={() => runValidationTasks("needsHelp", needsHelp)}
        errorMessage={errors.needsHelp?.errorMessage}
        hasError={errors.needsHelp?.hasError}
        {...getOverrideProps(overrides, "needsHelp")}
      ></SwitchField>
      <SwitchField
        label="Is on call"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isOnCall}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              id,
              arn,
              name,
              profilePic,
              role,
              needsHelp,
              isOnCall: value,
            };
            const result = onChange(modelFields);
            value = result?.isOnCall ?? value;
          }
          if (errors.isOnCall?.hasError) {
            runValidationTasks("isOnCall", value);
          }
          setIsOnCall(value);
        }}
        onBlur={() => runValidationTasks("isOnCall", isOnCall)}
        errorMessage={errors.isOnCall?.errorMessage}
        hasError={errors.isOnCall?.hasError}
        {...getOverrideProps(overrides, "isOnCall")}
      ></SwitchField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={resetStateValues}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex {...getOverrideProps(overrides, "RightAlignCTASubFlex")}>
          <Button
            children="Cancel"
            type="button"
            onClick={() => {
              onCancel && onCancel();
            }}
            {...getOverrideProps(overrides, "CancelButton")}
          ></Button>
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
