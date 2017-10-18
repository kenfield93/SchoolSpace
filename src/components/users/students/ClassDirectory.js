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

    componentWillUnmount(){
        //clear stateSession from Redux store since it isn't really going to be useful to other parts of the site
        this.props.clearSchoolSessions();
    }
    joinCourseAndSchoolSession(courses, schoolSessions, joinKey){

        return courses.map(c => {
            const sessions = schoolSessions.filter(s => s[joinKey] == c[joinKey]);
            const session = sessions.pop();
            c.session = session ? session.session : null;
            return c;
        });
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
                <CourseForm createNewCourse={this.props.createCourse}  schoolSessions={this.props.schoolSessions}  />
                <CourseList courses={this.joinCourseAndSchoolSession(this.props.courses, this.props.schoolSessions, 'ssid')}/>
            </div>
        );
    }
}

ClassDirectory.propTypes = {
    courses: PropTypes.array.isRequired
};

function mapStateToProps(state){
    return{
        courses: state.courses,
        schoolSessions: state.schoolSessions
    };
}
function mapDispatchToProps(dispatch){
    dispatch(courseActions.loadUsersCourses());
    const createCourse = (name, ssId) => {
        //TODO get actual tokens to send
        const tokens = {accessToken: ''};
        return dispatch(courseActions.createCourse(name, ssId, tokens));
    };
    const loadSchoolSessions = () =>{
        const tokens = {accessToken: ''};
        return dispatch(courseActions.loadSchoolSessions(tokens));
    };
    //Note: even if I don't need schoolSessions for making a new course, will still use to display session for class list
    loadSchoolSessions();

    return{
        createCourse,
        loadSchoolSessions,
        clearSchoolSessions: courseActions.clearSchoolSessions
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(ClassDirectory);