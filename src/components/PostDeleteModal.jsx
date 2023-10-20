import { useContext } from "react";
import Modal from "react-modal";
import AppContext from "./utils/appContext";

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

const PostDeleteModal = () => {
  const { closeDeleteModal, deleteModalOpen } = useContext(AppContext);

  const reload = () => {
    window.location.reload();
  };

  const handlePostDelete = () => {
    fetch(`http://localhost:3000/post/${deleteModalOpen.postId}`, {
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
        reload();
      })
      .catch((err) => {
        console.log(err.statusText);
      });
  };

  return (
    <Modal id="postDeleteModal" style={styles} isOpen={deleteModalOpen.active}>
      <header className="deleteModalHeader">
        <h3>Delete Post</h3>
      </header>
      <p>
        Are you sure you want to delete this post? Once a post is deleted, it
        cannot be recovered!
      </p>
      <div>
        <button
          type="button"
          className="closeDeletePostBtn"
          onClick={closeDeleteModal}
        >
          Cancel
        </button>
        <button
          type="button"
          className="confirmDeletePostBtn"
          onClick={handlePostDelete}
        >
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default PostDeleteModal;
