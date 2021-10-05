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
