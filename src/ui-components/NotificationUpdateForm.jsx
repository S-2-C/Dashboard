/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { fetchByPath, validateField } from "./utils";
import { Notification } from "../models";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import {
  Button,
  Flex,
  Grid,
  SelectField,
  TextField,
} from "@aws-amplify/ui-react";
import { DataStore } from "aws-amplify";
export default function NotificationUpdateForm(props) {
  const {
    id,
    notification,
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
    rule: undefined,
    action: undefined,
    description: undefined,
    urgency: undefined,
    agentArn: undefined,
  };
  const [rule, setRule] = React.useState(initialValues.rule);
  const [action, setAction] = React.useState(initialValues.action);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [urgency, setUrgency] = React.useState(initialValues.urgency);
  const [agentArn, setAgentArn] = React.useState(initialValues.agentArn);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = { ...initialValues, ...notificationRecord };
    setRule(cleanValues.rule);
    setAction(cleanValues.action);
    setDescription(cleanValues.description);
    setUrgency(cleanValues.urgency);
    setAgentArn(cleanValues.agentArn);
    setErrors({});
  };
  const [notificationRecord, setNotificationRecord] =
    React.useState(notification);
  React.useEffect(() => {
    const queryData = async () => {
      const record = id
        ? await DataStore.query(Notification, id)
        : notification;
      setNotificationRecord(record);
    };
    queryData();
  }, [id, notification]);
  React.useEffect(resetStateValues, [notificationRecord]);
  const validations = {
    rule: [{ type: "Required" }],
    action: [{ type: "Required" }],
    description: [{ type: "Required" }],
    urgency: [{ type: "Required" }],
    agentArn: [],
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
          rule,
          action,
          description,
          urgency,
          agentArn,
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
            Notification.copyOf(notificationRecord, (updated) => {
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
      {...getOverrideProps(overrides, "NotificationUpdateForm")}
    >
      <TextField
        label="Rule"
        isRequired={true}
        isReadOnly={false}
        defaultValue={rule}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              rule: value,
              action,
              description,
              urgency,
              agentArn,
            };
            const result = onChange(modelFields);
            value = result?.rule ?? value;
          }
          if (errors.rule?.hasError) {
            runValidationTasks("rule", value);
          }
          setRule(value);
        }}
        onBlur={() => runValidationTasks("rule", rule)}
        errorMessage={errors.rule?.errorMessage}
        hasError={errors.rule?.hasError}
        {...getOverrideProps(overrides, "rule")}
      ></TextField>
      <TextField
        label="Action"
        isRequired={true}
        isReadOnly={false}
        defaultValue={action}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              rule,
              action: value,
              description,
              urgency,
              agentArn,
            };
            const result = onChange(modelFields);
            value = result?.action ?? value;
          }
          if (errors.action?.hasError) {
            runValidationTasks("action", value);
          }
          setAction(value);
        }}
        onBlur={() => runValidationTasks("action", action)}
        errorMessage={errors.action?.errorMessage}
        hasError={errors.action?.hasError}
        {...getOverrideProps(overrides, "action")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={true}
        isReadOnly={false}
        defaultValue={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              rule,
              action,
              description: value,
              urgency,
              agentArn,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <SelectField
        label="Urgency"
        placeholder="Please select an option"
        isDisabled={false}
        value={urgency}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              rule,
              action,
              description,
              urgency: value,
              agentArn,
            };
            const result = onChange(modelFields);
            value = result?.urgency ?? value;
          }
          if (errors.urgency?.hasError) {
            runValidationTasks("urgency", value);
          }
          setUrgency(value);
        }}
        onBlur={() => runValidationTasks("urgency", urgency)}
        errorMessage={errors.urgency?.errorMessage}
        hasError={errors.urgency?.hasError}
        {...getOverrideProps(overrides, "urgency")}
      >
        <option
          children="Low"
          value="LOW"
          {...getOverrideProps(overrides, "urgencyoption0")}
        ></option>
        <option
          children="Medium"
          value="MEDIUM"
          {...getOverrideProps(overrides, "urgencyoption1")}
        ></option>
        <option
          children="High"
          value="HIGH"
          {...getOverrideProps(overrides, "urgencyoption2")}
        ></option>
        <option
          children="Regular"
          value="REGULAR"
          {...getOverrideProps(overrides, "urgencyoption3")}
        ></option>
      </SelectField>
      <TextField
        label="Agent arn"
        isRequired={false}
        isReadOnly={false}
        defaultValue={agentArn}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              rule,
              action,
              description,
              urgency,
              agentArn: value,
            };
            const result = onChange(modelFields);
            value = result?.agentArn ?? value;
          }
          if (errors.agentArn?.hasError) {
            runValidationTasks("agentArn", value);
          }
          setAgentArn(value);
        }}
        onBlur={() => runValidationTasks("agentArn", agentArn)}
        errorMessage={errors.agentArn?.errorMessage}
        hasError={errors.agentArn?.hasError}
        {...getOverrideProps(overrides, "agentArn")}
      ></TextField>
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
