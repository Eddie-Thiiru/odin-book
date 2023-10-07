import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="appHeader">
      <h2>Odinbook</h2>
      <nav className="headerNav">
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>
          <img src="" alt="account" />
        </Link>
      </nav>
    </header>
  );
};

export default Header;
