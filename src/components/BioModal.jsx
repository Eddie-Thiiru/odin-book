import { useContext, useState } from "react";
import Modal from "react-modal";
import AppContext from "./utils/appContext";

import("../stylesheets/bioModal.css");

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

const BioModal = () => {
  const [error, setError] = useState({ hasError: false, msg: "" });
  const { closeBioModal, bioModalOpen } = useContext(AppContext);

  const reload = () => {
    window.location.reload();
  };

  const handleBioSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const user = JSON.parse(localStorage.getItem("user"));
    let obj = {};

    formData.forEach((value, key) => {
      obj[key] = value;
    });

    fetch(`http://localhost:3000/profile/${user.id}/bio`, {
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
        reload();
      })
      .catch((err) => {
        err
          .json()
          .then((data) => {
            setError({
              ...error,
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
    <Modal id="bioModal" style={styles} isOpen={bioModalOpen}>
      <header className="bioModalHeader">
        <h3>Bio</h3>
      </header>
      <form className="bioModalForm" onSubmit={handleBioSubmit}>
        <div className="bioModalFormGrp">
          <label>
            <textarea
              id="bioTextInput"
              name="text"
              placeholder="Describe who you are"
              rows={5}
              required
            />
          </label>
          {error.hasError === true && (
            <span className="errorMsg">{error.msg}</span>
          )}
        </div>
        <div className="bioModalFormGrp">
          <button
            type="button"
            className="closeBioModalBtn"
            onClick={closeBioModal}
          >
            Cancel
          </button>
          <button type="submit" className="addBioBtn">
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default BioModal;
