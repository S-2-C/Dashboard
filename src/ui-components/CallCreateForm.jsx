/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createCall } from "../graphql/mutations";
const client = generateClient();
export default function CallCreateForm(props) {
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
    ARN: "",
    phone: "",
    callStart: "",
    callEnd: "",
  };
  const [ARN, setARN] = React.useState(initialValues.ARN);
  const [phone, setPhone] = React.useState(initialValues.phone);
  const [callStart, setCallStart] = React.useState(initialValues.callStart);
  const [callEnd, setCallEnd] = React.useState(initialValues.callEnd);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setARN(initialValues.ARN);
    setPhone(initialValues.phone);
    setCallStart(initialValues.callStart);
    setCallEnd(initialValues.callEnd);
    setErrors({});
  };
  const validations = {
    ARN: [{ type: "Required" }],
    phone: [{ type: "Required" }],
    callStart: [{ type: "Required" }],
    callEnd: [],
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
  const convertTimeStampToDate = (ts) => {
    if (Math.abs(Date.now() - ts) < Math.abs(Date.now() - ts * 1000)) {
      return new Date(ts);
    }
    return new Date(ts * 1000);
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
          ARN,
          phone,
          callStart,
          callEnd,
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
            query: createCall.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "CallCreateForm")}
      {...rest}
    >
      <TextField
        label="Arn"
        isRequired={true}
        isReadOnly={false}
        value={ARN}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ARN: value,
              phone,
              callStart,
              callEnd,
            };
            const result = onChange(modelFields);
            value = result?.ARN ?? value;
          }
          if (errors.ARN?.hasError) {
            runValidationTasks("ARN", value);
          }
          setARN(value);
        }}
        onBlur={() => runValidationTasks("ARN", ARN)}
        errorMessage={errors.ARN?.errorMessage}
        hasError={errors.ARN?.hasError}
        {...getOverrideProps(overrides, "ARN")}
      ></TextField>
      <TextField
        label="Phone"
        isRequired={true}
        isReadOnly={false}
        value={phone}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              ARN,
              phone: value,
              callStart,
              callEnd,
            };
            const result = onChange(modelFields);
            value = result?.phone ?? value;
          }
          if (errors.phone?.hasError) {
            runValidationTasks("phone", value);
          }
          setPhone(value);
        }}
        onBlur={() => runValidationTasks("phone", phone)}
        errorMessage={errors.phone?.errorMessage}
        hasError={errors.phone?.hasError}
        {...getOverrideProps(overrides, "phone")}
      ></TextField>
      <TextField
        label="Call start"
        isRequired={true}
        isReadOnly={false}
        type="datetime-local"
        value={callStart && convertToLocal(convertTimeStampToDate(callStart))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : Number(new Date(e.target.value));
          if (onChange) {
            const modelFields = {
              ARN,
              phone,
              callStart: value,
              callEnd,
            };
            const result = onChange(modelFields);
            value = result?.callStart ?? value;
          }
          if (errors.callStart?.hasError) {
            runValidationTasks("callStart", value);
          }
          setCallStart(value);
        }}
        onBlur={() => runValidationTasks("callStart", callStart)}
        errorMessage={errors.callStart?.errorMessage}
        hasError={errors.callStart?.hasError}
        {...getOverrideProps(overrides, "callStart")}
      ></TextField>
      <TextField
        label="Call end"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={callEnd && convertToLocal(convertTimeStampToDate(callEnd))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : Number(new Date(e.target.value));
          if (onChange) {
            const modelFields = {
              ARN,
              phone,
              callStart,
              callEnd: value,
            };
            const result = onChange(modelFields);
            value = result?.callEnd ?? value;
          }
          if (errors.callEnd?.hasError) {
            runValidationTasks("callEnd", value);
          }
          setCallEnd(value);
        }}
        onBlur={() => runValidationTasks("callEnd", callEnd)}
        errorMessage={errors.callEnd?.errorMessage}
        hasError={errors.callEnd?.hasError}
        {...getOverrideProps(overrides, "callEnd")}
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
