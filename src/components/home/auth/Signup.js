/**
 * Created by kyle on 9/19/17.
 */
import React, {PropTypes} from "react";
import ErrorMsg from '../../common/ErrorMsg';

const Signup = (props) =>{

    return(
        <div className="col-lg-1">
            <label htmlFor="email" />
            <input name="email" type="email" placeholder="email:" />
            <label htmlFor="userName" />
            <input name="userName" type="text" placeholder = "user name:" />
            <br/>
            <label htmlFor="pwd" />
            <input name="pwd" type="password" placeholder="password:" />
            <label htmlFor="pwdVerify" />
            <input name="pwdVerify" type="password" placeholder="confirm password:" />
            <br />
            <label htmlFor="save" />
            <input type="submit" name="save"
                   value="Save"
                   onClick={props.onSignup}
            />
            <ErrorMsg err={props.signupStatus} />
        </div>
    );

};

Signup.propTypes = {
    onSignup: PropTypes.func.isRequired,
    signupStatus: PropTypes.object.isRequired
};

export default Signup;

