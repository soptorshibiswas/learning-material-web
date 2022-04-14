import { useRouter } from "next/router";
import React, { useRef } from "react";
import styled from "styled-components";
import { Select, Button } from "antd";
import { CaretDownFilled, SearchOutlined } from "@ant-design/icons";
import { down } from "styled-breakpoints";
import { useBreakpoint } from "styled-breakpoints/react-styled";
import { LEARNING } from "../../../../shared/constants/routes";
import { Text1 } from "../../atoms/texts/Text";

const { Option } = Select;

const StyledOption = styled(Option)``;

const FieldContainer = styled.form`
  width: 100%;
  max-width: 70%;
  display: flex;
  column-gap: 1rem;

  ${down("lgDesktop")} {
    max-width: 80%;
  }

  ${down("tablet")} {
    max-width: 100%;
    column-gap: 0;
  }
`;

const SelectField = styled(Select)`
  width: 100%;
  max-width: 100%;
  &.ant-select-single:not(.ant-select-customize-input) > .ant-select-selector {
    max-width: 100%;
    height: 3.125rem;
    padding-left: 1rem;
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.colors.typography.ashDark};
    background-color: ${({ theme }) => theme.colors.divider};
    span {
      max-width: 100%;
      overflow: hidden;
      left: 0;
      display: flex;
      align-items: center;
    }
    input {
      padding-left: 1rem;
      font-weight: 600;
    }
  }

  ${down("tablet")} {
    &.ant-select-single:not(.ant-select-customize-input)
      > .ant-select-selector {
      border-radius: 5px 0 0 5px;
    }
  }
`;

const SearchButton = styled(Button)`
  border-radius: 5px;
  height: 100%;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    margin-right: 0.5rem;
    display: flex;
    align-items: center;
  }

  ${down("tablet")} {
    border-radius: 0 5px 5px 0;
    padding-left: 1.5rem;
    padding-right: 1.5rem;

    ${Text1} {
      display: none;
    }
    span {
      color: ${({ theme }) => theme.colors.body};
      display: block;
    }
  }
`;

interface IProps {
  options: { name: string; abbr: string }[];
}

const DepartmentUniSelect: React.FC<IProps> = ({ options }) => {
  const [value, setValue] = React.useState<number>(-1);
  const formRef = useRef<any>();
  const selectRef = useRef<any>();

  const handleChange = (value: any, option: any) => {
    if (!value) setValue(-1);
    else setValue(option.key);
  };

  const router = useRouter();
  const handleSearchClick = (e: any) => {
    e.preventDefault();
    if (options[value])
      router.push(`${LEARNING()}/${options[value].abbr.toLowerCase()}`);
  };

  const handleFormFocus = () => {
    selectRef.current?.blur();
    formRef.current?.focus();
  };

  return (
    <FieldContainer onSubmit={handleSearchClick}>
      <SelectField
        ref={selectRef}
        placeholder={"Search another university"}
        value={
          useBreakpoint(down("tablet"))
            ? options[value]?.abbr
            : options[value]
            ? `${options[value]?.name} (${options[value]?.abbr})`
            : undefined
        }
        onChange={handleChange}
        showSearch
        filterOption={(input: string, option: any) =>
          option.value.toLowerCase().includes(input.toLowerCase())
        }
        suffixIcon={<CaretDownFilled />}
        allowClear={true}
        dropdownStyle={{ borderRadius: "0", padding: "1rem" }}
        virtual={false}
        onSelect={handleFormFocus}
      >
        {useBreakpoint(down("tablet"))
          ? options.map((opt, i) => (
              <StyledOption key={i} value={`${opt.name} (${opt.abbr})`}>
                <Text1 level={3}>{`${opt.abbr}`}</Text1>
              </StyledOption>
            ))
          : options.map((opt, i) => (
              <StyledOption key={i} value={`${opt.name} (${opt.abbr})`}>
                <Text1 level={3}>{`${opt.name} (${opt.abbr})`}</Text1>
              </StyledOption>
            ))}
      </SelectField>

      <SearchButton
        htmlType={"submit"}
        type={"primary"}
        size={"large"}
        ref={formRef}
      >
        <SearchOutlined />
        <Text1 color={"white"} level={3} align={"center"}>
          Search
        </Text1>
      </SearchButton>
    </FieldContainer>
  );
};

export default DepartmentUniSelect;
