import { useParams, useNavigate } from "react-router-dom";

import "../stylesheets/friendsPage.css";
import { useEffect, useState } from "react";

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

const Suggestions = () => {
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState();

  // Fetch user details on component mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    fetch(`http://localhost:3000/profile/${user.id}/suggestions`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(response);
        }

        return response.json();
      })
      .then((data) => {
        setLoading(false);
        setSuggestions(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className="suggestionsSection">
      <h2>People You May Know</h2>
      <div className="suggestionsContainer">
        {loading === false && suggestions.length > 0
          ? suggestions.map((user, index) => {
              return (
                <div key={index} className="userRequest">
                  <img src="" alt="" />
                  <p>{`${user.firstName} ${user.lastName}`}</p>
                  <div>
                    <button type="button" className="addFriendBtn">
                      Add friend
                    </button>
                  </div>
                </div>
              );
            })
          : loading === false && (
              <div className="emptySuggestionsIndicator">No suggestions</div>
            )}
      </div>
    </section>
  );
};

const Requests = () => {
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState();

  // Fetch user details on component mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    fetch(`http://localhost:3000/profile/${user.id}/requests`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(response);
        }

        return response.json();
      })
      .then((data) => {
        setLoading(false);
        setRequests(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className="requestsSection">
      <h2>Friend Requests</h2>
      <div className="requestsContainer">
        {loading === false && requests.length > 0
          ? requests.map((user, index) => {
              return (
                <div key={index} className="userRequest">
                  <img src="" alt="" />
                  <p>{`${user.firstName} ${user.lastName}`}</p>
                  <div>
                    <button type="button" className="confirmReqBtn">
                      Confirm
                    </button>
                    <button type="button" className="delReqBtn">
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          : loading === false && (
              <div className="emptyRequestsIndicator">No requests</div>
            )}
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
      <div className="friendsPageMain">
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
