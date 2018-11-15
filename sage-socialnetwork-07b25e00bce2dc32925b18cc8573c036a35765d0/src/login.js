import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  login() {
    axios
      .post("/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(result => {
        console.log(result);
        if (result.data) {
          location.replace("/");
        } else {
          console.log("else in axios in login");
          this.setState({
            error: true
          });
        }
      });
  }
  render() {
    return (
      <div className="all-inputs">
        {this.state.error && <div className="error">try again</div>}
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
        <button className="register-button" onClick={this.login}>
          Log in
        </button>
        <Link className="register-link" to="/">
          Register
        </Link>
      </div>
    );
  }
}
