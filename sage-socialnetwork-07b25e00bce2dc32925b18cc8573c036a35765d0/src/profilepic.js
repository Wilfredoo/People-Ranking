import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";
import App from "./app";
import Profile from "./profile";

export default function ProfilePic(props) {
  const image =
    props.image ||
    "https://assets.pcmag.com/media/images/357201-how-to-lock-down-your-facebook-profile.jpg?thumb=y&width=275&height=275";
  return <img className="pic" onClick={props.clickHandler} src={image} />;
}
