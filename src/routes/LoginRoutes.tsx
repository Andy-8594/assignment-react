//@ts-ignore
import { Switch, Route } from "react-router-dom";
import React from "react";
import { PATHS } from "../constants/paths";
import Login from "../pages/Home/pages/Login/Login";

const MenuRoutes = () => {
  return (
    <Switch>
      <Route exact path={PATHS.LOGIN} component={Login}></Route>
    </Switch>
  );
};

export default MenuRoutes;