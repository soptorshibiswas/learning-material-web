import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { down } from "styled-breakpoints";
import { useBreakpoint } from "styled-breakpoints/react-styled";
import styled from "styled-components";
import { SubTitle1 } from "../../atoms/texts/SubTitle";
import { Text1 } from "../../atoms/texts/Text";
import ContentLayout from "../../layouts/ContentLayout";
import DepartmentUniSelect from "./DepartmentUniSelect";
import { IDepartment } from "../../../../shared/types/learning";

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.body};
`;

const InnerContainer = styled(ContentLayout)`
  padding: 5rem 2rem;

  ${down("tablet")} {
    padding: 2rem 2rem;
  }

  ${down("mobile")} {
    padding: 2rem 1rem;
  }
`;

const FlexBox = styled.div`
  display: flex;
`;

const StyledSelect = styled(Select)`
  width: 100%;
  margin-top: 1rem;
  &.ant-select-single:not(.ant-select-customize-input) > .ant-select-selector {
    width: 100%;
    height: 48px;
    background-color: ${({ theme }) => theme.colors.greyBg};
    border: 1px solid ${({ theme }) => theme.colors.typography.ashDark};

    .ant-select-selection-item {
      display: flex;
      align-items: center;
    }
  }
`;

const SectionsGrid = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 1.5rem;
`;

const SectionsDiv = styled.div<{ active?: boolean }>`
  padding: 1rem;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme, active }) =>
    active ? theme.colors.primary : theme.colors.divider};

  &:hover {
    background-color: ${({ theme, active }) =>
      active ? theme.colors.primary : theme.colors.primaryShadow};
  }
`;

const Sections = styled.div`
  & > ${Text1}, & > ${StyledSelect} {
    display: none;
  }

  margin-top: 5.5rem;

  ${down("tablet")} {
    margin-top: 2rem;

    & > ${Text1}, & > ${StyledSelect} {
      display: block;
    }
    ${SubTitle1}, ${SectionsGrid} {
      display: none;
    }
  }
`;

interface IProps {
  uniOptions: { name: string; abbr: string }[];
  departments: IDepartment[];
}

const DepartmentSearch: React.FC<IProps> = ({ uniOptions, departments }) => {
  const [selectedDept, setSelectedDept] = useState<number | undefined>(
    undefined
  );
  const [selectedSem] = useState<number | undefined>(undefined);

  const router = useRouter();

  const handleDeptClick = (key: number) => {
    setSelectedDept(key);
  };

  const handleSemester = (key: number) => {
    if (selectedDept !== undefined && departments[selectedDept]) {
      const base = router.asPath;
      const dept = departments[selectedDept].abbr.toLowerCase();
      const semester = departments[selectedDept].semesters[key]?.name;
      router.push(encodeURI(`${base}/${dept}/${semester}`));
    }
  };

  useEffect(() => {
    setSelectedDept(undefined);
  }, [router]);
  return (
    <Container>
      <InnerContainer>
        <FlexBox>
          <DepartmentUniSelect options={uniOptions} />
        </FlexBox>

        <Sections>
          {useBreakpoint(down("tablet")) ? (
            <>
              <Text1 level={3}>Departments</Text1>
              <StyledSelect
                onChange={(_v, o: any) => handleDeptClick(o.key)}
                value={departments[selectedDept || -1]?.name}
              >
                {departments.map((dept, i) => (
                  <Select.Option key={i} value={dept.name}>
                    <Text1>{dept.name}</Text1>
                  </Select.Option>
                ))}
              </StyledSelect>
            </>
          ) : (
            <>
              <SubTitle1>Departments</SubTitle1>
              <SectionsGrid>
                {departments.map((dept, i) => (
                  <SectionsDiv
                    key={i.toString()}
                    active={selectedDept === i}
                    onClick={() => handleDeptClick(i)}
                  >
                    <Text1
                      color={selectedDept === i ? "white" : "primary"}
                      align={"center"}
                      level={3}
                    >
                      {dept.name}
                    </Text1>
                    <Text1
                      color={selectedDept === i ? "white" : "primary"}
                      align={"center"}
                      level={3}
                    >
                      ({dept.abbr})
                    </Text1>
                  </SectionsDiv>
                ))}
              </SectionsGrid>
            </>
          )}
        </Sections>

        {selectedDept !== undefined ? (
          <Sections>
            <Text1 level={3}>Semesters</Text1>
            <StyledSelect
              onChange={(_v, o: any) => handleSemester(o.key)}
              value={
                departments[selectedDept || -1]?.semesters[selectedSem || -1]
                  ?.name
              }
            >
              {departments[selectedDept || -1]?.semesters.map((sem, i) => (
                <Select.Option key={i} value={sem.name}>
                  <Text1>{sem.name}</Text1>
                </Select.Option>
              ))}
            </StyledSelect>

            <SubTitle1>Semesters</SubTitle1>
            <SectionsGrid>
              {departments[selectedDept]?.semesters.map((sem, i) => (
                <SectionsDiv
                  key={i.toString()}
                  active={selectedSem === i}
                  onClick={() => handleSemester(i)}
                >
                  <Text1
                    color={selectedSem === i ? "white" : "primary"}
                    align={"center"}
                    level={3}
                  >
                    {sem.name}
                  </Text1>
                </SectionsDiv>
              ))}
            </SectionsGrid>
          </Sections>
        ) : null}
      </InnerContainer>
    </Container>
  );
};

export default DepartmentSearch;
