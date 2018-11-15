import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";

export default function Welcome() {
  return (
    <div>
      <img
        className="logo"
        src="https://s3.amazonaws.com/spicedling/EO68eVQ-s5chpFSSzenwgzC0uxpDtb4O.png"
      />
      <h2 className="welcome" />

      <HashRouter>
        <div>
          <Route exact path="/" component={Registration} />
          <Route path="/login" component={Login} />
        </div>
      </HashRouter>
    </div>
  );
}
