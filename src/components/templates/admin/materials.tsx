import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ICourse } from "../../../../shared/types/learning";
import { getSingleCourseApi } from "../../../apiLib/learning/learningApi";
import { ILearningApiError } from "../../../apiLib/learning/learningApiURL";
import { handlePublicApiError } from "../../../apiLib/errorHandlers";
import { showErrorToastAction } from "../../../HOC/contexts/toast";
import Loading from "../../atoms/display/Loading";
import { Title2 } from "../../atoms/texts/Title";
import AdminLayout from "../../layouts/adminLayout";
import AdminContentLayout from "../../layouts/adminLayout/AdminContentLayout";
import MaterialList from "../../organisms/admin/learning/MaterialList";

const Span = styled.span`
  color: ${({ theme }) => theme.colors.typography.darkGrey};
  font-weight: 400;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transition: all 0.3s ease;
  }
`;

const AdminLearningMaterialsTemplate: React.FC = () => {
  const [course, setCourse] = useState<ICourse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const { courseId } = router.query;

  useEffect(() => {
    if (!courseId || typeof courseId !== "string") return;
    setLoading(true);
    getSingleCourseApi(courseId)
      .then((res) => {
        setCourse(res.data);
      })
      .catch((err: ILearningApiError) => {
        const { error, data } = handlePublicApiError(err);
        showErrorToastAction({
          message: "Failed to fetch course",
          description: error || data?.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [courseId]);

  return (
    <AdminLayout>
      <AdminContentLayout>
        {loading ? (
          <Loading size={"100px"} />
        ) : course ? (
          <>
            <Title2>
              {course.name}{" "}
              <Span onClick={() => router.back()}>
                ({course.slug.split("~").slice(0, 3).join(" - ").toUpperCase()})
              </Span>
            </Title2>
            <MaterialList course={course} />
          </>
        ) : null}
      </AdminContentLayout>
    </AdminLayout>
  );
};

export default AdminLearningMaterialsTemplate;
