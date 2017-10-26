/**
 * Created by kyle on 10/8/17.
 */
import React from 'react';
import CommentFooter from './CommentFooter';

class Comment extends  React.Component{
    constructor(props){
        super(props);
        this.toggleCommentStreamOnClick = this.toggleCommentStreamOnClick.bind(this);
    }

    toggleCommentStreamOnClick(event){
        this.props.toggleOpenCommentForm(this.props.post.id);
    }

    render(){
        const {indentLevel, paddingMultiplier, post} = this.props;

        return(
          <div style={{ fontFamily: 'fantasy', position: 'relative', borderColor: '#f5f5f5',  borderBottom: 'solid', marginTop: '2px', marginBottom: '2px', marginLeft: this.props.indentLevel * this.props.paddingMultiplier}} >
             <p >{this.props.post.name || this.props.defaultPosterName}:{this.props.post.text} </p>
              <CommentFooter comment={this.toggleCommentStreamOnClick} />
              {/* <button style={{height: '10px'}} onClick={this.toggleCommentStreamOnClick}> reply </button> */ }
              <br/>
          </div>
        );
    }
}
export default Comment;