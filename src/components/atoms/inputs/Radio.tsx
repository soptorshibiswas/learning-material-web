import React from "react";
import styled from "styled-components";
import { Radio } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";

const MyRadio = styled(Radio)<IProps>`
  transform: ${({ size }) =>
    size === "small"
      ? null
      : size === "large"
      ? "scale(1.625)"
      : "scale(1.375)"};
  margin-left: ${({ size, marginLeft }) =>
    marginLeft
      ? marginLeft
      : size === "small"
      ? null
      : size === "middle"
      ? "0.5em"
      : "1.2em"};
  margin-right: ${({ marginRight }) => marginRight || "0.75em"};
`;

interface IProps {
  size?: "small" | "middle" | "large";
  disabled?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  value?: string | number | boolean;
  options: string[];
  name?: string;
  className?: string;
  onChange?: (e: RadioChangeEvent) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  marginLeft?: string;
  marginRight?: string;
}

const RadioInput: React.FC<IProps> = (props) => {
  const {
    size,
    disabled,
    checked,
    defaultChecked,
    value,
    options,
    name,
    className,
    marginLeft,
    marginRight,
    onChange,
    onFocus,
  } = props;

  return (
    <MyRadio
      size={size}
      disabled={disabled}
      checked={checked}
      options={options}
      defaultChecked={defaultChecked}
      value={value}
      name={name}
      onChange={onChange}
      onFocus={onFocus}
      className={className}
      marginLeft={marginLeft}
      marginRight={marginRight}
    >
      {props.children}
    </MyRadio>
  );
};

export default RadioInput;
