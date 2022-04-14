import React from "react";
import styled from "styled-components";
import { IMaterial } from "../../../../../shared/types/learning";
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
import QuestionNoteIcon from "../../../../assets/icons/learning/QuestionNoteIcon";
import LectureNoteIcon from "../../../../assets/icons/learning/LectureNoteIcon";
import RefBookIcon from "../../../../assets/icons/learning/RefBookIcon";

const Container = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  padding: 1rem 0.5rem;
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.colors.dividerLight};
  &:nth-last-child(1) {
    border-bottom: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.divider};
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
  material: IMaterial;
  onEdit: (material: IMaterial) => void;
  onDelete: (material: IMaterial) => void;
}

const MaterialItem: React.FC<IProps> = ({ material, onEdit, onDelete }) => {
  const handleMenuClick = (e: any) => {
    if (e.key === "1") onEdit && onEdit(material);
    else if (e.key === "2") onDelete && onDelete(material);
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

  const getIcon = () => {
    switch (material.type) {
      case "refBook": {
        return <RefBookIcon />;
      }
      case "question": {
        return <QuestionNoteIcon />;
      }
      case "lectureNote": {
        return <LectureNoteIcon />;
      }

      default:
        return null;
    }
  };

  const getTitle = () => {
    return material.type === "question" ? material.sessionYear : material.name;
  };

  return (
    <Container>
      {getIcon()}
      <Sub>
        <Text2 level={3}>{getTitle()}</Text2>
        <Text4 level={1} color={"textSecondary"}>
          {material.author}
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

export default MaterialItem;
