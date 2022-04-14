import React from "react";
import Hero from "../../organisms/learning/Hero";
import Stats from "../../organisms/learning/Stats";
import { InnerPageLayout } from "../../layouts/Layout";

const LearningHomeTemplate: React.FC = () => {
  return (
    <InnerPageLayout>
      <Hero />
      <Stats />
    </InnerPageLayout>
  );
};

export default LearningHomeTemplate;
