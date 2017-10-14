/**
 * Created by kyle on 9/19/17.
 */
import React, {PropTypes} from "react";
import ErrorMsg from '../../common/ErrorMsg';


const onSignUp = (event) => {
    event.preventDefault();
    const signUpInfo = {};
    console.log('Event.target.name');
    console.log(event.target.name);
    console.log('Event.target.value');
    console.log(event.target.value);
    console.log('Event.target.email');
    console.log(event.taget.email);
};

const Signup = (props) =>{

    return(
        <div className="col-lg-1">
            <form onSubmit={onSignUp}>
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
                />
            </form>
            <ErrorMsg err={props.signupStatus} />
        </div>
    );

};


Signup.propTypes = {
    onSignup: PropTypes.func.isRequired,
    signupStatus: PropTypes.object.isRequired
};

export default Signup;

