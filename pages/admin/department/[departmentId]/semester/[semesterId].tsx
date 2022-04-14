import AdminLearningCoursesTemplate from "../../../../../src/views/templates/admin/courses";
import withAdminAuth from "../../../../../src/HOC/routes/withAdminAuth";

export default withAdminAuth(function AdminSemesterCoursesPage() {
  return <AdminLearningCoursesTemplate />;
});
