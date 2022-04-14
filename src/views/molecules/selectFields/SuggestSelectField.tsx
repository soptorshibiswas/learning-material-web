/* eslint-disable indent */
import React from "react";
import styled from "styled-components";
import { FormText, Text1, Text2, Text3 } from "../../atoms/texts/Text";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import { Message } from "../texts/message";
import { AutoSuggestSelectComponent } from "../../atoms/selects";

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  margin: 0;
`;

const LabelContainer = styled.div`
  display: flex;
  padding-bottom: 0.5em;
`;

const ErrorContainer = styled.div`
  padding-top: 0.2em;
`;

interface IMyProps {
  labelText?: string;
  labelSize?: number;
  labelLevel?: 1 | 2 | 3;
  errorMessage?: string;
  name?: string;
  placeholder?: string;
  size?: SizeType;
  options: string[];
  value?: number;
  disabled?: boolean;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (name: string | undefined, key: number) => void;
  className?: string;
  flex?: 1;
  primaryColor?: boolean;
}

const MyAutoSuggestSelectComponent: React.FC<IMyProps> = (props) => {
  const {
    labelSize,
    labelText,
    labelLevel,
    errorMessage,
    name,
    size,
    options,
    value,
    onChange,
    onFocus,
    placeholder,
    disabled,
    flex,
    primaryColor,
    className,
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
    <MainContainer className={className}>
      {labelText ? (
        <LabelContainer>
          <Label level={labelLevel}>{labelText}</Label>
        </LabelContainer>
      ) : null}

      <AutoSuggestSelectComponent
        size={size}
        onChange={onChange}
        onFocus={onFocus}
        value={value}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        options={options}
        flex={flex}
        primaryColor={primaryColor}
      />

      {errorMessage ? (
        <ErrorContainer>
          <Message type="error" message={errorMessage} />
        </ErrorContainer>
      ) : null}
    </MainContainer>
  );
};

export default MyAutoSuggestSelectComponent;
