import React from "react";
import ReactDOM from "react-dom";
import axios from "./axios";
import { Link } from "react-router-dom";
import Profile from "./profile";

let firstname, lastname, email, password;

export default class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      error: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.register = this.register.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  register() {
    axios
      .post("/welcome", {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        password: this.state.password
      })
      .then(data => {
        // console.log(data);
        if (data.data) {
          location.replace("/");
        } else {
          this.setState({
            error: true
          });
        }
      });
  }
  render() {
    return (
      <div>
        {this.state.error && <div className="error">try again</div>}
        <div className="all-inputs">
          <input
            className="register-input"
            name="firstname"
            placeholder="First name"
            onChange={this.handleChange}
          />
          <input
            className="register-input"
            name="lastname"
            placeholder="Last name"
            onChange={this.handleChange}
          />
          <input
            className="register-input"
            name="email"
            placeholder="Username"
            onChange={this.handleChange}
          />
          <input
            className="register-input"
            name="password"
            placeholder="Password"
            onChange={this.handleChange}
          />
          <button className="register-button" onClick={this.register}>
            Register
          </button>
          <Link className="register-link" to="/login">
            Log in
          </Link>
        </div>
      </div>
    );
  }
}

// <a href="/logout">log out</a>
