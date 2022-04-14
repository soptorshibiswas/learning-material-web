import AdminTemplate from "../../src/components/templates/admin";
import withAdminAuth from "../../src/HOC/routes/withAdminAuth";

export default withAdminAuth(function AdminDashboardPage() {
  return <AdminTemplate />;
});
