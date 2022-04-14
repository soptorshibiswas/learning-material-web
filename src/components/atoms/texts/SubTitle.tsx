//subtitle font-size,line-height
//SubTitle1 24px,40px
//SubTitle2 24px,32px

import styled from "styled-components";
import { TTextColors } from "./enum";

export const SubTitle1 = styled.h2<{
  color?: TTextColors;
  align?: string;
  level?: 0 | 1 | 2;
}>`
  color: ${({ theme, color }) =>
    color
      ? theme.colors.typography[color]
      : theme.colors.typography.textPrimary};
  font-weight: ${({ level }) => (level === 0 ? 400 : level === 2 ? 700 : 600)};
  font-size: 1.5rem;
  line-height: 2.5rem;
  text-align: ${({ align }) => align || "left"};
  margin: 0;
`;

// 3 levels in ascending weight order
export const SubTitle2 = styled.h3<{
  color?: TTextColors;
  level?: 1 | 2 | 3;
  align?: string;
}>`
  color: ${({ theme, color }) =>
    color
      ? theme.colors.typography[color]
      : theme.colors.typography.textPrimary};
  font-weight: ${({ level }) => (level === 3 ? 700 : level === 2 ? 600 : 500)};
  font-size: 1.5rem;
  line-height: 2rem;
  text-align: ${({ align }) => align || "left"};
  margin: 0;
`;
