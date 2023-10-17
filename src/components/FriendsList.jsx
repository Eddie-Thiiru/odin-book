import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const FriendsList = ({ id }) => {
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState();

  // Fetch user friends on component mount
  useEffect(() => {
    fetch(`http://localhost:3000/profile/${id}/friends`, {
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
    fetch(`http://localhost:3000/profile/${id}/friends/${friendId}`, {
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

  return (
    <section className="friendsList">
      <h3>All friends</h3>
      <div className="friendsContainer">
        {loading === false && friends.length > 0
          ? friends.map((friend, index) => {
              return (
                <div key={index} className="friend">
                  <img src="" alt="" />
                  <p>{`${friend.firstName} ${friend.lastName}`}</p>
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
              <div className="emptyFriendsIndicator">No friends</div>
            )}
      </div>
    </section>
  );
};

FriendsList.propTypes = {
  id: PropTypes.string,
};

export default FriendsList;
