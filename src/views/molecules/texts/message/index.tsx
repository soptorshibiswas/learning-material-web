import React from "react";
import styled from "styled-components";
import { InfoCircleFilled } from "@ant-design/icons";

interface IMyProps {
  message: string;
  className?: string;
  type: "error" | "success" | "info";
}

const ErrorIcon = styled(InfoCircleFilled)`
  color: ${({ theme }) => theme.colors.danger};
`;

const SuccessIcon = styled(InfoCircleFilled)`
  color: ${({ theme }) => theme.colors.success};
`;

const InfoIcon = styled(InfoCircleFilled)`
  color: ${({ theme }) => theme.colors.sketchBack};
`;

const StyledMessage = styled.p`
  font-size: 0.75em;
  margin: 0 0.5em;
`;

const Error = styled(StyledMessage)`
  color: ${({ theme }) => theme.colors.danger};
`;

const Success = styled(StyledMessage)`
  color: ${({ theme }) => theme.colors.success};
`;

const Info = styled(StyledMessage)`
  color: ${({ theme }) => theme.colors.sketchBack};
`;

const FlexBox = styled.div`
  display: flex;
  align-items: center;
`;

const Message: React.FC<IMyProps> = (props) => {
  const { message, type, className } = props;
  return (
    <FlexBox className={className}>
      {type === "error" ? (
        <>
          <ErrorIcon />
          <Error>{message}</Error>
        </>
      ) : type === "success" ? (
        <>
          <SuccessIcon />
          <Success>{message}</Success>
        </>
      ) : type === "info" ? (
        <>
          <InfoIcon />
          <Info>{message}</Info>
        </>
      ) : null}
    </FlexBox>
  );
};

export { Message };
