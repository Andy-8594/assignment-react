//@ts-ignore
import { Switch, Route } from "react-router-dom";
import React from "react";
import { PATHS } from "../constants/paths";
import Profile from "../pages/Home/pages/Profile/Profile";

const ProfileRoutes = () => {
  return (
    <Switch>
      <Route exact path={PATHS.PROFILE} component={Profile}></Route>
    </Switch>
  );
};

export default ProfileRoutes;