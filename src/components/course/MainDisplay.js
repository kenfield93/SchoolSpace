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
                divObj = new DivNode(post);
                if(filterFunc && typeof filterFunc === 'function' && filterFunc(post, level))
                    filteredDivs.push(divObj);
                if (!this.isPostTopLevel(level)) {
                    divMap.get(level).connect(divObj);
                }
                divMap.set(post.id, divObj);
            });
        }
        return filteredDivs;
    }

    render() {
        return (
            <div style={styles.container}>
                {this.props.thread.title}
                <ul>
                    <li> </li>
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