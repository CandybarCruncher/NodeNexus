import React from "react";
import "../CSS/homePage.css";

const NavBar = () => {
  return (
    <>
    <div className="sticky-nav">
        <div className="nav-option">
            <div className="p-3">
                Home
            </div>
            <div className="p-3">
                <form class="d-flex">
                    <input class="form-control me-2 rounded-full" type="search" placeholder="Search" aria-label="Search"></input>
                    <button class="btn bg-[#45a29e] rounded-full" type="submit">Search</button>
                </form>
            </div>
        </div>
        <div className="nav-option">
            <div className="p-3">
                Noti
            </div>
            <div className="p-3">
                Profile
            </div>
        </div>
    </div>
    </>
  );
};

export default NavBar;
