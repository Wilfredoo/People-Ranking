import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app.js";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
// import reducer from "./reducer.js";
import { initSocket } from "./socket";
import reducer from "./reducer";

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(reduxPromise))
);

let elem;

if (location.pathname === "/welcome") {
  elem = <Welcome />;
} else {
  elem = (initSocket(store),
  (
    <Provider store={store}>
      <App />
    </Provider>
  ));
}
ReactDOM.render(elem, document.querySelector("main"));
// ReactDOM.render(<HelloWorld />, document.querySelector("main"));
//
// function HelloWorld() {
//   return <div>Hello, World!</div>;
// }

// if (location.pathname === "/welcome") {
//   ReactDOM.render(<Welcome />, document.querySelector("main"));
// } else {
// }
