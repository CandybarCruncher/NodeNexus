import React from "react";
import Login from "../components/Login";
import { Outlet } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
    <div>
        Fixed 
    </div>
    <div>
      <Outlet />
    </div>
    </>
    
  );
};

export default LandingPage;
