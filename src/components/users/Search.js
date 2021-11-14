import React, { useState, useContext } from 'react';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {
    // Init context
    const githubContext = useContext(GithubContext);
    const alertContext = useContext(AlertContext);

    // const [variable, modififerFunc] = useState(defaultVal);
    const [text, setText] = useState('');

    const onChange = (e) => {
        // [e.target.name] uses the name as a key in case multiple fields like email are being input
        setText(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (text === '') {
            alertContext.setAlert('Please enter something', 'light');
        } else {
            githubContext.searchUsers(text);
            // Clear the form
            setText('');
        }
    };

    return (
        <div>
            <form onSubmit={onSubmit} className='form'>
                <input
                    type='text'
                    name='text'
                    placeholder='Search Users...'
                    value={text}
                    onChange={onChange}
                />
                <input
                    type='submit'
                    value='Search'
                    className='btn btn-dark btn-block'
                />
            </form>

            {/* Show button only if showClear is true */}
            {githubContext.users.length > 0 && (
                <button
                    className='btn btn-light btn-block'
                    onClick={githubContext.clearUsers}
                >
                    Clear
                </button>
            )}
        </div>
    );
};

export default Search;
