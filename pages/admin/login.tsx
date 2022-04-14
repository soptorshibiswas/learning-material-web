import AdminLoginPage from "../../src/views/templates/admin/adminlogin";
import withoutAuth from "../../src/HOC/routes/withoutAuth";

function AdminLogin() {
  return <AdminLoginPage />;
}

export default withoutAuth(AdminLogin);
