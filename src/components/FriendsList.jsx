import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import personImg from "../images/person.svg";

const FriendsList = ({ id }) => {
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState();

  const navigate = useNavigate();

  // Fetch user friends on component mount
  useEffect(() => {
    fetch(`https://odin-book-api.fly.dev/profile/${id}/friends`, {
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
        setFriends(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  // unfriend users
  const removeFriend = (friendId) => {
    fetch(`https://odin-book-api.fly.dev/profile/${id}/friends/${friendId}`, {
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
        setFriends(friends.filter((a) => a._id !== friendId));
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
    <section className="friendsList">
      <h3>All friends</h3>
      <div className="friendsContainer">
        {loading === true && <div className="spinner"></div>}
        {loading === false && friends.length > 0
          ? friends.map((friend, index) => {
              return (
                <div key={index} className="friend">
                  {friend.profilePicture === undefined ? (
                    <img
                      src={personImg}
                      alt=""
                      onClick={() => navigateToProfile(friend._id)}
                    />
                  ) : (
                    <img
                      src={`data:image/png;base64,${arrayBufferToBase64(
                        friend.profilePicture.data
                      )}`}
                      alt=""
                      onClick={() => navigateToProfile(friend._id)}
                    />
                  )}
                  <a
                    href={`/profile/${friend._id}`}
                  >{`${friend.firstName} ${friend.lastName}`}</a>
                  <button
                    type="button"
                    className="removeFriendBtn"
                    onClick={() => removeFriend(`${friend._id}`)}
                  >
                    Unfriend
                  </button>
                </div>
              );
            })
          : loading === false && (
              <div className="emptyFriendsIndicator">No friends available</div>
            )}
      </div>
    </section>
  );
};

FriendsList.propTypes = {
  id: PropTypes.string,
};

export default FriendsList;
