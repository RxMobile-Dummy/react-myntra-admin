import React from "react";
import { Route, Navigate } from "react-router";
import { isEmpty } from "lodash";

import PublicLayout from "../../layouts/PublicLayout";
import { decodeJWT } from "../../utils";

const CustomerContainer = () => {
  const token = localStorage.getItem("token");

  const isLogin = !isEmpty(token);

  const roleName = decodeJWT(token)?.payload?.role;

  if (!isLogin || (roleName !== "CUSTOMER" && roleName !== "ADMIN"))
    return <Navigate to="/" />;

  return (
    <PublicLayout>
      <Route>
        {/* Dashboard Component */}
        {/* <Route
          path="/Customer/Dashboard"
          
          render={() => <DashboardCustomer />}
        /> */}
      </Route>
    </PublicLayout>
  );
};

export default CustomerContainer;
