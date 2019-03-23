import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import axios from 'axios';


export class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
      console.log("whatatatata");
      axios.get("/log-in").then(result => {
        console.log("otottoo", result);
      });
    };

  render() {
    return (
      <div className="bg">
      <h1>Log In here</h1>
        <form method="post" action="/log-in">
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <button type="submit">Log In</button>
        </form>
      </div>
    );
  }
}
