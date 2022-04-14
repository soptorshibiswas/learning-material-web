import styled from "styled-components";
import { down } from "styled-breakpoints";
import { useBreakpoint } from "styled-breakpoints/react-styled";
import { Text1 } from "../../atoms/texts/Text";
import { SubTitle1 } from "../../atoms/texts/SubTitle";
import { Logo } from "../../organisms/header/components";
import { Gap } from "./../../atoms/spaces/index";
import AdminLoginForm from "../../organisms/admin/login/AdminLoginForm";
import AdminContentLayout from "./../../layouts/adminLayout/AdminContentLayout";

const MainContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.lightBg};
  min-height: 100vh;
  padding: 0 2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  ${down("tablet")} {
    padding: 0 1rem;
  }
`;

const Container = styled(AdminContentLayout)`
  margin: auto;
  background-color: ${({ theme }) => theme.colors.body};
  box-shadow: ${({ theme }) => theme.colors.smallCardShadow};
  max-height: 90vh;

  ${down("tablet")} {
    padding: 1rem;
    max-width: 100vw;
    min-height: 90vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const TopHeader = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
  background-color: ${({ theme }) => theme.colors.body};

  ${down("desktop")} {
    padding: 0.75rem 0.5rem;
  }

  ${down("mobile")} {
    justify-content: center;
  }
`;

const FormDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem 0;
`;

const MainFormDiv = styled.div`
  width: 50%;

  ${Text1}, ${SubTitle1} {
    text-align: center;
  }

  ${down("tablet")} {
    width: 100%;
  }
`;

const AdminLoginPage: React.FC = () => {
  return (
    <MainContainer>
      <Container>
        <TopHeader>
          <Logo src={"/images/logo.jpg"} alt="learning material" />
        </TopHeader>

        <FormDiv>
          <MainFormDiv>
            {useBreakpoint(down("tablet")) ? (
              <Text1 level={4}>
                Login to online learning material admin panel
              </Text1>
            ) : (
              <SubTitle1 level={2}>
                Login to online learning material admin panel
              </SubTitle1>
            )}

            <Gap height={"1.5rem"} />
            <AdminLoginForm />
          </MainFormDiv>
        </FormDiv>
      </Container>
    </MainContainer>
  );
};

export default AdminLoginPage;
