import React from "react";
import styled from "styled-components";

const Svg = styled.svg``;

interface IProps {
  children?: React.ReactNode;
  size?: string;
  color?: string;
}

const UniversityIcon: React.FC<IProps> = (props) => (
  <Svg
    width={props.size || "24"}
    height={props.size || "24"}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22 21.2502H20.75V11.0002C20.75 8.58019 19.42 7.25019 17 7.25019H12.75V6.02019C13.33 6.16019 13.91 6.24019 14.5 6.24019C15.44 6.24019 16.38 6.06019 17.28 5.70019C17.56 5.59019 17.75 5.31019 17.75 5.00019V2.00019C17.75 1.75019 17.63 1.52019 17.42 1.38019C17.21 1.24019 16.95 1.21019 16.72 1.30019C15.29 1.87019 13.71 1.87019 12.28 1.30019C12.05 1.21019 11.79 1.24019 11.58 1.38019C11.37 1.52019 11.25 1.75019 11.25 2.00019V5.00019V7.25019H7C4.58 7.25019 3.25 8.58019 3.25 11.0002V21.2502H2C1.59 21.2502 1.25 21.5902 1.25 22.0002C1.25 22.4102 1.59 22.7502 2 22.7502H4H20H22C22.41 22.7502 22.75 22.4102 22.75 22.0002C22.75 21.5902 22.41 21.2502 22 21.2502ZM7.24 21.2502H4.75V12.7502H7.24V21.2502ZM11.24 21.2502H8.74V12.7502H11.24V21.2502ZM15.24 21.2502H12.74V12.7502H15.24V21.2502ZM19.25 21.2502H16.74V12.7502H19.25V21.2502Z"
      fill="#ADADAD"
    />
  </Svg>
);

export default UniversityIcon;