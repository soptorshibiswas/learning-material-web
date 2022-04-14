import React from "react";
import styled from "styled-components";

const Svg = styled.svg``;

interface IProps {
  children?: React.ReactNode;
  size?: string;
  active?: boolean;
}

const AnswerIcon: React.FC<IProps> = (props) => (
  <Svg
    width={props.size || "20"}
    height={props.size || "20"}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.0166 1.5918H5.98327C4.2166 1.5918 2.7666 3.0418 2.7666 4.80846V16.5501C2.7666 18.0501 3.8416 18.6835 5.15827 17.9585L9.22493 15.7001C9.65827 15.4585 10.3583 15.4585 10.7833 15.7001L14.8499 17.9585C16.1666 18.6918 17.2416 18.0585 17.2416 16.5501V4.80846C17.2333 3.0418 15.7916 1.5918 14.0166 1.5918ZM13.0166 7.52513L9.68327 10.8585C9.55827 10.9835 9.39993 11.0418 9.2416 11.0418C9.08327 11.0418 8.92493 10.9835 8.79993 10.8585L7.54993 9.60846C7.30827 9.3668 7.30827 8.9668 7.54993 8.72513C7.7916 8.48346 8.1916 8.48346 8.43327 8.72513L9.2416 9.53346L12.1333 6.6418C12.3749 6.40013 12.7749 6.40013 13.0166 6.6418C13.2583 6.88346 13.2583 7.28346 13.0166 7.52513Z"
      fill={props.active ? "#F6F6F6" : "#0E5A49"}
    />
  </Svg>
);

export default AnswerIcon;
