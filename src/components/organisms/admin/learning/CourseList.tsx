import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CloseCircleFilled, PlusSquareFilled } from "@ant-design/icons";
import { Modal } from "antd";
import {
  courseTypes,
  ICourse,
  ISemester,
  IUpdateCourseBody,
  TCourseType,
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
  List,
  NoMatchContainer,
  StyledButton,
} from "./components";
import { TextFieldForm } from "../../../molecules/inputfields";
import DeleteModal from "../../../atoms/modal/ConfirmDeleteModal";
import FilterIcon from "../../../../assets/icons/admin/FilterIcon";
import CourseItem from "../../../molecules/admin/learning/CourseItem";
import FilterModal from "./CourseFilterModal";
import { ADMIN_LEARNING_COURSE } from "../../../../../shared/constants/routes";
import {
  createCourseApi,
  deleteCourseApi,
  getAllCoursesBySemIdApi,
  updateCourseApi,
} from "../../../../apiLib/learning/learningApi";
import { ILearningApiError } from "../../../../apiLib/learning/learningApiURL";
import {
  handlePrivateApiError,
  handlePublicApiError,
} from "../../../../apiLib/errorHandlers";
import { showErrorToastAction } from "../../../../HOC/contexts/toast";
import { useAuthContext } from "../../../../HOC/contexts/AuthContext";
import Loading from "../../../atoms/display/Loading";
import MyAutoSuggestSelectComponent from "../../../molecules/selectFields/SuggestSelectField";

interface IProps {
  semester: ISemester;
}

