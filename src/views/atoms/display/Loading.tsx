import React from "react";
import styled from "styled-components";

interface IProps {
  size?: string;
  className?: string;
  paddingSize?: "small" | "large";
}

const MiddleBox = styled.div<{ paddingSize: "small" | "large" }>`
  display: flex;
  justify-content: center;
  padding-top: ${({ paddingSize }) =>
    paddingSize === "small" ? "1em" : "3em"};
  width: 100%;
`;

const Loading: React.FC<IProps> = (props) => {
  const { size, className, paddingSize = "large" } = props;

  return (
    <MiddleBox className={className} paddingSize={paddingSize}>
      <svg
        width={size || "20px"}
        height={size || "20px"}
        viewBox="0 0 44 44"
        xmlns="http://www.w3.org/2000/svg"
        stroke={"blue"}
      >
        <g fill="none" fillRule="evenodd" strokeWidth="1">
          <circle cx="22" cy="22" r="1">
            <animate
              attributeName="r"
              begin="0s"
              dur="1.8s"
              values="1; 20"
              calcMode="spline"
              keyTimes="0; 1"
              keySplines="0.165, 0.84, 0.44, 1"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-opacity"
              begin="0s"
              dur="1.8s"
              values="1; 0"
              calcMode="spline"
              keyTimes="0; 1"
              keySplines="0.3, 0.61, 0.355, 1"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="22" cy="22" r="1">
            <animate
              attributeName="r"
              begin="-0.9s"
              dur="1.8s"
              values="1; 20"
              calcMode="spline"
              keyTimes="0; 1"
              keySplines="0.165, 0.84, 0.44, 1"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-opacity"
              begin="-0.9s"
              dur="1.8s"
              values="1; 0"
              calcMode="spline"
              keyTimes="0; 1"
              keySplines="0.3, 0.61, 0.355, 1"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </svg>
    </MiddleBox>
  );
};

export default Loading;
