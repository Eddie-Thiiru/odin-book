import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AppContext from "./components/utils/appContext";
import Header from "./components/Header";
import PostModal from "./components/PostModal";
import BioModal from "./components/BioModal";

import "./stylesheets/App.css";

const App = () => {
  const [loginStatus, setLoginStatus] = useState(false);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [bioModalOpen, setBioModalOpen] = useState(false);

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

  const refreshPage = () => {
    navigate(0);
  };

  const token = localStorage.getItem("token");

  return (
    <div className="App">
      {token !== null && <Header />}
      <AppContext.Provider
        value={{
          loginStatus,
          openNewPostModal,
          closeNewPostModal,
          postModalOpen,
          openBioModal,
          closeBioModal,
          bioModalOpen,
          refreshPage,
        }}
      >
        <Outlet />

        {/* Adds modals using react-modal package */}
        <PostModal />
        <BioModal />
      </AppContext.Provider>
    </div>
  );
};

export default App;
