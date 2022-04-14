import React, { useState } from "react";
import {
  IUpdateMaterialBody,
  materialTypes,
  TMaterialType,
  materialTypeObj,
} from "../../../../../shared/types/learning";
import RoundedButton from "../../../atoms/buttons/RoundedButton";
import { RadioInput } from "../../../atoms/inputs";
import { Gap } from "../../../atoms/spaces";
import { SubTitle1 } from "../../../atoms/texts/SubTitle";
import { Text1 } from "../../../atoms/texts/Text";
import { TextFieldForm } from "../../../molecules/inputfields";
import { EditModalContent, RadioGroup } from "./components";

interface IProps {
  data: IUpdateMaterialBody & { writeType: "edit" | "create" };
  onDataSubmit: (data: IUpdateMaterialBody) => void;
  loading: boolean;
}

const MaterialUpdateModal: React.FC<IProps> = ({
  data,
  onDataSubmit,
  loading,
}) => {
  const [mType, setMType] = useState<TMaterialType>(data.type || "refBook");

  const [inpData, setInpData] = useState<{
    name?: string;
    author?: string;
    file?: string;
    sessionYear?: string;
  }>({
    name: data.name,
    author: data.author,
    file: data.file,
    sessionYear: data.sessionYear,
  });

  React.useEffect(() => {
    setMType(data.type || "refBook");
    setInpData({
      name: data.name,
      author: data.author,
      file: data.file,
      sessionYear: data.sessionYear,
    });
  }, [data]);

  const handleChangeName = (e: any) => {
    setInpData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const submitUpdate = () => {
    onDataSubmit({
      ...inpData,
      type: mType,
    });
  };
  return (
    <EditModalContent>
      <SubTitle1>
        {data.writeType === "edit" ? "Edit" : "Add"} material
      </SubTitle1>
      <Gap height={"1.8rem"} />

      <Text1 level={3}>Choose type of material</Text1>
      <Gap height={"0.75rem"} />
      <RadioGroup
        value={mType}
        onChange={(e) => setMType(e.target.value)}
        size={"large"}
      >
        {materialTypes.map((mtp) => (
          <RadioInput
            key={mtp}
            marginRight={"1.5rem"}
            options={[]}
            value={mtp}
            disabled={(data as any)._id && mtp !== data.type}
          >
            {materialTypeObj[mtp]}
          </RadioInput>
        ))}
      </RadioGroup>
      <Gap height={"2rem"} />

      <div
        style={{
          display:
            mType === "refBook" || mType === "lectureNote" ? "block" : "none",
        }}
      >
        <TextFieldForm
          name={"name"}
          labelSize={1}
          labelText={"Book name"}
          labelLevel={3}
          placeholder={"Write book name"}
          value={inpData.name}
          onChange={handleChangeName}
        />
        <Gap height={"1.875rem"} />
      </div>
      <div
        style={{
          display: mType === "refBook" ? "block" : "none",
        }}
      >
        <TextFieldForm
          name={"author"}
          labelSize={1}
          labelText={"Author name"}
          labelLevel={3}
          placeholder={"Write author name"}
          value={inpData.author}
          onChange={handleChangeName}
        />
        <Gap height={"1.875rem"} />
      </div>
      <div
        style={{
          display: mType === "question" ? "block" : "none",
        }}
      >
        <TextFieldForm
          name={"sessionYear"}
          labelSize={1}
          labelText={"Session year"}
          labelLevel={3}
          placeholder={"Example: 2021-22"}
          value={inpData.sessionYear}
          onChange={handleChangeName}
        />
        <Gap height={"1.875rem"} />
      </div>
      <TextFieldForm
        name={"file"}
        labelSize={1}
        labelText={"File link"}
        labelLevel={3}
        placeholder={"Paste the file link"}
        value={inpData.file}
        onChange={handleChangeName}
      />
      <Gap height={"1.875rem"} />

      <RoundedButton
        type={"primary"}
        onClick={submitUpdate}
        loading={loading}
        disabled={loading}
      >
        <Text1 level={3} color={"white"}>
          Save
        </Text1>
      </RoundedButton>
    </EditModalContent>
  );
};

export default MaterialUpdateModal;
