/**
 * Created by kyle on 9/19/17.
 */
import React, {PropTypes} from 'react';
import ErrorMsg from '../../common/ErrorMsg';
import TextEmailInput from '../../common/TextInput';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.onLogin = this.onLogin.bind(this);
        this.onFieldChange = this.onFieldChange.bind(this);
    }

    onFieldChange(event){
        const stateField = event.target.name;
        const value = event.target.value;
        const o = {};
        o[stateField] = value;
        this.setState(o);
    }

    onLogin(event){
        event.preventDefault();
        this.props.userLoginAction(this.state.email, this.state.password);
        this.setState({email:'', password:''});
    }

    render() {
        return (
            <div>
                <TextEmailInput name="email" type="email" placeholder="email:" value={this.state.email}
                                onChange={this.onFieldChange} />
                <TextEmailInput name="password" type="password" placeholder="password:" value={this.state.password}
                                onChange={this.onFieldChange} />
                <label htmlFor="login"/>
                <input type="submit" name="login"
                       value="Login"
                       onClick={this.onLogin}/>
                <ErrorMsg err={this.props.loginStatus}/>
            </div>
        );
    }
}


Login.propTypes = {
    userLoginAction: PropTypes.func.isRequired,
    loginStatus: PropTypes.object.isRequired
};

export default Login;