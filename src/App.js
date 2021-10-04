import React, {Component} from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import axios from 'axios';
import './App.css';

// React.Component has all those lifecycle methods
class App extends Component{
  state = {
    users: [],
    loading: false // to show spinner when data is loading
  }

  // Lifecycle method when the component mounts
  async componentDidMount() {
    this.setState({loading: true});

    // Where you want requests to occur when component loads
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    this.setState({users: res.data, loading: false});
  }

  // Lifecycle method that runs when the app is loaded, the only lifecycle method required
  render () {
    return (
      <div className="App">
        {/* Leaving the Navbar props empty for devs to overwrite default props */}
        <Navbar />
        {/* There is CSS styling for .container */}
        <div className="container">
          <Users loading={this.state.loading} users={this.state.users}/>
        </div>
      </div>
    );
  }
}

export default App;
