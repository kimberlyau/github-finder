# XVII. Events & Search Component

## Overview

-   Goal: Search form for users to lookup usernames
-   Able to enter input
-   Able to console log on submit

# XVIII. Passing Props Up & Search

## Passing Props Up

-   Currently we have the input text in our onSubmit() function
    -   We will want to pass that back up to the main App component to centralize the data

```javascript
// Before
onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.text);
};

// After
onSubmit = (e) => {
    e.preventDefault();
    this.props.searchUsers(this.state.text);
    // Clear the form
    this.setState({ text: '' });
};
```

### Prop Drilling

-   Sending all the props up and down levels
    -   Can be messy because it can be multiple levels

```javascript
/* Search.js */
onSubmit = (e) => {
    e.preventDefault();
    this.props.searchUsers(this.state.text); // will pass UP to App.js
    // ...
};

/* App.js */

// render()
<Search searchUsers={this.searchUsers} />; // passes text into searchUsers function

// This is the created searchUsers function
searchUsers = async (text) => {
    this.setState({ loading: true });

    // Where you want requests to occur when component loads
    const res = await axios.get(
        `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ users: res.data.items, loading: false });
};
```

# XIX. Clear Users From State

## Overview

-   Clear button to clear users after search

# XX. Alert State & Component

## Overview

-   Create Alert component with passed in props
    -   Timeout Alert 3 seconds after Alert appears

# XXI. React Router Set Up

`npm i react-router-dom`

## `App.js`

```javascript
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Wrap everything in the return with <Router>
return (
    <Router>
        {/* Can put multiple components within one <Route> */}
        <Switch>
            {/* Home page */}
            <Route
                exact
                path='/'
                render={(props) => (
                    <Fragment>{/* Home page components */}</Fragment>
                )}
            />
        </Switch>
    </Router>
);
```

## About page

-   Will be done differently than the Fragment for the Home page
-   Will create an <u>About component</u>
    -   Create file components/pages/About.js

```javascript
// About page -> Created with rafce

import React from 'react';

const About = () => {
    return (
        <div>
            <h1>About This App</h1>
            <p>App to search Github</p>
            <p>Version: 1.0.0</p>
        </div>
    );
};

export default About;

// App.js import About component and put it in a Route
import About from './components/pages/About';

// Under Home page <Route> within the <Switch>
<Route exact path='/about' component={About} />; // More simple to just point to the About component
```

## Adding Links in the Navbar

### Don't use `<a>` tags

```javascript
// While using <a> tags within a list does produce working results, navigating back and forth from these <a> tag links loses the state
<ul>
    <li>
        <a href='/'>Home</a>
    </li>
    <li>
        <a href='/about'>About</a>
    </li>
</ul>
```

### Instead use `<Link>` from `react-router-dom`

-   State will be still intact

```javascript
import { Link } from 'react-router-dom';
// Change <a> to <Link> and href= to to=
<ul>
    <li>
        <Link to='/'>Home</Link>
    </li>
    <li>
        <Link to='/about'>About</Link>
    </li>
</ul>;
```

# XXII. Single User Component & Data

## Add new fetch request method for getting a single user

```javascript
getUser = async (username) => {
    this.setState({ loading: true });

    // url is now users/${username} rather than /search/users/ to grab the data from one user
    const res = await axios.get(
        `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ user: res.data, loading: false });
};
```

## Create single `User.js` component in `users/` folder

-   Create with `rce`
-   Will just return `<div>User</div>`
-   Add `<Route>` in `App.js`
