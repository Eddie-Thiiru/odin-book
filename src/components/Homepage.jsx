import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import Post from "./Post";

import "../stylesheets/homepage.css";

const Home = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const { openNewPostModal } = useContext(AppContext);
  const navigate = useNavigate();

  // Fetch all posts on component mount
  useEffect(() => {
    fetch("http://localhost:3000/post", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(response);
        }

        return response.json();
      })
      .then((data) => {
        setLoading(false);
        setPosts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleNavigation = (path) => {
    navigate(`/${path}`);
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="homepage">
      <>
        <div className="homeSidebar">
          <div
            className="sidebarGrp"
            onClick={() => handleNavigation("profile")}
          >
            <img src="" alt="" />
            <p>{`${user.firstName} ${user.lastName}`}</p>
          </div>
          <div
            className="sidebarGrp"
            onClick={() => handleNavigation("friends")}
          >
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
            {loading === false &&
              posts.map((obj, index) => {
                return <Post data={obj} key={index} />;
              })}
          </div>
        </div>
      </>
    </div>
  );
};

export default Home;
