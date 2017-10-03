/**
 * Created by kyle on 9/25/17.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as courseAction from '../../actions/courseActions';

class CoursePage extends React.Component{
    constructor(props){
        super(props);

    }
    render() {
        return (
            <div>
                <h2>Christan boy im going to throw you in hell</h2>
                {
                    this.props.threads.map( thread => <p key={thread.id}> {thread.title} </p>)
                }
            </div>
        );
    }

}

CoursePage.propTypes = {
    threads: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps){
    if(!state.threads && ownProps.actions) {
        ownProps.actions.loadThreads();
    }
    return{
        threads:  state.threads? state.threads : []
    };
}
function mapDispatchToProps(dispatch, ownProps){
    const courseId = ownProps.params.id;
    const loadThreads = () => dispatch(courseAction.loadCourseThreads(courseId));
    loadThreads();
    return{
        actions:{
            loadThreads
        }
    };

}
export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);