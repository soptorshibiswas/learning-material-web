import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ADMIN_LEARNING_UNI } from "../../../../shared/constants/routes";
import { IDepartment, ISemester } from "../../../../shared/types/learning";
import { getSingleDepartmentApi } from "../../../apiLib/learning/learningApi";
import { ILearningApiError } from "../../../apiLib/learning/learningApiURL";
import { handlePublicApiError } from "../../../apiLib/errorHandlers";
import { showErrorToastAction } from "../../../HOC/contexts/toast";
import Loading from "../../atoms/display/Loading";
import { Title2 } from "../../atoms/texts/Title";
import AdminLayout from "../../layouts/adminLayout";
import AdminContentLayout from "../../layouts/adminLayout/AdminContentLayout";
import CourseList from "../../organisms/admin/learning/CourseList";

const Span = styled.a`
  color: ${({ theme }) => theme.colors.typography.darkGrey};
  font-weight: 400;
`;

const AdminLearningMaterialsTemplate: React.FC = () => {
  const [dept, setDept] = useState<IDepartment | null>(null);
  const [semester, setSemester] = useState<ISemester | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const { departmentId, semesterId } = router.query;

  useEffect(() => {
    if (
      !semesterId ||
      !departmentId ||
      typeof semesterId !== "string" ||
      typeof departmentId !== "string"
    )
      return;

    setLoading(true);
    getSingleDepartmentApi(departmentId)
      .then((res) => {
        setDept(res.data);
        const sem = res.data.semesters.find((s) => s._id === semesterId);
        setSemester(sem as ISemester);
      })
      .catch((err: ILearningApiError) => {
        const { error, data } = handlePublicApiError(err);
        showErrorToastAction({
          message: "Failed to fetch department",
          description: error || data?.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [semesterId, departmentId]);

  return (
    <AdminLayout>
      <AdminContentLayout>
        {loading ? (
          <Loading size={"100px"} />
        ) : semester && dept ? (
          <>
            <Title2>
              {semester.name}{" "}
              <Link href={ADMIN_LEARNING_UNI(dept.universityId)}>
                <Span>({dept.slug.split("~").join(" - ").toUpperCase()})</Span>
              </Link>
            </Title2>
            <CourseList semester={semester} />
          </>
        ) : null}
      </AdminContentLayout>
    </AdminLayout>
  );
};

export default AdminLearningMaterialsTemplate;
