/**
 * Created by kyle on 10/6/17.
 */
import React from 'react';

const ThreadList = (props) => {
   return (
       <div>
         {props.threads.map( thread =><div key={thread.id}> <button> {thread.title} </button> <p style={{marginLeft: "50px"}} > {thread.text}</p> </div>)}
       </div>
   );
};


export default ThreadList;