//@ts-ignore
import { Switch, Route } from "react-router-dom";
import React from "react";
import { PATHS } from "../constants/paths";
import Posts from "../pages/Home/pages/Posts/Posts";
import PostDetail from "../pages/Home/pages/Posts/PostDetail";

const PostRoutes = () => {
  return (
    <Switch>
      <Route exact path={PATHS.POST} component={Posts}></Route>
       <Route exact path={PATHS.POSTDETAIL} component={PostDetail}></Route>
    </Switch>
  );
};

export default PostRoutes;