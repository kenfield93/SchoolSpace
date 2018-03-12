/**
 * Created by kyle on 10/6/17.
 */
import React from 'react';
import ThreadListRow from './ThreadListRow';

const ThreadList = (props) => {
   return (

            <ul style={{listStyle: 'none',  paddingLeft:0}} className="table-hover">
                {props.threads.map( thread =>
                    <ThreadListRow key={thread.id} onThreadClick={props.onThreadClickGenerator(thread.id)}title={thread.title} text={thread.text} />
                )}
            </ul>
   );
};


export default ThreadList;