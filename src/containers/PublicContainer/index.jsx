import React from "react";
import { Route } from "react-router";

import PublicLayout from "../../layouts/PublicLayout";
import HomePublic from "./../../components/Public/HomePublic";

const PublicContainer = () => {
  return (
    <PublicLayout>
      <Route>
        {/* Home Component */}
        <Route path="/" exact render={HomePublic} />
      </Route>
    </PublicLayout>
  );
};

export default PublicContainer;
