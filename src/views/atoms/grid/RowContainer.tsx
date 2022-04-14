import React from "react";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  flex: 1;
`;

interface IProps {
  className?: string;
}

const RowContainer: React.FC<IProps> = props => {
  const { className } = props;
  return (
    <Div className={className}>
      {props.children}
    </Div>
  );
};

export default RowContainer;
