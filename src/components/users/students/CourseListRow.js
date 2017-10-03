/**
 * Created by kyle on 9/24/17.
 */
import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const CourseListRow = ({course}) => {
    return(
        <tr>
            <td><Link to={'/course/' + course.classid}>{course.classname}</Link></td>
            <td>{course.ssid}</td>
        </tr>
    );
};

CourseListRow.propTypes = {
    course: PropTypes.object.isRequired
};

export default CourseListRow;