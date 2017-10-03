/**
 * Created by kyle on 9/24/17.
 */
import React, {PropTypes} from 'react';
import CourseListRow from './CourseListRow';

const CourseList = ({courses}) => {
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
};

CourseList.propTypes = {
    courses: PropTypes.array.isRequired
};

export default CourseList;