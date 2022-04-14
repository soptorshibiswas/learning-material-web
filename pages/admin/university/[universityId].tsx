import AdminLearningDepartmentsTemplate from "../../../src/views/templates/admin/departments";
import withAdminAuth from "../../../src/HOC/routes/withAdminAuth";

export default withAdminAuth(function AdminUniversityPage() {
  return <AdminLearningDepartmentsTemplate />;
});
