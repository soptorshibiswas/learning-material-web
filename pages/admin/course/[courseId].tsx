import AdminLearningMaterialsTemplate from "../../../src/components/templates/admin/materials";
import withAdminAuth from "../../../src/HOC/routes/withAdminAuth";

export default withAdminAuth(function AdminCourseMaterialsPage() {
  return <AdminLearningMaterialsTemplate />;
});
