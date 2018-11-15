import React from "react";
import { connect } from "react-redux";
import { onlineUsers } from "./actions";

export class OnlineUsers extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    console.log("onlineUsers componentDidMount!");
  }

  render() {
    const { onlineUsers } = this.props;
    if (!onlineUsers) {
      return null;
    }

    const renderOnlineUsers = (
      <div>
        <h1>Users currently online:</h1>
        {this.props.onlineUsers.map(user => (
          <div key={user.id} className="friend">
            <p>
              {user.firstname} {user.lastname}
            </p>
            {!user.image ? (
              <img
                className="pic"
                src="https://assets.pcmag.com/media/images/357201-how-to-lock-down-your-facebook-profile.jpg?thumb=y&width=275&height=275"
              />
            ) : (
              <img className="pic" src={user.image} />
            )}
          </div>
        ))}
      </div>
    );

    return (
      <div>
        {!onlineUsers.length && <h1>Currently no users online.</h1>}
        {!!onlineUsers.length && renderOnlineUsers}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    onlineUsers: state.onlineUsers
  };
}

export default connect(mapStateToProps)(OnlineUsers);
