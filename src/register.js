import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Moment from "react-moment";

export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="bg">
      <h1>Sign Up here</h1>
        <form method="post" action="/register-user">
          <input type="text" name="alias" placeholder="Alias" />
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <button type="submit">Register</button>
        </form>

      </div>
    );
  }
}
