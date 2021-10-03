import React from 'react';
import PropTypes from 'prop-types';

/* Destructor props elements to avoid using props. notation */
const UserItem = ({user: {login, avatar_url, html_url}}) => {   
    return (
        <div className="card text-center">
            <img src={avatar_url} alt="" className="round-img" style={{width: '60px'}}/>
            <h3>{login}</h3>
            <div>
                <a href={html_url} className="btn btn btn-dark btn-sm my-1">More</a>
            </div>
        </div>
    );
}

UserItem.propTypes = {
    /* Created w/ React snippet ptor (PropType, Object, Required) */
    user: PropTypes.object.isRequired,
}

export default UserItem
