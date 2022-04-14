import styled from "styled-components";
import { down } from "styled-breakpoints";
import { SubTitle1 } from "../../atoms/texts/SubTitle";
import { Menu } from "antd";
import { Text1 } from "../../atoms/texts/Text";

export const TopHeaderBG = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.divider};

  ${down("tablet")} {
    background-color: ${({ theme }) => theme.colors.body};
    height: 60px;
  }
`;
export const TopHeader = styled.div`
  max-width: 1430px;
  margin: auto;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;

  ${down("desktop")} {
    padding: 0.75rem 0.5rem;
    ${SubTitle1} {
      display: none;
    }
  }
`;

export const Logo = styled.img`
  max-height: 4.375rem;
  ${down("tablet")} {
    height: 2.25rem;
  }
`;

export const StyledMenu = styled(Menu)`
  border-radius: 0;
  padding: 1rem;
  transform: translateY(-0.25rem);
  box-shadow: none;
  ${Text1} {
    padding-right: 2rem;
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const IconMenuItem = styled(Menu.Item)`
  padding: 0.5rem 3rem 0.5rem 1.5rem;
  svg {
    margin-right: 1rem;
  }
`;
