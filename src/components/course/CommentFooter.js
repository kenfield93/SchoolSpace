/**
 * Created by kyle on 10/23/17.
 */
import React from 'react';
const styles={
    textAlign: 'center',
   display: 'inline',
   float: 'left',
    cursor: 'pointer',
    marginLeft: '10px'


};

const CommentFooter = (props) => {
    return(

            <ul style={{  margin: '0px', paddingLeft: 0, position: 'absolute', bottom: 0, left: 0}} >
                <li style={styles} onClick={props.comment}>Reply</li>
                <li style={styles} >Edit</li>
                <li style={styles}>Report</li>
            </ul>
    );
};

export default CommentFooter;