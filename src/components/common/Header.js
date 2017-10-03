/**
 * Created by kyle on 9/18/17.
 */

import React, {PropTypes} from 'react';
import {Link, IndexLink } from 'react-router';

// activeCLassName is part of react router and allows us to style currently selected anchor
const Header =  (props) =>{
    return(
        <div>
             <p>School Space, your classroom out of the classroom</p>
            <nav>
                <IndexLink to="/" activeClassName="active">Home</IndexLink>
                 {" | "}
                <Link to="/about" activeClassName="active">About</Link>
                {" | "}
                <Link to="/courses" activeClassName="active">Courses</Link>
             </nav>
        </div>
    );
};

export default Header;