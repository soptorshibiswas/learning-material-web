import { useRouter } from "next/router";
import React, { useRef } from "react";
import styled from "styled-components";
import { Select, Button } from "antd";
import { CaretDownFilled, SearchOutlined } from "@ant-design/icons";
import { down } from "styled-breakpoints";
import { useBreakpoint } from "styled-breakpoints/react-styled";
import UniversityIcon from "../../../assets/icons/learning/UniversityIcon";
import { Text1 } from "../../atoms/texts/Text";
import { LEARNING } from "../../../../shared/constants/routes";
import Loading from "../../atoms/display/Loading";

const { Option } = Select;

const StyledOption = styled(Option)``;

const FieldContainer = styled.form`
  position: relative;
  width: 100%;
  max-width: 100%;
  display: grid;
  grid-template-columns: 5fr 1fr;
`;

const SelectField = styled(Select)`
  width: 100%;
  max-width: 100%;
  &.ant-select-single:not(.ant-select-customize-input) > .ant-select-selector {
    height: auto;
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 3rem;
    border-radius: 5px 0 0 5px;
    border: none;
    background-color: ${({ theme }) => theme.colors.body} !important;
    span {
      left: 0;
      display: flex;
      align-items: center;
    }
    input {
      padding-left: 3rem;
    }
  }

  ${down("tablet")} {
    &.ant-select-single:not(.ant-select-customize-input)
      > .ant-select-selector {
      padding-top: 0.25rem;
      padding-bottom: 0.25rem;
    }
  }
`;

const PrefixIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  ${down("tablet")} {
    display: flex;
    align-items: center;
  }
`;

const SearchButton = styled(Button)`
  border-radius: 0 5px 5px 0;
  height: 100%;
  padding-left: 3rem;
  padding-right: 3rem;
  border: none;
  display: flex;
  align-items: center;

  span {
    display: none;
  }

  ${down("tablet")} {
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
  loading: boolean;
  options: { name: string; abbr: string }[];
}

const UniSelectField: React.FC<IProps> = ({ options, loading }) => {
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
        placeholder={"Find your university"}
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
        dropdownRender={(menu) => (loading ? <Loading size={"60px"} /> : menu)}
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
        <Text1 color={"white"} level={3} align={"center"}>
          Enter
        </Text1>
        <SearchOutlined />
      </SearchButton>

      <PrefixIcon>
        <UniversityIcon
          size={useBreakpoint(down("tablet")) ? "18" : undefined}
        />
      </PrefixIcon>
    </FieldContainer>
  );
};

export default UniSelectField;
