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

    postsArrayToMapOnResponseIdOrderedByTimestamp(posts){
        const m = new Map();
        const key = responsetopostid;
        let post;
        for(let i = 0; i < posts.length; i++){
            post = posts[i];
            if(!m.get(post[key]))
                m.set(post[key], [post]);
            else{
              const postChain = m.get(post[key]);
              postChain.push(post);
            }
        }
        console.log("MAP");
        console.log(m);
        return m;
    }

    isPostTopLevel(key, value){
        return key === null;
    }
    postsToDivMapOnId(posts, filterFunc){
        if(!posts || posts.length == 0) return [];
        const divMap = new Map();
        const filteredDivs = [];
        const levelMap = this.postsArrayToMapOnResponseIdOrderedByTimestamp(posts);
        const levelMapIterator = levelMap.entries();
        let itrVal, divObj, sameLevelPosts, level;
        const KEY = 0, VALUE = 1;
        while( !(itrVal = levelMapIterator.next()).done){
            sameLevelPosts = itrVal.value[VALUE];
            level = itrVal.value[KEY];

            sameLevelPosts.forEach( post => {

                divObj = divMap.get(post.id) || new DivNode(post); // see if dumby already exists, if so use that first
                if(filterFunc && typeof filterFunc === 'function' && filterFunc(post, level))
                    filteredDivs.push(divObj);
                if (!this.isPostTopLevel(level)) {
                    // node to chain to hasn't been created yet so make dummy
                    if(divMap.get(level) === undefined)
                        divMap.set(level, new DivNode(null));
                    divMap.get(level).connect(divObj);
                }
                if(divMap.get(post.id) !== undefined) { // if dumby was made a node will already exist in that bucket
                    divMap.get(post.id).initPost(post); // so init note w/ actual post data
                    divObj = null;
                }
                else {
                    divMap.set(post.id, divObj);
                }
            });
        }
        return filteredDivs;
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
                <ul>
                    {this.postsToDivMapOnId(this.props.posts, (post, key) => key === null).map(divLinkedList => {
                        let padding = -20;
                        return divLinkedList.getDivChain().map(div => {
                            padding += 20;
                            return div.getDiv(padding);
                        });
                    })}
                </ul>

            </div>
        );
    }
}
export default MainDisplay;