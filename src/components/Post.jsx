import { useState } from "react";
import PropTypes from "prop-types";
import "../stylesheets/post.css";

const Comment = ({ data }) => {
  return (
    <div className="comment">
      <img src="" alt="" />
      <div className="commentUserWrapper">
        <h4>{`${data.author.firstName} ${data.author.lastName}`}</h4>
        <p>{data.timestamp}</p>
      </div>
      <div className="commentContent">
        <p>{data.text}</p>
      </div>
    </div>
  );
};

const CommentSection = ({ comments }) => {
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
        {comments.map((obj, index) => {
          return <Comment key={index} data={obj} />;
        })}
      </div>
    </div>
  );
};

const Post = ({ data }) => {
  const [commentsOpen, setCommentsOpen] = useState(false);

  const openCommentsSection = () => {
    setCommentsOpen(true);
  };

  const { author, text, comments, likes, timestamp } = data;

  return (
    <div className="post">
      <header className="postHeader">
        <img src="" alt="" />
        <div className="postUserWrapper">
          <h4>{`${author.firstName} ${author.lastName}`}</h4>
          <p>{timestamp}</p>
        </div>
        <button type="button" className="postMenuBtn">
          menu
        </button>
      </header>
      <div className="postContent">
        <p>{text}</p>
        {/* if there is an image create image */}
      </div>
      <footer className="postFooter">
        <div className="postFooterOne">
          <div>
            <p>{`${likes} ${likes === 1 ? "like" : "likes"}`}</p>
            <p>{`${comments.length} ${
              comments.length === 1 ? "comment" : "comments"
            }`}</p>
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
        {commentsOpen === true && <CommentSection comments={comments} />}
      </footer>
    </div>
  );
};

Post.propTypes = {
  data: PropTypes.object,
};

CommentSection.propTypes = {
  comments: PropTypes.array,
};

Comment.propTypes = {
  data: PropTypes.object,
};

export default Post;
