/**
 * Created by kyle on 10/6/17.
 */
import React from 'react';
import * as courseAction from '../../actions/courseActions';
import DivNode from '../../utils/DivNode';

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
            responsetoid: null
        };

        this.onPostTextChange = ((txt) => {  this.setState({postText: txt.target.value});}).bind(this);
        this.submitPost = this.submitPost.bind(this);
    }

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

    /* posts: array of post objects
       parentToChild: hash map of parentId => childId
     */
    getPrintPostInfo( parentToChild){
        let key = null;
        const printOrder = [];

        function printCommentsHelper(key, printOrder, height){
            if( !parentToChild.has(key))
                return;
            let sameLevelPostPtrs = parentToChild.get(key);
            sameLevelPostPtrs.forEach(post => {
                printOrder.push({order: post, height});
                printCommentsHelper(post.id, printOrder, height+1);
            });
        }
        printCommentsHelper(key, printOrder, 0);
        return printOrder;
    }

    printComments(posts){
        return this.getPrintPostInfo(this.mapOfPostsToDirectResponders(this.props.posts)).map((postPaddingPair) => {
            const post = postPaddingPair.order;
            const padding = postPaddingPair.height;
            return(
                <div style={{paddingLeft: padding*20}}> {post.text} </div>
            );
        });
    }
    
    submitPost(event){
        event.preventDefault();
        const post = {};
        post.text = this.state.postText;
        post.responsetoid = 2;
        post.threadId = this.props.threadId;
        this.props.createPost(post);
        this.setState({postText: ''});
    }

    render() {
        return (
            <div style={styles.container}>
                <form method="post" onSubmit={this.submitPost} >
                    <label htmlFor="post" />
                    <textarea type="text" value={this.state.postText} onChange={this.onPostTextChange}name="post"/>
                    <button type="submit"> Submit </button>
                </form>

                { (this.props.thread) ? this.props.thread.title : ''}
                {this.printComments(this.props.posts)}
            </div>
        );
    }
}
export default MainDisplay;