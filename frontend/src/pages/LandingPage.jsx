import React from "react";
import { Outlet } from "react-router-dom";
import '../CSS/landingPage.css';

const LandingPage = () => {
  return (
    <>
      <div className="form-box">
        <Outlet />
      </div>
    </>
  );
};

export default LandingPage;
