import React from "react";
import { Route, Navigate } from "react-router";
import { isEmpty } from "lodash";

import AdminLayout from "../../layouts/AdminLayout";
import { decodeJWT } from "../../utils";

const AdminContainer = () => {
  const token = localStorage.getItem("token");

  const isLogin = !isEmpty(token);

  const roleName = decodeJWT(token)?.payload?.role;

  if (!isLogin || roleName !== "ADMIN") return <Navigate to="/" />;

  return (
    <AdminLayout>
      <Route>
        {/* Dashboard Component */}
        {/* <Route
          path="/Admin/Dashboard"
          
          render={() => <DashboardAdmin />}
        /> */}
      </Route>
    </AdminLayout>
  );
};

export default AdminContainer;
