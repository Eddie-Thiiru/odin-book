import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import PostModal from "./components/PostModal";
import "./stylesheets/App.css";
export const PostContext = createContext();

const App = () => {
  const [postModalOpen, setPostModalOpen] = useState(false);

  const openNewPostModal = () => {
    setPostModalOpen(true);
  };

  const closeNewPostModal = () => {
    setPostModalOpen(false);
  };

  return (
    <div className="App">
      <PostContext.Provider
        value={{ openNewPostModal, closeNewPostModal, postModalOpen }}
      >
        <Header />
        <Outlet />

        {/* Adds PostModal using react-modal package */}
        <PostModal />
      </PostContext.Provider>
    </div>
  );
};

export default App;
