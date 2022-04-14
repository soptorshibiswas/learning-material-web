import React from "react";
import Link from "next/link";
import { ColumnContainer, RowContainer } from "../../atoms/grid";
import { FormText, Text1, Text4 } from "../../atoms/texts/Text";
import EmailInput from "./Subscribe";
import {
  MainContainer,
  TopContainer,
  IconContainer,
  ContactContainer,
  BottomContainer,
  LargeDeviceFooterContainer,
} from "./FooterContainer";
import {
  CallIcon,
  FacebookIcon,
  EmailIcon,
  TwitterIcon,
  LocationIcon,
  // YoutubeIcon,
} from "../../../assets/icons/footer";
import ContentLayout from "../../layouts/ContentLayout";
import styled from "styled-components";
import { SubTitle1 } from "../../atoms/texts/SubTitle";

const SocialContainerSmallDevice = styled.div`
  ${Text4} {
    margin-top: 1.875rem;
  }

  ${FormText} {
    margin-top: 0.938rem;
  }
`;

const FooterComp: React.FC = () => {
  return (
    <MainContainer>
      <ContentLayout>
        <TopContainer>
          {/* larger device footer part starts */}
          <LargeDeviceFooterContainer>
            <ColumnContainer>
              <SubTitle1 color="white">Contact</SubTitle1>
              <ContactContainer>
                <RowContainer>
                  <LocationIcon />
                  <Text1 color="white">BRAC University, Mohakhali, Dhaka</Text1>
                </RowContainer>
                <RowContainer>
                  <CallIcon />
                  <Text1 color="white">02-179-12345</Text1>
                </RowContainer>
                <RowContainer>
                  <EmailIcon />
                  <Text1 color="white">info@learning.org.bd</Text1>
                </RowContainer>
              </ContactContainer>
            </ColumnContainer>
          </LargeDeviceFooterContainer>

          <SocialContainerSmallDevice>
            <ColumnContainer>
              <FormText color="white">Stay connected with us</FormText>
              <EmailInput />
              <Text4 color="white" level={1}>
                Social media link
              </Text4>
              <IconContainer>
                <Link href="https://www.facebook.com/e-learning">
                  <a title="facebook page">
                    <FacebookIcon title="facebook page" />
                  </a>
                </Link>
                <Link href="https://twitter.com/e-learning">
                  <a title="twitter account">
                    <TwitterIcon title="twitter account" />
                  </a>
                </Link>
                {/* <Link href="/">
                  <a>
                    <YoutubeIcon />
                  </a>
                </Link> */}
              </IconContainer>
            </ColumnContainer>
          </SocialContainerSmallDevice>
        </TopContainer>
        <BottomContainer>
          <Text4 color="white" align="center">
            All rights reserved by Soptotech Ltd
          </Text4>
        </BottomContainer>
      </ContentLayout>
    </MainContainer>
  );
};

const Footer = React.memo(FooterComp);

export { Footer };
