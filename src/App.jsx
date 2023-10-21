import { useEffect, useState } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import AppContext from "./components/utils/appContext";
import Header from "./components/Header";
import PostModal from "./components/PostModal";
import BioModal from "./components/BioModal";
import PhotoModal from "./components/PhotoModal";
import PostDeleteModal from "./components/PostDeleteModal";

import personImg from "./images/person.svg";
import logoutImg from "./images/logout.svg";
import "./stylesheets/App.css";

let profileImage = "";

const App = () => {
  const [loginStatus, setLoginStatus] = useState(false);
  const [headerDropDown, setHeaderDropDown] = useState(false);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [bioModalOpen, setBioModalOpen] = useState(false);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState({
    active: false,
    postId: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      return navigate("/login");
    }

    fetch("http://localhost:3000/isUserAuth", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(response);
        }

        return response.json();
      })
      .then((data) => {
        if (data.message === "Authenticated") {
          setLoginStatus(true);
        } else {
          // Delete local token and user
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          setLoginStatus(false);
          navigate("/login");
        }
      })
      .catch((err) => {
        err
          .json()
          .then((err) => {
            if (err.message === "jwt expired") {
              // Delete local token and user
              localStorage.removeItem("token");
              localStorage.removeItem("user");

              setLoginStatus(false);
              navigate("/login");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
  }, []);

  const openNewPostModal = () => {
    setPostModalOpen(true);
  };

  const closeNewPostModal = () => {
    setPostModalOpen(false);
  };

  const openBioModal = () => {
    setBioModalOpen(true);
  };

  const closeBioModal = () => {
    setBioModalOpen(false);
  };

  const openPhotoModal = () => {
    setPhotoModalOpen(true);
  };

  const closePhotoModal = () => {
    setPhotoModalOpen(false);
  };

  const openDeleteModal = (postId) => {
    setDeleteModalOpen({ active: true, postId: postId });
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const toggleAccountDropDown = () => {
    setHeaderDropDown(!headerDropDown);
  };

  const closeAccountDropDown = () => {
    if (headerDropDown === true) {
      setHeaderDropDown(false);
    } else {
      return;
    }
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;

    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }

    profileImage = window.btoa(binary);
  };

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    if (user.profilePicture !== undefined) {
      arrayBufferToBase64(user.profilePicture.data);
    }
  }

  return (
    <div className="App" onClick={closeAccountDropDown}>
      {token !== null && (
        <Header
          toggleDropDown={toggleAccountDropDown}
          profileImage={profileImage}
        />
      )}
      {headerDropDown === true && (
        <div className="headerDropDown">
          <nav className="navDropDown">
            <Link to={`/profile/${user.id}`}>
              <div>
                {profileImage === "" ? (
                  <img src={personImg} alt="" />
                ) : (
                  <img src={`data:image/png;base64,${profileImage}`} alt="" />
                )}
              </div>
              {`${user.firstName} ${user.lastName}`}
            </Link>
            <a href="" onClick={handleLogoutClick}>
              <div>
                <img src={logoutImg} alt="" />
              </div>
              Log out
            </a>
          </nav>
        </div>
      )}
      <AppContext.Provider
        value={{
          loginStatus,
          openNewPostModal,
          closeNewPostModal,
          postModalOpen,
          openBioModal,
          closeBioModal,
          bioModalOpen,
          openPhotoModal,
          closePhotoModal,
          photoModalOpen,
          openDeleteModal,
          closeDeleteModal,
          deleteModalOpen,
          profileImage,
        }}
      >
        <Outlet />

        {/* Adds modals using react-modal package */}
        <PostModal />
        <BioModal />
        <PhotoModal />
        <PostDeleteModal />
      </AppContext.Provider>
    </div>
  );
};

export default App;
