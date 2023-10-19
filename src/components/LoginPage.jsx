import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../stylesheets/loginPage.css";

const Login = () => {
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    let object = {};

    formData.forEach((value, key) => {
      object[key] = value;
    });

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(object),
    })
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(response);
        }

        return response.json();
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        navigate("/");
      })
      .catch((err) => {
        setError(true);
        console.log(err.statusText);
      });
  };

  const handleDemoLogin = () => {
    fetch("http://localhost:3000/login/guest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(response);
        }

        return response.json();
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        navigate("/");
      })
      .catch((err) => {
        setError(true);
        console.log(err.statusText);
      });
  };

  return (
    <div className="loginPage">
      <h1>odinbook</h1>
      <div className="loginWrapper">
        <form className="loginForm" onSubmit={handleLoginSubmit}>
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
          {error === true && (
            <span className="errorMsg">Invalid email or password</span>
          )}
          <button type="submit" className="loginBtn">
            Log in
          </button>
          <button type="button" className="loginFacebookBtn">
            Log in with Facebook
          </button>
        </form>
        <button
          type="button"
          className="loginDemoBtn"
          onClick={handleDemoLogin}
        >
          Login as visitor
        </button>
        <Link to={"/signup"}>Create New Account</Link>
      </div>
    </div>
  );
};

export default Login;
