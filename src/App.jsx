import { createContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import PostModal from "./components/PostModal";
import "./stylesheets/App.css";

export const AppContext = createContext();

const App = () => {
  const [loginStatus, setLoginStatus] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(true);
  const [postModalOpen, setPostModalOpen] = useState(false);

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

  return (
    <div className="App">
      <AppContext.Provider
        value={{
          loginStatus,
          openNewPostModal,
          closeNewPostModal,
          postModalOpen,
        }}
      >
        {loginStatus === false ? (
          <Outlet />
        ) : (
          <>
            <Header />
            <Outlet />
          </>
        )}
        {/* Adds PostModal using react-modal package */}
        <PostModal />
      </AppContext.Provider>
    </div>
  );
};

export default App;
