import { useState } from "react";
import PropTypes from "prop-types";
import "../stylesheets/post.css";

const CommentSection = ({
  loading,
  comments,
  handleCommentSubmit,
  commentError,
}) => {
  return (
    <div className="commentsSection">
      <div className="commentFormContainer">
        <img src="" alt="" />
        <form className="commentForm" onSubmit={handleCommentSubmit}>
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
        {commentError.hasError === true && (
          <span className="errorMsg">{commentError.msg}</span>
        )}
      </div>
      <div className="commentsContainer">
        {loading === true ? (
          <div>loading</div>
        ) : (
          comments.map((obj, index) => {
            return (
              <div className="comment" key={index}>
                <img src="" alt="" />
                <div className="commentUserWrapper">
                  <h4>{`${obj.author.firstName} ${obj.author.lastName}`}</h4>
                  <p>{obj.timestamp}</p>
                </div>
                <div className="commentContent">
                  <p>{obj.text}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

const PostFooter = ({ likes, postComments, postId }) => {
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [likesCount, setLikesCount] = useState(likes);
  const [comments, setComments] = useState(postComments);
  const [loading, setLoading] = useState(true);
  const [commentError, setCommentError] = useState({
    hasError: false,
    msg: "",
  });

  const openCommentsSection = () => {
    setCommentsOpen(true);
  };

  const fetchCommentsData = () => {
    fetch(`http://localhost:3000/post/${postId}/comments`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(response);
        }
        return response.json();
      })
      .then((data) => {
        setComments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Handle new comment submit
  const handleCommentSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const user = JSON.parse(localStorage.getItem("user"));
    let obj = { userId: user.id };

    formData.forEach((value, key) => {
      obj[key] = value;
    });

    // Add submitted comment to database
    fetch(`http://localhost:3000/post/${postId}/comment`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(obj),
    })
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(response);
        }
        return response.json();
      })
      .then((data) => {
        setComments(data);
      })
      .catch((err) => {
        err
          .json()
          .then((data) => {
            setCommentError({
              ...commentError,
              hasError: true,
              msg: data.errors,
            });
          })
          .catch((genericError) => {
            console.log(genericError);
          });
      });
  };

  return (
    <footer className="postFooter">
      <div className="postFooterOne">
        <div>
          <p>{`${likesCount} ${likesCount === 1 ? "like" : "likes"}`}</p>
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
            onClick={() => {
              openCommentsSection(), fetchCommentsData();
            }}
          >
            Comment
          </button>
        </div>
      </div>
      {commentsOpen === true && (
        <CommentSection
          loading={loading}
          comments={comments}
          handleCommentSubmit={handleCommentSubmit}
          commentError={commentError}
        />
      )}
    </footer>
  );
};

const Post = ({ data }) => {
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
      <PostFooter likes={likes} postComments={comments} postId={data._id} />
    </div>
  );
};

Post.propTypes = {
  data: PropTypes.object,
};

PostFooter.propTypes = {
  likes: PropTypes.number,
  postComments: PropTypes.array,
  postId: PropTypes.string,
};

CommentSection.propTypes = {
  loading: PropTypes.bool,
  comments: PropTypes.array,
  handleCommentSubmit: PropTypes.func,
  commentError: PropTypes.object,
};

export default Post;
