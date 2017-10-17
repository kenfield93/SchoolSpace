/**
 * Created by kyle on 9/19/17.
 */
import React, {PropTypes} from 'react';
import * as courseActions from '../../../actions/courseActions';
import {connect} from 'react-redux';
import CourseList from './CourseList';
import CourseForm from '../instructors/CourseForm';

class ClassDirectory extends React.Component{
    constructor(props){
        super(props);
    //    this.state = {classes: []};

    }

    /*
    TODO: possibly allow for deleting past courses here, if so we probably wanna make courses part of state
    and we would need to set the state to nextProps.courses if this.props.courses != nextProps.courses
    componentWillRecieveProps(nextProps){
        if(this.props.courses != nextProps.courses)
    }
    */

    render(){
        return(
            <div>
                <h2> Class List</h2>
                <CourseForm createNewCourse={this.props.createCourse}  />
                <CourseList courses={this.props.courses}/>
            </div>
        );
    }
}

ClassDirectory.propTypes = {
    courses: PropTypes.array.isRequired
};

function mapStateToProps(state){
    return{
        courses: state.courses
    };
}
function mapDispatchToProps(dispatch){
    dispatch(courseActions.loadUsersCourses());
    const createCourse = (name, ssId) => {
        //TODO get actual tokens to send
        const tokens = {accessToken: ''};
        return dispatch(courseActions.createCourse(name, ssId, tokens));
    };
    return{
        createCourse
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(ClassDirectory);