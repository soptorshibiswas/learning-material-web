// import dynamic from "next/dynamic";
import React from "react";
import { Footer } from "../organisms/footer";
import styled from "styled-components";
import HeaderTop from "../organisms/header/TopHeader";

// import dynamically avoiding useLayoutEffect errors
// const Header = dynamic(() => import("../organisms/header"), { ssr: false });

const Container = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.body};
  width: 100%;
  max-width: 1920px;
  margin: auto;
`;

interface IProps {
  children: React.ReactNode;
  className?: string;
}

const MainLayout: React.FC<IProps> = (props) => {
  return (
    <Container className={props.className}>
      <HeaderTop />

      <main>{props.children}</main>

      <Footer />
    </Container>
  );
};

const InnerPageLayout = styled(MainLayout)`
  background-color: ${({ theme }) => theme.colors.divider};
`;

export { MainLayout, InnerPageLayout };
