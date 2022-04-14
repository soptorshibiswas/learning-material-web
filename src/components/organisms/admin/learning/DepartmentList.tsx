import React, { useState } from "react";
import {
  CloseCircleFilled,
  SearchOutlined,
  PlusSquareFilled,
} from "@ant-design/icons";
import { Modal } from "antd";
import {
  ICreateDepartmentBody,
  ICreateSemesterBody,
  IDepartment,
  ISemester,
  IUniversity,
} from "../../../../../shared/types/learning";
import AddIcon from "../../../../assets/icons/admin/AddIcon";
import { SubTitle2 } from "../../../atoms/texts/SubTitle";
import RoundedButton from "../../../atoms/buttons/RoundedButton";
import { Gap } from "../../../atoms/spaces";
import { SubTitle1 } from "../../../atoms/texts/SubTitle";
import { Text1 } from "../../../atoms/texts/Text";
import {
  AddButton,
  Buttons,
  Container,
  Desc,
  EditModalContent,
  DeptGrid,
  ModalContent,
  NoMatchContainer,
  SearchField,
  StyledButton,
  RadioGroup,
  RadioNumber,
} from "./components";
import { TextFieldForm } from "../../../molecules/inputfields";
import DepartmentCard from "../../../molecules/admin/learning/DepartmentCard";
import DeleteModal from "../../../atoms/modal/ConfirmDeleteModal";
import { RadioInput } from "../../../atoms/inputs";
import SemesterCreate from "./CreateSemesters";
import SemesterEdit from "./EditSemester";
import {
  createDepartmentApi,
  deleteDepartmentApi,
  getAllDeptsByUniIdApi,
  updateDepartmentApi,
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
  university: IUniversity;
}

