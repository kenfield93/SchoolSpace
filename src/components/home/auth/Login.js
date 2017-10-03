/**
 * Created by kyle on 9/19/17.
 */
import React, {PropTypes} from 'react';
import ErrorMsg from '../../common/ErrorMsg';

const Login = (props) =>{

    return(
       <div>
           <label htmlFor="email" />
           <input type="email" name="email" placeholder="email"/>
           <label htmlFor="password" />
           <input type="password" name="password" placeholder="password"/>
           <label htmlFor="login" />
           <input type="submit" name="login"
                  value="Login"
                  onClick={props.onLogin} />
           <ErrorMsg err={props.loginStatus}/>
       </div>
    );
};



Login.propTypes = {
    onLogin: PropTypes.func.isRequired,
    loginStatus: PropTypes.object.isRequired
};

export default Login;