import React from "react";
import { InnerPageLayout } from "../../layouts/Layout";
import CoursesHero from "../../organisms/learning/CoursesHero";

const LearningCoursesTemplate: React.FC = () => {
  return (
    <InnerPageLayout>
      <CoursesHero />
    </InnerPageLayout>
  );
};

export default LearningCoursesTemplate;
