import { useContext, useState } from "react";
import Modal from "react-modal";
import AppContext from "./utils/appContext";

import("../stylesheets/postModal.css");

const styles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const PostModal = () => {
  const [postError, setPostError] = useState({
    hasError: false,
    msg: "",
  });
  const { closeNewPostModal, postModalOpen, refreshPage } =
    useContext(AppContext);

  const handlePostSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const user = JSON.parse(localStorage.getItem("user"));
    let obj = { userId: user.id };

    formData.forEach((value, key) => {
      obj[key] = value;
    });

    fetch("http://localhost:3000/post", {
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
        console.log(data);
        refreshPage();
      })
      .catch((err) => {
        err
          .json()
          .then((data) => {
            console.log(data);
            setPostError({
              ...postError,
              hasError: true,
              msg: data.errors,
            });
          })
          .catch((genericError) => {
            console.log(genericError.statusText);
          });
      });
  };

  return (
    <Modal id="postModal" style={styles} isOpen={postModalOpen}>
      <header className="postModalHeaderOne">
        <h3>Create post</h3>
        <button
          className="closePostModalBtn"
          onClick={closeNewPostModal}
        ></button>
      </header>
      <header className="postModalHeaderTwo">
        <img src="" alt="" />
        <p>Example user</p>
      </header>
      <form className="postModalForm" onSubmit={handlePostSubmit}>
        <div className="postModalFormGrp">
          <label>
            <textarea
              id="postTextInput"
              name="text"
              placeholder="What's on your mind?"
              rows={6}
              required
            />
          </label>
          {postError.hasError === true && (
            <span className="errorMsg">{postError.msg}</span>
          )}
        </div>
        <div className="postModalFormGrp">
          <label>
            Add Photos
            <input
              type="file"
              id="postPhotoInput"
              name="postPhoto"
              accept="image/png, image/jpg"
            />
          </label>
        </div>
        <button type="submit" className="addPostBtn">
          Post
        </button>
      </form>
    </Modal>
  );
};

export default PostModal;
