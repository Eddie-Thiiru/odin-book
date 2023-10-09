import { Link } from "react-router-dom";

import "../stylesheets/header.css";

const Header = () => {
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
      </nav>
    </header>
  );
};

export default Header;
