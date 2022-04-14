import { Button, Radio } from "antd";
import styled from "styled-components";
import { TextFieldForm } from "../../../molecules/inputfields";
import RoundedButton from "../../../atoms/buttons/RoundedButton";
import { Text1 } from "../../../atoms/texts/Text";
import { TextField } from "../../../atoms/inputs";
import { down } from "styled-breakpoints";

export const Desc = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0 1.75rem 0;
`;

export const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-gap: 3rem;
`;

export const DeptGrid = styled(Grid)`
  ${down("desktop")} {
    grid-template-columns: 1fr 1fr;
  }
`;

export const List = styled.div`
  display: grid;
  grid-template-rows: auto;
  row-gap: 0.5rem;
`;

export const SearchField = styled(TextFieldForm)<{ show?: boolean }>`
  background-color: ${({ theme }) => theme.colors.body};
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  * {
    background-color: ${({ theme }) => theme.colors.body};
  }
  .ant-input-suffix {
    color: ${({ theme }) => theme.colors.primary};
  }
  input::placeholder {
    color: ${({ theme }) => theme.colors.primary};
  }

  display: ${({ show }) => (show === false ? "none" : "block")};
`;

export const StyledButton = styled(RoundedButton)`
  display: flex;
  align-items: center;
  border-color: ${({ theme }) => theme.colors.primary};
`;

export const IconButton = styled(RoundedButton)`
  svg {
    width: 22;
    height: 22;
    margin-left: 0;
    color: ${({ theme }) => theme.colors.body};
  }
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;

  & > *:not(:nth-last-child(1)) {
    margin-right: 1rem;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
`;

export const AddButton = styled(RoundedButton)`
  svg {
    color: ${({ theme }) => theme.colors.body};
    height: 1.25rem;
    width: 1.25rem;
  }
`;

export const NoMatchContainer = styled(Container)`
  margin-top: 4rem;
  min-height: auto;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  padding: 3rem 2rem 2rem 2rem;
`;

export const ButtonGrid = styled.div`
  display: flex;
  column-gap: 1.5rem;
  align-items: center;
  margin-top: 2rem;
`;

export const CancelButton = styled(RoundedButton)`
  &,
  &:hover,
  &:focus {
    border-color: ${({ theme }) => theme.colors.danger};
    ${Text1} {
      color: ${({ theme }) => theme.colors.danger};
    }
  }
`;

export const NoButton = styled(RoundedButton)`
  border-color: ${({ theme }) => theme.colors.black};
  &:hover,
  &:focus {
    ${Text1} {
      color: ${({ theme }) => theme.colors.primary};
      transition: all 0.3s ease-in;
    }
  }
`;

export const EditModalContent = styled(ModalContent)`
  align-items: flex-start;

  & > * {
    width: 100%;
  }
  & > button {
    width: initial;
    align-self: center;
  }
`;

export const RadioGroup = styled(Radio.Group)`
  display: flex;
  align-items: center;
`;

export const RadioNumber = styled(TextField)`
  border: 1px solid ${({ theme }) => theme.colors.primary};
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
`;

export const TabButton = styled(Button)<{ open: boolean }>`
  height: 3rem;
  width: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 0;
  border: 1px solid
    ${({ theme, open }) => (open ? theme.colors.primary : theme.colors.border)};
  ${Text1} {
    color: ${({ theme, open }) =>
      open ? theme.colors.primary : theme.colors.typography.textSecondary};
  }
  background-color: ${({ theme }) => theme.colors.divider};

  &:hover,
  &:focus {
    border: 1px solid
      ${({ theme, open }) =>
        open ? theme.colors.primary : theme.colors.primaryLight};
    background-color: ${({ theme }) => theme.colors.divider};
  }
`;

export const MaterialDesc = styled(Desc)`
  /* display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0 1.75rem 0; */

  ${down("desktop")} {
    flex-flow: column;
    align-items: flex-start;

    ${Buttons} {
      align-self: flex-start;
      margin-top: 1rem;
    }
  }
`;
