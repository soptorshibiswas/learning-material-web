import React, { ReactNode } from "react";
import { Input } from "antd";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import styled from "styled-components";

const StyledInput = styled(Input)<{ type?: string }>`
  font-size: 1.125rem;
  line-height: 2rem;
  border: none;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.greyBg};
  padding: 0.9vh 0.75rem;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: ${({ type }) => (type === "number" ? "none" : "auto")};
    margin: ${({ type }) => (type === "number" ? 0 : "")};
  }
  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

interface IMyProps {
  innerRef?: React.Ref<HTMLInputElement>;
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
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onWheel?: (e: React.WheelEvent<HTMLInputElement>) => void;
  onClick?: (e: any) => void;
  onPressEnter?: () => void;
  allowClear?: boolean;
  className?: string;
  min?: number;
  max?: number;
}

const TextField: React.FC<IMyProps> = (props) => {
  const {
    innerRef,
    size,
    defaultValue,
    value,
    disabled,
    placeholder,
    className,
    maxLength,
    id,
    name,
    type,
    prefix,
    suffix,
    onChange,
    onFocus,
    onWheel,
    onClick,
    onPressEnter,
    allowClear,
    min,
    max,
  } = props;
  return (
    <StyledInput
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
      onFocus={onFocus}
      onClick={onClick}
      onWheel={onWheel}
      onPressEnter={onPressEnter}
      className={className}
      allowClear={allowClear}
      ref={innerRef as React.Ref<Input>}
      min={min}
      max={max}
    />
  );
};

export default TextField;
