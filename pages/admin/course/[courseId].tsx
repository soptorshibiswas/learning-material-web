import AdminLearningMaterialsTemplate from "../../../src/views/templates/admin/materials";
import withAdminAuth from "../../../src/HOC/routes/withAdminAuth";

export default withAdminAuth(function AdminCourseMaterialsPage() {
  return <AdminLearningMaterialsTemplate />;
});
