//@ts-ignore
import { BrowserRouter } from "react-router-dom";
import React from "react";
// import LoginRoutes from "./LoginRoutes";
// import RegisterRoutes from "./RegisterRoutes";
// import AdminRoutes from "./AdminRoutes";
// import NotFoundRoutes from  "./NotFoundRoutes";
import HomeRoutes from "./HomeRoutes";

const Routes = () => {

  const role = localStorage.getItem("role");

  return (
    <BrowserRouter>
    
      {/* {role === "Admin" &&
      (
        <HomeRoutes />
      )} */}
        {/* <LoginRoutes />
        <RegisterRoutes /> */}
        <HomeRoutes />
        {/*<AdminRoutes /> */}
        {/* <NotFoundRoutes /> */}
    </BrowserRouter>
  );
};

export default React.memo(Routes);