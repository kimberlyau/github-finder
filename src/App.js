import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import axios from 'axios';
import './App.css';

// React.Component has all those lifecycle methods
class App extends Component {
    state = {
        users: [],
        loading: false, // to show spinner when data is loading,
        alert: null,
    };

    // Search Github users
    searchUsers = async (text) => {
        this.setState({ loading: true });

        // Where you want requests to occur when component loads
        const res = await axios.get(
            `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );

        this.setState({ users: res.data.items, loading: false });
    };

    // Clear uses from state
    clearUsers = () => {
        this.setState({ users: [], loading: false });
    };

    // Set alert when user attempts to search with empty input
    setAlert = (msg, type) => {
        this.setState({ alert: { msg, type } });
        // Time out alert in 5 seconds
        setTimeout(() => this.setState({ alert: null }), 3000);
    };

    // Lifecycle method that runs when the app is loaded, the only lifecycle method required
    render() {
        const { loading, users, alert } = this.state;

        return (
            <div className='App'>
                {/* Leaving the Navbar props empty for devs to overwrite default props */}
                <Navbar />
                {/* There is CSS styling for .container */}
                <div className='container'>
                    <Alert alert={alert} />
                    <Search
                        searchUsers={this.searchUsers}
                        clearUsers={this.clearUsers}
                        showClear={users.length > 0 ? true : false}
                        setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                </div>
            </div>
        );
    }
}

export default App;
