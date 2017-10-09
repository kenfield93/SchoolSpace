/**
 * Created by kyle on 9/25/17.
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as courseAction from '../../actions/courseActions';
import Debounce from '../../utils/debounce';

import ThreadDirectory from './ThreadDirectory';
import MainDisplay from './MainDisplay';
import Searchbar from './Searchbar';

const styles = {

    wrapper: {
        display: 'inline-block'
        //textAlign: 'left', /* Resetting the text alignment */
       // verticalAlign: 'top' /* Making sure inline-block element align to the top */
    }


};

class CoursePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            threadFocusId: -1
        };
        this.setThreadFocus = this.setThreadFocus.bind(this);
       this.getPostsFromMemStore = ((posts, thrid) => {
            return posts[thrid];
        }).bind(this);
    }
    //Todo: thing about putting this in redux store since multiple commonents might wanna use it
    setThreadFocus(id, fn){
        this.setState({threadFocusId: id}, () => {
             if(fn && typeof fn === 'function')
                fn(this.state.threadFocusId);
        });
    }

    componentWillUpdate(nextProps, nextState){
        if(!this.getPostsFromMemStore(nextProps.posts, nextState.threadFocusId)) {
                this.props.actions.loadPosts(nextState.threadFocusId);
            }

    }

    defaultDisplay(){ return [];}
    getPostsOrHomepage(){
        return this.getPostsFromMemStore(this.props.posts, this.state.threadFocusId) || this.defaultDisplay();
    }
    //TODO think about just getting threads from store at lower level
    render(){
        return (
            <div className="container" style={styles.wrapper}>
                    <ThreadDirectory threads={this.props.threads} searchAction={this.onSearchTermChange} setThreadFocus={this.setThreadFocus}/>
                    <MainDisplay threadId={this.state.threadFocusId} thread={{title:"TEST THREAD"}} posts={this.getPostsOrHomepage()}   />
            </div>

        );
    }

}

CoursePage.propTypes = {
    threads: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps){

    let posts = {};
    return{
        posts: state.posts? state.posts : {},
        threads:  state.threads? state.threads : []
    };
}

function mapDispatchToProps(dispatch, ownProps){
    const courseId = ownProps.params.id;
    const loadThreads = () => dispatch(courseAction.loadCourseThreads(courseId));
    const loadPostsFromDB = (id=-1) => dispatch(courseAction.loadPostsByThread(id));
    loadThreads();
    return{
        actions:{
            loadThreads,
            loadPosts: loadPostsFromDB
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);