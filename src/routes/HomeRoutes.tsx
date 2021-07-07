//@ts-ignore
import { Switch, Route } from "react-router-dom";
//@ts-ignore
import React, { useMemo } from "react";
import { PATHS } from "../constants/paths";
import Topbar from "../pages/Home/components/Topbar";
import MainRoutes from "./MainRoutes";
import PostRoutes from "./PostRoutes";
import LoginRoutes from "./LoginRoutes";

const HomeRoutes = () => {
  const paths = useMemo(
    () =>
      Object.values(PATHS).filter(
        (p) => p !== PATHS.REGISTER
      ),
    []
  );

  return (
    <Switch>
      <Route
        exact
        path={paths}
        render={() => (
            <div>
                <div className="flex flex-grow">
                    {/* <div className="hidden sm:block sm:w-1/6 h-screen overflow-hidden bg-brown-light w-screen">
                    </div> */}

                    <div className="h-screen w-screen flex flex-col">
                    <Topbar />
                    <div className="bg-gray-light h-full overflow-auto">
                        {/* <MenuRoutes /> */}
                        <MainRoutes />
                        <PostRoutes />
                        <LoginRoutes />
                    </div>
                    </div>
                </div>
                <div className="w-screen bg-purple text-white text-center absolute bottom-0">
                    <p className="p-3 uppercase">
                    React Assignment
                    </p>
                </div>
            </div>
        )}
      ></Route>
    </Switch>
  );
};

export default React.memo(HomeRoutes);
