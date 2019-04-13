import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Moment from "react-moment";

export class People extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    axios.get("/getpeople").then(result => {
      console.log("here is the alias of the first user... ", result.data.data[0].name);
      this.setState({ peopleData: result.data.data });
      console.log("this is the state atm", this.state);
    });

    axios.get("/getuser").then(result => {
      console.log("hi inm anabel", result.data.data[0].name);
      this.setState({ userData: result.data.data });
      // this.setState({userUsername: resul})

      console.log("yo yo", this.state);
    });
  }

  render() {
    if (!this.state.peopleData) {
      return null;
    }
    return (
      <div className="bg">

        <h1>Ranking - A modest ranking of simple people</h1>
        <h3>You are logged in, ALIAS</h3>
        <p>
          <a href="#">Sign In</a>
        </p>
        <p>
          <a href="#">Sign Up</a>
        </p>
        <p>
          <a href="#">Log Out</a>
        </p>

        <input placeholder="Search..." />

        {this.state.peopleData.map(data => {
          return (
            <table>
              <td> {data.name} </td>
              <td> {data.age} </td>
              <td > {data.city1} </td>
              <td > {data.status} </td>
              <button > {data.fame} </button>
            </table>
          );
        })}

        <p>1 2 3</p>

        <p>
          Want to add someone? <Link to="/login"><input type="submit" value="Log In"/></Link> or <Link to="/register"><input type="submit" value="Sign Up"/></Link>


        </p>
                <p>
          You think this site sucks? <a href="#">Leave a message</a> and tell us
          how to improve it
        </p>
      </div>
    );
  }
}
