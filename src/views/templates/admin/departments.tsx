import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ADMIN_HOME } from "../../../../shared/constants/routes";
import { IUniversity } from "../../../../shared/types/learning";
import { getSingleUniversityApi } from "../../../apiLib/learning/learningApi";
import { ILearningApiError } from "../../../apiLib/learning/learningApiURL";
import { handlePublicApiError } from "../../../apiLib/errorHandlers";
import { showErrorToastAction } from "../../../HOC/contexts/toast";
import Loading from "../../atoms/display/Loading";
import { Title2 } from "../../atoms/texts/Title";
import AdminLayout from "../../layouts/adminLayout";
import AdminContentLayout from "../../layouts/adminLayout/AdminContentLayout";
import DepartmentList from "../../organisms/admin/learning/DepartmentList";

const Span = styled.a`
  color: ${({ theme }) => theme.colors.typography.darkGrey};
  font-weight: 400;
`;

const AdminLearningDepartmentsTemplate: React.FC = () => {
  const [university, setUniversity] = useState<IUniversity | null>();
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const { universityId } = router.query;

  useEffect(() => {
    if (universityId && typeof universityId === "string") {
      setLoading(true);
      getSingleUniversityApi(universityId)
        .then((res) => setUniversity(res.data))
        .catch((err: ILearningApiError) => {
          const { error, data } = handlePublicApiError(err);
          showErrorToastAction({
            message: "Failed to fetch university",
            description: error || data?.message,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [universityId]);

  return (
    <AdminLayout>
      <AdminContentLayout>
        {loading ? (
          <Loading size={"100px"} />
        ) : university ? (
          <>
            <Title2>
              Departments{" "}
              <Link href={ADMIN_HOME()}>
                <Span>({university.abbr.toUpperCase()})</Span>
              </Link>
            </Title2>
            <DepartmentList university={university} />
          </>
        ) : null}
      </AdminContentLayout>
    </AdminLayout>
  );
};

export default AdminLearningDepartmentsTemplate;
