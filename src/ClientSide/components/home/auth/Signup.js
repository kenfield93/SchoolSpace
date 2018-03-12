/**
 * Created by kyle on 9/19/17.
 */
import React, {PropTypes} from "react";
import ErrorMsg from '../../common/ErrorMsg';
import TextEmailInput from '../../common/TextInput';

class Signup extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            email: '',
            name: '',
            password: '',
            confirmPassword: ''
        };
        this.onFieldChange = this.onFieldChange.bind(this);
        this.onSignup = this.onSignup.bind(this);
    }

    onFieldChange(event){
        const stateField = event.target.name;
        const value = event.target.value;
        const o = {};
        o[stateField] = value;
        this.setState(o);
    }
    onSignup(event){
        event.preventDefault();
        this.props.userSignupAction(this.state.email,this.state.name,this.state.password, this.state.confirmPassword);
        this.setState({email:'', name:'', password:'', confirmPassword:''});
    }

    render(){
        return(
            <div className="">
                <form onSubmit={this.onSignup}>
                    <TextEmailInput name="email" type="email" placeholder="email:" value={this.state.email}
                                    onChange={this.onFieldChange}
                    />
                    <TextEmailInput name="name" type="text" placeholder="user name:"
                                    value={this.state.name} onChange={this.onFieldChange}
                    />
                    <br/>
                    <TextEmailInput name="password" type="password" placeholder="password:"
                                    value={this.state.password} onChange={this.onFieldChange}
                    />
                    <TextEmailInput name="confirmPassword" type="password" placeholder="confirm password:"
                                    value={this.state.confirmPassword} onChange={this.onFieldChange}
                    />
                    <br />
                    <label htmlFor="save" />
                    <input type="submit" name="save"
                           value="Save"
                    />
                </form>
                <ErrorMsg err={this.props.signupStatus} />
            </div>
        );
    }
}

Signup.propTypes = {
    onSignup: PropTypes.func.isRequired,
    signupStatus: PropTypes.object.isRequired
};
export default Signup;

