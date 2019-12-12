import React, { Fragment } from "react";
// Switch can only have routes in it
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Landing from "./components/Layout/Landing";
import Alert from "./components/Layout/Alert";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
// redux
import { Provider } from "react-redux";
import store from "./store";

import "./App.css";

const App = () => (
  // wrap all app in redux provider; store as param
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Alert/>
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
);
export default App;
