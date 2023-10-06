const PostModal = () => {
  return (
    <dialog className="createPostModal">
      <h3>Create post</h3>
      <header className="postModalHeader">
        <img src="" alt="" />
        <p>Example user</p>
      </header>
      <form method="dialog">
        <div className="postDialogFormGrp">
          <label>
            <input
              id="postTextInput"
              name="text"
              placeholder="What's on your mind?"
              required
            />
          </label>
        </div>
        <div className="postDialogFormGrp">
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
    </dialog>
  );
};

export default PostModal;
