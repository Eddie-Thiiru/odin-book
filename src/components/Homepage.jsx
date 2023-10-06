import Post from "./Post";

const Home = () => {
  return (
    <div className="homepage">
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
