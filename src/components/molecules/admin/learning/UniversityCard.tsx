import React from "react";
import styled from "styled-components";
import { IUniversity } from "../../../../../shared/types/learning";
import AdminEditIcon from "../../../../assets/icons/admin/learning/EditIcon";
import AdminDeleteIcon from "../../../../assets/icons/admin/learning/DeleteIcon";
import { Gap } from "../../../atoms/spaces";
import { Text1, Text4 } from "../../../atoms/texts/Text";

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  opacity: 0;
  svg {
    margin-left: 1rem;
  }
  z-index: 10;
`;

const Container = styled.div`
  padding: 1.25rem 1.5rem;
  border-radius: 4px;
  border: 1px solid transparent;
  background-color: ${({ theme }) => theme.colors.divider};
  background-image: url("/images/openBookBG.png");
  background-position: bottom -2rem right -2rem;
  background-repeat: no-repeat;
  background-size: 10rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease;
  z-index: 1;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primaryLight};

    * {
      transition: all 0.2s ease;
    }
    ${Text1}, ${Text4} {
      color: ${({ theme }) => theme.colors.primary};
    }
    ${Buttons} {
      opacity: 1;
    }
  }
`;

const Desc = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 1fr;
  column-gap: 0.5rem;
`;

interface IProps {
  university: IUniversity;
  onClick: (id: string) => void;
  onEdit: (uni: IUniversity) => void;
  onDelete: (uni: IUniversity) => void;
}

const UniversityCard: React.FC<IProps> = ({
  university,
  onClick,
  onEdit,
  onDelete,
}) => {
  const handleEdit = (e: any) => {
    e.stopPropagation();
    onEdit(university);
  };
  const handleDelete = (e: any) => {
    e.stopPropagation();
    onDelete(university);
  };
  return (
    <Container onClick={() => onClick(university._id)}>
      <Desc>
        <Text1 level={3}>
          {university.name} ({university.abbr})
        </Text1>
        <Buttons>
          <AdminDeleteIcon onClick={handleDelete} />
          <AdminEditIcon onClick={handleEdit} />
        </Buttons>
      </Desc>
      <Gap height={"1rem"} />
      <Text4 level={1} color={"textSecondary"}>
        {university.totalDepartments} Departments
      </Text4>
    </Container>
  );
};

export default UniversityCard;
