const Login = () => {
  return (
    <div className="loginPage">
      <h2>odinbook</h2>
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
          <button className="loginBtn">Log in</button>
          <button className="loginFacebookBtn">Log in with Facebook</button>
        </form>
        <button className="loginCreateAccBtn">Create New Account</button>
      </div>
    </div>
  );
};

export default Login;
