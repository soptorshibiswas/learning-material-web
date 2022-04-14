import React from "react";
import { Button } from "antd";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import styled from "styled-components";

const ButtonStyled = styled(Button)`
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  height: auto;
  padding: 0.633rem 3rem;
`;

interface IProps {
  type?: "button" | "submit" | "reset";
  size?: SizeType;
  loading?: boolean;
  loadingText?: string;
  disabled?: boolean;
  className?: string;
  danger?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const FormSubmitButton: React.FC<IProps> = props => {
  const { type, size, onClick, loading, className, loadingText, disabled, danger } = props;
  return (
    <ButtonStyled
      htmlType={type}
      type="primary"
      danger={danger}
      disabled={disabled}
      onClick={onClick}
      size={size || "large"}
      className={className}
      loading={loading}
    >
      {loading ?
        loadingText || props.children
        :
        props.children
      }
    </ButtonStyled>
  );
};

export default FormSubmitButton;
