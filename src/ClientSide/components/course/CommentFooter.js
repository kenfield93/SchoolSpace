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
          textToDisplayOnCommentForm: "",
            toggleReplyForm: false,
            toggleEditForm: false
        };
        this.onReply = this.onReply.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.clearFormToggles = this.clearFormToggles.bind(this);
    }

    clearFormToggles(){
        return new Promise( (resolve, reject) =>{
            this.setState({toggleEditForm: false, toggleReplyForm: false}, resolve());
        })
    }
    onReply(event){
        const replyState = this.state.toggleReplyForm;
        this.clearFormToggles().then( () => {
            this.setState({
                commentAction: this.props.commentActions.reply,
                textToDisplayOnCommentForm: "",
                toggleReplyForm: !replyState
            });
        });
    }
    onEdit(event){
        const editState = this.state.toggleEditForm;
        this.clearFormToggles().then( () => {
            this.setState({
                commentAction: this.props.commentActions.edit,
                textToDisplayOnCommentForm: this.props.post.text,
                toggleEditForm: !editState
            });
        });
    }

    displayEdit(){
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
                <CommentForm clearForm={this.clearFormToggles} display={this.state.toggleReplyForm || this.state.toggleEditForm}
                             postId={this.props.post.id} initPostText={this.state.textToDisplayOnCommentForm}
                             commentAction={this.state.commentAction}
                />
            </div>
        );
    }
}

export default CommentFooter;