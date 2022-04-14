import { Tooltip } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { down } from "styled-breakpoints";
import styled from "styled-components";
import { IUniversity } from "../../../../shared/types/learning";
import FolderIcon from "../../../assets/icons/learning/FolderIcon";
import SaveIcon from "../../../assets/icons/learning/SaveIcon";
import { theme } from "../../../assets/styles/theme";
import { getParsedLocalData, setLocalData } from "../../../utils/localStorage";
import { SubTitle1 } from "../../atoms/texts/SubTitle";
import { Text1, Text4 } from "../../atoms/texts/Text";
import { Title1 } from "../../atoms/texts/Title";
import ContentLayout from "../../layouts/ContentLayout";

const Container = styled.div<{ bg: string }>`
  background-image: ${({ bg }) => `url(${bg || "/images/du_bg.jpg"})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const OuterContainer = styled.div`
  min-height: 40vh;
  background: linear-gradient(
    270deg,
    rgba(0, 0, 0, 0.42) 0%,
    rgba(0, 0, 0, 0.3402) 100%
  );

  ${down("mobile")} {
    min-height: auto;
  }
`;

const InnerContainer = styled(ContentLayout)`
  padding: 5rem 1.5rem 7rem 1.5rem;

  ${down("tablet")} {
    padding-top: 2rem;
    padding-bottom: 3.5rem;
  }
`;

const Heading = styled.div`
  display: flex;

  svg {
    margin-top: 0.75rem;
  }

  ${down("mobile")} {
    display: grid;
    grid-template-columns: 5fr 1fr;
    column-gap: 1rem;

    svg {
      width: 2.5rem;
      height: 2.5rem;
      margin-top: 0;
      margin-left: auto;
      align-self: center;
    }
    svg:nth-child(1) {
      display: none;
    }
  }
`;

const Sub = styled.div`
  display: flex;
  flex-flow: column;
  margin: 0 2rem;

  ${SubTitle1} {
    display: none;
  }

  ${down("mobile")} {
    margin: 0;

    ${Title1}, ${Text1} {
      display: none;
    }
    ${SubTitle1} {
      display: block;
    }
  }
`;

const SmallSpan = styled.span`
  padding: 1rem 0;
`;

interface IProps {
  university: IUniversity;
}

const UniversityHero: React.FC<IProps> = ({ university }) => {
  const router = useRouter();

  const path = decodeURI(router.asPath);
  const localData: string[] | null = getParsedLocalData("LEARNING_PAGES");

  const [isSaved, setIsSaved] = useState<boolean>(
    localData?.includes(path) || false
  );

  const handleSavePage = () => {
    let data: string[] = localData || [];
    if (data.includes(path)) {
      data = data.filter((d) => d !== path);
      setIsSaved(false);
    } else {
      data.push(path);
      setIsSaved(true);
    }
    setLocalData("LEARNING_PAGES", data);
  };

  return (
    <Container bg={university.image}>
      <OuterContainer>
        <InnerContainer>
          <Heading>
            <FolderIcon size="50" />
            <Sub>
              <Title1 color="white">{university.name}</Title1>
              <SubTitle1 color="white">{university.name}</SubTitle1>
              <Text1 color="white">{`${university.abbr.toUpperCase()}`}</Text1>
            </Sub>
            <span>
              <Tooltip
                title={<Text4>{isSaved ? "Page is saved" : "Save page"}</Text4>}
                placement={"rightTop"}
                color={theme.colors.body}
              >
                <SmallSpan>
                  <SaveIcon
                    color={"white"}
                    saved={isSaved}
                    onClick={handleSavePage}
                  />
                </SmallSpan>
              </Tooltip>
            </span>
          </Heading>
        </InnerContainer>
      </OuterContainer>
    </Container>
  );
};

export default UniversityHero;
