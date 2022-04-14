import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import {
  CloseCircleFilled,
  SearchOutlined,
  PlusSquareFilled,
} from "@ant-design/icons";
import { Modal } from "antd";
import {
  ICreateUniversityBody,
  IUniversity,
} from "../../../../../shared/types/learning";
import AddIcon from "../../../../assets/icons/admin/AddIcon";
import { SubTitle2 } from "../../../atoms/texts/SubTitle";
import UniversityCard from "../../../molecules/admin/learning/UniversityCard";
import RoundedButton from "../../../atoms/buttons/RoundedButton";
import { Gap } from "../../../atoms/spaces";
import { SubTitle1 } from "../../../atoms/texts/SubTitle";
import { Text1 } from "../../../atoms/texts/Text";
import FileUploadButton from "../../../molecules/admin/learning/FileUploadButton";
import {
  AddButton,
  ButtonGrid,
  Buttons,
  CancelButton,
  Container,
  Desc,
  EditModalContent,
  Grid,
  ModalContent,
  NoButton,
  NoMatchContainer,
  SearchField,
  StyledButton,
} from "./components";
import { TextFieldForm } from "../../../molecules/inputfields";
import { uploadImageApi } from "../../../../apiLib/admin/adminApi";
import { ILearningApiError } from "../../../../apiLib/learning/learningApiURL";
import {
  handlePrivateApiError,
  handlePublicApiError,
} from "../../../../apiLib/errorHandlers";
import {
  showErrorToastAction,
  showToastAction,
} from "../../../../HOC/contexts/toast";
import {
  createUniversityApi,
  deleteUniversityApi,
  getAllUniversityApi,
  updateUniversityApi,
} from "../../../../apiLib/learning/learningApi";
import { useAuthContext } from "../../../../HOC/contexts/AuthContext";
import { ADMIN_LEARNING_UNI } from "../../../../../shared/constants/routes";
import Loading from "../../../atoms/display/Loading";

