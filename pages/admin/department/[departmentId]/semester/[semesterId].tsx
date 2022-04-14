import AdminLearningCoursesTemplate from "../../../../../src/components/templates/admin/courses";
import withAdminAuth from "../../../../../src/HOC/routes/withAdminAuth";

export default withAdminAuth(function AdminSemesterCoursesPage() {
  return <AdminLearningCoursesTemplate />;
});
