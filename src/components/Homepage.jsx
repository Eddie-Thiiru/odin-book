import { useNavigate } from "react-router-dom";
import Post from "./Post";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(`/${path}`);
  };

  return (
    <div className="homepage">
      <div className="homeSidebar">
        <div className="sidebarGrp" onClick={() => handleNavigation("profile")}>
          <img src="" alt="" />
          <p>Example user</p>
        </div>
        <div className="sidebarGrp" onClick={() => handleNavigation("friends")}>
          <img src="" alt="" />
          <p>Friends</p>
        </div>
      </div>
      <div className="homepageHeader">
        <img src="" alt="" />
        <button type="button" className="homeCreateBtn">
          `What&apos;s on your mind?`
        </button>
      </div>
      <div className="postsContainer">
        <Post />
      </div>
    </div>
  );
};

export default Home;
