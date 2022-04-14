import Link from "next/link";
import { Gap } from "src/views/atoms/spaces";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import { ADMIN_HOME, ADMIN_LOGIN } from "../../../../shared/constants/routes";
import { useAuthContext } from "../../../HOC/contexts/AuthContext";
import { showErrorToastAction } from "../../../HOC/contexts/toast";
import NavAdminDropdown from "../../molecules/navItems/NavAdminDropDown";

const LayoutContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.greyBg};
  min-height: 100vh;
  width: 100%;
  max-width: 1920px;
  margin: auto;
`;

const SidebarContainer = styled.div`
  height: 100%;
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.zIndex1000};
`;

const LeftSidebar = styled.div`
  height: 100%;
  width: 300px;
  background-color: ${({ theme }) => theme.colors.body};
  padding-top: 2.5rem;
  overflow-y: auto;
`;

const LogoDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  margin-bottom: 2rem;
`;
const LogoImage = styled.img`
  min-width: 80%;
  width: 14rem;
  max-width: 100%;
  object-fit: contain;
`;

const RigthContentContainer = styled.div`
  flex: 1;
  margin-left: 300px;
  display: flex;
  flex-direction: column;
`;

const BodyHeaderContainer = styled.div`
  width: calc(100% - 300px);
  position: fixed;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.zIndex900};
`;

const BodyHeader = styled.header`
  width: 100%;
  padding: 0 4rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.body};
`;

const BodyContainer = styled.div`
  margin-top: 4rem;
  min-height: calc(100% - 4.6rem);
`;

const MainContent = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.body};
`;

interface IProps {
  children?: React.ReactNode;
  className?: string;
}

export default function AdminLayout(props: IProps) {
  const { logoutAdminApiAction, authAdmin } = useAuthContext();
  const [logoutLoading, setLogoutLoading] = useState<boolean>(false);
  const router = useRouter();

  const onLogoutSuccess = () => {
    setLogoutLoading(false);
    router.replace(ADMIN_LOGIN());
  };

  const onLogout = () => {
    setLogoutLoading(true);
    try {
      logoutAdminApiAction(onLogoutSuccess, () => setLogoutLoading(false));
    } catch (error) {
      setLogoutLoading(false);
      showErrorToastAction({
        message: "Something went wrong",
      });
    }
  };

  return (
    <LayoutContainer className={props.className}>
      <SidebarContainer>
        <LeftSidebar>
          <Link href={ADMIN_HOME()}>
            <a>
              <LogoDiv>
                <LogoImage src={"/images/logo.jpg"} />
              </LogoDiv>
            </a>
          </Link>
        </LeftSidebar>
      </SidebarContainer>
      <Gap width="0.6em" />
      <RigthContentContainer>
        <BodyHeaderContainer>
          <BodyHeader>
            <NavAdminDropdown
              name={authAdmin?.username || "Admin"}
              image={authAdmin?.avatar || ""}
              onLogout={onLogout}
              loading={logoutLoading}
            />
          </BodyHeader>
        </BodyHeaderContainer>
        <Gap height="0.6em" />
        <BodyContainer>
          <MainContent>{props.children}</MainContent>
        </BodyContainer>
      </RigthContentContainer>
    </LayoutContainer>
  );
}
