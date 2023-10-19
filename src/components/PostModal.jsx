import { useContext, useRef, useState } from "react";
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
  const [textError, setTextError] = useState({
    hasError: false,
    msg: "",
  });
  const [photo, setPhoto] = useState({
    error: false,
    msg: "",
    src: "",
  });
  const { closeNewPostModal, postModalOpen, refreshPage } =
    useContext(AppContext);
  const fileInput = useRef();

  const handlePostSubmit = (e) => {
    e.preventDefault();

    if (photo.src === "") {
      return;
    }

    const formData = new FormData(e.target);
    const user = JSON.parse(localStorage.getItem("user"));

    formData.append("userId", user.id);
    formData.append("file", fileInput.current.files[0]);

    fetch("http://localhost:3000/post", {
      method: "POST",
      body: formData,
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
        err
          .json()
          .then((data) => {
            setTextError({
              ...textError,
              hasError: true,
              msg: data.errors,
            });
          })
          .catch((genericError) => {
            console.log(genericError.statusText);
          });
      });
  };

  const validFileType = (file) => {
    const fileTypes = ["image/jpeg", "image/png"];

    return fileTypes.includes(file.type);
  };

  const updateImageDisplay = (e) => {
    const input = e.target;
    const curFiles = input.files;

    if (curFiles.length === 0) {
      // reset state when photo unselected
      setPhoto({ error: false, msg: "", src: "" });
    } else {
      for (const file of curFiles) {
        // Check if file is valid
        if (validFileType(file)) {
          // Display error when file exceeds limit
          if (file.size > 1000000) {
            setPhoto({
              error: true,
              msg: "Photo should not exceed 1 MB",
              src: "",
            });
          } else {
            // Display image when file is within limit
            setPhoto({ error: false, msg: "", src: URL.createObjectURL(file) });
          }
        } else {
          setPhoto({
            error: true,
            msg: "Not a valid file type (PNG or JPEG)",
            src: "",
          });
        }
      }
    }
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
              maxLength={3000}
              required
            />
          </label>
          {textError.hasError === true && (
            <span className="errorMsg">{textError.msg}</span>
          )}
        </div>
        <div className="postModalFormGrp">
          <label>
            Add Photos
            <input
              ref={fileInput}
              type="file"
              id="postPhotoInput"
              name="postPhoto"
              accept="image/png, image/jpeg"
              onChange={updateImageDisplay}
            />
          </label>
          {photo.error === true && (
            <span className="fileErrorMsg">{photo.msg}</span>
          )}
        </div>
        <div className="postModalFormGrp">
          <img src={photo.src} alt="" />
        </div>
        <button type="submit" className="addPostBtn">
          Post
        </button>
      </form>
    </Modal>
  );
};

export default PostModal;
