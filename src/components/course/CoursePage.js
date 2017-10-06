/**
 * Created by kyle on 9/25/17.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as courseAction from '../../actions/courseActions';
import Debounce from '../../utils/debounce';
import ThreadDirectory from './ThreadDirectory';

import Searchbar from './Searchbar';

class CoursePage extends React.Component{

    //TODO think about just getting threads from store at lower level
    render() {
        return (
            <div>
                    <ThreadDirectory threads={this.props.threads} searchAction={this.onSearchTermChange} />
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