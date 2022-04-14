import React from "react";
import styled from "styled-components";

const Svg = styled.svg``;

interface IProps {
  children?: React.ReactNode;
  size?: string;
  active?: boolean;
}

const QuestionIcon: React.FC<IProps> = (props) => (
  <Svg
    width={props.size || "20"}
    height={props.size || "20"}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.167 2.0249H5.83366C3.33366 2.0249 1.66699 3.69157 1.66699 6.19157V11.1916C1.66699 13.6916 3.33366 15.3582 5.83366 15.3582V17.1332C5.83366 17.7999 6.57533 18.1999 7.12533 17.8249L10.8337 15.3582H14.167C16.667 15.3582 18.3337 13.6916 18.3337 11.1916V6.19157C18.3337 3.69157 16.667 2.0249 14.167 2.0249ZM10.0003 12.1666C9.65033 12.1666 9.37533 11.8832 9.37533 11.5416C9.37533 11.1999 9.65033 10.9166 10.0003 10.9166C10.3503 10.9166 10.6253 11.1999 10.6253 11.5416C10.6253 11.8832 10.3503 12.1666 10.0003 12.1666ZM11.0503 8.70824C10.7253 8.9249 10.6253 9.06657 10.6253 9.2999V9.4749C10.6253 9.81657 10.342 10.0999 10.0003 10.0999C9.65866 10.0999 9.37533 9.81657 9.37533 9.4749V9.2999C9.37533 8.33324 10.0837 7.85824 10.3503 7.6749C10.6587 7.46657 10.7587 7.3249 10.7587 7.10824C10.7587 6.69157 10.417 6.3499 10.0003 6.3499C9.58366 6.3499 9.24199 6.69157 9.24199 7.10824C9.24199 7.4499 8.95866 7.73324 8.61699 7.73324C8.27533 7.73324 7.99199 7.4499 7.99199 7.10824C7.99199 5.9999 8.89199 5.0999 10.0003 5.0999C11.1087 5.0999 12.0087 5.9999 12.0087 7.10824C12.0087 8.05824 11.3087 8.53324 11.0503 8.70824Z"
      fill={props.active ? "#F6F6F6" : "#0E5A49"}
    />
  </Svg>
);

export default QuestionIcon;
