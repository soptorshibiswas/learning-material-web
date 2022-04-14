import React from "react";
import AdminLayout from "../../layouts/adminLayout";
import AdminContentLayout from "../../layouts/adminLayout/AdminContentLayout";
import UniversityList from "../../organisms/admin/learning/UniversityList";

const AdminLearningTemplate: React.FC = () => {
  return (
    <AdminLayout>
      <AdminContentLayout>
        <UniversityList />
      </AdminContentLayout>
    </AdminLayout>
  );
};

export default AdminLearningTemplate;
