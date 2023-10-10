import { useContext } from "react";
import Modal from "react-modal";
import { PostContext } from "../App";

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
  const { closeNewPostModal, postModalOpen } = useContext(PostContext);

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
      <form className="postModalForm">
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
