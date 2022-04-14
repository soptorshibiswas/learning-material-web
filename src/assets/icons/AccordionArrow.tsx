import React from "react";
import { theme } from "../styles/theme";
import styled from "styled-components";

const Svg = styled.svg<{ active?: boolean }>`
  transition: all 0.4s ease;
  transform: ${({ active }) => (active ? "rotate(0deg)" : "rotate(180deg)")};
`;

interface IProps {
  size: string;
  active?: boolean;
  footer?: boolean;
}

const AccordionArrow: React.FC<IProps> = ({ size, active, footer }) => {
  return footer ? (
    <Svg
      active={active}
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
    >
      <path
        d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z"
        fill={theme.colors.body}
      />
    </Svg>
  ) : (
    <Svg
      active={active}
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
    >
      <path
        d="M18 36C27.925 36 36 27.925 36 18C36 8.07504 27.925 0 18 0C8.07504 0 0 8.07504 0 18C0 27.925 8.07504 36 18 36ZM18 1.79853C26.9339 1.79853 34.2015 9.06607 34.2015 18C34.2015 26.9339 26.9339 34.2015 18 34.2015C9.06607 34.2015 1.79853 26.9339 1.79853 18C1.79853 9.06607 9.06607 1.79853 18 1.79853Z"
        fill={theme.colors.dark}
      />
      <path
        d="M13.5801 15.871L17.1038 12.3473V25.8106C17.1038 26.3098 17.5075 26.7135 18.0067 26.7135C18.5059 26.7135 18.9097 26.3098 18.9097 25.8106V12.3546L22.4333 15.8783C22.6095 16.0545 22.8371 16.1426 23.072 16.1426C23.3069 16.1426 23.5345 16.0545 23.7106 15.8783C24.063 15.5259 24.063 14.9607 23.7106 14.6083L18.6527 9.55041C18.3004 9.19804 17.7351 9.19804 17.3827 9.55041L12.3248 14.6083C11.9725 14.9607 11.9725 15.5259 12.3248 15.8783C12.6552 16.2233 13.2278 16.2233 13.5801 15.871Z"
        fill={theme.colors.dark}
      />
    </Svg>
  );
};

export default AccordionArrow;
