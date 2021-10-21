import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios';
import './App.css';

// React.Component has all those lifecycle methods
class App extends Component {
    state = {
        users: [],
        user: {},
        repos: [],
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

    // Get single Github user
    getUser = async (username) => {
        this.setState({ loading: true });

        const res = await axios.get(
            `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        this.setState({ user: res.data, loading: false });
    };

    // Get user repos
    getUserRepos = async (username) => {
        this.setState({ loading: true });

        const res = await axios.get(
            `https://api.github.com/users/${username}/repos?per_page=5&sprt=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        this.setState({ repos: res.data, loading: false });
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
        const { loading, user, users, alert, repos } = this.state;

        return (
            <Router>
                <div className='App'>
                    {/* Leaving the Navbar props empty for devs to overwrite default props */}
                    <Navbar />
                    {/* There is CSS styling for .container */}
                    <div className='container'>
                        <Alert alert={alert} />
                        <Switch>
                            <Route
                                exact
                                path='/'
                                render={(props) => (
                                    <Fragment>
                                        <Search
                                            searchUsers={this.searchUsers}
                                            clearUsers={this.clearUsers}
                                            showClear={
                                                users.length > 0 ? true : false
                                            }
                                            setAlert={this.setAlert}
                                        />
                                        <Users
                                            loading={loading}
                                            users={users}
                                        />
                                    </Fragment>
                                )}
                            />
                            <Route exact path='/about' component={About} />
                            <Route
                                exact
                                path='/user/:login'
                                render={(props) => (
                                    <User
                                        {...props}
                                        getUser={this.getUser}
                                        getUserRepos={this.getUserRepos}
                                        user={user}
                                        repos={repos}
                                        loading={loading}
                                    />
                                )}
                            />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
