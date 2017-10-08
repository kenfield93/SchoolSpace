/**
 * Created by kyle on 10/6/17.
 */
import React from 'react';
import * as courseAction from '../../actions/courseActions';

const styles = {
    container: {
        width: '80%',
        //  position: 'absolute',
        //paddingBottom: 10,
        borderStyle: 'solid',
        borderColor: '#aaaeef',
        borderWidth: 1,
        marginBottom: 10,
        marginLeft: '10px',
        float: 'right'
    }
};
class MainDisplay extends React.Component{
    constructor(props){
        super(props);

    }

    render() {
        return (
            <div style={styles.container}>
                {this.props.thread.title}
                <ul>
                    <li> FUck </li>

                    {this.props.posts.map(post => <li key={post.id}> {post.text}</li>)}
                </ul>

            </div>
        );
    }
}

export default MainDisplay;