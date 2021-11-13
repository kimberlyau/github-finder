import React, { Fragment, useState } from 'react';
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
const App = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false); // to show spinner when data is loading,
    const [alert, showAlert] = useState(null);

    // Search Github users
    const searchUsers = async (text) => {
        setLoading(true);

        // Where you want requests to occur when component loads
        const res = await axios.get(
            `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );

        setUsers(res.data.items);
        setLoading(false);
    };

    // Get single Github user
    const getUser = async (username) => {
        setLoading(true);

        const res = await axios.get(
            `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        setUser(res.data);
        setLoading(false);
    };

    // Get user repos
    const getUserRepos = async (username) => {
        setLoading(true);

        const res = await axios.get(
            `https://api.github.com/users/${username}/repos?per_page=5&sprt=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        setRepos(res.data);
        setLoading(false);
    };

    // Clear uses from state
    const clearUsers = () => {
        setUsers([]);
        setLoading(false);
    };

    // Set alert when user attempts to search with empty input
    const setAlert = (msg, type) => {
        showAlert({ msg, type });

        // Time out alert in 3 seconds
        setTimeout(() => showAlert(null), 3000);
    };

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
                                        searchUsers={searchUsers}
                                        clearUsers={clearUsers}
                                        showClear={
                                            users.length > 0 ? true : false
                                        }
                                        setAlert={setAlert}
                                    />
                                    <Users loading={loading} users={users} />
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
                                    getUser={getUser}
                                    getUserRepos={getUserRepos}
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
};

export default App;
