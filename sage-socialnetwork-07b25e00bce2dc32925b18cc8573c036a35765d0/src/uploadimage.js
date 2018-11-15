import React from "react";
import ReactDOM from "react-dom";
import axios from "./axios";

export default class Uploadimage extends React.Component {
  constructor(props) {
    super(props);
    this.uploadImage = this.uploadImage.bind(this);
  }
  uploadImage(e) {
    console.log("clicked!", this.props.uploaderIsVisible);

    var file = e.target.files[0];

    var formData = new FormData();
    formData.append("file", file);
    axios
      .post("/upload", formData)
      .then(response => {
        console.log("RESPONSE DATA: ", response.data.imgUrl);
        this.props.setImage(response.data.imgUrl);
      })
      .catch(function(err) {
        console.log("ERROR IN UPLOAD", err.message);
      });
  }

  render() {
    return (
      <div>
        <div className="uploadimg">
          <p className="x-close" onClick={this.props.hideUploader}>
            &#10006;
          </p>
          <h3>Update your picture</h3>
          <label htmlFor="file">
            <p>Choose a new picture for your profile</p>
            <input
              id="file"
              type="file"
              accept="image/*"
              name="file"
              onChange={this.uploadImage}
            />
          </label>
        </div>
      </div>
    );
  }
}
