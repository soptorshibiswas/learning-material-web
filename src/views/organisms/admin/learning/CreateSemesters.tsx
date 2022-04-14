import React, { useState, useEffect } from "react";
import { Input } from "antd";
import styled from "styled-components";
import { Text1 } from "../../../atoms/texts/Text";
import {
  ICreateSemesterBody,
  IDepartment,
  ISemester,
} from "../../../../../shared/types/learning";
import { CloseOutlined } from "@ant-design/icons";

const StyledInput = styled(Input)`
  min-height: 4rem;
  font-size: 1.25rem !important;
  line-height: 2rem;
  font-weight: 600;
  padding: 1rem;
  resize: vertical;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.greyBg};
  display: flex;
  flex-wrap: wrap;

  input {
    background-color: ${({ theme }) => theme.colors.greyBg};
    border: none;
    width: 100%;
    min-height: 3rem;
    outline: none !important;
  }

  .prefixBadges {
  }

  &:focus-visible {
    outline: none;
  }
`;

const SemesterBadge = styled.span`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.primaryBadgeBG};
  border-radius: 5px;
  padding: 0.5rem;
  margin: 4px;
  &:hover {
    opacity: 0.9;
  }

  span {
    margin-left: 0.75rem;
  }
  svg {
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
    width: 1rem;
    height: 1rem;
  }
`;

interface IProps {
  semesters: IDepartment["semesters"];
  totalSemesters: number;
  onChangeSems: (sems: (ISemester | ICreateSemesterBody)[]) => void;
}

const SemesterCreate: React.FC<IProps> = ({
  semesters,
  totalSemesters,
  onChangeSems,
}) => {
  const [sems, setSems] = useState<IProps["semesters"]>([]);
  const [input, setInput] = useState<string | undefined>(undefined);

  const handleEnterPress = () => {
    if (input != undefined && sems.length < totalSemesters) {
      if (sems.findIndex((s) => s.name === input.trim()) === -1) {
        const newArr = [...sems];
        newArr.push({ name: input.trim() });
        setSems([...newArr]);
        onChangeSems(newArr);
        setInput(undefined);
      }
    }
  };

  const handleChange = (e: any) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    setSems(semesters);
  }, [semesters]);

  const handleDelete = (sem: IProps["semesters"][number]) => {
    if (!sem.hasMaterial) {
      const newArr = sems.filter((s) => s.name !== sem.name);
      setSems([...newArr]);
      onChangeSems(newArr);
    }
  };

  return (
    <StyledInput
      prefix={sems.map((sem) => (
        <SemesterBadge key={sem._id || sem.name}>
          <Text1 color={"primary"}>{sem.name}</Text1>
          {!sem.hasMaterial ? (
            <CloseOutlined onClick={() => handleDelete(sem)} />
          ) : (
            <span />
          )}
        </SemesterBadge>
      ))}
      prefixCls="prefixBadges"
      onPressEnter={handleEnterPress}
      value={input}
      onChange={handleChange}
    />
  );
};

export default SemesterCreate;
