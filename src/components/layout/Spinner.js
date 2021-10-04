/* Created with rafce: reactArrowFunctionComponentExport */
import React, { Fragment } from 'react';
import spinner from './spinner.gif';

const Spinner = () => {
    return (
        // Technically can return Fragment directly with this arrow function without return () and {}
        <Fragment>
            <img src={spinner} alt='Loading...' style={{ width: '200px', margin: 'auto', display: 'block'}} />
        </Fragment>
    )
}

export default Spinner

