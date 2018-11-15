import React from "react";
import ReactDOM from "react-dom";
import axios from "./axios";

export default class Bio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      draftBio: false,
      bio: " "
    };

    this.showTextarea = this.showTextarea.bind(this);
    this.hideTextarea = this.hideTextarea.bind(this);
    this.uploadBio = this.uploadBio.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  showTextarea() {
    this.setState({
      draftBio: true
    });
  }
  hideTextarea() {
    this.setState({
      draftBio: false
    });
  }
  handleChange(e) {
    this.setState({
      bio: e.target.value
    });
  }

  uploadBio() {
    axios
      .post("/usersbio", {
        bio: this.state.bio
      })
      .then(result => {
        this.setState({
          draftBio: false
        });
        this.props.setBio(result.data.bio);
      });
  }

  render() {
    if (this.state.draftBio) {
      return (
        <div>
          <p>bla {this.state.bio}</p>
          <textarea
            className="bio-textarea"
            defaultValue={this.props.bio}
            onChange={this.handleChange}
          />
          <button className="register-button" onClick={this.uploadBio}>
            save
          </button>
          <button className="register-link" onClick={this.hideTextarea}>
            cancle
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <p>{this.props.bio}</p>
          <button className="register-button" onClick={this.showTextarea}>
            edit bio
          </button>
        </div>
      );
    }
  }
}
