//title font-size,line-height
//Title1 48px,80px
//Title2 36px,60px

import styled from "styled-components";
import { TTextColors } from "./enum";

export const TitleHero = styled.h1<{ color?: TTextColors; align?: string }>`
  color: ${({ theme, color }) =>
    color
      ? theme.colors.typography[color]
      : theme.colors.typography.textPrimary};
  font-weight: 600;
  font-size: 4rem;
  line-height: 6.5rem;
  text-align: ${({ align }) => align || "left"};
  margin: 0;
`;

export const Title1 = styled.h1<{ color?: TTextColors; align?: string }>`
  color: ${({ theme, color }) =>
    color
      ? theme.colors.typography[color]
      : theme.colors.typography.textPrimary};
  font-weight: 600;
  font-size: 3rem;
  line-height: 5rem;
  text-align: ${({ align }) => align || "left"};
  margin: 0;
`;

// 2 levels in ascending weight order
export const Title2 = styled.h1<{
  color?: TTextColors;
  level?: 1 | 2;
  align?: string;
}>`
  color: ${({ theme, color }) =>
    color
      ? theme.colors.typography[color]
      : theme.colors.typography.textPrimary};
  font-weight: ${({ level }) => (level === 2 ? 700 : 600)};
  font-size: 2.25rem;
  line-height: 3.75rem;
  text-align: ${({ align }) => align || "left"};
  margin: 0;
`;
