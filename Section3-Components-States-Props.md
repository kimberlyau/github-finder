# XII. Component Level State

## Application Updates

### UserItem and Users components

- Created a new file called users/ in components

  - New component: UserItem.js
    - Handles individual user item
  - New component: Users.js
    - Maps over hardcoded list of 3 users and creates a user item for each using passed in prop data

```javascript
    /* State in constructor: */
    constructor() {
    super();
    /* Using Github API: https://api.github.com/users */
    this.state = {
    id: 'id',
    login: 'mojombo',
    avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
    html_url: 'https://github.com/mojombo'
    }
    }

    /* State does not have to be in constructor */
    state = {
    id: 'id',
    login: 'mojombo',
    avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
    html_url: 'https://github.com/mojombo'
    };
```

# XIII. Stateless Functional Components

## Preview

- Traditionally before React Hooks, functional components were used for stateless components
  - Both Users and Navbar components do not have any states now
  - No reason for these components to be classes, will convert in next section

## Converting Class Components to Functional Components

- With React Hooks, it is possible to have states within functional components

```javascript
/* Class Component */
class UserItem extends Component {
  render() {
    const { login, avatar_url, html_url } = this.props.user;
    return (
      <div className="card text-center">
        <img
          src={avatar_url}
          alt=""
          className="round-img"
          style={{ width: '60px' }}
        />
        <h3>{login}</h3>
        <div>
          <a href={html_url} className="btn btn btn-dark btn-sm my-1">
            More
          </a>
        </div>
      </div>
    );
  }
}

/* Converted to Functional Component */
import PropTypes from 'prop-types';

const UserItem = ({ user: { login, avatar_url, html_url } }) => {
  return (
    <div className="card text-center">
      <img
        src={avatar_url}
        alt=""
        className="round-img"
        style={{ width: '60px' }}
      />
      <h3>{login}</h3>
      <div>
        <a href={html_url} className="btn btn btn-dark btn-sm my-1">
          More
        </a>
      </div>
    </div>
  );
};

UserItem.propTypes = {
  /* Created w/ React snippet ptor (PropType, Object, Required) */
  user: PropTypes.object.isRequired,
};
```

# XIV. HTTP Requests & Updating State

## Preview

- Since there will be components that will later interact w/ the Users component, we will want to move our users to the top level of the app
  - Provides a centralized place for state and functions that manipulate state
  - Will also be pulling from Github rather than using hardcoded values
  - This would change with integration of Redux or Context

## componentDidMount and Axios

### Installing Axios

`npm i axios`

### Upgrading all packages

`npm update`

### Axios Usage

```javascript
/* Using .then syntax */
  componentDidMount() {
    // Where you want requests to occur when component loads
    axios.get('https://api.github.com/users').then(res => console.log(res.data));
  }

/* Refactored */
  async componentDidMount() {
    // Where you want requests to occur when component loads
    const res = await axios.get('https://api.github.com/users').then(res => console.log(res.data));
  }
```

## Passing Prop Data from Github API

### App.js

```javascript
class App extends Component{
    state = {
    users: [],
    loading: false
    }

    async componentDidMount() {
    this.setState({loading: true});

    const res = await axios.get('https://api.github.com/users');

    /* Sets the state once data is retrieved from Github */
    this.setState({users: res.data, loading: false});
    }

    // render() {

    /* Passes in props to User component using state data that was set */
    <Users loading={this.state.loading} users={this.state.users}/>

    // ... }
}
```

## Error: mime.lookUp() is not a function in node.js

StackOverflow: https://stackoverflow.com/questions/60740950/mime-lookup-is-not-a-function-in-node-js

Solution:

```
npm uninstall mime
npm install mime@^1
```
