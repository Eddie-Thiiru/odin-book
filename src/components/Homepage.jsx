import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PostContext } from "../App";
import Post from "./Post";

import "../stylesheets/homepage.css";

const Home = () => {
  const { openNewPostModal } = useContext(PostContext);

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
      <div className="homepageMain">
        <div className="homepageHeader">
          <img src="" alt="" />
          <button
            type="button"
            className="homeCreateBtn"
            onClick={openNewPostModal}
          >
            `What&apos;s on your mind?`
          </button>
        </div>
        <div className="postsContainer">
          <Post />
        </div>
      </div>
    </div>
  );
};

export default Home;
