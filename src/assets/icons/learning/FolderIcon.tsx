import React from "react";
import styled from "styled-components";

const Svg = styled.svg``;

interface IProps {
  children?: React.ReactNode;
  size?: string;
  onClick?: () => void;
}

const FolderIcon: React.FC<IProps> = ({ size, onClick }) => (
  <Svg
    width={size || "64"}
    height={size || "64"}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
  >
    <path
      d="M50.6666 15.9998H29.3333L23.9999 10.6665H10.6666C7.73325 10.6665 5.33325 13.0665 5.33325 15.9998V47.9998C5.33325 50.9332 7.73325 53.3332 10.6666 53.3332H51.9999C54.2666 53.3332 55.9999 51.5998 55.9999 49.3332V21.3332C55.9999 18.3998 53.5999 15.9998 50.6666 15.9998Z"
      fill="#FFA000"
    />
    <path
      d="M56.2667 24H20.4001C17.8667 24 15.6001 25.8667 15.2001 28.4L10.6667 53.3333H52.9334C55.4667 53.3333 57.7334 51.4667 58.1334 48.9333L61.4667 30.2667C62.1334 27.0667 59.6001 24 56.2667 24V24Z"
      fill="#FFCA28"
    />
  </Svg>
);

export default FolderIcon;
