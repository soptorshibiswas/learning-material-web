import React, { ReactNode } from "react";
import { Input } from "antd";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import styled from "styled-components";

const StyledInput = styled(Input.Password)`
  border: none;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.greyBg};
  padding: 0.9vh 0.75rem;
  input {
    font-size: 1.125rem;
    line-height: 2rem;
    background-color: ${({ theme }) => theme.colors.greyBg};
  }
`;

interface IMyProps {
  innerRef?: React.Ref<HTMLInputElement>;
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

const PasswordField: React.FC<IMyProps> = (props) => {
  const {
    innerRef,
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
  return (
    <StyledInput
      ref={innerRef}
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
      autoComplete={"on"}
    />
  );
};

export default PasswordField;
