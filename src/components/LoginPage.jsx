import { Link } from "react-router-dom";

import "../stylesheets/loginPage.css";

const Login = () => {
  return (
    <div className="loginPage">
      <h1>odinbook</h1>
      <div className="loginWrapper">
        <form className="loginForm">
          <div className="loginFormGrp">
            <label>
              <input
                id="emailInput"
                type="text"
                name="email"
                placeholder="Email address"
                required
              />
            </label>
          </div>
          <div className="loginFormGrp">
            <label>
              <input
                id="passwordInput"
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </label>
          </div>
          <button type="submit" className="loginBtn">
            Log in
          </button>
          <button type="button" className="loginFacebookBtn">
            Log in with Facebook
          </button>
        </form>
        <Link to={"/signup"}>Create New Account</Link>
      </div>
    </div>
  );
};

export default Login;
