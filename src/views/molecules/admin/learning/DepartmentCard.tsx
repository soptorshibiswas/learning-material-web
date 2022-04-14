import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { IDepartment } from "../../../../../shared/types/learning";
import AdminEditIcon from "../../../../assets/icons/admin/EditIcon";
import AdminTrashIcon from "../../../../assets/icons/admin/TrashIcon";
import { Gap } from "../../../atoms/spaces";
import { Text1, Text4 } from "../../../atoms/texts/Text";
import DotsIcon from "../../../../assets/icons/admin/DotsIcon";
import AccordionArrow from "../../../../assets/icons/AccordionArrow";
import {
  Divider,
  MenuIcon,
  MenuItem,
  StyledDropdown,
  StyledMenu,
} from "./components";
import { ADMIN_LEARNING_SEMESTER } from "../../../../../shared/constants/routes";

const Container = styled.div<{ open: boolean }>`
  padding: 1.25rem 1.5rem;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.divider};
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  grid-row: ${({ open }) => (open ? "span 2" : "auto")};
  transition: all 0.5s ease;
`;

const Desc = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 1fr;
  column-gap: 0.5rem;

  & > ${Text1} {
    cursor: pointer;
  }
`;

const Bottom = styled.div``;

const Collapse = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const Semesters = styled.div<{ open: boolean }>`
  padding-top: 2rem;
  display: ${({ open }) => (open ? "flex" : "none")};
  height: ${({ open }) => (open ? "auto" : "0rem")};
  /* grid-template-columns: 1fr 1fr 1fr; */
  flex-wrap: wrap;
  column-gap: 0.75rem;
  row-gap: 0.55rem;
  transition: all 0.5s ease;
`;

const SemesterBadge = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.primaryBadgeBG};
  border-radius: 5px;
  padding: 0.5rem;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

interface IProps {
  department: IDepartment;
  open: boolean;
  onClick: (id: string) => void;
  onEdit: (dept: IDepartment) => void;
  onDelete: (dept: IDepartment) => void;
}

const DepartmentCard: React.FC<IProps> = ({
  department,
  open,
  onClick,
  onEdit,
  onDelete,
}) => {
  const handleMenuClick = (e: any) => {
    if (e.key === "1") {
      onEdit && onEdit(department);
    } else if (e.key === "2") {
      onDelete && onDelete(department);
    }
  };

  const renderMenu = () => {
    return (
      <StyledMenu onClick={handleMenuClick}>
        <MenuItem key="1" datatype="edit">
          <AdminEditIcon />
          <Text1 level={3}>Edit</Text1>
        </MenuItem>

        <Divider />

        <MenuItem key="2" datatype="delete">
          <AdminTrashIcon />
          <Text1 level={3}>Delete</Text1>
        </MenuItem>
      </StyledMenu>
    );
  };

  const router = useRouter();
  const handleSemesterClick = (_id: string) => {
    router.push(ADMIN_LEARNING_SEMESTER(department._id, _id));
  };

  return (
    <Container open={open}>
      <Desc>
        <Text1
          level={3}
          color={"primary"}
          onClick={() => onClick(department._id)}
        >
          {department.name} ({department.abbr.toUpperCase()})
        </Text1>
        <StyledDropdown overlay={renderMenu()} placement={"bottomLeft"}>
          <MenuIcon>
            <DotsIcon size={"24"} />
          </MenuIcon>
        </StyledDropdown>
      </Desc>
      <Gap height={"1rem"} />

      <Bottom>
        <Divider />
        <Gap height={"1rem"} />

        <Collapse onClick={() => onClick(department._id)}>
          <Text4 level={3} color={"primary"}>
            Total {department.totalSemesters} semesters
          </Text4>
          <AccordionArrow active={open} size={"20"} />
        </Collapse>

        <Semesters open={open}>
          {department.semesters.map((sem) => (
            <SemesterBadge
              key={sem._id}
              onClick={() => sem._id && handleSemesterClick(sem._id)}
            >
              <Text1 color={"primary"}>{sem.name}</Text1>
            </SemesterBadge>
          ))}
        </Semesters>
      </Bottom>
    </Container>
  );
};

export default DepartmentCard;
