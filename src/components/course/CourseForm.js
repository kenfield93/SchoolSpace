/**
 * Created by kyle on 9/19/17.
 */
import React, {PropTypes} from 'react';

const CourseForm = (props) => {
    return(
      <div>
          <h2>Add Course</h2>
          <label htmlFor="title" />
          <input type="text" name="title"
                 onChange={props.onCourseFieldChange}
                 value={props.course.title}
          />

          <input type="submit" name="save"
                 value="Save"
                 onClick={props.onClickSave}
          />
      </div>
    );
};

CourseForm.propTypes = {
    course: PropTypes.object.isRequired,
    onCourseFieldChange: PropTypes.func.isRequired,
    onClickSave: PropTypes.func.isRequired
};
export default CourseForm;