const UniversityList: React.FC = () => {
  const { logoutAdminApiAction } = useAuthContext();

  const [universities, setUniversities] = useState<IUniversity[]>([]);
  const [varsities, setVarsities] = useState(universities);
  const [search, setSearch] = useState<string | undefined>();
  const [writeModal, setWriteModal] = useState<
    ((ICreateUniversityBody | IUniversity) & { type: "edit" | "create" }) | null
  >(null);
  const [deleteModal, setDeleteModal] = useState<IUniversity | null>(null);
  const [createSuccess, setCreateSuccess] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const [imgLoading, setImgLoading] = useState<boolean>(false);

  const imgRef = useRef<any | null>(null);

  React.useEffect(() => {
    setLoading(true);
    getAllUniversityApi()
      .then((res) => {
        setUniversities(res.data);
        setVarsities(res.data);
      })
      .catch((err: ILearningApiError) => {
        const { error, data } = handlePublicApiError(err);
        showErrorToastAction({
          message: "Failed to fetch all universities",
          description: error || data?.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleUpload = (e: React.ChangeEvent<any>, _img: string) => {
    if (!imgLoading && e.target.files) {
      setImgLoading(true);
      const selectedFile = e.target.files[0];
      if (!selectedFile) {
        return;
      }

      const data = new FormData();
      data.append("image", selectedFile);

      uploadImageApi(data)
        .then((res) => {
          setWriteModal((prev) => {
            if (!prev) return null;
            return { ...prev, image: res.data.image };
          });
          showToastAction({
            type: "success",
            message: "Image uploaded successfully",
          });
          setFileName(() => {
            const file = e.target.files[0];
            const ext = file.name.split(".").pop();
            return file.name.length > 30
              ? file.name.slice(0, 30) + "..." + ext
              : file.name;
          });
        })
        .catch((err) => {
          const { error } = handlePrivateApiError(err, logoutAdminApiAction);
          showErrorToastAction({
            message: "Failed to upload image",
            description: error,
          });
          setFileName(undefined);
        })
        .finally(() => {
          setImgLoading(false);
        });
    }
  };

  const onSearch = (e: any) => {
    if (e.target.value.trim() !== "") {
      setSearch(e.target.value);
      setVarsities(
        universities.filter((uni) =>
          `${uni.name}${uni.abbr}`.toLowerCase().includes(e.target.value)
        )
      );
    } else {
      setSearch("");
      setVarsities(universities);
    }
  };

  const router = useRouter();
  const handleUniversityClick = (id: string) => {
    router.push(ADMIN_LEARNING_UNI(id));
  };

  const handleChangeName = (e: any) => {
    setWriteModal((prev) => {
      if (!prev) return null;
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCreateClick = () => {
    setCreateSuccess(false);
    setWriteModal({ name: "", abbr: "", image: "", type: "create" });
    setFileName(undefined);
  };
  const handleEditClick = (uni: IUniversity) => {
    setWriteModal({ ...uni, type: "edit" });
    setFileName(undefined);
  };
  const handleDeleteClick = (uni: IUniversity) => {
    setDeleteModal(uni);
  };

  const submitUpdate = () => {
    setUpdateLoading(true);
    if (
      writeModal?.name.trim() === "" ||
      writeModal?.abbr.trim() === "" ||
      writeModal?.image.trim() === ""
    ) {
      showErrorToastAction({
        message: "Please provide all information",
      });
      setUpdateLoading(false);
      return;
    }

    if (writeModal?.type === "create") {
      createUniversityApi({
        name: writeModal.name,
        abbr: writeModal.abbr,
        image: writeModal.image,
      })
        .then((res) => {
          setUniversities([...universities, res.data]);
          setVarsities([...universities, res.data]);
          setWriteModal(null);
        })
        .catch((err: ILearningApiError) => {
          const { error, data } = handlePrivateApiError(
            err,
            logoutAdminApiAction
          );
          showErrorToastAction({
            message: "Failed to create university",
            description: error || data?.message,
          });
        })
        .finally(() => {
          setUpdateLoading(false);
        });
    } else if (writeModal?.type === "edit" && (writeModal as IUniversity)._id) {
      updateUniversityApi((writeModal as IUniversity)._id, {
        name: writeModal.name,
        abbr: writeModal.abbr,
        image: writeModal.image,
      })
        .then((res) => {
          const newArr = universities;
          const i = universities.findIndex((f) => f._id === res.data._id);
          newArr[i] = res.data;
          setUniversities([...newArr]);
          setVarsities([...newArr]);
          setWriteModal(null);
        })
        .catch((err: ILearningApiError) => {
          const { error, data } = handlePrivateApiError(
            err,
            logoutAdminApiAction
          );
          showErrorToastAction({
            message: "Failed to update university",
            description: error || data?.message,
          });
        })
        .finally(() => {
          setUpdateLoading(false);
        });
    }
  };
  const submitDelete = () => {
    if (!deleteModal) return;
    setUpdateLoading(true);
    deleteUniversityApi(deleteModal._id)
      .then(() => {
        const newArr = universities.filter((f) => f._id !== deleteModal._id);
        setUniversities([...newArr]);
        setVarsities([...newArr]);
        setDeleteModal(null);
      })
      .catch((err: ILearningApiError) => {
        const { error, data } = handlePrivateApiError(
          err,
          logoutAdminApiAction
        );
        showErrorToastAction({
          message: "Failed to delete university",
          description: error || data?.message,
        });
      })
      .finally(() => {
        setUpdateLoading(false);
      });
  };

  return (
    <>
      {loading ? (
        <Loading size={"100px"} />
      ) : universities.length ? (
        <>
          <Desc>
            <SubTitle2>Total universities: {universities.length}</SubTitle2>

            <Buttons>
              <SearchField
                placeholder={"Find university"}
                suffix={<SearchOutlined />}
                value={search}
                onChange={onSearch}
              />
              <StyledButton onClick={handleCreateClick}>
                <Text1 color="primary" level={1}>
                  Add university
                </Text1>
                <AddIcon />
              </StyledButton>
            </Buttons>
          </Desc>
          {varsities.length ? (
            <Grid>
              {varsities.map((uni) => (
                <UniversityCard
                  key={uni._id}
                  university={uni}
                  onClick={handleUniversityClick}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteClick}
                />
              ))}
            </Grid>
          ) : (
            <NoMatchContainer>
              <img src={"/images/no_items.png"} alt="no items" />
              <Gap height={"2rem"} />
              <SubTitle1>No university found</SubTitle1>
            </NoMatchContainer>
          )}
        </>
      ) : (
        <Container>
          <img src={"/images/no_items.png"} alt="no items" />
          <Gap height={"2rem"} />
          <SubTitle1>No university added yet!</SubTitle1>
          <Gap height={"2rem"} />
          <AddButton
            type={"primary"}
            icon={<PlusSquareFilled />}
            onClick={handleCreateClick}
          >
            <Text1 level={1} color={"white"}>
              Add university
            </Text1>
          </AddButton>
        </Container>
      )}

      {/* SUCCESS MODAL AFTER CREATING */}
      <Modal
        visible={!!createSuccess}
        onCancel={() => setCreateSuccess(false)}
        closeIcon={<CloseCircleFilled />}
        footer={null}
      >
        <ModalContent>
          <img src={"/images/admin/universityAddSuccess.png"} alt="success" />
          <Gap height={"2rem"} />
          <SubTitle1>University added successfully!</SubTitle1>
          <Gap height={"2rem"} />
          <AddButton type={"primary"} onClick={handleCreateClick}>
            <Text1 level={1} color={"white"}>
              Add more
            </Text1>
          </AddButton>
        </ModalContent>
      </Modal>

      {/* Write MODAL */}
      <Modal
        visible={!!writeModal}
        onCancel={() => setWriteModal(null)}
        closeIcon={<CloseCircleFilled />}
        footer={null}
      >
        <EditModalContent>
          <SubTitle1>
            {writeModal?.type === "edit" ? "Edit" : "Add"} University
          </SubTitle1>
          <Gap height={"2.5rem"} />
          <TextFieldForm
            name={"name"}
            labelSize={1}
            labelText={"University*"}
            labelLevel={3}
            placeholder={"University name"}
            value={writeModal?.name}
            onChange={handleChangeName}
          />
          <Gap height={"1.875rem"} />
          <TextFieldForm
            name={"abbr"}
            labelSize={1}
            labelText={"University abbreviation*"}
            labelLevel={3}
            placeholder={"Example: BRACU, BUET, NSU . . ."}
            value={writeModal?.abbr}
            onChange={handleChangeName}
          />
          <Gap height={"1.875rem"} />
          <FileUploadButton
            innerRef={imgRef}
            fileName={fileName}
            labelSize={1}
            labelText={
              writeModal?.image
                ? "Change university image"
                : "Upload university image"
            }
            labelLevel={3}
            onUpload={handleUpload}
          />
          <Gap height={"1.875rem"} />
          <RoundedButton
            type={"primary"}
            onClick={submitUpdate}
            loading={updateLoading}
            disabled={updateLoading || imgLoading}
          >
            <Text1 level={3} color={"white"}>
              Save
            </Text1>
          </RoundedButton>
        </EditModalContent>
      </Modal>

      {/* DELETE MODAL */}
      <Modal
        visible={!!deleteModal}
        onCancel={() => setDeleteModal(null)}
        closeIcon={<CloseCircleFilled />}
        footer={null}
        width={"40rem"}
      >
        <ModalContent>
          <SubTitle1 align={"center"}>
            All departments, materials in this university will be deleted. Do
            you really want to delete this university?
          </SubTitle1>
          <ButtonGrid>
            <NoButton onClick={() => setDeleteModal(null)}>
              <Text1>No</Text1>
            </NoButton>

            <CancelButton
              onClick={submitDelete}
              loading={updateLoading}
              disabled={updateLoading}
            >
              <Text1 color={"danger"}>Yes</Text1>
            </CancelButton>
          </ButtonGrid>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UniversityList;