const DepartmentList: React.FC<IProps> = ({ university }) => {
  const { logoutAdminApiAction } = useAuthContext();

  const [depts, setDepts] = useState<IDepartment[]>([]);
  const [departments, setDepartments] = useState<IDepartment[]>(depts);
  const [search, setSearch] = useState<string | undefined>();
  const [writeModal, setWriteModal] = useState<
    ((IDepartment | ICreateDepartmentBody) & { type: "edit" | "create" }) | null
  >(null);
  const [deleteModal, setDeleteModal] = useState<IDepartment | null>(null);
  const [createSuccess, setCreateSuccess] = useState<boolean>(false);
  const [openDept, setOpenDept] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);

  React.useEffect(() => {
    setLoading(true);
    getAllDeptsByUniIdApi(university._id)
      .then((res) => {
        setDepts(res.data);
        setDepartments(res.data);
      })
      .catch((err: ILearningApiError) => {
        const { error, data } = handlePublicApiError(err);
        showErrorToastAction({
          message: "Failed to fetch all departments",
          description: error || data?.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [university]);

  const onSearch = (e: any) => {
    if (e.target.value.trim() !== "") {
      setSearch(e.target.value);
      setDepartments(
        depts.filter((dept) =>
          `${dept.name}${dept.abbr}`.toLowerCase().includes(e.target.value)
        )
      );
    } else {
      setSearch("");
      setDepartments(depts);
    }
  };

  const handleChangeName = (e: any) => {
    setWriteModal((prev) => {
      if (!prev) return null;
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleDepartmentClick = (_id: string) => {
    setOpenDept((prev) => {
      if (prev === _id) return null;
      return _id;
    });
  };

  const handleSemesterChange = (
    semesters: (ISemester | ICreateSemesterBody)[]
  ) => {
    setWriteModal((prev) => {
      if (!prev) return null;
      return { ...prev, semesters: semesters };
    });
  };

  const handleCreateClick = () => {
    setCreateSuccess(false);
    setWriteModal({
      name: "",
      abbr: "",
      totalSemesters: 0,
      semesters: [],
      type: "create",
    });
  };
  const handleEditClick = (dept: IDepartment) => {
    setWriteModal({ ...dept, type: "edit" });
  };
  const handleDeleteClick = (dept: IDepartment) => {
    setDeleteModal(dept);
  };

  const submitUpdate = () => {
    if (
      !writeModal ||
      writeModal.name.trim() === "" ||
      writeModal.abbr.trim() === ""
    )
      return;
    setUpdateLoading(true);

    const obj = {
      name: writeModal.name,
      abbr: writeModal.abbr,
      totalSemesters: writeModal.totalSemesters,
      semesters: writeModal.semesters,
    };

    if (writeModal?.type === "create") {
      createDepartmentApi(university._id, obj)
        .then((res) => {
          const newArr = [...depts, res.data];
          setDepts([...newArr]);
          setDepartments([...newArr]);
          setWriteModal(null);
        })
        .catch((err: ILearningApiError) => {
          const { data, error } = handlePrivateApiError(
            err,
            logoutAdminApiAction
          );
          showErrorToastAction({
            message: "Failed to create department",
            description: error || data?.message,
          });
        })
        .finally(() => {
          setUpdateLoading(false);
        });
    } else if (writeModal?.type === "edit" && (writeModal as IDepartment)._id) {
      updateDepartmentApi((writeModal as IDepartment)._id, obj)
        .then((res) => {
          const newArr = depts;
          const i = depts.findIndex((f) => f._id === res.data._id);
          newArr[i] = res.data;
          setDepts([...newArr]);
          setDepartments([...newArr]);
          setWriteModal(null);
        })
        .catch((err: ILearningApiError) => {
          const { data, error } = handlePrivateApiError(
            err,
            logoutAdminApiAction
          );
          showErrorToastAction({
            message: "Failed to update department",
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
    deleteDepartmentApi(deleteModal._id)
      .then(() => {
        const newArr = depts.filter((f) => f._id !== deleteModal._id);
        setDepts([...newArr]);
        setDepartments([...newArr]);
        setDeleteModal(null);
      })
      .catch((err: ILearningApiError) => {
        const { error, data } = handlePrivateApiError(
          err,
          logoutAdminApiAction
        );
        showErrorToastAction({
          message: "Failed to delete department",
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
      ) : depts.length ? (
        <>
          <Desc>
            <SubTitle2>Total departments: {departments.length}</SubTitle2>

            <Buttons>
              <SearchField
                placeholder={"Find department"}
                suffix={<SearchOutlined />}
                value={search}
                onChange={onSearch}
              />
              <StyledButton onClick={handleCreateClick}>
                <Text1 color="primary" level={1}>
                  Add department
                </Text1>
                <AddIcon />
              </StyledButton>
            </Buttons>
          </Desc>
          {departments.length ? (
            <DeptGrid>
              {departments.map((dept) => (
                <DepartmentCard
                  key={dept._id}
                  department={dept}
                  open={openDept === dept._id}
                  onClick={handleDepartmentClick}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteClick}
                />
              ))}
            </DeptGrid>
          ) : (
            <NoMatchContainer>
              <img src={"/images/no_items.png"} alt="no items" />
              <Gap height={"2rem"} />
              <SubTitle1>No department found</SubTitle1>
            </NoMatchContainer>
          )}
        </>
      ) : (
        <Container>
          <img src={"/images/no_items.png"} alt="no items" />
          <Gap height={"2rem"} />
          <SubTitle1>No department added yet!</SubTitle1>
          <Gap height={"2rem"} />
          <AddButton
            type={"primary"}
            icon={<PlusSquareFilled />}
            onClick={handleCreateClick}
          >
            <Text1 level={1} color={"white"}>
              Add department
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
          <SubTitle1>Department added successfully!</SubTitle1>
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
            {writeModal?.type === "edit" ? "Edit" : "Add"} department
          </SubTitle1>
          <Gap height={"2.5rem"} />
          <TextFieldForm
            name={"name"}
            labelSize={1}
            labelText={"Department*"}
            labelLevel={3}
            placeholder={"Department name"}
            value={writeModal?.name || undefined}
            onChange={handleChangeName}
          />
          <Gap height={"1.875rem"} />
          <TextFieldForm
            name={"abbr"}
            labelSize={1}
            labelText={"Department abbreviation"}
            labelLevel={3}
            placeholder={"Example: CSE, EEE . . ."}
            value={writeModal?.abbr || undefined}
            onChange={handleChangeName}
          />
          <Gap height={"1.875rem"} />

          <Text1 level={3}>Number of semesters</Text1>
          <Gap height={"1.25rem"} />
          <RadioGroup
            value={writeModal?.totalSemesters}
            onChange={(e) =>
              setWriteModal((prev) => {
                if (prev)
                  return {
                    ...prev,
                    totalSemesters: parseInt(e.target.value.toString()),
                  };
                return null;
              })
            }
            size={"large"}
          >
            {[6, 8, 10, 12].map((num) => (
              <RadioInput
                key={num.toString()}
                marginLeft={"0.67rem"}
                marginRight={"1.5rem"}
                options={[]}
                value={num}
              >
                {num}
              </RadioInput>
            ))}
            <RadioNumber
              type="number"
              min={0}
              value={writeModal?.totalSemesters}
              onChange={(e) =>
                setWriteModal((prev) => {
                  if (prev)
                    return {
                      ...prev,
                      totalSemesters: parseInt(e.target.value.toString()),
                    };
                  return null;
                })
              }
            />
          </RadioGroup>
          <Gap height={"1.875rem"} />

          <Text1 level={3}>Semester name</Text1>
          <Gap height={"1.25rem"} />
          {writeModal?.type === "create" && (
            <SemesterCreate
              totalSemesters={writeModal.totalSemesters}
              semesters={writeModal.semesters}
              onChangeSems={handleSemesterChange}
            />
          )}
          {writeModal?.type === "edit" && (
            <SemesterEdit
              totalSemesters={writeModal.totalSemesters}
              semesters={writeModal.semesters}
              onChangeSems={handleSemesterChange}
            />
          )}

          <Gap height={"1.875rem"} />
          <RoundedButton
            type={"primary"}
            onClick={submitUpdate}
            loading={updateLoading}
            disabled={updateLoading}
          >
            <Text1 level={3} color={"white"}>
              Save
            </Text1>
          </RoundedButton>
        </EditModalContent>
      </Modal>

      {/* DELETE MODAL */}
      <DeleteModal
        title={
          "ডিপার্টমেন্টের অন্তর্গত সকল সেমিস্টার, ম্যাটেরিয়াল গুলো মুছে যাবে । আপনিকি ডিপার্টমেন্টটি ডিলিট করতে চান?"
        }
        visible={!!deleteModal}
        onCancel={() => setDeleteModal(null)}
        onOk={submitDelete}
        width={"40rem"}
        loading={updateLoading}
      />
    </>
  );
};

export default DepartmentList;
