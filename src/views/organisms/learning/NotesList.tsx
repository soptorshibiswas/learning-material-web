import React from "react";
import { down } from "styled-breakpoints";
import styled from "styled-components";
import { IMaterial } from "../../../../shared/types/learning";
import LectureNoteIcon from "../../../assets/icons/learning/LectureNoteIcon";
import RefBookIcon from "../../../assets/icons/learning/RefBookIcon";
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
    flex: 1;
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
  type: "lecture" | "refBook" | "question";
  listData: IMaterial[];
}

const NotesList: React.FC<IProps> = ({ type, listData }) => {
  return (
    <Container>
      <ListContainer>
        {listData.map((note, i) => (
          <a
            href={note.file}
            key={i.toString()}
            target="_blank"
            rel="noreferrer"
          >
            <ListItem>
              {type === "lecture" ? <LectureNoteIcon /> : <RefBookIcon />}
              <Sub>
                <Text2 level={3}>{note.name}</Text2>
                <Text1 level={3}>{note.name}</Text1>
                <Text4 level={1} color={"textSecondary"}>
                  {type === "refBook" ? note.author : note.sessionYear}
                </Text4>
              </Sub>
            </ListItem>
          </a>
        ))}
      </ListContainer>
    </Container>
  );
};

export default NotesList;
