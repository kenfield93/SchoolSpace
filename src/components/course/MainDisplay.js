/**
 * Created by kyle on 10/6/17.
 */
import React from 'react';
import * as courseAction from '../../actions/courseActions';
import Comment from './Comment';
import CommentForm from './CommentForm';

const responsetopostid = 'responsetopostid';

const styles = {
    container: {
        float: 'right',
        borderStyle: 'solid',
        borderColor: '#aaaeef',
        width: '70%',
        height: '350px',
        marginTop: 40
        /*
        width: '80%',
        //  position: 'absolute',
        //paddingBottom: 10,
        borderStyle: 'solid',
        borderColor: '#aaaeef',
        borderWidth: 1,
        marginBottom: 10,
        marginLeft: '10px',
        float: 'right'
        */
    }
};

class MainDisplay extends React.Component{
    constructor(props){
        super(props);
        this.state={
            postText: '',
            responsetoid: null,
            parentOfNewPost: null
        };

        this.submitReplyPost = this.submitReplyPost.bind(this);
        this.submitTopLevelPost = this.submitTopLevelPost.bind(this);
        this.toggleOpenCommentForm = this.toggleOpenCommentForm.bind(this);
    }

    /*************************************************************************
      These 2 functions are responsible for rearanging the posts array into an array
      of posts in the correct order to be printed, along with their indention level
     */

     /*
     * @param posts: array of posts
     * @returns {Map} inverted hashmap where the parent post id maps to it's child post id
     *                rather than post.id mapping to responsetopostid
     * The point of this is so that we can basically do DFS from each Top Level Comment down to their 'leaf' comments
     */
    mapOfPostsToDirectResponders(posts){
        const dict = new Map();
        let id;
        let parentid;
        posts.map((post ) => {
            id = post.id; parentid = post.responsetopostid;
            if(dict.has(parentid)) {
                dict.get(parentid).push(post);
            }
            else {
                dict.set(parentid, [post]);
            }
        });
        return dict;
    }
    /*
     * @param parentToChild: A dictionary mapping a post to allow the posts that directly responded to it
     * @returns {arrayOf({post, level})} Representing the order in which the posts should be printed out, and
     *                                    their level or indention factor
     */
    getPrintPostInfo( parentToChild){
        let key = null;
        const printOrder = [];

        function printCommentsHelper(key, printOrder, level){
            if( !parentToChild.has(key))
                return;
            let sameLevelPostPtrs = parentToChild.get(key);
            sameLevelPostPtrs.forEach(post => {
                printOrder.push({order: post, level});
                printCommentsHelper(post.id, printOrder, level+1);
            });
        }
        printCommentsHelper(key, printOrder, 0);
        return printOrder;
    }
/********************************************************************/

   submitReplyPost(text) {
            const post = {};
            post.text = text;
            post.responsetoid = this.state.parentOfNewPost;
            post.threadId = this.props.threadId;
            this.props.createPost(post);
            this.setState({parentOfNewPost: null});
    }
    submitTopLevelPost(text){
            this.setState({parentOfNewPost:null}, () =>{
                this.submitReplyPost(text)
            });
    };

    // refactor into open/close commentForm
    toggleOpenCommentForm( parentPostId=null){
        this.setState((prevState, props)=>{
            if(prevState.parentOfNewPost == parentPostId){
                return {parentOfNewPost: null}
            }
            else{
                return {parentOfNewPost: parentPostId}
            }
        });
    }

    //Todo, sort by likecount or timestamp. Either stick to one or let user chose or maybe sort by time the first 24 hour then like count after
    /*
     * @param posts. Array of posts. Relies on post.id and post.responsetopostid. to arragne and print in right order
     * @returns {arrayOf(divs)} Where each div represents a row in the thread w/ comment info and reply_btn/reply form
     */
    printComments(posts){
        return this.getPrintPostInfo(this.mapOfPostsToDirectResponders(this.props.posts)).map((postPaddingPair) => {
            const post = postPaddingPair.order;
            const padding = postPaddingPair.level;

            return(
                <div>
                    <Comment key={post.id} toggleOpenCommentForm={this.toggleOpenCommentForm} indentLevel={padding}
                             paddingMultiplier={20} post={post} defaultPosterName={this.props.userName}
                    />
                    <CommentForm display={this.state.parentOfNewPost == post.id}
                            createPost={this.submitReplyPost}
                    />
                </div>
            );
        });
    }
    render() {
        return (
            <div style={styles.container}>

                <p style={{fontSize:24}}> <b><i> {(this.props.thread) ? this.props.thread.title : ''} </i></b> </p>
                <br/>
                <span> Leave a comment here: </span>
                <CommentForm display={true} createPost={this.submitTopLevelPost}/>
                {this.printComments(this.props.posts)}
            </div>
        );
    }
}
export default MainDisplay;