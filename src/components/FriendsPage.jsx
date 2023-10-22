import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FriendsList from "./FriendsList";

import groupImg from "../images/friends-group.svg";
import allFriendsImg from "../images/all-friends.svg";
import addFriendImg from "../images/person-add.svg";
import personImg from "../images/person.svg";
import "../stylesheets/friendsPage.css";

const Suggestions = () => {
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch user details on component mount
  useEffect(() => {
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

  // Send friend request
  const sendFriendRequest = (requestId) => {
    fetch(`http://localhost:3000/profile/${user.id}/requests/${requestId}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(response);
        }

        return response.json();
      })
      .then(() => {
        setSuggestions(suggestions.filter((a) => a._id !== requestId));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const navigateToProfile = (id) => {
    navigate(`/profile/${id}`);
  };

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;

    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }

    return window.btoa(binary);
  };

  return (
    <section className="suggestionsSection">
      <h2>People You May Know</h2>
      <div className="suggestionsContainer">
        {loading === false && suggestions.length > 0
          ? suggestions.map((user, index) => {
              return (
                <div key={index} className="userRequest">
                  {user.profilePicture === undefined ? (
                    <img
                      src={personImg}
                      alt=""
                      onClick={() => navigateToProfile(user._id)}
                    />
                  ) : (
                    <img
                      src={`data:image/png;base64,${arrayBufferToBase64(
                        user.profilePicture.data
                      )}`}
                      alt=""
                      onClick={() => navigateToProfile(user._id)}
                    />
                  )}
                  <a
                    href={`/profile/${user._id}`}
                  >{`${user.firstName} ${user.lastName}`}</a>
                  <div>
                    <button
                      type="button"
                      className="addFriendBtn"
                      onClick={() => sendFriendRequest(`${user._id}`)}
                    >
                      Add friend
                    </button>
                  </div>
                </div>
              );
            })
          : loading === false && (
              <div className="emptySuggestionsIndicator">
                No suggestions available
              </div>
            )}
      </div>
    </section>
  );
};

const Requests = () => {
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch user details on component mount
  useEffect(() => {
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

  // Accept friend requests
  const acceptFriendRequest = (requestId) => {
    fetch(`http://localhost:3000/profile/${user.id}/friends/${requestId}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(response);
        }

        return response.json();
      })
      .then(() => {
        setRequests(requests.filter((a) => a._id !== requestId));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Delete friend requests
  const removeFriendRequest = (requestId) => {
    fetch(`http://localhost:3000/profile/${user.id}/requests/${requestId}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(response);
        }

        return response.json();
      })
      .then(() => {
        setRequests(requests.filter((a) => a._id !== requestId));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const navigateToProfile = (id) => {
    navigate(`/profile/${id}`);
  };

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;

    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }

    return window.btoa(binary);
  };

  return (
    <section className="requestsSection">
      <h2>Friend Requests</h2>
      <div className="requestsContainer">
        {loading === false && requests.length > 0
          ? requests.map((user, index) => {
              return (
                <div key={index} className="userRequest">
                  {user.profilePicture === undefined ? (
                    <img
                      src={personImg}
                      alt=""
                      onClick={() => navigateToProfile(user._id)}
                    />
                  ) : (
                    <img
                      src={`data:image/png;base64,${arrayBufferToBase64(
                        user.profilePicture.data
                      )}`}
                      alt=""
                      onClick={() => navigateToProfile(user._id)}
                    />
                  )}
                  <a
                    href={`/profile/${user._id}`}
                  >{`${user.firstName} ${user.lastName}`}</a>
                  <div>
                    <button
                      type="button"
                      className="confirmReqBtn"
                      onClick={() => acceptFriendRequest(`${user._id}`)}
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      className="delReqBtn"
                      onClick={() => removeFriendRequest(`${user._id}`)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          : loading === false && (
              <div className="emptyRequestsIndicator">
                <p>No requests available</p>
              </div>
            )}
      </div>
    </section>
  );
};

const FriendsPage = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleNavigation = (path) => {
    navigate(`/${path}`);
  };

  return (
    <div className="friendsPage">
      <div className="friendsSidebar">
        <div className="sidebarGrp" onClick={() => handleNavigation("friends")}>
          <img src={groupImg} alt="" />
          <p>Home</p>
        </div>
        <div
          className="sidebarGrp"
          onClick={() => handleNavigation("friends/requests")}
        >
          <img src={addFriendImg} alt="" />
          <p>Friend Requests</p>
        </div>
        <div
          className="sidebarGrp"
          onClick={() => handleNavigation("friends/suggestions")}
        >
          <img src={addFriendImg} alt="" />
          <p>Suggestions</p>
        </div>
        <div
          className="sidebarGrp"
          onClick={() => handleNavigation("friends/friends")}
        >
          <img src={allFriendsImg} alt="" />
          <p>All friends</p>
        </div>
      </div>
      <div className="friendsPageMain">
        {name === "requests" ? (
          <Requests />
        ) : name === "suggestions" ? (
          <Suggestions />
        ) : name === "friends" ? (
          <FriendsList id={user.id} />
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
