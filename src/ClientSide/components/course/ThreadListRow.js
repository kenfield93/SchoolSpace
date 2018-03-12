/**
 * Created by kyle on 10/6/17.
 */
import React from 'react';

const ThreadListRow = ({title, text, onThreadClick}) => {
    return(
        <li onClick={onThreadClick} style={{borderStyle: 'groove', cursor: 'default'}}>
                <span><b>{title} </b></span>
                <p> {text} </p>
            </li>
    );
};

export default ThreadListRow;