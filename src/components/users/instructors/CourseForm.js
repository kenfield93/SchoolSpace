/**
 * Created by kyle on 10/16/17.
 */
import React from 'react';
import TextInput from '../../common/TextInput';
import SelectInput from '../../common/SelectInput';

class CourseForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            schoolSession: null
        };
        this.onTextFieldChange = this.onTextFieldChange.bind(this);
        this.onSelectFieldChange = this.onSelectFieldChange.bind(this);
        this.onCreateNewCourse = this.onCreateNewCourse.bind(this);
    }

    onTextFieldChange(event){
        const stateField = event.target.name;
        const value = event.target.value;
        const o = {};
        o[stateField] = value;
        this.setState(o);
    }
    onSelectFieldChange(event){
        this.setState({schoolSession: event.target.value});
    }

    onCreateNewCourse(event){
        event.preventDefault();
        this.props.createNewCourse(this.state.name, this.state.schoolSession);
    }

    render(){
        return(
            <div>
                <h3> Create new Course</h3>
            <form>
                <TextInput name="name" type="text" placeholder="New Course Name"
                           value={this.state.name} onChange={this.onTextFieldChange}
                    />

                <SelectInput name="name" optionValues={[{value:1, name:'spring-15'}, {value:2, name:'fall-16'}]}
                             onChange={this.onSelectFieldChange}
                    />
                <input type="submit" name="login"
                       value="Login"
                       onClick={this.onCreateNewCourse}/>
            </form>
            </div>
        );
    }
}



export default CourseForm;

