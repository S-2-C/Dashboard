/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SelectField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createNotification } from "../graphql/mutations";
const client = generateClient();
export default function NotificationCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    rule: "",
    action: "",
    description: "",
    urgency: "",
    timestamp: "",
    agentEmail: "",
  };
  const [rule, setRule] = React.useState(initialValues.rule);
  const [action, setAction] = React.useState(initialValues.action);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [urgency, setUrgency] = React.useState(initialValues.urgency);
  const [timestamp, setTimestamp] = React.useState(initialValues.timestamp);
  const [agentEmail, setAgentEmail] = React.useState(initialValues.agentEmail);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setRule(initialValues.rule);
    setAction(initialValues.action);
    setDescription(initialValues.description);
    setUrgency(initialValues.urgency);
    setTimestamp(initialValues.timestamp);
    setAgentEmail(initialValues.agentEmail);
    setErrors({});
  };
  const validations = {
    rule: [{ type: "Required" }],
    action: [{ type: "Required" }],
    description: [{ type: "Required" }],
    urgency: [{ type: "Required" }],
    timestamp: [{ type: "Required" }],
    agentEmail: [{ type: "Email" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hourCycle: "h23",
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
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
          timestamp,
          agentEmail,
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
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: createNotification.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "NotificationCreateForm")}
      {...rest}
    >
      <TextField
        label="Rule"
        isRequired={true}
        isReadOnly={false}
        value={rule}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              rule: value,
              action,
              description,
              urgency,
              timestamp,
              agentEmail,
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
        value={action}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              rule,
              action: value,
              description,
              urgency,
              timestamp,
              agentEmail,
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
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              rule,
              action,
              description: value,
              urgency,
              timestamp,
              agentEmail,
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
              timestamp,
              agentEmail,
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
        label="Timestamp"
        isRequired={true}
        isReadOnly={false}
        type="datetime-local"
        value={timestamp && convertToLocal(new Date(timestamp))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              rule,
              action,
              description,
              urgency,
              timestamp: value,
              agentEmail,
            };
            const result = onChange(modelFields);
            value = result?.timestamp ?? value;
          }
          if (errors.timestamp?.hasError) {
            runValidationTasks("timestamp", value);
          }
          setTimestamp(value);
        }}
        onBlur={() => runValidationTasks("timestamp", timestamp)}
        errorMessage={errors.timestamp?.errorMessage}
        hasError={errors.timestamp?.hasError}
        {...getOverrideProps(overrides, "timestamp")}
      ></TextField>
      <TextField
        label="Agent email"
        isRequired={false}
        isReadOnly={false}
        value={agentEmail}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              rule,
              action,
              description,
              urgency,
              timestamp,
              agentEmail: value,
            };
            const result = onChange(modelFields);
            value = result?.agentEmail ?? value;
          }
          if (errors.agentEmail?.hasError) {
            runValidationTasks("agentEmail", value);
          }
          setAgentEmail(value);
        }}
        onBlur={() => runValidationTasks("agentEmail", agentEmail)}
        errorMessage={errors.agentEmail?.errorMessage}
        hasError={errors.agentEmail?.hasError}
        {...getOverrideProps(overrides, "agentEmail")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
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
