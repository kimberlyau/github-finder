import React, {Component} from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import './App.css';

// React.Component has all those lifecycle methods
class App extends Component{
  // Lifecycle method that runs when the app is loaded
  render () {
    return (
      <div className="App">
        {/* Leaving the Navbar props empty for devs to overwrite default props */}
        <Navbar />
        {/* There is CSS styling for .container */}
        <div className="container">
          <Users />
        </div>
      </div>
    );
  }
}

export default App;
