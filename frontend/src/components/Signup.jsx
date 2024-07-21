import React from "react";

const Signup = () => {
  return (
    <>
    <div className="border-solid border-2 rounded-3xl col-4 offset-4" >
      <form action="signup" method="POST">
        <div className="m-8">
          <div className="mb-4">
            <input name="email" type="text" className="form-control rounded-xl" placeholder="email@domain.com" required></input>
          </div>
          <div className="flex mb-4">
            <input name="name" type="text" className="form-control rounded-xl" placeholder="Name"required></input>
            <input name="surname" type="text" className="form-control rounded-xl" placeholder="Surname"required></input>
          </div>
          <div className="mb-4">
            <input name="username" type="text" className="form-control rounded-xl" placeholder="Username"required></input>
          </div>
          <div className="mb-4">
            <input name="password" type="password" className="form-control rounded-xl" placeholder="Password"required></input>
          </div>
          <label>Gender</label>
          <div className="flex mb-4">
            <div class="form-check mr-3">
              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="male" value="male"></input>
              <label class="form-check-label" for="male">Male</label>
            </div>
            <div class="form-check mr-3">
              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="female" value="female"></input>
              <label class="form-check-label" for="female">Female</label>
            </div>
            <div class="form-check mr-3">
              <input class="form-check-input" type="radio" name="inlineRadioOptions" id="other" value="other"></input>
              <label class="form-check-label" for="other">Other</label>
            </div>
          </div>

          <div className="mb-4">
            <button className="btn bg-[#45a29e] rounded-full size-full">Commit</button>
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

export default Signup;
