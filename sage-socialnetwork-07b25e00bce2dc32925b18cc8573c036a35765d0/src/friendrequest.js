import React from "react";
import axios from "./axios";
import Opp from "./opp.js";
import App from "./app.js";

{
  /* <FriendButton otherId={this.props.match.params.id} />; */
}

export default class FriendButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textInsideButton: ""
    };
    this.makeRequest = this.makeRequest.bind(this);
  }

  componentDidMount() {
    console.log("FriendButton ComponenetdidMount");
    console.log("otherProfileId", this.props.oppId);
    const otherProfileId = this.props.oppId;

    axios
      .get("/status/" + otherProfileId)
      .then(result => {
        console.log("resultin axios /status", result.data.textInsideButton);
        this.setState({ textInsideButton: result.data.textInsideButton });
      })
      .catch(err => {
        console.log("err: ", err);
      });
  }

  makeRequest() {
    console.log("Button clicked");
    const otherProfileId = this.props.oppId;
    // console.log("otherProfileId", this.props.otherProfileId);

    if (this.state.textInsideButton == "Make Friend Request") {
      console.log("MAKE FRIEND REQUEST matched");

      axios.post("/makeRequest/" + otherProfileId).then(result => {
        this.setState({ textInsideButton: result.data.textInsideButton });
      });
    } else if (this.state.textInsideButton == "Cancel Friend Request") {
      console.log("CANCEL FRIEND REQUEST matched");
      axios.post("/cancelRequest/" + otherProfileId).then(result => {
        console.log(
          "result in axios /cancelRequest",
          result.data.textInsideButton
        );
        this.setState({ textInsideButton: result.data.textInsideButton });
      });
    } else if (this.state.textInsideButton == "Accept Friend Request") {
      console.log("Accept Friend Request matched");

      axios.post("/acceptFriendship/" + otherProfileId).then(result => {
        console.log(
          "result in axios /acceptFriendship",
          result.data.textInsideButton
        );
        this.setState({ textInsideButton: result.data.textInsideButton });
      });
    } else if (this.state.textInsideButton == "End Friendship") {
      console.log("EndFriendship Request matched");

      axios.post("/endFriendship/" + otherProfileId).then(result => {
        console.log(
          "result in axios /endFriendship",
          result.data.textInsideButton
        );
        this.setState({ textInsideButton: result.data.textInsideButton });
      });
    }
  }

  render() {
    console.log("THIS.PROPS OF FIRENDBUTTON: ", this.props);
    return (
      <div>
        <button onClick={this.makeRequest} className="register-button">
          {this.state.textInsideButton}
        </button>
      </div>
    );
  }
}
