import { Link, useNavigate } from "react-router-dom";

import "../stylesheets/header.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <header className="appHeader">
      <h2>Odinbook</h2>
      <nav className="headerNavOne">
        <Link to={"/"}>Home</Link>
      </nav>
      <nav className="headerNavTwo">
        <Link to={"/profile"}>
          <img src="" alt="account" />
        </Link>
        <a href="" onClick={handleLogoutClick}>
          Log out
        </a>
      </nav>
    </header>
  );
};

export default Header;
