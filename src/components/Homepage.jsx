import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "./utils/appContext";
import Post from "./Post";

import personImg from "../images/person.svg";
import groupColorImg from "../images/friends-group-color.svg";
import "../stylesheets/homepage.css";

const Home = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const { openNewPostModal, profileImage } = useContext(AppContext);
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

  const user = JSON.parse(localStorage.getItem("user"));

  const handleNavigation = (path) => {
    if (path === "friends") {
      navigate(`/${path}`);
    } else {
      navigate(`/profile/${user.id}`);
    }
  };

  return (
    <div className="homepage">
      <>
        <div className="homeSidebar">
          <div
            className="sidebarGrp"
            onClick={() => handleNavigation("profile")}
          >
            {profileImage === "" ? (
              <img src={personImg} alt="" />
            ) : (
              <img src={`data:image/png;base64,${profileImage}`} alt="" />
            )}
            <p>{`${user.firstName} ${user.lastName}`}</p>
          </div>
          <div
            className="sidebarGrp"
            onClick={() => handleNavigation("friends")}
          >
            <img src={groupColorImg} alt="" />
            <p>Friends</p>
          </div>
        </div>
        <div className="homepageMain">
          <div className="homepageHeader">
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
