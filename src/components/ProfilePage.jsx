import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PropTypes from "prop-types";
import AppContext from "./utils/appContext";
import Post from "./Post";
import FriendsList from "./FriendsList";

import("../stylesheets/profilePage.css");

const About = ({ bio, userId }) => {
  const { openBioModal } = useContext(AppContext);

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <section className="profileAbout">
      {bio === undefined ? (
        <div className="emptyBioIndicator">No Bio</div>
      ) : (
        <p>{bio}</p>
      )}
      {user.id === userId && (
        <button type="button" className="bioOpenBtn" onClick={openBioModal}>
          Edit bio
        </button>
      )}
    </section>
  );
};

const ProfileHomePosts = ({ id }) => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState();

  // Fetch user posts on component mount
  useEffect(() => {
    fetch(`http://localhost:3000/profile/${id}/posts`, {
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
  }, [id]);

  return (
    <div className="profileHomePosts">
      <div>
        <img src="" alt="" />
        <button type="button" className="homeCreateBtn">
          `What&apos;s on your mind?`
        </button>
      </div>
      <div className="postsContainer">
        {loading === false && posts.length > 0
          ? posts.map((userPost, index) => {
              return <Post data={userPost} key={index} />;
            })
          : loading === false && (
              <div className="emptyPostsIndicator">No posts</div>
            )}
      </div>
    </div>
  );
};

const ProfileHomeFriends = ({ id }) => {
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState();

  // Fetch user friends on component mount
  useEffect(() => {
    fetch(`http://localhost:3000/profile/${id}/friends`, {
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
        setFriends(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className="profileHomeFriends">
      <div className="profileHomeFriendsWrapper">
        <header>
          <div>
            <h3>Friends</h3>
            {loading === false && (
              <p>{`${friends.length} ${
                friends.length === 1 ? "friend" : "friends"
              }`}</p>
            )}
          </div>
          <Link to={`/profile/${id}/friends`}>See all friends</Link>
        </header>
        <div className="profileHomeFriendsList">
          {loading === false && friends.length > 0
            ? friends.map((friend, index) => {
                return (
                  <div key={index} className="friend">
                    <img src="" alt="" />
                    <p>{`${friend.firstName} ${friend.lastName}`}</p>
                  </div>
                );
              })
            : loading === false && (
                <div className="emptyFriendsIndicator">No friends</div>
              )}
        </div>
      </div>
    </div>
  );
};

const Profile = () => {
  const [userLoading, setUserLoading] = useState(true);
  const [user, setUser] = useState();
  const [profileImage, setProfileImage] = useState("");
  const { openPhotoModal } = useContext(AppContext);
  const { id, name } = useParams();

  let base64String = "";

  // Fetch user details on component mount
  useEffect(() => {
    fetch(`http://localhost:3000/profile/${id}`, {
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
        const arrayBuffer = data.profilePicture.data;
        const base64String = btoa(
          String.fromCharCode(...new Uint8Array(arrayBuffer))
        );

        setUserLoading(false);
        setUser(data);
        setProfileImage(base64String);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const userToken = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="profilePage">
      {userLoading === false && (
        <>
          <header className="profilePageHeader">
            <div className="profileHeaderOne">
              <div className="profilePhotWrapper">
                <img src={`data:image/png;base64,${profileImage}`} alt="" />
                {userToken.id === user._id && (
                  <button
                    type="button"
                    className="changePhotoBtn"
                    onClick={openPhotoModal}
                  >
                    change
                  </button>
                )}
              </div>
              <div className="profileNameWrapper">
                <h2>{`${user.firstName} ${user.lastName}`}</h2>
                <p>{`${user.friends.length} ${
                  user.friends.length === 1 ? "friend" : "friends"
                }`}</p>
              </div>
            </div>
            <nav>
              <Link to={`/profile/${id}`}>Posts</Link>
              <Link to={`/profile/${id}/about`}>About</Link>
              <Link to={`/profile/${id}/friends`}>Friends</Link>
            </nav>
          </header>
          <div className="profileMain">
            {name === "about" ? (
              <About bio={user.bio} userId={user._id} />
            ) : name === "friends" ? (
              <FriendsList id={id} />
            ) : (
              <section className="profileHome">
                <ProfileHomeFriends id={id} />
                <ProfileHomePosts id={id} />
              </section>
            )}
          </div>
        </>
      )}
    </div>
  );
};

ProfileHomePosts.propTypes = {
  id: PropTypes.string,
};

ProfileHomeFriends.propTypes = {
  id: PropTypes.string,
};

About.propTypes = {
  bio: PropTypes.string,
  userId: PropTypes.string,
};

export default Profile;
