import React from "react";
import styled from "styled-components";
import { ICourse } from "../../../../../shared/types/learning";
import AdminEditIcon from "../../../../assets/icons/admin/EditIcon";
import AdminTrashIcon from "../../../../assets/icons/admin/TrashIcon";
import { Text1, Text2, Text4 } from "../../../atoms/texts/Text";
import DotsIcon from "../../../../assets/icons/admin/DotsIcon";
import {
  Divider,
  MenuIcon,
  MenuItem,
  StyledDropdown,
  StyledMenu,
} from "./components";
import FolderIcon from "../../../../assets/icons/learning/FolderIcon";

const Container = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  padding: 1rem 0;
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.colors.dividerLight};
  &:nth-last-child(1) {
    border-bottom: none;
  }

  & > svg {
    width: 3rem;
    height: 3rem;
  }

  ${StyledDropdown} {
    justify-self: flex-end;
    align-self: flex-start;
  }
`;

const Sub = styled.div`
  flex: 10;
  display: flex;
  flex-flow: column;
  margin-left: 1rem;
`;

interface IProps {
  course: ICourse;
  onClick: (id: string) => void;
  onEdit: (course: ICourse) => void;
  onDelete: (course: ICourse) => void;
}

const CourseItem: React.FC<IProps> = ({
  course,
  onClick,
  onEdit,
  onDelete,
}) => {
  const handleMenuClick = (e: any) => {
    if (e.key === "1") {
      onEdit && onEdit(course);
    } else if (e.key === "2") {
      onDelete && onDelete(course);
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

  return (
    <Container>
      <FolderIcon onClick={() => onClick(course._id)} />
      <Sub>
        <Text2 level={3} onClick={() => onClick(course._id)}>
          {course.name}
        </Text2>
        <Text4 level={1} color={"textSecondary"}>
          {course.code}
        </Text4>
      </Sub>

      <StyledDropdown overlay={renderMenu()} placement={"bottomLeft"}>
        <MenuIcon>
          <DotsIcon size={"24"} />
        </MenuIcon>
      </StyledDropdown>
    </Container>
  );
};

export default CourseItem;
