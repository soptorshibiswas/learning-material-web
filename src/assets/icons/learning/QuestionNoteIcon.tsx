import React from "react";
import styled from "styled-components";

const Svg = styled.svg``;

interface IProps {
  children?: React.ReactNode;
  size?: string;
}

const QuestionNoteIcon: React.FC<IProps> = (props) => (
  <Svg
    width={props.size || "56"}
    height={props.size || "56"}
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M42.0002 51.3335H9.3335V9.3335H32.6668L42.0002 18.6668V51.3335Z"
      fill="#42A5F5"
    />
    <path
      d="M46.6667 46.6665H14V4.6665H37.3333L46.6667 13.9998V46.6665Z"
      fill="#90CAF9"
    />
    <path d="M44.917 15.1665H36.167V6.4165L44.917 15.1665Z" fill="#E1F5FE" />
    <path
      d="M28.5829 33.0168C28.5829 27.5334 32.7829 27.8834 32.7829 24.6168C32.7829 23.8001 32.5496 22.1668 30.4496 22.1668C28.1163 22.1668 27.9996 24.0334 27.9996 24.5001H24.8496C24.8496 23.6834 25.1996 19.6001 30.4496 19.6001C35.8163 19.6001 35.9329 23.8001 35.9329 24.6168C35.9329 28.7001 31.4996 29.2834 31.4996 33.1334H28.5829V33.0168ZM28.3496 37.1001C28.3496 36.8668 28.3496 35.3501 30.0996 35.3501C31.7329 35.3501 31.8496 36.8668 31.8496 37.1001C31.8496 37.5668 31.6163 38.7334 30.0996 38.7334C28.5829 38.7334 28.3496 37.5668 28.3496 37.1001Z"
      fill="#1976D2"
    />
  </Svg>
);

export default QuestionNoteIcon;
