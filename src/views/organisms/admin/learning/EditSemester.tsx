import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  ICreateSemesterBody,
  IDepartment,
  ISemester,
} from "../../../../../shared/types/learning";
import { CloseOutlined } from "@ant-design/icons";
import { TextField } from "../../../atoms/inputs";

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 2.5rem;
  row-gap: 0.67rem;
`;

const StyledInput = styled(TextField)<{ disableDelete: boolean }>`
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.greyBg};

  input {
    background-color: ${({ theme }) => theme.colors.greyBg};
    border: none;
  }

  svg {
    cursor: ${({ disableDelete }) =>
      disableDelete ? "not-allowed" : "pointer"};
  }
`;

interface IProps {
  semesters: IDepartment["semesters"];
  totalSemesters: number;
  onChangeSems: (sems: (ISemester | ICreateSemesterBody)[]) => void;
}

const SemesterEdit: React.FC<IProps> = ({
  semesters,
  totalSemesters,
  onChangeSems,
}) => {
  const [sems, setSems] = useState<IProps["semesters"]>([]);
  const totRef = React.useRef<number>(totalSemesters);

  const handleChange = (e: any) => {
    if (e.target.name) {
      const newArr = sems;
      const index = newArr.findIndex((s) => s._id === e.target.name);
      newArr[index] = { ...newArr[index], name: e.target.value };
      setSems([...newArr]);
      onChangeSems(newArr);
    }
  };

  useEffect(() => {
    setSems(semesters);
  }, [semesters]);

  useEffect(() => {
    if (totalSemesters > totRef.current) {
      if (sems.length < totalSemesters)
        setSems((prev) => {
          const newArr: ICreateSemesterBody[] = prev;
          for (let i = totRef.current; i < totalSemesters; i++) {
            newArr.push({ _id: `new ${i + 1}`, name: `Term ${i + 1}` });
          }
          return [...newArr];
        });
    } else if (totalSemesters < totRef.current) {
      if (sems.length > totalSemesters)
        setSems((prev) => {
          const newArr = prev;
          for (let i = totalSemesters; i < totRef.current; i++) {
            if (newArr.at(-1)?._id?.includes("new")) {
              newArr.pop();
            }
          }
          return [...newArr];
        });
    }
    totRef.current = totalSemesters;
  }, [totalSemesters, sems.length]);

  const handleDelete = (sem: IProps["semesters"][number]) => {
    if (sem.hasMaterial !== true) {
      const newArr = sems.filter((s) => s.name !== sem.name);
      setSems([...newArr]);
      onChangeSems(newArr);
    }
  };

  return (
    <StyledDiv>
      {sems.map((sem) => (
        <StyledInput
          key={sem._id}
          name={sem._id}
          disableDelete={sem.hasMaterial === true}
          suffix={
            <CloseOutlined
              onClick={() => sem.hasMaterial !== true && handleDelete(sem)}
            />
          }
          value={sem.name}
          onChange={handleChange}
          size={"large"}
        />
      ))}
    </StyledDiv>
  );
};

export default SemesterEdit;
