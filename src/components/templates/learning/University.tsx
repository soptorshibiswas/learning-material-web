import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IDepartment, IUniversity } from "../../../../shared/types/learning";
import {
  getAllDepartmentByUniAbbrApi,
  getAllUniversityApi,
  getUniversityByAbbrApi,
} from "../../../apiLib/learning/learningApi";
import { ILearningApiError } from "../../../apiLib/learning/learningApiURL";
import { handlePublicApiError } from "../../../apiLib/errorHandlers";
import { showErrorToastAction } from "../../../HOC/contexts/toast";
import Loading from "../../atoms/display/Loading";
import { Gap } from "../../atoms/spaces";
import { InnerPageLayout } from "../../layouts/Layout";
import DepartmentSearch from "../../organisms/learning/DepartmentSearch";
import UniversityHero from "../../organisms/learning/UniversityHero";

const LearningUniversityTemplate: React.FC = () => {
  const [allUni, setAllUni] = useState<{ name: string; abbr: string }[]>([]);
  const [uni, setUni] = useState<IUniversity | null>(null);
  const [depts, setDepts] = useState<IDepartment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const uniAbbr = router.asPath.split("/")[2];

  useEffect(() => {
    setLoading(true);
    getAllUniversityApi()
      .then((res) => {
        const arr = res.data.map((uni) => ({
          name: uni.name,
          abbr: uni.abbr.toUpperCase(),
        }));
        setAllUni(arr);
      })
      .catch((err: ILearningApiError) => {
        const { error, data } = handlePublicApiError(err);
        showErrorToastAction({
          message: "Failed to fetch universities",
          description: error || data?.message,
        });
      });
    getUniversityByAbbrApi(uniAbbr)
      .then((res) => {
        setUni(res.data);
      })
      .catch((err: ILearningApiError) => {
        const { error, data } = handlePublicApiError(err);
        showErrorToastAction({
          message: "Failed to fetch university data",
          description: error || data?.message,
        });
      });
    getAllDepartmentByUniAbbrApi(uniAbbr)
      .then((res) => {
        setDepts(res.data);
      })
      .catch((err: ILearningApiError) => {
        const { error, data } = handlePublicApiError(err);
        showErrorToastAction({
          message: "Failed to fetch departments",
          description: error || data?.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [uniAbbr]);

  return (
    <InnerPageLayout>
      {loading ? (
        <>
          <Loading size={"150px"} />
          <Gap height={"20vh"} />
        </>
      ) : uni ? (
        <>
          <UniversityHero university={uni} />
          <DepartmentSearch uniOptions={allUni} departments={depts} />
        </>
      ) : null}
    </InnerPageLayout>
  );
};

export default LearningUniversityTemplate;