const CourseList: React.FC<IProps> = ({ semester }) => {
  const { logoutAdminApiAction } = useAuthContext();

  const [courseList, setCourseList] = useState<ICourse[]>([]);
  const [courses, setCourses] = useState(courseList);
  const [writeModal, setWriteModal] = useState<
    ((ICourse | IUpdateCourseBody) & { writeType: "edit" | "create" }) | null
  >(null);
  const [deleteModal, setDeleteModal] = useState<ICourse | null>(null);
  const [filterModal, setFilterModal] = useState<
    (IUpdateCourseBody & { visible: boolean }) | null
  >(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getAllCoursesBySemIdApi(semester._id)
      .then((res) => {
        setCourseList(res.data);
        setCourses(res.data);
      })
      .catch((err: ILearningApiError) => {
        const { error, data } = handlePublicApiError(err);
        showErrorToastAction({
          message: "Failed to fetch all courses",
          description: error || data?.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [semester]);

  const handleFilterClick = () => {
    setFilterModal({ visible: true });
  };
  const handleFilterClose = () => {
    setFilterModal(null);
  };
  const onFilter = (name: string, code?: string, type?: TCourseType) => {
    let newCourses: ICourse[] = courseList;
    if (name && name.trim() !== "")
      newCourses = newCourses.filter((n) => n.name.includes(name));

    if (type != undefined)
      newCourses = newCourses.filter((n) => n.type === type);

    if (code) newCourses = newCourses.filter((n) => n.code.includes(code));

    setFilterModal({ visible: false, name, code, type });
    setCourses(newCourses);
    setFilterModal(null);
  };

  const handleChangeName = (e: any) => {
    setWriteModal((prev) => {
      if (!prev) return null;
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleChangeType = (_name: string | undefined, key: number) => {
    setWriteModal((prev) => {
      if (!prev) return null;
      return { ...prev, type: courseTypes[key] };
    });
  };

  const router = useRouter();
  const handleCourseClick = (id: string) => {
    router.push(ADMIN_LEARNING_COURSE(id));
  };

  const handleCreateClick = () => {
    setWriteModal({
      name: undefined,
      type: undefined,
      code: undefined,
      writeType: "create",
    });
  };
  const handleEditClick = (course: ICourse) => {
    setWriteModal({ ...course, writeType: "edit" });
  };
  const handleDeleteClick = (course: ICourse) => {
    setDeleteModal(course);
  };

  const submitUpdate = () => {
    if (
      !writeModal ||
      !writeModal.name ||
      !writeModal.type ||
      !writeModal.code ||
      writeModal.name?.trim() === "" ||
      writeModal.type?.trim() === "" ||
      writeModal.code?.trim() === ""
    )
      return;

    setUpdateLoading(true);

    if (writeModal?.writeType === "create") {
      createCourseApi(semester._id, {
        name: writeModal.name,
        type: writeModal.type,
        code: writeModal.code,
      })
        .then((res) => {
          setCourseList((prev) => [...prev, res.data]);
          setCourses((prev) => [...prev, res.data]);
          setWriteModal(null);
        })
        .catch((err: ILearningApiError) => {
          const { error, data } = handlePrivateApiError(
            err,
            logoutAdminApiAction
          );
          showErrorToastAction({
            message: "Failed to create course",
            description: error || data?.message,
          });
        })
        .finally(() => {
          setUpdateLoading(false);
        });
    } else if (
      writeModal?.writeType === "edit" &&
      (writeModal as ICourse)._id
    ) {
      updateCourseApi((writeModal as ICourse)._id, {
        name: writeModal.name,
        type: writeModal.type,
        code: writeModal.code,
      })
        .then((res) => {
          const newArr = courseList;
          const i = courseList.findIndex((f) => f._id === res.data._id);
          newArr[i] = res.data;
          setCourseList([...newArr]);
          setCourses([...newArr]);
          setWriteModal(null);
        })
        .catch((err: ILearningApiError) => {
          const { error, data } = handlePrivateApiError(
            err,
            logoutAdminApiAction
          );
          showErrorToastAction({
            message: "Failed to update course",
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
    deleteCourseApi(deleteModal._id)
      .then(() => {
        const newArr = courseList.filter((f) => f._id !== deleteModal._id);
        setCourseList([...newArr]);
        setCourses([...newArr]);
        setDeleteModal(null);
      })
      .catch((err: ILearningApiError) => {
        const { error, data } = handlePrivateApiError(
          err,
          logoutAdminApiAction
        );
        showErrorToastAction({
          message: "Failed to delete course",
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
      ) : courseList.length ? (
        <>
          <Desc>
            <SubTitle2>Total courses: {courses.length}</SubTitle2>

            <Buttons>
              <StyledButton onClick={handleFilterClick}>
                <Text1 color="primary" level={1}>
                  Filter
                </Text1>
                <FilterIcon />
              </StyledButton>
              <StyledButton onClick={handleCreateClick}>
                <Text1 color="primary" level={1}>
                  Add course
                </Text1>
                <AddIcon />
              </StyledButton>
            </Buttons>
          </Desc>
          {courses.length ? (
            <List>
              {courses.map((course) => (
                <CourseItem
                  key={course._id}
                  course={course}
                  onClick={handleCourseClick}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteClick}
                />
              ))}
            </List>
          ) : (
            <NoMatchContainer>
              <img src={"/images/no_items.png"} alt="no items" />
              <Gap height={"2rem"} />
              <SubTitle1>No course found</SubTitle1>
            </NoMatchContainer>
          )}
        </>
      ) : (
        <Container>
          <img src={"/images/no_items.png"} alt="no items" />
          <Gap height={"2rem"} />
          <SubTitle1>No course added yet!</SubTitle1>
          <Gap height={"2rem"} />
          <AddButton
            type={"primary"}
            icon={<PlusSquareFilled />}
            onClick={handleCreateClick}
          >
            <Text1 level={1} color={"white"}>
              Add course
            </Text1>
          </AddButton>
        </Container>
      )}

      {/* Filter MODAL */}
      <Modal
        visible={filterModal?.visible}
        onCancel={handleFilterClose}
        width={"max-content"}
        footer={null}
        closeIcon={<CloseCircleFilled />}
      >
        <FilterModal
          onSubmit={onFilter}
          nameF={filterModal?.name}
          codeF={filterModal?.code}
          typeF={filterModal?.type}
        />
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
            {writeModal?.writeType === "edit" ? "Edit" : "Add"} course
          </SubTitle1>
          <Gap height={"1rem"} />

          <MyAutoSuggestSelectComponent
            labelSize={1}
            labelText={"Course type*"}
            labelLevel={3}
            placeholder={"theory / sessional / mixed"}
            value={courseTypes.findIndex((t) => t === writeModal?.type)}
            options={courseTypes}
            onChange={handleChangeType}
          />
          <Gap height={"1.875rem"} />

          <TextFieldForm
            name={"name"}
            labelSize={1}
            labelText={"Course name"}
            labelLevel={3}
            placeholder={"Write full course name"}
            value={writeModal?.name || undefined}
            onChange={handleChangeName}
          />
          <Gap height={"1.875rem"} />

          <TextFieldForm
            name={"code"}
            labelSize={1}
            labelText={"Course code"}
            labelLevel={3}
            placeholder={"Example: CSE101, EEE204 . . ."}
            value={writeModal?.code || undefined}
            onChange={handleChangeName}
          />
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
          "কোর্সের অন্তর্গত সকল ম্যাটেরিয়াল গুলো মুছে যাবে । আপনিকি কোর্সটি ডিলিট করতে চান?"
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

export default CourseList;
