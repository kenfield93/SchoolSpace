/**
 * Created by kyle on 10/8/17.
 */
import React from 'react';
class Comment extends  React.Component{
    constructor(props){
        super(props);

        this.callOpenStreamOnClick = this.callOpenStreamOnClick.bind(this);
    }
    callOpenStreamOnClick(event){
        this.props.toggleOpenCommentForm(this.props.post.id);
    }

    render(){
        const {indentLevel, paddingMultiplier, post} = this.props;

        return(
          <div style={{borderColor: 'blue', borderStyle: 'solid', paddingLeft: this.props.indentLevel * this.props.paddingMultiplier}} >
             <p >{this.props.post.name || this.props.defaultPosterName}:{this.props.post.text} </p>
              <button onClick={this.callOpenStreamOnClick}> reply </button>
              <br/>
          </div>
        );
    }

}

export default Comment;