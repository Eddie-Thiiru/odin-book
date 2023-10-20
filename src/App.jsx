import { useEffect, useState } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import AppContext from "./components/utils/appContext";
import Header from "./components/Header";
import PostModal from "./components/PostModal";
import BioModal from "./components/BioModal";
import PhotoModal from "./components/PhotoModal";
import PostDeleteModal from "./components/PostDeleteModal";

import "./stylesheets/App.css";

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
    console.log("waht");
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

    navigate("/login");
  };

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="App" onClick={closeAccountDropDown}>
      {token !== null && (
        <Header
          toggleDropDown={toggleAccountDropDown}
          closeDropDown={closeAccountDropDown}
        />
      )}
      {headerDropDown === true && (
        <div className="headerDropDown">
          <nav className="navDropDown">
            <Link to={`/profile/${user.id}`}>
              <img src="" alt="" />
              {`${user.firstName} ${user.lastName}`}
            </Link>
            <a href="" onClick={handleLogoutClick}>
              <img src="" alt="" />
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
