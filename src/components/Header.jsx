import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import homeImg from "../images/home.svg";
import groupImg from "../images/friends-group.svg";
import personImg from "../images/person.svg";
import "../stylesheets/header.css";

const Header = ({ toggleDropDown, profileImage }) => {
  return (
    <header className="appHeader">
      <div className="siteBanner">
        <Link to={"/"}>Odinbook</Link>
      </div>
      <nav className="headerNavOne">
        <Link to={"/"}>
          <img src={homeImg} alt="home" />
        </Link>
        <Link to={"/friends"}>
          <img src={groupImg} alt="friends" />
        </Link>
      </nav>
      <div className="headerUserAccount" onClick={toggleDropDown}>
        <div>
          {profileImage === "" ? (
            <img src={personImg} alt="account" />
          ) : (
            <img src={`data:image/png;base64,${profileImage}`} alt="" />
          )}
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  toggleDropDown: PropTypes.func,
  profileImage: PropTypes.string,
};

export default Header;
