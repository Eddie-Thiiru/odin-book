import Post from "./Post";

const Home = () => {
  return (
    <div className="homepage">
      <div className="homeSidebar">
        <div className="sidebarGrp">
          <img src="" alt="" />
          <p>Example user</p>
        </div>
        <div className="sidebarGrp">
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
