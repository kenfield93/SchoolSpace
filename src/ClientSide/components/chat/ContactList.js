import React from 'react';
import Contact from './Contatct';

const ContactList = (props) => {

    return (
      <div>
          <h2> Contact List For {props.className}</h2>
          <ul>
              {props.classMemberList.map( classMate => <Contact key={classMate.id} userId= {classMate.id}/>)}
          </ul>
      </div>
    );

};
