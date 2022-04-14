import React, { useEffect, useState } from "react";
import { down } from "styled-breakpoints";
import { useBreakpoint } from "styled-breakpoints/react-styled";
import styled from "styled-components";
import BookBGIcon from "../../../assets/icons/learning/BookBGIcon";
import { Title1, Title2 } from "../../atoms/texts/Title";
import { SubTitle1, SubTitle2 } from "../../atoms/texts/SubTitle";
import { Text1, Text2 } from "../../atoms/texts/Text";
import ContentLayout from "../../layouts/ContentLayout";
import UniversityBlobIcon from "../../../assets/icons/learning/UniversityBlobIcon";
import ResourceBlobIcon from "../../../assets/icons/learning/ResourceBlobIcon";
import ExamSolveBlobIcon from "../../../assets/icons/learning/ExamSolveBlobIcon";
import { ILearningStats } from "../../../../shared/types/learning";
import { getLearningStatsApi } from "../../../apiLib/learning/learningApi";
import { handlePublicApiError } from "../../../apiLib/errorHandlers";
import { showErrorToastAction } from "../../../HOC/contexts/toast";

const BookIcon = styled(BookBGIcon)``;

const Container = styled.div`
  position: relative;
  max-width: 100%;
  background-color: ${({ theme }) => theme.colors.body};
  overflow: hidden;

  & > svg {
    position: absolute;
  }

  & > svg:nth-child(1) {
    top: -4rem;
    left: -4rem;
  }
  & > svg:nth-child(2) {
    bottom: -4rem;
    right: -4rem;
  }

  ${down("tablet")} {
    svg {
      width: 15rem;
      height: 15rem;
    }

    & > svg:nth-child(1) {
      top: -2rem;
      left: -2rem;
    }
    & > svg:nth-child(2) {
      bottom: -2rem;
      right: -2rem;
    }
  }

  ${down("mobile")} {
    svg {
      width: 10rem;
      height: 10rem;
    }
  }
`;

const InnerContent = styled(ContentLayout)`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  padding-top: 5rem;
  padding-bottom: 5rem;
  z-index: 1;

  ${Title1}, ${SubTitle1}, ${SubTitle2}, ${Text1} {
    z-index: 1;
  }

  ${down("tablet")} {
    padding-top: 2.75rem;
    padding-bottom: 2rem;
  }
`;

const IconsDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  ${down("mobile")} {
    flex-flow: column;
  }
`;

const BlobDiv = styled.div`
  z-index: 1;

  ${Title2}, ${Text2} {
    display: none;
  }

  ${down("tablet")} {
    ${Title2}, ${Text2} {
      display: block;
    }
    ${SubTitle1}, ${Title1} {
      display: none;
    }
  }
`;

const Desc = styled.div`
  transform: translateY(-4rem);

  ${down("mobile")} {
    transform: translateY(-1rem);
  }
`;

const Stats: React.FC = () => {
  const [counts, setCounts] = useState<ILearningStats>({
    totalUniversity: 0,
    totalResources: 0,
    totalQnA: 0,
  });

  useEffect(() => {
    getLearningStatsApi()
      .then((res) => {
        setCounts(res.data);
      })
      .catch((err) => {
        const { error } = handlePublicApiError(err);
        showErrorToastAction({
          message: "Failed to fetch counts",
          description: error,
        });
      });
  }, []);

  return (
    <Container>
      <BookIcon />
      <BookIcon />
      <InnerContent>
        {useBreakpoint(down("tablet")) ? (
          <Text1 level={1}>
            Students around the country is utilizing our website to share their
            resources and improve their grades.
          </Text1>
        ) : (
          <SubTitle1 align="center" level={0}>
            Students around the country is utilizing our website to share their
            resources and improve their grades.
          </SubTitle1>
        )}

        <IconsDiv>
          <BlobDiv>
            <UniversityBlobIcon />
            <Desc>
              <SubTitle1 align="center">University</SubTitle1>
              <Text2 align="center" level={3}>
                University
              </Text2>

              <Title1 align="center">{counts.totalUniversity}</Title1>
              <Title2 align="center">{counts.totalUniversity}</Title2>
            </Desc>
          </BlobDiv>
          <BlobDiv>
            <ResourceBlobIcon />
            <Desc>
              <SubTitle1 align="center">Resources</SubTitle1>
              <Text2 align="center" level={3}>
                Resources
              </Text2>

              <Title1 align="center">{counts.totalResources}</Title1>
              <Title2 align="center">{counts.totalResources}</Title2>
            </Desc>
          </BlobDiv>
          <BlobDiv>
            <ExamSolveBlobIcon />
            <Desc>
              <SubTitle1 align="center">Questions</SubTitle1>
              <Text2 align="center" level={3}>
                Questions
              </Text2>

              <Title1 align="center">{counts.totalQnA}</Title1>
              <Title2 align="center">{counts.totalQnA}</Title2>
            </Desc>
          </BlobDiv>
        </IconsDiv>
      </InnerContent>
    </Container>
  );
};

export default Stats;
