import { useContext, useState } from "react";
import PropTypes from "prop-types";
import AppContext from "./utils/appContext";
import "../stylesheets/post.css";

const user = JSON.parse(localStorage.getItem("user"));

const CommentSection = ({
  loading,
  comments,
  handleCommentSubmit,
  handleCommentDelete,
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
                  {obj.author._id === user.id && (
                    <a href="#" onClick={handleCommentDelete}>
                      delete
                    </a>
                  )}
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

const PostFooter = ({ postLikes, postComments, postId }) => {
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [likes, setLikes] = useState(postLikes);
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

  const handlePostLike = () => {
    const obj = { userId: user.id };

    if (likes.includes(user.id)) {
      // Remove user like from database
      fetch(`http://localhost:3000/post/${postId}/likes/${user.id}`, {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
      })
        .then((response) => {
          if (!response.ok) {
            return Promise.reject(response);
          }
          return response.json();
        })
        .then(() => {
          /* 
          If like is removed from the database, manually remove user id 
          from the likes array. 
        */
          setLikes(likes.filter((str) => str !== user.id));
        })
        .catch((err) => {
          console.log(err.statusText);
        });
    } else {
      // Add user like to database
      fetch(`http://localhost:3000/post/${postId}/likes`, {
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
        .then(() => {
          /* 
          If like is added to database, manually add user id to likes array. 
          This saves a few seconds since the api wil not filter parent post 
          to send back likes array
        */
          setLikes([...comments, user.id]);
        })
        .catch((err) => {
          console.log(err.statusText);
        });
    }
  };

  const handleCommentDelete = () => {
    // Remove user comment from database
    fetch(`http://localhost:3000/post/${postId}/comments/${user.id}`, {
      method: "DELETE",
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
      })
      .catch((err) => {
        console.log(err.statusText);
      });
  };

  // Handle new comment submit
  const handleCommentSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    let obj = { userId: user.id };

    formData.forEach((value, key) => {
      obj[key] = value;
    });

    // Add submitted comment to database
    fetch(`http://localhost:3000/post/${postId}/comments`, {
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
          <p>{`${likes.length} ${likes.length === 1 ? "like" : "likes"}`}</p>
          <p>{`${comments.length} ${
            comments.length === 1 ? "comment" : "comments"
          }`}</p>
        </div>
        <div>
          <button type="button" className="likeBtn" onClick={handlePostLike}>
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
          handleCommentDelete={handleCommentDelete}
          commentError={commentError}
        />
      )}
    </footer>
  );
};

const Post = ({ data }) => {
  const [menu, setMenu] = useState(false);
  const { refreshPage } = useContext(AppContext);

  const toggleMenu = () => {
    setMenu(!menu);
  };

  const handlePostDelete = () => {
    fetch(`http://localhost:3000/post/${data._id}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(response);
        }
        return response.json();
      })
      .then(() => {
        refreshPage();
      })
      .catch((err) => {
        console.log(err.statusText);
      });
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
        {user.id === author._id && (
          <button type="button" className="postMenuBtn" onClick={toggleMenu}>
            menu
          </button>
        )}
      </header>
      {menu === true && (
        <div className="menuDropDowncontainer">
          <button
            type="button"
            className="deletePostBtn"
            onClick={handlePostDelete}
          >
            Delete Post
          </button>
        </div>
      )}
      <div className="postContent">
        <p>{text}</p>
        {/* if there is an image create image */}
      </div>
      <PostFooter postLikes={likes} postComments={comments} postId={data._id} />
    </div>
  );
};

Post.propTypes = {
  data: PropTypes.object,
};

PostFooter.propTypes = {
  postLikes: PropTypes.array,
  postComments: PropTypes.array,
  postId: PropTypes.string,
};

CommentSection.propTypes = {
  loading: PropTypes.bool,
  comments: PropTypes.array,
  handleCommentSubmit: PropTypes.func,
  handleCommentDelete: PropTypes.func,
  commentError: PropTypes.object,
};

export default Post;
