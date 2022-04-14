import styled from "styled-components";

export const Gap = styled.div<{ height?: string; width?: string }>`
  height: ${({ height }) => (height ? height : "0.25rem")};
  width: ${({ width }) => (width ? width : "0.25rem")};
`;
