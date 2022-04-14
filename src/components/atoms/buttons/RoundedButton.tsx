import React, { ReactNode } from "react";
import { Button } from "antd";
import styled from "styled-components";

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  border-radius: 0.313rem;
  min-height: 2.875rem;
  padding: 0.5rem 1.5rem;

  svg {
    margin-left: 1rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

interface IProps {
  icon?: ReactNode;
  children: ReactNode;
  type?: "link" | "text" | "default" | "ghost" | "dashed" | "primary";
  size?: "large" | "middle" | "small";
  htmlType?: "button" | "reset" | "submit";
  loading?: boolean;
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const RoundedButton: React.FC<IProps> = ({
  icon,
  children,
  type,
  size,
  htmlType,
  loading,
  href,
  onClick,
  className,
  disabled,
}) => {
  return (
    <StyledButton
      type={type}
      size={size}
      htmlType={htmlType}
      loading={loading}
      href={href}
      onClick={() => onClick && onClick()}
      className={className}
      disabled={disabled}
    >
      {children}
      {icon ? icon : null}
    </StyledButton>
  );
};

export default RoundedButton;
