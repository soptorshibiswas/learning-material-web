import React from "react";
import { Select } from "antd";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import styled from "styled-components";
import { Text1 } from "../texts/Text";
import { down } from "styled-breakpoints";

const StyledSelect = styled(Select)<{ width?: string; primarycolor?: string }>`
  &.ant-select-single:not(.ant-select-customize-input) > .ant-select-selector {
    background-color: ${({ theme, primarycolor }) =>
      primarycolor ? theme.colors.body : theme.colors.greyBg};
    border: ${({ theme, primarycolor }) =>
      primarycolor ? `1px solid ${theme.colors.primary}` : "none"};
    font-size: 1.125rem;
    border-radius: 5px;
    line-height: 100%;
    height: 50px;
    span {
      display: flex;
      align-items: center;
    }
    ${down("tablet")} {
      &.ant-select-selector {
        height: 40px;
      }
    }
  }
`;

const { Option } = Select;
interface IProps {
  name?: string;
  placeholder?: string;
  size?: SizeType;
  options: string[];
  value?: number;
  disabled?: boolean;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (name: string | undefined, key: number) => void;
  flex?: 1;
  primaryColor?: boolean;
}

const AutoSuggestSelectComponent: React.FC<IProps> = (props) => {
  const {
    name,
    size,
    options,
    value,
    onChange,
    onFocus,
    placeholder,
    disabled,
    primaryColor,
  } = props;

  function renderOptions() {
    return options.map((option, i) => (
      <Option key={i} value={option}>
        <Text1>{option}</Text1>
      </Option>
    ));
  }

  function handleChange(value: any, option: any) {
    if (onChange) {
      if (!value) onChange(name, -1);
      else onChange(name, option.key);
    }
  }

  return (
    <StyledSelect
      size={size || "large"}
      value={value !== undefined ? options[value] : undefined}
      showArrow
      onChange={handleChange}
      onFocus={onFocus}
      disabled={disabled}
      showSearch
      optionFilterProp="children"
      filterOption={(input, option: any) =>
        option.children.props.children
          .toLowerCase()
          .includes(input.toLowerCase())
      }
      allowClear
      placeholder={placeholder}
      style={{ width: "100%" }}
      primarycolor={primaryColor ? "primary" : undefined}
    >
      {renderOptions()}
    </StyledSelect>
  );
};

export default AutoSuggestSelectComponent;
