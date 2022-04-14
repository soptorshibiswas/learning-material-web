import React from "react";
import { Modal } from "antd";
import styled from "styled-components";
import { SubTitle1 } from "../texts/SubTitle";
import { Text1 } from "../texts/Text";
import RoundedButton from "../buttons/RoundedButton";
import { CloseCircleFilled } from "@ant-design/icons";
import { down } from "styled-breakpoints";

const CookieModalContainer = styled.div`
  padding: 2rem 1rem 0 1rem;
  display: flex;
  flex-flow: column;
  button {
    margin-top: 1.5rem;
    margin-left: auto;
  }

  & > ${Text1} {
    display: none;
  }

  ${down("tablet")} {
    padding: 1rem 0;
    
    & > ${SubTitle1} {
      display: none;
    }
    & > ${Text1} {
      display: inline-block;
    }
  }
`;

interface IProps {
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
  text?: string;
  width?: string;
  loading?: boolean;
}

const CookieModal: React.FC<IProps> = ({
  visible,
  onCancel,
  onOk,
  text,
  width,
}) => {
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width={width || "max-content"}
      closeIcon={<CloseCircleFilled />}
    >
      <CookieModalContainer>
        <SubTitle1>{"Please allow cookies on your browser"}</SubTitle1>
        <SubTitle1 level={0}>
          {text ||
            "Go to Settings > Privacy & Security > turn off “Block All Cookies”"}
        </SubTitle1>
        <Text1 level={3}>{"Please allow cookies on your browser"}</Text1>
        <Text1 level={1}>
          {text ||
            "Go to Settings > Privacy & Security > turn off “Block All Cookies”"}
        </Text1>
        <RoundedButton type={"primary"} onClick={onOk}>
          <Text1 color={"white"} level={3}>
            OK
          </Text1>
        </RoundedButton>
      </CookieModalContainer>
    </Modal>
  );
};

export default CookieModal;
