//text font-size,line-height
//Text1 18px,30px
//Text2 20px,34px
//Text3 18px,21px
//Text4 14px, 22px

import styled from "styled-components";
import { TTextColors } from "./enum";

// 3 levels in ascending weight order
const Text = styled.p<{
  color?: TTextColors;
  level?: 1 | 2 | 3 | 4;
  align?: string;
}>`
  color: ${({ theme, color }) =>
    color
      ? theme.colors.typography[color]
      : theme.colors.typography.textPrimary};
  font-weight: ${({ level }) =>
    !level
      ? 500
      : level === 3
      ? 600
      : level === 4
      ? 700
      : level === 2
      ? 500
      : 400};
  margin: 0;
  text-align: ${({ align }) => align || "left"};
`;

export const Text1 = styled(Text)`
  font-size: 1.125rem;
  line-height: 1.875rem;
`;

export const Text2 = styled(Text)`
  font-size: 1.25rem;
  line-height: 2.125rem;
`;

export const Text3 = styled(Text)`
  font-size: 1.125rem;
  line-height: 1.313rem;
  font-weight: 500;
`;

export const Text4 = styled(Text)`
  font-size: 0.875rem;
  line-height: 1.375rem;
`;

export const FormText = styled(Text1)`
  font-weight: 600;
`;
