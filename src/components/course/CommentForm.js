/**
 * Created by kyle on 10/11/17.
 */
import React from 'react';

class CommentForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            postText: props.initPostText || ""
        };
        this.onPostTextChange = ((txt) => {  this.setState({postText: txt.target.value});}).bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if( this.props.initPostText != nextProps.initPostText)
            this.setState({postText: nextProps.initPostText});
    }

    onFormSubmit(event){
        event.preventDefault();
        const text = this.state.postText;
        this.props.commentAction(this.props.postId, text);
        this.props.clearForm().then( () => {
            this.setState({postText: ''});
        });
    }
    render(){

        if( this.props.display)
            return(
                <form  method="post" onSubmit={this.onFormSubmit} >
                    <label htmlFor="post" />
                    <textarea type="text" value={this.state.postText} onChange={this.onPostTextChange}name="post"/>
                    <button type="submit"> Submit </button>
                </form>
            );
        return null;
    }
}
export default CommentForm;