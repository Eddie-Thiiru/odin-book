import { useState } from "react";
import "../stylesheets/post.css";

const Comment = () => {
  return (
    <div className="comment">
      <img src="" alt="" />
      <div className="commentUserWrapper">
        <h4>Example name</h4>
        <p>Example comment</p>
      </div>
    </div>
  );
};

const CommentSection = () => {
  return (
    <div className="commentsSection">
      <div className="commentFormContainer">
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
          <button type="submit" className="submitCommentBtn">
            Add
          </button>
        </form>
      </div>
      <div className="commentsContainer">
        <Comment />
      </div>
    </div>
  );
};

const Post = () => {
  const [commentsOpen, setCommentsOpen] = useState(false);

  const openCommentsSection = () => {
    setCommentsOpen(true);
  };

  // const closeCommentsSection = () => {
  //   setCommentsOpen(false);
  // };

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
        <div className="postFooterOne">
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
            <button
              type="button"
              className="commentBtn"
              onClick={openCommentsSection}
            >
              Comment
            </button>
          </div>
        </div>
        {commentsOpen === true && <CommentSection />}
      </footer>
    </div>
  );
};

export default Post;
