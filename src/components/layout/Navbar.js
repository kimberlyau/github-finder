/* Created with rce React snippet */
import React from 'react'
import PropTypes from 'prop-types'

const Navbar = ({title}) => {
    return (
        <nav className="navbar bg-primary">
            <h1>
                <i className="fa fa-github"/>
                {title}
            </h1>   
        </nav>
    );
}

// Default props in case no props were passed in
// Passed in props will overwrite these
Navbar.defaultProps = {
    title: 'Github Finder',
};

// Typechecking for props
Navbar.propTypes =  {
    title: PropTypes.string.isRequired,
}

export default Navbar
