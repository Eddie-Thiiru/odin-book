import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "../stylesheets/header.css";

const Header = ({ toggleDropDown }) => {
  return (
    <header className="appHeader">
      <div className="siteBanner">
        <Link to={"/"}>Odinbook</Link>
      </div>
      <nav className="headerNavOne">
        <Link to={"/"}>Home</Link>
        <Link to={"/friends"}>Friends</Link>
      </nav>
      <div className="headerUserAccount" onClick={toggleDropDown}>
        <img src="" alt="" />
      </div>
    </header>
  );
};

Header.propTypes = {
  toggleDropDown: PropTypes.func,
};

export default Header;
