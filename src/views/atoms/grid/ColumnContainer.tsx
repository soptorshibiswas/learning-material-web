import React from "react";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

interface IProps {
  className?: string;
}

const ColumnContainer: React.FC<IProps> = props => {
  const { className } = props;
  return (
    <Div className={className}>
      {props.children}
    </Div>
  );
};

export default ColumnContainer;
