import React from "react";
import "../CSS/landingPage.css"

const Landing = () => {
  return (
    <>
      <div className="border-solid border-2 rounded-3xl col-4 offset-4" >
        <form action="/" method="POST">
          <div className="m-8">
            <div className="mb-4">
              <input name="username" type="text" className="form-control rounded-xl" placeholder="email@domain.com"required></input>
            </div>
            <div className="mb-4">
              <button className="btn bg-[#45a29e] rounded-full size-full">Proceed</button>
            </div>
          </div>
          <div className="grid justify-items-center mb-3">
            <p>By clicking proceed, you agree to our <a href="">Terms of service</a> and <a href="">Privacy Policy</a></p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Landing;
