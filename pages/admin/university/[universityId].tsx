import AdminLearningDepartmentsTemplate from "../../../src/components/templates/admin/departments";
import withAdminAuth from "../../../src/HOC/routes/withAdminAuth";

export default withAdminAuth(function AdminUniversityPage() {
  return <AdminLearningDepartmentsTemplate />;
});
