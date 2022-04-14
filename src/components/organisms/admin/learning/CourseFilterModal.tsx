import React, { useRef, useState } from "react";
import styled from "styled-components";
import { down } from "styled-breakpoints";
import { Radio } from "antd";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import { TextField } from "../../../atoms/inputs";
import RoundedButton from "../../../atoms/buttons/RoundedButton";
import { Text1 } from "../../../atoms/texts/Text";
import { Gap } from "../../../atoms/spaces";
import { COURSE_TYPE, TCourseType } from "../../../../../shared/types/learning";

const ModalContent = styled.div`
  display: flex;
  column-gap: 0.5rem;
  padding-top: 3.5rem;
  padding-bottom: 3.5rem;
`;

const TextFieldForm = styled(TextField)`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.5rem;
  padding: 0.4rem 0.75rem;
  background-color: ${({ theme }) => theme.colors.body};
  svg {
    color: ${({ theme }) => theme.colors.typography.ashDark};
  }
`;

const SelectForm = styled(TextFieldForm)`
  input {
    cursor: pointer;
    caret-color: transparent;
  }
`;

const Col = styled.div`
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: center;

  ${Gap} {
    transition: height 0.4s ease;
  }

  & > div {
    position: relative !important;
  }

  ${down("tablet")} {
    & > div {
      position: initial !important;
    }
  }
`;

const TypesDiv = styled(Radio.Group)<{ open: boolean }>`
  display: ${({ open }) => (open ? "flex" : "none")};
  flex-flow: column;
  padding: 1.5rem;
  margin-top: 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

interface IProps {
  onSubmit: (name: string, code?: string, type?: TCourseType) => void;
  nameF?: string;
  codeF?: string;
  typeF?: TCourseType;
}

const FilterModal: React.FC<IProps> = ({ onSubmit, nameF, codeF, typeF }) => {
  const [type, setType] = useState<{
    show: boolean;
    type?: TCourseType;
  }>({
    show: false,
    type: typeF,
  });

  const nameRef = useRef<any>();
  const codeRef = useRef<any>();

  const handleTypeChange = (e: any) => {
    setType((prev) => ({ ...prev, type: e.target.value }));
  };

  const handleSearch = () => {
    const name = nameRef.current.input.value;
    const code = codeRef.current.input.value;
    onSubmit(name, code, type.type);
  };

  return (
    <>
      <ModalContent>
        <Col>
          <TextFieldForm
            innerRef={nameRef}
            defaultValue={nameF}
            placeholder={"Title"}
            suffix={<SearchOutlined />}
          />
        </Col>
        <Col>
          <TextFieldForm
            innerRef={codeRef}
            defaultValue={codeF}
            placeholder={"Code"}
            suffix={<SearchOutlined />}
          />
        </Col>
        <Col>
          <SelectForm
            placeholder={"Type"}
            value={type.type ? COURSE_TYPE[type.type] : undefined}
            suffix={<DownOutlined />}
            onClick={() => setType((prev) => ({ ...prev, show: !prev.show }))}
            allowClear={true}
            onChange={(e) => {
              if (e.target.value.trim() === "")
                setType((prev) => ({ ...prev, type: undefined }));
            }}
          />
          <TypesDiv
            open={type.show}
            size="large"
            value={type.type}
            onChange={handleTypeChange}
          >
            <Radio value={undefined}>
              <Text1 level={3} color={"textSecondary"}>
                All
              </Text1>
            </Radio>
            <Radio value={"THEORY"}>
              <Text1 level={3} color={"textSecondary"}>
                THEORY
              </Text1>
            </Radio>
            <Radio value={"SESSIONAL"}>
              <Text1 level={3} color={"textSecondary"}>
                SESSIONAL
              </Text1>
            </Radio>
            <Radio value={"MIXED"}>
              <Text1 level={3} color={"textSecondary"}>
                MIXED
              </Text1>
            </Radio>
          </TypesDiv>
        </Col>
        <Col>
          <RoundedButton type="primary" onClick={handleSearch}>
            Search
          </RoundedButton>
        </Col>
      </ModalContent>
    </>
  );
};

export default FilterModal;
