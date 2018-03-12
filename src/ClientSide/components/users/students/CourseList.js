/**
 * Created by kyle on 9/24/17.
 */
import React, {PropTypes} from 'react';
import CourseListRow from './CourseListRow';

const CourseList = ({courses}) => {
    if(!courses || courses.length == 0) {
        return (
            <div>
                <span> You currenlty aren't registered to any Courses. </span>
                <span> If you believe this is an error please speak to your Instructor </span>
            </div>
        );
    }
    else{
        return(
            <table className="table">
                <thead>
                <tr>
                    {/* <th>&nbsp;</th>*/ }
                    <th>Course</th>
                    <th>Session</th>
                </tr>
                </thead>
                <tbody>
                {courses.map(course =>
                    <CourseListRow key={course.classid} course={course} />
                )}
                </tbody>
            </table>
        );
    }
};

CourseList.propTypes = {
    courses: PropTypes.array.isRequired
};

export default CourseList;