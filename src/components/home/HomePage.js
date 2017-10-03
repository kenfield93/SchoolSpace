/**
 * Created by kyle on 9/18/17.
 */
import React from 'react';
import {browserHistory, Link} from 'react-router';
import Login from './auth/Login';
import Signup from './auth/Signup';

/*TODO right now signup/login info are in url like get req, try doing non form way for that */
class HomePage extends React.Component {
    /* might need to add context for redux, dont think i need redux for this though */
    constructor(props){
        super(props);
        this.state = {
            loginStatus: null,
            signupStatus: null
        };
        this.onLogin = this.onLogin.bind(this);
        this.onSignup = this.onSignup.bind(this);
    }
    onLogin(event){


        /*const coinFlip = Math.floor(Math.random() * 10)+1;
        if(coinFlip  % 2 === 0){
            if(coinFlip >=5 )
                this.setState({loginStatus:{msg: "Too many login attempts"}});
            else
                this.setState({loginStatus:{msg: "Incorrect Username AND/OR password"}});
        }
        else{
*/
            browserHistory.push('/classDirectory');

        //}
    }

    onSignup(event){

    }
    render(){
        return(
            <div className="jumbotron">
                <h1>Welcome to School Space!</h1>
                <p> Written in ES6 using Node.js, Express.js, PSQL, React, Redux, and React Router </p>
                <Login onLogin={this.onLogin} loginStatus={this.state.loginStatus} />
                <br/>
                <Link to="about" className="btn btn-primary btn-lg">Learn More</Link>
                <br /><br /><br /><br />
                <Signup onSignup={this.onSignup} signupStatus={this.state.signupStatus} />

            </div>
        );
    }
}

export default  HomePage;