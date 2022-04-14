import React, { ReactNode } from "react";
import styled from "styled-components";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import { PasswordField } from "../../atoms/inputs";
import { Text1, Text2, Text3 } from "../../atoms/texts/Text";
import { Message } from "../texts/message";

const PasswordFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
`;

const LabelContainer = styled.div`
  display: flex;
  padding-bottom: 0.5em;
`;

const FieldContainer = styled.div`
  display: flex;
`;

const ErrorContainer = styled.div`
  padding-top: 0.2em;
`;

interface IMyProps {
  innerRef?: React.Ref<HTMLInputElement>;
  labelText?: string;
  labelSize?: number;
  labelLevel?: 1 | 2 | 3 | 4;
  errorMessage?: string;
  size?: SizeType;
  value?: string;
  disabled?: boolean;
  placeholder?: string;
  id?: string;
  name?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onPressEnter?: () => void;
  visibilityToggle?: boolean;
}

const MyPasswordFieldForm: React.FC<IMyProps> = (props) => {
  const {
    innerRef,
    labelText,
    labelSize,
    labelLevel,
    errorMessage,
    size,
    value,
    disabled,
    placeholder,
    id,
    name,
    prefix,
    suffix,
    onChange,
    onFocus,
    onPressEnter,
    visibilityToggle,
  } = props;

  const Label =
    labelSize === 1
      ? Text1
      : labelSize === 2
      ? Text2
      : labelSize === 3
      ? Text3
      : Text1;

  return (
    <PasswordFieldContainer>
      <LabelContainer>
        <Label level={labelLevel || 3}>{labelText}</Label>
      </LabelContainer>
      <FieldContainer>
        <PasswordField
          innerRef={innerRef}
          size={size || "large"}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          id={id}
          name={name}
          prefix={prefix}
          suffix={suffix}
          onChange={onChange}
          onFocus={onFocus}
          onPressEnter={onPressEnter}
          visibilityToggle={visibilityToggle}
        />
      </FieldContainer>
      {errorMessage ? (
        <ErrorContainer>
          <Message type="error" message={errorMessage} />
        </ErrorContainer>
      ) : null}
    </PasswordFieldContainer>
  );
};

export default MyPasswordFieldForm;
