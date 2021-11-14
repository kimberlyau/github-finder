/* Sets up initial states and contains actions */
import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';

import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = (props) => {
    const initialState = null;

    const [state, dispatch] = useReducer(AlertReducer, initialState);

    // Set alert when user attempts to search with empty input
    const setAlert = (msg, type) => {
        dispatch({
            type: SET_ALERT,
            payload: { msg, type },
        });

        // Time out alert in 3 seconds
        setTimeout(() => ({ type: REMOVE_ALERT }), 3000);
    };

    return (
        <AlertContext.Provider
            value={{
                alert: state,
                setAlert,
            }}
        >
            {props.children}
        </AlertContext.Provider>
    );
};

export default AlertState;
