/**
 * Created by kyle on 9/19/17.
 */
import React, {PropTypes} from 'react';

const ErrorMsg = (props) => {
    if(!props.err || props.err.length < 1) return null;
    return (
        <div className="warning">
            {props.err}
        </div>
    );
};

ErrorMsg.propTypes = {
    err: PropTypes.object.isRequired
};

export default ErrorMsg;