import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Content/Login";
import Signup from "./components/Content/Signup";
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null
    }

  }

  render() {
    return (
      <Router>
        <div className="App">
            <Switch>
              <Route exact path="/">
                <>
                <Navbar />
                </>
              </Route>
              <Route exact path="/signup">
              <>
                <Navbar />
                <Signup />
              </>
              </Route>
              <Route exact path="/login">
                <>
                <Navbar />
                <Login />
                </>
              </Route>
              <Route path="/portfolio">
                <>
                <Navbar />
                </>
              </Route>
              <Route path="/calendar">
                <>
                <Navbar />
                </>
              </Route>
              <Route path="/chat">
                <>
                <Navbar />
                </>
              </Route>
              <Route path="/report">
                <>
                <Navbar />
                </>
              </Route>
            </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
