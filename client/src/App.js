import React, {Component} from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Content/Login";
import Signup from "./components/Content/Signup";
import Calendar from "./components/Calendar/Calendar";
import Reminders from "./components/Reminders/Reminders";
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser(userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get('/user/').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }
  

  render() {
    return (
      <Router>
        <div className="App">
            <Switch>
              <Route exact path="/">
                <>
                <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
                {/* greet user if logged in: */}
                {this.state.loggedIn &&
                  <p>Welcome, {this.state.username}!</p>
                }
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
                <Calendar />
                <Reminders />ç
                </>
              </Route>
              <Route path="/chat">
                <>
                <Navbar />
                </>
              </Route>
              <Route path="/reports">
                <>
                <Navbar />
                </>
              </Route>
              <Route path="/settings">
                <>
                  <Navbar />
                </>
              </Route>
              <Route path="/contact">
                <>
                  <Navbar />
                </>
              </Route>
            </Switch>
        </div>
      </Router>
    );
  };
}

export default App;
