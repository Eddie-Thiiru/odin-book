import { useContext, useRef, useState } from "react";
import Modal from "react-modal";
import AppContext from "./utils/appContext";

import { GrAdd } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";

import("../stylesheets/photoModal.css");

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

const PhotoModal = () => {
  const [error, setError] = useState({ hasError: false, msg: "" });
  const [photo, setPhoto] = useState({
    error: false,
    msg: "",
    src: "",
  });
  const { closePhotoModal, photoModalOpen } = useContext(AppContext);
  const fileInput = useRef();

  const reload = () => {
    window.location.reload();
  };

  const handlePhotoSubmit = (e) => {
    e.preventDefault();

    if (photo.src === "") {
      return;
    }

    const formData = new FormData();

    /* 
      Access data using ref hook because a file input type is 
      an uncontrolled component and accessing the data using event
      would not work. Then append the data to the new formData instance.
    */
    formData.append("file", fileInput.current.files[0]);

    const user = JSON.parse(localStorage.getItem("user"));

    fetch(`http://localhost:3000/profile/${user.id}/photo`, {
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
        reload();
      })
      .catch((err) => {
        err
          .json()
          .then((data) => {
            setError({ ...error, hasError: true, msg: data.errors });
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
      // reset state when phot unselected
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
    <Modal id="photoModal" style={styles} isOpen={photoModalOpen}>
      <header className="photoModalHeader">
        <h3>Choose profile picture</h3>
        <button className="closePhotoModalBtn" onClick={closePhotoModal}>
          <RxCross2 />
        </button>
      </header>
      <form
        className="photoModalForm"
        onChange={updateImageDisplay}
        onSubmit={handlePhotoSubmit}
      >
        <div className="photoModalFormGrp">
          <label className="fileInputLabel">
            <p>
              <GrAdd />
              Upload Photo
            </p>
            <input
              ref={fileInput}
              type="file"
              id="profilePhotoInput"
              name="profilePhoto"
              accept="image/png, image/jpeg"
              hidden
            />
          </label>
          {error.hasError === true && (
            <span className="errorMsg">{error.msg}</span>
          )}
          {photo.error === true && (
            <span className="fileErrorMsg">{photo.msg}</span>
          )}
        </div>
        <div className="photoModalFormGrp">
          <img src={photo.src} alt="" />
        </div>
        <button type="submit" className="addProfilePhotoBtn">
          Save
        </button>
      </form>
    </Modal>
  );
};

export default PhotoModal;
