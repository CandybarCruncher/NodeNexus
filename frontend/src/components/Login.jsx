import React from "react";

const Login = () => {
  return (
    <>
    <div className="border-solid border-2 rounded-3xl col-4 offset-4" >
      <form action="login" method="POST">
        <div className="m-8">
          <div className="mt-8">
            <input name="username" type="text" className="form-control rounded-xl" placeholder="Password"required></input>
          </div>
          <div className="flex flex-row justify-between">
            <div>
              <input type="checkbox" id="remember"></input>
              <label for="remember" className="ml-2">Remember me</label>
            </div>
            <div>
              <a href="">forgot your Password?</a>
            </div>
          </div>
          <div className="mt-4">
            <button className="btn bg-[#45a29e] rounded-full size-full">Plug-in</button>
          </div>
        </div>
      </form>
    </div>
    </>
  );
};

export default Login;
