import React from "react";
import { connect } from "react-redux";
import {
  receiveFriendsAndWanabees,
  endFriendship,
  acceptRequest
} from "./actions";
import { Link } from "react-router-dom";

class Friends extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    console.log("Friends componentDidMount!");
    !this.props.friendsOrWanabees &&
      this.props.dispatch(receiveFriendsAndWanabees());
  }

  render() {
    const {
      dispatch,
      alreadyFriends,
      wantToBeMyFriends,
      friendsOrWanabees
    } = this.props;
    if (!wantToBeMyFriends && !alreadyFriends) {
      return null;
    }

    const renderFriend = (
      <div>
        <div className="friends">
          <h2>Your friends:</h2>
          {this.props.alreadyFriends.map(fw => (
            <div key={fw.id} className="friend">
              <p>
                {fw.firstname} {fw.lastname}
              </p>
              {!fw.image ? (
                <img
                  className="pic"
                  src="https://assets.pcmag.com/media/images/357201-how-to-lock-down-your-facebook-profile.jpg?thumb=y&width=275&height=275"
                />
              ) : (
                <img className="pic" src={fw.image} />
              )}
              <p>{fw.bio}</p>
              <button
                className="register-button"
                onClick={() => dispatch(endFriendship(fw.id))}
              >
                unfriend me!
              </button>
            </div>
          ))}
        </div>

        <div className="friends">
          <h2>Friendship requests:</h2>
          {this.props.wantToBeMyFriends.map(fw => (
            <div key={fw.id} className="friend">
              <p>
                {fw.firstname} {fw.lastname}
              </p>
              {!fw.image ? (
                <img
                  className="pic"
                  src="https://assets.pcmag.com/media/images/357201-how-to-lock-down-your-facebook-profile.jpg?thumb=y&width=275&height=275"
                />
              ) : (
                <img className="pic" src={fw.image} />
              )}
              <p>{fw.bio} </p>
              <button
                className="register-button"
                onClick={() => dispatch(acceptRequest(fw.id))}
              >
                accept friend request
              </button>
            </div>
          ))}
        </div>
      </div>
    );

    return (
      <div id="friend">
        {!friendsOrWanabees.length && <h1>No Friends!</h1>}
        {!!friendsOrWanabees.length && renderFriend}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    friendsOrWanabees: state.friendsOrWanabees,
    alreadyFriends:
      state.friendsOrWanabees &&
      state.friendsOrWanabees.filter(fw => fw.accepted),
    wantToBeMyFriends:
      state.friendsOrWanabees &&
      state.friendsOrWanabees.filter(fw => !fw.accepted)
  };
}

export default connect(mapStateToProps)(Friends);
