import axios from "./axios";
import React from "react";
import ProfilePic from "./profilepic.js";
import Uploadimage from "./uploadimage";
import Bio from "./bio.js";
import Profile from "./profile";
import Opp from "./opp";
import FriendButton from "./friendrequest";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { initSocket } from "./socket";
import OnlineUsers from "./onlineUsers.js";
import Friends from "./friends.js";
import Chat from "./chat.js";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      imgUrl: "",
      bio: "",
      uploaderIsVisible: false
    };
    this.showUploader = this.showUploader.bind(this);
    this.hideUploader = this.hideUploader.bind(this);
    this.setImage = this.setImage.bind(this);
    this.setBio = this.setBio.bind(this);
  }
  showUploader() {
    this.setState({ uploaderIsVisible: true });
  }
  hideUploader() {
    this.setState({
      uploaderIsVisible: false
    });
  }
  setBio(bio) {
    this.setState({
      bio: bio
    });
  }
  setImage(image) {
    console.log("words");
    this.setState({
      image: image,
      uploaderIsVisible: false
    });
  }
  componentDidMount() {
    axios
      .get("/user")
      .then(({ data }) => {
        this.setState({
          ...data
        });
      })
      .catch(err => {
        console.log("err in componentDidMount: ", err);
      });
  }

  render() {
    if (!this.state.id) {
      return (
        <img src="https://s3.amazonaws.com/spicedling/Qp5-JQcO8OSoBnaD09_6TRtPmjJPm8AY.png" />
      );
    }
    return (
      <div>
        <div className="profilepic">
          <ProfilePic
            image={this.state.image}
            clickHandler={this.showUploader}
          />
        </div>
        <BrowserRouter>
          <div className="container">
            <div className="navbar">
              <Link to="/Online">Online users </Link>
              <Link to="/">Your profile</Link>
              <Link to="/Friends">Friends </Link>
              <Link to="/Chat">Chat</Link>
              <Logout />
              <img
                className="logo-nav"
                src="https://s3.amazonaws.com/spicedling/EO68eVQ-s5chpFSSzenwgzC0uxpDtb4O.png"
              />
            </div>
            <Route
              exact
              path="/"
              render={props => (
                <Profile
                  firstname={this.state.firstname}
                  lastname={this.state.lastname}
                  id={this.state.id}
                  bio={this.state.bio}
                  image={this.state.image}
                  clickHandler={this.showUploader}
                  setBio={this.setBio}
                />
              )}
            />
            <Route
              exact
              path="/user/:id"
              render={props => (
                <Opp
                  {...props}
                  currentUserId={this.state.id}
                  key={props.match.url}
                />
              )}
            />
            <Route exact path="/friends" component={Friends} />
            <Route exact path="/online" component={OnlineUsers} />
            <Route exact path="/chat" component={Chat} />
          </div>
        </BrowserRouter>

        {this.state.uploaderIsVisible && (
          <Uploadimage
            setImage={this.setImage}
            hideUploader={this.hideUploader}
          />
        )}
      </div>
    );
  }
}

export function Logout(props) {
  return (
    <a className="logoutbutton" href="/logout">
      Log out
    </a>
  );
}
