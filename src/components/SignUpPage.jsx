const SignUp = () => {
  return (
    <div className="signUpPage">
      <h2>odinbook</h2>
      <div className="signUpWrapper">
        <form className="signUpForm">
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
          </div>
          <div className="SignUpFormGrp">
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
          <div className="SignUpFormGrp">
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
          <button type="submit" className="signUpBtn">
            Sign Up
          </button>
          <a href="">Already have an account?</a>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
