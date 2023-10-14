import { useNavigate } from "react-router-dom";
import "../stylesheets/signUpPage.css";
import { useState } from "react";

const SignUp = () => {
  const [fieldError, setFieldError] = useState({
    firstName: { hasError: false, msg: "" },
    lastName: { hasError: false, msg: "" },
    email: { hasError: false, msg: "" },
    password: { hasError: false, msg: "" },
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    let obj = {};

    formData.forEach((value, key) => {
      obj[key] = value;
    });

    fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(obj),
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
        err
          .json()
          .then((data) => {
            data.errors.forEach((error) => {
              setFieldError((prev) => {
                return {
                  ...prev,
                  [error.path]: { hasError: true, msg: error.msg },
                };
              });
            });
          })
          .catch((genericError) => {
            console.log(genericError);
          });
      });
  };

  const { firstName, lastName, email, password } = fieldError;

  return (
    <div className="signUpPage">
      <h1>odinbook</h1>
      <div className="signUpWrapper">
        <h2>Create a new account</h2>
        <form className="signUpForm" onSubmit={handleSubmit}>
          <div className="signUpFormGrp">
            <label>
              <input
                id="firstNameInput"
                type="text"
                name="firstName"
                placeholder="First name"
                required
              />
            </label>
            <label>
              <input
                id="lastNameInput"
                type="text"
                name="lastName"
                placeholder="Last name"
                required
              />
            </label>
            {firstName.hasError === true && (
              <span className="errorMsg">{firstName.msg}</span>
            )}
            {lastName.hasError === true && (
              <span className="errorMsg">{lastName.msg}</span>
            )}
          </div>
          <div className="signUpFormGrp">
            <label>
              <input
                id="emailInput"
                type="text"
                name="email"
                placeholder="Email address"
                required
              />
            </label>
            {email.hasError === true && (
              <span className="errorMsg">{email.msg}</span>
            )}
          </div>
          <div className="signUpFormGrp">
            <label>
              <input
                id="passwordInput"
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </label>
            {password.hasError === true && (
              <span className="errorMsg">{password.msg}</span>
            )}
          </div>
          <button type="submit" className="signUpBtn">
            Sign Up
          </button>
          <a href="/login">Already have an account?</a>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
