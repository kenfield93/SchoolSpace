/**
 * Created by kyle on 10/23/17.
 */
import React from 'react';
import CommentForm from './CommentForm';
const styles={
    textAlign: 'center',
   display: 'inline',
   float: 'left',
    cursor: 'pointer',
    marginLeft: '10px'
};

class CommentFooter extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          commentAction: null,
          textToDisplayOnCommentForm: ""
        };
        this.onReply = this.onReply.bind(this);
        this.onEdit = this.onEdit.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState){
        return true;
    }
    onReply(event){
        this.setState({commentAction: this.props.commentActions.reply, textToDisplayOnCommentForm: ""});
        this.props.comment(event);
    }
    onEdit(event){
        this.setState({commentAction: this.props.commentActions.edit,  textToDisplayOnCommentForm: this.props.post.text}, () => {
            this.props.comment(event);
        });
    }
    displayEdit(){
        // targetedPostText={this.props.post.text }
        if(this.props.post.usrid == this.props.userId)
            return <li style={styles} onClick={this.onEdit} >Edit</li>
    }
    render() {
        return (
            <div>
                <ul style={{  margin: '0px', paddingLeft: 0, position: 'absolute', bottom: 0, left: 0}}>
                    <li style={styles} onClick={this.onReply}>Reply</li>
                    {/*<li style={styles} onClick={this.onEdit} >Edit</li> */}
                    {this.displayEdit()}

                    <li style={styles}>Report</li>
                </ul>
                <CommentForm display={this.props.display} initPostText={this.state.textToDisplayOnCommentForm} commentAction={this.state.commentAction}/>
            </div>
        );
    }
}

export default CommentFooter;