/**
 * Created by kyle on 9/25/17.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as courseAction from '../../actions/courseActions';
import Debounce from '../../utils/debounce';

import Searchbar from './Searchbar';

class CoursePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          searchTerm: ''
        };

        this.onSearchTermChange = this.onSearchTermChange.bind(this);
    }

    onSearchTermChange(newSearchTerm){
        this.setState({searchTerm: newSearchTerm});
    }
    render() {
        return (
            <div>
                <h2>Christan boy im going to throw you in hell</h2>
                {
                    //just realised this is post and not threads lol
                    this.props.threads.map( thread => <p key={thread.id}> {thread.posttext} </p>)
                }
                <div className="sidebar">
                    <Searchbar searchAction={this.onSearchTermChange}/>
                </div>
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