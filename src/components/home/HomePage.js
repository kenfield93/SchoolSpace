/**
 * Created by kyle on 9/18/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router';
import Login from './auth/Login';
import Signup from './auth/Signup';
import * as userAction from '../../actions/userAction';

/*TODO right now signup/login info are in url like get req, try doing non form way for that */
class HomePage extends React.Component {
    /* might need to add context for redux, dont think i need redux for this though */
    constructor(props){
        super(props);
        this.state = {
            loginStatus: null,
            signupStatus: null
        };
        this.loginUser = this.loginUser.bind(this);
        this.onSignup = this.onSignup.bind(this);
    }
    loginUser(email, password){

            this.props.login(email,password)
                .then(result => {
                    browserHistory.push('/classDirectory');
                }).catch( err => {
                this.setState({loginStatus: "Incorrect Email and/or Password"});
            });

        //}
    }

    onSignup(signUpInfo){

        event.preventDefault();


    }
    render(){
        return(
            <div className="jumbotron">
                <h1>Welcome to School Space!</h1>
                <p> Written in ES6 using Node.js, Express.js, PSQL, React, Redux, and React Router </p>
                <Login userLoginAction={this.loginUser} loginStatus={this.state.loginStatus} />
                <br/>
                <Link to="about" className="btn btn-primary btn-lg">Learn More</Link>
                <br /><br /><br /><br />
                <Signup onSignup={this.onSignup} signupStatus={this.state.signupStatus} />

            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
   return{}
}
function mapDispatchToProps(dispatch, ownProps){
    const login = (email,password) =>  dispatch(userAction.loginUser(email, password));
    return {login};
}

export default connect(mapStateToProps, mapDispatchToProps) (HomePage);