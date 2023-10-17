import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PropTypes from "prop-types";
import Post from "./Post";

import("../stylesheets/profilePage.css");

const Friends = ({ id }) => {
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
    <section className="profileFriends">
      <h3>All friends</h3>
      <div className="friendsContainer">
        {loading === false && friends.length > 0
          ? friends.map((friend, index) => {
              return (
                <div key={index} className="friend">
                  <img src="" alt="" />
                  <p>{`${friend.firstName} ${friend.lastName}`}</p>
                  <button type="button" className="removeFriendBtn">
                    Unfriend
                  </button>
                </div>
              );
            })
          : loading === false && (
              <div className="emptyFriendsIndicator">No friends</div>
            )}
      </div>
    </section>
  );
};

const About = ({ bio }) => {
  return (
    <section className="profileAbout">
      {bio === undefined ? (
        <div className="emptyBioIndicator">No Bio</div>
      ) : (
        <p>{bio}</p>
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

  const { id, name } = useParams();

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
        setUserLoading(false);
        setUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className="profilePage">
      {userLoading === false && (
        <>
          <header className="profilePageHeader">
            <div className="profileHeaderOne">
              <div className="profilePhotWrapper">
                <img src="" alt="" />
                <button type="button" className="changePhotoBtn">
                  change
                </button>
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
              <About bio={user.bio} />
            ) : name === "friends" ? (
              <Friends id={id} />
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

Friends.propTypes = {
  id: PropTypes.string,
};

ProfileHomePosts.propTypes = {
  id: PropTypes.string,
};

ProfileHomeFriends.propTypes = {
  id: PropTypes.string,
};

About.propTypes = {
  bio: PropTypes.string,
};

export default Profile;
