import { ReactNode } from "react";
import { down } from "styled-breakpoints";
import styled from "styled-components";

const Container = styled.div<{ verticalPadding?: string }>`
  width: 100%;
  max-width: 1430px;
  padding: 0 10px;
  margin: auto;
  ${down("tablet")} {
    padding: 0 1rem;
    max-width: 100vw;
  }
`;

function ContentLayout(props: { className?: string; children: ReactNode }) {
  return <Container className={props.className}>{props.children}</Container>;
}

export default ContentLayout;
