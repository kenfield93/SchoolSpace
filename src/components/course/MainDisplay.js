/**
 * Created by kyle on 10/6/17.
 */
import React from 'react';

const MainDisplay = (props) => {
    return(
       <div style={{minHeight: '500px', overflow: "auto"}}>
           {props.thread.title}

       </div>
    );
};

export default MainDisplay;