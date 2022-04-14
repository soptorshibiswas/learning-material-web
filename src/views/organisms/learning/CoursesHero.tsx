import Link from "next/link";
import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Tabs, Tooltip } from "antd";
import { down } from "styled-breakpoints";
import { useBreakpoint } from "styled-breakpoints/react-styled";
import styled from "styled-components";
import BigBookBGIcon from "../../../assets/icons/learning/BigBookBGIcon";
import FolderIcon from "../../../assets/icons/learning/FolderIcon";
import SaveIcon from "../../../assets/icons/learning/SaveIcon";
import RoundedButton from "../../atoms/buttons/RoundedButton";
import { SubTitle1 } from "../../atoms/texts/SubTitle";
import { Text1, Text4 } from "../../atoms/texts/Text";
import { Title1 } from "../../atoms/texts/Title";
import ContentLayout from "../../layouts/ContentLayout";
import CourseList from "./CourseList";
import SearchIcon from "../../../assets/icons/learning/SearchIcon";
import { HOME } from "../../../../shared/constants/routes";
import { theme } from "../../../assets/styles/theme";
import { useRouter } from "next/router";
import { ICourse } from "../../../../shared/types/learning";
import { getAllCoursesBySemSlugApi } from "../../../apiLib/learning/learningApi";
import { showErrorToastAction } from "../../../HOC/contexts/toast";
import { handlePublicApiError } from "../../../apiLib/errorHandlers";
import { getParsedLocalData, setLocalData } from "../../../utils/localStorage";
import { ILearningApiError } from "../../../apiLib/learning/learningApiURL";

const { TabPane } = Tabs;

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.body};
`;

const OuterContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.divider};
  position: relative;
  overflow: hidden;

  ${down("desktop")} {
    min-height: auto;
  }
`;

const InnerContainer = styled(ContentLayout)`
  padding: 3rem 1.5rem;

  ${down("tablet")} {
    padding-top: 2rem;
    padding-bottom: 3.5rem;
  }
`;

const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const Flex = styled.div`
  display: flex;
  svg {
    margin-top: 0.75rem;
  }

  ${down("tablet")} {
    svg {
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

  ${down("tablet")} {
    margin: 0;

    ${Title1}, ${Text1} {
      display: none;
    }
    ${SubTitle1} {
      display: block;
    }
  }
`;

const SubIcons = styled.div`
  display: none;
  svg {
    margin: 0 0.3rem;
    color: ${({ theme }) => theme.colors.primary};
  }

  a {
    display: flex;
    align-items: center;
  }

  ${down("tablet")} {
    display: flex;
    align-items: center;
  }
`;

const AbsoluteDiv = styled.div`
  position: absolute;
  top: -2rem;
  right: 0;

  ${down("tablet")} {
    display: none;
  }
`;

const SearchButton = styled(RoundedButton)`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.divider};
  border-color: ${({ theme }) => theme.colors.primary};

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors.primaryShadow};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  span {
    display: flex;
    align-items: center;
    margin-left: 0.75rem;
  }
  svg {
    margin: 0;
    color: ${({ theme }) => theme.colors.primary};
  }

  ${down("tablet")} {
    display: none;
  }
`;

const TabContainer = styled(ContentLayout)`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 0 1.5rem;
`;

const StyledTab = styled(Tabs)`
  & .ant-tabs-ink-bar.ant-tabs-ink-bar-animated {
    height: 4px;
    border-radius: 5px 5px 0 0;
  }

  & > .ant-tabs-nav {
    margin-bottom: 0;
  }

  & .ant-tabs-tab {
    width: 10rem;
    padding: 6px;
    margin: 0;
    justify-content: center;
  }

  ${down("tablet")} {
    & .ant-tabs-nav-list {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
    }
    & .ant-tabs-tab {
      width: 100%;
    }
  }
`;

const SmallSpan = styled.span`
  padding: 1rem 0;
`;

const CoursesHero: React.FC = () => {
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
  const [tab, setTab] = useState<string>("THEORY");
  const [courses, setCourse] = useState<ICourse[]>([]);

  const { varsity, dept, semester } = router.query;
  const cBread =
    (varsity as string).toUpperCase() +
    " > " +
    (dept as string).toUpperCase() +
    " > " +
    semester;

  useEffect(() => {
    const slug = `${varsity}~${dept}~${semester}`;
    getAllCoursesBySemSlugApi(slug)
      .then((res) => {
        setCourse(res.data);
      })
      .catch((err: ILearningApiError) => {
        const { error, data } = handlePublicApiError(err);
        showErrorToastAction({
          message: "Failed to fetch courses",
          description: error || data?.message,
        });
      });
  }, [varsity, dept, semester]);

  const renderCourses = () => {
    switch (tab) {
      case "THEORY": {
        return (
          <CourseList courses={courses.filter((c) => c.type === "THEORY")} />
        );
      }
      case "SESSIONAL": {
        return (
          <CourseList courses={courses.filter((c) => c.type === "SESSIONAL")} />
        );
      }
      case "MIXED": {
        return (
          <CourseList courses={courses.filter((c) => c.type === "MIXED")} />
        );
      }
      default:
        return null;
    }
  };
  return (
    <Container>
      <OuterContainer>
        <AbsoluteDiv>
          <BigBookBGIcon />
        </AbsoluteDiv>

        <InnerContainer>
          <Heading>
            <Flex>
              <FolderIcon size="50" />
              <Sub>
                <Title1>Courses</Title1>
                <SubTitle1>Courses</SubTitle1>
                <Text1 color="primary">{`${cBread}`}</Text1>
              </Sub>
              <span>
                <Tooltip
                  title={
                    <Text4>{isSaved ? "Page is saved" : "Save page"}</Text4>
                  }
                  placement={"rightTop"}
                  color={theme.colors.body}
                >
                  <SmallSpan>
                    <SaveIcon
                      saved={isSaved}
                      color={"primary"}
                      onClick={handleSavePage}
                    />
                  </SmallSpan>
                </Tooltip>
              </span>
            </Flex>

            <Link href={HOME()}>
              <a>
                <SearchButton>
                  <Text1 color="primary" level={1}>
                    Search again
                  </Text1>
                  <SearchOutlined />
                </SearchButton>
              </a>
            </Link>

            <SubIcons>
              <SaveIcon
                color={"primary"}
                saved={isSaved}
                onClick={handleSavePage}
              />
              <Link href={HOME()}>
                <a>
                  <SearchIcon />
                </a>
              </Link>
            </SubIcons>
          </Heading>
        </InnerContainer>

        <TabContainer>
          <StyledTab
            defaultActiveKey={"THEORY"}
            onChange={(a) => setTab(a)}
            moreIcon={null}
            tabBarExtraContent={null}
          >
            <TabPane
              key={"THEORY"}
              tab={
                useBreakpoint(down("tablet")) ? (
                  <Text1 level={3}>Theory</Text1>
                ) : (
                  <SubTitle1>Theory</SubTitle1>
                )
              }
            />
            <TabPane
              key={"SESSIONAL"}
              tab={
                useBreakpoint(down("tablet")) ? (
                  <Text1 level={3}>Sessional</Text1>
                ) : (
                  <SubTitle1>Sessional</SubTitle1>
                )
              }
            />
            <TabPane
              key={"MIXED"}
              tab={
                useBreakpoint(down("tablet")) ? (
                  <Text1 level={3}>Mixed</Text1>
                ) : (
                  <SubTitle1>MIxed</SubTitle1>
                )
              }
            />
          </StyledTab>
        </TabContainer>
      </OuterContainer>

      {renderCourses()}
    </Container>
  );
};

export default CoursesHero;
