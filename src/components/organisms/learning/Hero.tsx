import Link from "next/link";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { down, up } from "styled-breakpoints";
import { Button, Modal } from "antd";
import { CloseCircleFilled, MinusCircleOutlined } from "@ant-design/icons";
import { SubTitle1, SubTitle2 } from "../../atoms/texts/SubTitle";
import { TitleHero } from "../../atoms/texts/Title";
import UniSelectField from "./UniSelectField";
import ContentLayout from "../../layouts/ContentLayout";
import { Text1, Text4 } from "../../atoms/texts/Text";
import { getAllUniversityApi } from "../../../apiLib/learning/learningApi";
import { handlePublicApiError } from "../../../apiLib/errorHandlers";
import { showErrorToastAction } from "../../../HOC/contexts/toast";
import { getParsedLocalData, setLocalData } from "../../../utils/localStorage";
import { ILearningApiError } from "../../../apiLib/learning/learningApiURL";

const Container = styled.div`
  max-width: 100%;
  background-image: url("/images/e_learning_hero.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  mix-blend-mode: darken;
`;

const HeroOuter = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.darkCover};
`;

const HeroInner = styled(ContentLayout)`
  width: 100%;
  min-height: 80vh;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: flex-start;
  padding-bottom: 5.5rem;

  & > ${TitleHero}, & > ${SubTitle1} {
    text-align: center;
  }
  & > ${SubTitle2}, & > ${Text1} {
    display: none;
    margin-bottom: 1rem;
    text-align: left;
  }

  ${down("tablet")} {
    /* height: 80vh; */

    & > ${TitleHero}, & > ${SubTitle1} {
      display: none;
    }
    & > ${SubTitle2}, & > ${Text1} {
      display: block;
    }
  }

  ${up("mobile")} {
    align-items: center;
  }
`;

const SearchForm = styled.div`
  margin-top: 3.5rem;
  display: flex;
  justify-content: center;
`;

const SavedPagesButton = styled(Button)`
  padding: 0;
  margin-top: 4rem;

  ${Text1} {
    display: none;
  }

  ${down("tablet")} {
    margin-top: 1.25rem;
    ${SubTitle1} {
      display: none;
    }
    ${Text1} {
      display: block;
    }
  }
`;

const StyledModal = styled(Modal)`
  .ant-modal-close-x {
    padding-top: 1rem;
  }

  ${down("tablet")} {
    .ant-modal-close-x {
      padding-top: 0;
    }
  }
`;

const SavedPage = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.dividerLight};
  &:last-child {
    border-bottom: none;
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.danger};
  }

  ${Text4} {
    display: none;
  }

  ${down("tablet")} {
    ${Text1} {
      display: none;
    }
    ${Text4} {
      display: block;
    }
  }
`;

const NoSavedPagesDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5rem 7rem;

  ${down("tablet")} {
    padding: 4rem 1rem;
  }
`;

const Hero: React.FC = () => {
  const [savedPages, setSavedPages] = useState<string[]>(() => {
    return getParsedLocalData("LEARNING_PAGES");
  });
  const [savedPagesModal, setSavedPagesModal] = useState<boolean>(false);
  const [options, setOptions] = useState<{ name: string; abbr: string }[]>([]);
  const [uniLoading, setUniLoading] = useState<boolean>(false);

  const deleteSavedPage = (page: string) => {
    setSavedPages((prev) => {
      const newArr = prev.filter((p) => p !== page);
      setLocalData("LEARNING_PAGES", newArr);
      return [...newArr];
    });
  };

  useEffect(() => {
    setUniLoading(true);
    getAllUniversityApi()
      .then((res) => {
        const arr = res.data.map((uni) => ({
          name: uni.name,
          abbr: uni.abbr.toUpperCase(),
        }));
        setOptions(arr);
      })
      .catch((err: ILearningApiError) => {
        const { error, data } = handlePublicApiError(err);
        showErrorToastAction({
          message: "Failed to fetch universities",
          description: error || data?.message,
        });
      })
      .finally(() => {
        setUniLoading(false);
      });
  }, []);

  const makeLink = (bread: string) => {
    return bread
      .split("/")
      .map((str) => str.trim())
      .join("/");
  };

  return (
    <Container>
      <HeroOuter>
        <HeroInner>
          <TitleHero color={"white"}>Find your necessary resources</TitleHero>
          <SubTitle2 color={"white"} level={2}>
            Find your necessary resources
          </SubTitle2>

          <SubTitle1 color={"white"} level={0}>
            Resources shared by your university fellows, all together
          </SubTitle1>
          <Text1 color={"white"} level={1}>
            Resources shared by your university fellows, all together
          </Text1>

          <SearchForm>
            <UniSelectField options={options} loading={uniLoading} />
          </SearchForm>

          <SavedPagesButton
            type={"link"}
            onClick={() => setSavedPagesModal(true)}
          >
            <SubTitle1 color={"white"} level={0}>
              <u>Find your saved pages</u>
            </SubTitle1>
            <Text1 color={"white"} level={1} align={"center"}>
              <u>Find your saved pages</u>
            </Text1>
          </SavedPagesButton>
        </HeroInner>
      </HeroOuter>
      <StyledModal
        visible={savedPagesModal}
        onCancel={() => setSavedPagesModal(false)}
        footer={null}
        closeIcon={<CloseCircleFilled />}
        centered
      >
        {savedPages?.length ? (
          <>
            <SubTitle1 level={2} color={"primary"}>
              Saved pages
            </SubTitle1>
            {savedPages.map((page, i) => (
              <SavedPage key={i.toString()}>
                <Link href={makeLink(page)}>
                  <a>
                    <Text1 level={3}>
                      {page.split("/").slice(2, 8).join("/")}
                    </Text1>
                    <Text4 level={3}>
                      {page.split("/").slice(2, 8).join("/")}
                    </Text4>
                  </a>
                </Link>
                <MinusCircleOutlined onClick={() => deleteSavedPage(page)} />
              </SavedPage>
            ))}
          </>
        ) : (
          <NoSavedPagesDiv>
            <SubTitle1 level={2} color={"primary"}>
              No pages saved!
            </SubTitle1>
          </NoSavedPagesDiv>
        )}
      </StyledModal>
    </Container>
  );
};

export default Hero;
