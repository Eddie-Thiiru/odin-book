import { useParams, useNavigate } from "react-router-dom";

const Requests = () => {
  return (
    <section className="requestsSection">
      <h2>Friend Requests</h2>
      <div className="requestsContainer">
        <div className="userRequest">
          <img src="" alt="" />
          <p>example request</p>
          <div>
            <button type="button" className="confirmReqBtn">
              Confirm
            </button>
            <button type="button" className="delReqBtn">
              Delete
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Suggestions = () => {
  return (
    <section className="suggestionsSection">
      <h2>People You May Know</h2>
      <div className="suggestionsContainer">
        <div className="userRequest">
          <img src="" alt="" />
          <p>example suggest</p>
          <button type="button" className="addFriendBtn">
            Add friend
          </button>
        </div>
      </div>
    </section>
  );
};

const List = () => {
  return (
    <section className="friendsList">
      <h2>All friends</h2>
      <div className="friendsContainer">
        <div className="friend">
          <img src="" alt="" />
          <p>example suggest</p>
          <button type="button" className="removeFriendBtn">
            Unfriend
          </button>
        </div>
      </div>
    </section>
  );
};

const FriendsPage = () => {
  const { name } = useParams();

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(`/${path}`);
  };

  return (
    <div className="friendsPage">
      <div className="friendsSidebar">
        <div className="sidebarGrp" onClick={() => handleNavigation("friends")}>
          <img src="" alt="" />
          <p>Home</p>
        </div>
        <div
          className="sidebarGrp"
          onClick={() => handleNavigation("friends/requests")}
        >
          <img src="" alt="" />
          <p>Friend Requests</p>
        </div>
        <div
          className="sidebarGrp"
          onClick={() => handleNavigation("friends/suggestions")}
        >
          <img src="" alt="" />
          <p>Suggestions</p>
        </div>
      </div>
      <div className="main">
        {name === "requests" ? (
          <Requests />
        ) : name === "suggestions" ? (
          <Suggestions />
        ) : name === "list" ? (
          <List />
        ) : (
          <>
            <Requests />
            <Suggestions />
          </>
        )}
      </div>
    </div>
  );
};

export default FriendsPage;
