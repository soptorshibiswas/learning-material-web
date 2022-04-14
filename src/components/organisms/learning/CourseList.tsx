import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { down } from "styled-breakpoints";
import styled from "styled-components";
import { ICourse } from "../../../../shared/types/learning";
import FolderIcon from "../../../assets/icons/learning/FolderIcon";
import { Text1, Text2, Text4 } from "../../atoms/texts/Text";
import ContentLayout from "../../layouts/ContentLayout";

const Container = styled(ContentLayout)`
  padding: 3rem 1.5rem;
`;

const ListContainer = styled.ul`
  list-style: none;
  padding: 0;
  max-width: 60%;

  & > a:nth-last-child(1) > li {
    border: none;
  }

  ${down("tablet")} {
    max-width: 100%;
  }
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.dividerLight};

  svg {
    width: 3rem;
    height: 3rem;
  }

  ${down("tablet")} {
    svg {
      width: 2rem;
      height: 2rem;
    }
  }
`;

const Sub = styled.div`
  flex: 10;
  display: flex;
  flex-flow: column;
  margin-left: 1rem;

  ${Text1} {
    display: none;
  }

  ${down("tablet")} {
    margin-left: 0.5rem;

    ${Text2} {
      display: none;
    }
    ${Text1} {
      display: block;
    }
  }

  ${down("mobile")} {
    flex: 6;
  }
`;

interface IProps {
  courses: ICourse[];
}

const CourseList: React.FC<IProps> = ({ courses }) => {
  const router = useRouter();
  return (
    <Container>
      <ListContainer>
        {courses.map((course, i) => (
          <Link href={router.asPath + "/" + course.name} key={i.toString()}>
            <a>
              <ListItem>
                <FolderIcon />
                <Sub>
                  <Text2 level={3}>{course.name}</Text2>
                  <Text1 level={3}>{course.name}</Text1>
                  <Text4 level={1} color={"textSecondary"}>
                    {course.code}
                  </Text4>
                </Sub>
              </ListItem>
            </a>
          </Link>
        ))}
      </ListContainer>
    </Container>
  );
};

export default CourseList;
