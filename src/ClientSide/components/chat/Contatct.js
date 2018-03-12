import React from 'react';


const ContactList = (props) => {

    return (
        <li style={{listStyleType: 'none', fontSize: '1em'}} onClick={props.openMessenge}>
            {props.userName}
        </li>
    );

};
