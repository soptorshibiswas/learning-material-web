import { Menu, Dropdown } from "antd";
import styled from "styled-components";
import { Text1 } from "../../../atoms/texts/Text";

export const StyledDropdown = styled(Dropdown)`
  height: min-content;
`;

export const MenuIcon = styled.span`
  width: auto;
  cursor: pointer;
  justify-self: flex-end;
`;

export const StyledMenu = styled(Menu)`
  width: auto;
  padding: 0 1.5rem;
`;
export const MenuItem = styled(Menu.Item)`
  padding: 1.25rem 0;
  padding-right: 6rem;
  span {
    display: flex;
    flex-flow: row;
    svg {
      margin-right: 2rem;
      fill: ${({ theme }) => theme.colors.typography.ashDark};
    }
  }

  &[datatype="edit"]:hover {
    svg,
    path {
      fill: ${({ theme }) => theme.colors.primary};
    }
    ${Text1} {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
  &[datatype="delete"]:hover {
    svg,
    path {
      fill: ${({ theme }) => theme.colors.danger};
    }
    ${Text1} {
      color: ${({ theme }) => theme.colors.danger};
    }
  }

  &:hover,
  &:focus {
    background: ${({ theme }) => theme.colors.body};
  }
`;

export const Divider = styled.div`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;
