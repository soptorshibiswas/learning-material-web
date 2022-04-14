import { Divider } from "antd";
import styled from "styled-components";
import React from "react";

const DividerStyled = styled(Divider)<IProps>`
  margin: 0;
  border-color: ${({ theme, color }: any) =>
    color ? theme.colors[color] : theme.colors.divider};
`;

interface IProps {
  type?: "horizontal" | "vertical";
  color?: string;
  className?: string;
}

const MyDivider: React.FC<IProps> = (props) => {
  const { type, className, color } = props;

  return (
    <DividerStyled
      className={className}
      type={type || "vertical"}
      color={color}
    />
  );
};

export default MyDivider;
