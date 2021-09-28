import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './style.css';
import Header from "./views/header.jsx";
import Index from "./views/index.jsx";
import SignIn from "./views/signin.jsx";
import SignUp from "./views/signup.jsx";
import Main from "./views/main.jsx";
import Host from "./views/host.jsx";
import Guest from "./views/guest.jsx";

fetch('/api/').then(response => {
  console.log(response.json());
});

class MyComponent extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route exact path="/signin" component={SignIn} />　
          <Route exact path="/signup" component={SignUp} />　
          <Route exact path="/main" component={Main} />　
          <Route exact path="/host" component={Host} />　
          <Route exact path="/guest" component={Guest} />　
        </Switch>
      </BrowserRouter>
    );
  };
};

ReactDOM.render(<Header title="Gekiron" />, document.getElementById("header")); 
ReactDOM.render(<MyComponent />, document.getElementById("index")); 