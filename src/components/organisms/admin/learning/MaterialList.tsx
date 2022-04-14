import React, { useState, useEffect } from "react";
import {
  CloseCircleFilled,
  PlusSquareFilled,
  SearchOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";
import {
  ICourse,
  IMaterial,
  IUpdateMaterialBody,
  materialTypes,
  TMaterialType,
} from "../../../../../shared/types/learning";
import AddIcon from "../../../../assets/icons/admin/AddIcon";
import { Gap } from "../../../atoms/spaces";
import { SubTitle1 } from "../../../atoms/texts/SubTitle";
import { Text1 } from "../../../atoms/texts/Text";
import {
  AddButton,
  ButtonGroup,
  Buttons,
  Container,
  MaterialDesc,
  List,
  NoMatchContainer,
  SearchField,
  StyledButton,
  TabButton,
} from "./components";
import DeleteModal from "../../../atoms/modal/ConfirmDeleteModal";
import MaterialItem from "../../../molecules/admin/learning/MaterialItem";
import MaterialUpdateModal from "./MaterialUpdateModal";
import {
  createMaterialApi,
  deleteMaterialApi,
  getAllMaterialsByCourseIdApi,
  updateMaterialApi,
} from "../../../../apiLib/learning/learningApi";
import { ILearningApiError } from "../../../../apiLib/learning/learningApiURL";
import {
  handlePrivateApiError,
  handlePublicApiError,
} from "../../../../apiLib/errorHandlers";
import { showErrorToastAction } from "../../../../HOC/contexts/toast";
import { useAuthContext } from "../../../../HOC/contexts/AuthContext";
import Loading from "../../../atoms/display/Loading";

interface IProps {
  course: ICourse;
}

const MaterialList: React.FC<IProps> = ({ course }) => {
  const { logoutAdminApiAction } = useAuthContext();

  const [materialList, setMaterialList] = useState<IMaterial[]>([]);
  const [materials, setMaterials] = useState<IMaterial[]>(materialList);
  const [writeModal, setWriteModal] = useState<
    | ((IMaterial | IUpdateMaterialBody) & { writeType: "edit" | "create" })
    | null
  >(null);
  const [deleteModal, setDeleteModal] = useState<IMaterial | null>(null);
  const [search, setSearch] = useState<string | undefined>();
  const [type, setType] = useState<TMaterialType>("refBook");
  const [loading, setLoading] = useState<boolean>(false);
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getAllMaterialsByCourseIdApi(course._id)
      .then((res) => {
        setMaterialList(res.data);
        setMaterials(res.data.filter((mt) => mt.type === "refBook"));
      })
      .catch((err: ILearningApiError) => {
        const { error, data } = handlePublicApiError(err);
        showErrorToastAction({
          message: "Failed to fetch all materials",
          description: error || data?.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [course]);

  const onSearch = (e: any) => {
    if (e.target.value.trim() !== "") {
      setSearch(e.target.value);
      setMaterials(
        materialList.filter((mt) =>
          `${mt.name ? mt.name : undefined}${
            mt.courseCode ? mt.courseCode : undefined
          }`
            .toLowerCase()
            .includes(e.target.value)
        )
      );
    } else {
      setSearch("");
      setMaterials([...materialList]);
    }
  };

  const handleTypeChange = (mType: TMaterialType) => {
    setType(mType);
    setMaterials(materialList.filter((mt) => mt.type === mType));
  };

  const handleCreateClick = () => {
    setWriteModal({
      type: undefined,
      file: undefined,
      name: undefined,
      sessionYear: undefined,
      courseCode: undefined,
      author: undefined,
      writeType: "create",
    });
  };
  const handleEditClick = (material: IMaterial) => {
    setWriteModal({ ...material, writeType: "edit" });
  };
  const handleDeleteClick = (material: IMaterial) => {
    setDeleteModal(material);
  };

  const submitUpdate = (data: IUpdateMaterialBody) => {
    const { name, file, author, sessionYear, type } = data;
    if (!file || !type) return;
    setUpdateLoading(true);
    if (writeModal?.writeType === "create") {
      createMaterialApi(course._id, { name, file, author, sessionYear, type })
        .then((res) => {
          const newArr = [...materialList, res.data];
          setMaterialList([...newArr]);
          setType(res.data.type);
          setMaterials(() => {
            return newArr.filter((m) => m.type === res.data.type);
          });
          setWriteModal(null);
        })
        .catch((err: ILearningApiError) => {
          const { data, error } = handlePrivateApiError(
            err,
            logoutAdminApiAction
          );
          showErrorToastAction({
            message: "Failed to create material",
            description: error || data?.message,
          });
        })
        .finally(() => {
          setUpdateLoading(false);
        });
    } else if (
      writeModal?.writeType === "edit" &&
      (writeModal as IMaterial)._id
    ) {
      updateMaterialApi((writeModal as IMaterial)._id, {
        name,
        file,
        author,
        sessionYear,
        type,
      })
        .then((res) => {
          const newArr = materialList;
          const i = materialList.findIndex((f) => f._id === res.data._id);
          newArr[i] = res.data;
          setMaterialList([...newArr]);
          setType(res.data.type);
          setMaterials(() => {
            return newArr.filter((m) => m.type === res.data.type);
          });
          setWriteModal(null);
        })
        .catch((err: ILearningApiError) => {
          const { error, data } = handlePrivateApiError(
            err,
            logoutAdminApiAction
          );
          showErrorToastAction({
            message: "Failed to update material",
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
    deleteMaterialApi(deleteModal._id)
      .then(() => {
        const newArr = materialList.filter((f) => f._id !== deleteModal._id);
        setMaterialList([...newArr]);
        setType(deleteModal.type);
        setMaterials(() => {
          return newArr.filter((m) => m.type === deleteModal.type);
        });
        setDeleteModal(null);
      })
      .catch((err: ILearningApiError) => {
        const { data, error } = handlePrivateApiError(
          err,
          logoutAdminApiAction
        );
        showErrorToastAction({
          message: "Failed to delete material",
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
      ) : materialList.length ? (
        <>
          <MaterialDesc>
            <ButtonGroup>
              {materialTypes.map((mType) => (
                <TabButton
                  key={mType}
                  size="large"
                  open={type === mType}
                  onClick={() => handleTypeChange(mType)}
                >
                  <Text1 level={3}>
                    {mType === "refBook"
                      ? "Reference Book"
                      : mType === "question"
                      ? "Question"
                      : "Lecture Note"}{" "}
                    ({materialList.filter((mt) => mt.type === mType).length})
                  </Text1>
                </TabButton>
              ))}
            </ButtonGroup>

            <Buttons>
              <SearchField
                placeholder={"Name"}
                suffix={<SearchOutlined />}
                value={search}
                onChange={onSearch}
              />
              <StyledButton onClick={handleCreateClick}>
                <Text1 color="primary" level={1}>
                  Add material
                </Text1>
                <AddIcon />
              </StyledButton>
            </Buttons>
          </MaterialDesc>
          {materials.length ? (
            <List>
              {materials.map((material) => (
                <MaterialItem
                  key={material._id}
                  material={material}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteClick}
                />
              ))}
            </List>
          ) : (
            <NoMatchContainer>
              <img src={"/images/no_items.png"} alt="no items" />
              <Gap height={"2rem"} />
              <SubTitle1>No material found</SubTitle1>
            </NoMatchContainer>
          )}
        </>
      ) : (
        <Container>
          <img src={"/images/no_items.png"} alt="no items" />
          <Gap height={"2rem"} />
          <SubTitle1>No material added yet!</SubTitle1>
          <Gap height={"2rem"} />
          <AddButton
            type={"primary"}
            icon={<PlusSquareFilled />}
            onClick={handleCreateClick}
          >
            <Text1 level={1} color={"white"}>
              Add material
            </Text1>
          </AddButton>
        </Container>
      )}

      {/* Write MODAL */}
      <Modal
        visible={!!writeModal}
        onCancel={() => setWriteModal(null)}
        closeIcon={<CloseCircleFilled />}
        footer={null}
        width={"45rem"}
      >
        {writeModal && (
          <MaterialUpdateModal
            data={writeModal}
            onDataSubmit={submitUpdate}
            loading={updateLoading}
          />
        )}
      </Modal>

      {/* DELETE MODAL */}
      <DeleteModal
        title={"Do you want to delete the material?"}
        visible={!!deleteModal}
        onCancel={() => setDeleteModal(null)}
        onOk={submitDelete}
        width={"40rem"}
        loading={updateLoading}
      />
    </>
  );
};

export default MaterialList;
