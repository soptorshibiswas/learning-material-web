import React from "react";
import { Modal } from "antd";
import styled from "styled-components";
import { SubTitle1 } from "../texts/SubTitle";
import { Text1 } from "../texts/Text";
import RoundedButton from "../buttons/RoundedButton";
import { CloseCircleFilled } from "@ant-design/icons";

const ModalContent = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  padding: 3rem 2rem 2rem 2rem;
`;

const ButtonGrid = styled.div`
  display: flex;
  column-gap: 1.5rem;
  align-items: center;
  margin-top: 2rem;
`;

const CancelButton = styled(RoundedButton)`
  &,
  &:hover,
  &:focus {
    border-color: ${({ theme }) => theme.colors.danger};
    ${Text1} {
      color: ${({ theme }) => theme.colors.danger};
    }
  }
`;

const NoButton = styled(RoundedButton)`
  border-color: ${({ theme }) => theme.colors.black};
  &:hover,
  &:focus {
    ${Text1} {
      color: ${({ theme }) => theme.colors.primary};
      transition: all 0.3s ease-in;
    }
  }
`;

interface IProps {
  visible: boolean;
  title: string;
  onCancel: () => void;
  onOk: () => void;
  width?: string;
  loading?: boolean;
}

const DeleteModal: React.FC<IProps> = ({
  visible,
  title,
  onCancel,
  onOk,
  width,
  loading,
}) => {
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      closeIcon={<CloseCircleFilled />}
      footer={null}
      width={width}
    >
      <ModalContent>
        <SubTitle1 align={"center"}>{title}</SubTitle1>
        <ButtonGrid>
          <NoButton onClick={onCancel}>
            <Text1>No</Text1>
          </NoButton>

          <CancelButton onClick={onOk} loading={loading} disabled={loading}>
            <Text1 color={"danger"}>Yes</Text1>
          </CancelButton>
        </ButtonGrid>
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
