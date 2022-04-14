import React, { ReactNode } from "react";
import styled from "styled-components";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import { TextField } from "../../atoms/inputs";
import { FormText, Text1, Text2, Text3 } from "../../atoms/texts/Text";
import { Message } from "../texts/message";

const TextFieldContainer = styled.div`
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
  className?: string;
  labelText?: string;
  labelSize?: number;
  labelLevel?: 1 | 2 | 3 | 4;
  errorMessage?: string;
  size?: SizeType;
  defaultValue?: string;
  value?: string | number;
  disabled?: boolean;
  placeholder?: string;
  id?: string;
  name?: string;
  type?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  maxLength?: number;
  style?: React.CSSProperties;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onWheel?: (e: React.WheelEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onPressEnter?: () => void;
  allowClear?: boolean;
}

const MyTextFieldForm: React.FC<IMyProps> = (props) => {
  const {
    innerRef,
    className,
    labelText,
    labelSize,
    labelLevel,
    errorMessage,
    size,
    defaultValue,
    value,
    disabled,
    placeholder,
    id,
    name,
    type,
    prefix,
    suffix,
    maxLength,
    style,
    onChange,
    onFocus,
    onWheel,
    onPressEnter,
    allowClear,
  } = props;

  const Label =
    labelSize === 1
      ? Text1
      : labelSize === 2
      ? Text2
      : labelSize === 3
      ? Text3
      : labelSize === 4
      ? FormText
      : Text1;

  return (
    <TextFieldContainer style={style} className={className}>
      {labelText ? (
        <LabelContainer>
          <Label level={labelLevel || 3}>{labelText}</Label>
        </LabelContainer>
      ) : null}
      <FieldContainer>
        <TextField
          innerRef={innerRef}
          size={size || "large"}
          defaultValue={defaultValue}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          id={id}
          type={type}
          name={name}
          prefix={prefix}
          suffix={suffix}
          maxLength={maxLength}
          onChange={onChange}
          onWheel={onWheel}
          onFocus={onFocus}
          onPressEnter={onPressEnter}
          allowClear={allowClear}
        />
      </FieldContainer>
      {errorMessage ? (
        <ErrorContainer>
          <Message type="error" message={errorMessage} />
        </ErrorContainer>
      ) : null}
    </TextFieldContainer>
  );
};

export default MyTextFieldForm;
