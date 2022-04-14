import React from "react";
import { InnerPageLayout } from "../../layouts/Layout";
import SingleCourseHero from "../../organisms/learning/SingleCourseHero";

const LearningSingleCourseTemplate: React.FC = () => {
  return (
    <InnerPageLayout>
      <SingleCourseHero />
    </InnerPageLayout>
  );
};

export default LearningSingleCourseTemplate;
