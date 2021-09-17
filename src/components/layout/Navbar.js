import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Navbar extends Component {
    // Default props in case no props were passed in
    // Passed in props will overwrite these
    static defaultProps = {
        title: 'Github Finder',
    };

    // Typechecking for props
    static propTypes =  {
        title: PropTypes.string.isRequired,
    }

    render() {
        return (
            <nav className="navbar bg-primary">
                <h1>
                    <i className="fa fa-github"/>
                    {this.props.title}
                </h1>   
            </nav>
        )
    }
}

export default Navbar
