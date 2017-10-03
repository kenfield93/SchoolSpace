/**
 * Created by kyle on 9/18/17.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CourseForm from './CourseForm';
import * as courseActions from '../../actions/courseActions';

class CoursesPage extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            course: {title: ""}
        };
        this.handleCourseFieldChange = this.handleCourseFieldChange.bind(this);
        this.handleSaveNewCourse = this.handleSaveNewCourse.bind(this);
    }

    handleCourseFieldChange(event) {
        const field = event.target.name;
        const val = event.target.value;
        const c = {};
        c[field]= val;
        this.setState({
            course: c
        });
    }
    handleSaveNewCourse(){
        console.log(this.props);
        this.props.actions.createCourse(this.state.course);
    }
    courseRow(course, i){
        return (<div key={i}> {course.title} </div>);
    }

    render(){
        return(
            <div>
                <h1> Courses </h1>
                {this.props.courses.map(this.courseRow)}
                <CourseForm course={this.state.course}
                    onCourseFieldChange={this.handleCourseFieldChange}
                    onClickSave={this.handleSaveNewCourse}
                />
            </div>
        );
    }
}

CoursesPage.propTypes = {
    actions: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired
};

/*
 state: represents state inside redux store
 ownProps: props of this component (things passed down to it, like router related props). */
function mapStateToProps(state, ownProps){
    // returns list of props we want to be exposed on our component
    // for state.courses, 'courses' is the name defined inside rootreducer in /reducers/index.js
    return({
        courses: state.courses
    });
}
/* deciding what actions you want to expose on your component
*  if this func isn't passed to connect its automatically connects dispatch to this.state to fire off actions
* */
function mapDispatchToProps(dispatch){
    const createCourse = course => dispatch(courseActions.createCourse(course));
    return {
        actions: {
            createCourse
        }
    };

    /*Benefit of this way is that it binds all your actions in one line. (hiding them behind action can like above)
      Negative is that we have to go to the courseAction file to see the different actions available
   return{
       actions: bindActionCreators(courseActions, dispatch)
   };
   */
}
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);