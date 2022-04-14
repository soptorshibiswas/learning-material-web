import { ReactNode } from "react";
import styled from "styled-components";

const Container = styled.div<{ verticalPadding?: string }>`
  width: 100%;
  height: 100%;
  max-width: 1430px;
  padding: 2rem 3rem;
  padding-bottom: 5rem;
`;

function AdminContentLayout(props: {
  className?: string;
  children: ReactNode;
}) {
  return <Container className={props.className}>{props.children}</Container>;
}

export default AdminContentLayout;
