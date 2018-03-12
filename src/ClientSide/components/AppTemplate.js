/**
 * Created by kyle on 9/18/17.
 */
import React, {PropTypes} from 'react';
import Header from './common/Header';

class AppTemplate extends React.Component{

    render(){

        return(
            <div className="container-fluid">
                <Header />
                {this.props.children}

            </div>
        );
    }
}
console.log("PropTypes %s", JSON.stringify(PropTypes));
//Ensures a props.children isn't null and is an object
AppTemplate.propTypes = {
    children: PropTypes.object.isRequired
};

export default AppTemplate;