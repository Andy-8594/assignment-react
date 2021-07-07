//@ts-ignore
import { Switch, Route } from "react-router-dom";
import React from "react";
import { PATHS } from "../constants/paths";
import Main from "../pages/Home/pages/Main/Main";

const MenuRoutes = () => {
  return (
    <Switch>
      <Route exact path={PATHS.MAIN} component={Main}></Route>
      {/* <Route exact path={PATHS.NEWUSERS} component={NewUser}></Route>
      <Route exact path={PATHS.USERS_UDPATE} component={UpdateUser}></Route>  */}
    </Switch>
  );
};

export default MenuRoutes;