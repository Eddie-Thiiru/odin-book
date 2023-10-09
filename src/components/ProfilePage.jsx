import { useParams, Link } from "react-router-dom";
import Post from "./Post";

import("../stylesheets/profilePage.css");

const ProfileHome = () => {
  return (
    <section className="profileHome">
      <div className="profileHomeOne">
        <div className="profileHomeFriendsWrapper">
          <header>
            <div>
              <h3>Friends</h3>
              <p>400 friends</p>
            </div>
            <Link to={"/profile/friends"}>See all friends</Link>
          </header>
          <div className="profileHomeFriendsList">
            <div className="friend">
              <img src="" alt="" />
              <p>example suggest</p>
            </div>
          </div>
        </div>
      </div>
      <div className="profileHomeTwo">
        <div>
          <img src="" alt="" />
          <button type="button" className="homeCreateBtn">
            `What&apos;s on your mind?`
          </button>
        </div>
        <div className="postsContainer">
          <Post />
          <Post />
          <Post />
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section className="profileAbout">
      <p>My name is? </p>
    </section>
  );
};

const Friends = () => {
  return (
    <section className="profileFriends">
      <h3>All friends</h3>
      <div className="friendsContainer">
        <div className="friend">
          <img src="" alt="" />
          <p>example suggest</p>
          <button type="button" className="removeFriendBtn">
            Unfriend
          </button>
        </div>
        <div className="friend">
          <img src="" alt="" />
          <p>example suggest</p>
          <button type="button" className="removeFriendBtn">
            Unfriend
          </button>
        </div>
        <div className="friend">
          <img src="" alt="" />
          <p>example suggest</p>
          <button type="button" className="removeFriendBtn">
            Unfriend
          </button>
        </div>
        <div className="friend">
          <img src="" alt="" />
          <p>example suggest</p>
          <button type="button" className="removeFriendBtn">
            Unfriend
          </button>
        </div>
        <div className="friend">
          <img src="" alt="" />
          <p>example suggest</p>
          <button type="button" className="removeFriendBtn">
            Unfriend
          </button>
        </div>
        <div className="friend">
          <img src="" alt="" />
          <p>example suggest</p>
          <button type="button" className="removeFriendBtn">
            Unfriend
          </button>
        </div>
        <div className="friend">
          <img src="" alt="" />
          <p>example suggest</p>
          <button type="button" className="removeFriendBtn">
            Unfriend
          </button>
        </div>
        <div className="friend">
          <img src="" alt="" />
          <p>example suggest</p>
          <button type="button" className="removeFriendBtn">
            Unfriend
          </button>
        </div>
      </div>
    </section>
  );
};

const Profile = () => {
  const { name } = useParams();

  return (
    <div className="profilePage">
      <header className="profilePageHeader">
        <div className="profileHeaderOne">
          <div className="profilePhotWrapper">
            <img src="" alt="" />
            <button type="button" className="changePhotoBtn">
              change
            </button>
          </div>
          <div className="profileNameWrapper">
            <h2>Example User</h2>
            <p>0 friends</p>
          </div>
        </div>
        <nav>
          <Link to={"/profile"}>Posts</Link>
          <Link to={"/profile/about"}>About</Link>
          <Link to={"/profile/friends"}>Friends</Link>
        </nav>
      </header>
      <div className="profileMain">
        {name === "about" ? (
          <About />
        ) : name === "friends" ? (
          <Friends />
        ) : (
          <ProfileHome />
        )}
      </div>
    </div>
  );
};

export default Profile;
