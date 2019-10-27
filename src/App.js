import React, {Component} from 'react';
import Navbar from "./components/Navbar";
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {    };
  }

  render() {
    return (
      <div className="App">
        <Navbar 
          clickHandler={this.myFunction}
        />
      </div>
    );
  }
}

export default App;
