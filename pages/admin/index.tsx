import AdminTemplate from "../../src/views/templates/admin";
import withAdminAuth from "../../src/HOC/routes/withAdminAuth";

export default withAdminAuth(function AdminDashboardPage() {
  return <AdminTemplate />;
});
