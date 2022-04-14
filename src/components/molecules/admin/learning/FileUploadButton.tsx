import { CloseCircleFilled } from "@ant-design/icons";
import React, { useState } from "react";
import styled from "styled-components";
import RoundedButton from "../../../atoms/buttons/RoundedButton";
import { FormText, Text1, Text2, Text3 } from "../../../atoms/texts/Text";

const Container = styled.div`
  display: flex;
  flex-flow: column;
`;

const Upload = styled.div`
  position: relative;
  overflow: hidden;
`;

const UploadButton = styled(RoundedButton)`
  position: relative;
  width: 100%;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.primaryBadgeBG};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;
  svg {
    width: 1rem;
    height: 1rem;
  }
`;

const HiddenInput = styled.input`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  height: 100%;
  width: 100%;
  cursor: pointer;
`;

const LabelContainer = styled.div`
  display: flex;
  padding-bottom: 0.5em;
`;

const Close = styled.span`
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  opacity: 1;
  height: 100%;
  padding-left: 0.5rem;
  padding-right: 1rem;
  cursor: pointer;
  z-index: 9999;
  color: ${({ theme }) => theme.colors.primary};
`;

interface IProps {
  innerRef?: any;
  fileName?: string;
  onUpload?: (e: React.ChangeEvent<any>, imageSrc: string) => void;
  name?: string;
  multiple?: boolean;
  labelText?: string;
  labelSize?: number;
  labelLevel?: 1 | 2 | 3 | 4;
}

const FileUploadButton: React.FC<IProps> = ({
  innerRef,
  fileName,
  onUpload,
  name,
  multiple,
  labelText,
  labelSize,
  labelLevel,
}) => {
  const [rerender, setRerender] = useState<any>();
  const handleChange = (e: React.ChangeEvent<any>) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        () => {
          if (onUpload && reader.result) onUpload(e, reader.result.toString());
        },
        false
      );
      reader.readAsDataURL(file);
    }
  };
  const cancelInput = (e: any) => {
    e.stopPropagation();
    setRerender(Date.now());
  };
  const Label =
    labelSize === 1
      ? Text1
      : labelSize === 2
      ? Text2
      : labelSize === 3
      ? Text3
      : labelSize === 4
      ? FormText
      : Text1;
  return (
    <Container>
      {labelText ? (
        <LabelContainer>
          <Label level={labelLevel || 3}>{labelText}</Label>
        </LabelContainer>
      ) : null}
      <Upload>
        <UploadButton type={"default"}>
          <Text1 level={2} color={"primary"}>
            {fileName ? fileName : "Browse files"}
          </Text1>
        </UploadButton>
        <HiddenInput
          ref={innerRef}
          type="file"
          name={name}
          onChange={handleChange}
          multiple={multiple}
          accept={"image/*"}
          key={rerender}
        />
        {fileName ? (
          <Close onClick={cancelInput}>
            <CloseCircleFilled />
          </Close>
        ) : null}
      </Upload>
    </Container>
  );
};

export default FileUploadButton;
