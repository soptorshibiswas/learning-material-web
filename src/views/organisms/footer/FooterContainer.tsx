import { down } from "styled-breakpoints";
import styled from "styled-components";

export const MainContainer = styled.footer`
  width: 100%;
  background: ${({ theme }) => theme.colors.typography.textPrimary};
  padding: 4rem 2rem 1.5rem;
  ${down("tablet")} {
    padding: 2rem 0 1rem;
  }
`;

export const TopContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  ${down("tablet")} {
    grid-template-columns: auto;
    grid-gap: 2rem;
  }
`;

export const BottomContainer = styled.div`
  margin-top: 2rem;
  border-top: ${({ theme }) => "0.5px solid " + theme.colors.body};
  padding-top: 1rem;
`;

export const IconContainer = styled.div`
  display: flex;
  margin-top: 0.75rem;
  svg {
    margin-right: 0.75rem;
  }
`;

export const ContactContainer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: left;
  white-space: pre-line;
  svg {
    margin-right: 0.75rem;
  }
  ${down("tablet")} {
    margin-top: 0.5rem;
    gap: 0.75rem;
  }
`;

export const LargeDeviceFooterContainer = styled.div`
  ${down("tablet")} {
    display: none;
  }
`;
