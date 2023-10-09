import "../stylesheets/post.css";

const Comment = () => {
  return (
    <div className="createComment">
      <img src="" alt="" />
      <form className="commentForm">
        <label>
          <input
            type="textarea"
            className="commentInput"
            name="text"
            placeholder="Write a comment"
          />
        </label>
        <button type="submit">Add comment</button>
      </form>
    </div>
  );
};

const Post = () => {
  return (
    <div className="post">
      <header className="postHeader">
        <img src="" alt="" />
        <div className="postUserWrapper">
          <h4>Example name</h4>
          <p>Example date</p>
        </div>
        <button type="button" className="postMenuBtn">
          menu
        </button>
      </header>
      <div className="postContent">
        <p>example text</p>
        {/* if there is an image create image */}
      </div>
      <footer className="postFooter">
        <div>
          {/* if only 1 like display as "like" else likes */}
          <p>0 likes</p>
          {/* if only 1 comment display as "comment"  else "comments*/}
          <p>0 comments</p>
        </div>
        <div>
          <button type="button" className="likeBtn">
            Like
          </button>
          <button type="button" className="commentBtn">
            Comment
          </button>
        </div>
      </footer>
      {/* 
        When comment button clicked show comment form
        <Comment />
      */}
    </div>
  );
};

export default Post;
