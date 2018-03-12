/**
 * Created by kyle on 9/23/17.
 */
import React, {PropTypes} from 'react';

class LoadingWidget extends React.Component{
    constructor(props, context){
        super(props);
        this.state = {frame: 1};
    }

    componentDidMount(){
        this.interval = setInterval( () =>{
            this.setState({ //eslint-disable-line react/no-did-mount-set-state
                frame: this.state.frame + 1
            });
        }, this.props.interval);
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    render(){
        let dots = this.state.frame % (this.props.dots + 1);
        let text = '';
        while(dots > 0){
            text += '.';
            dots--;
        }
        return <span {...this.props}>{text}&nbsp;</span>;
    }
}

LoadingWidget.defaultProps = {
    interval: 300, dots: 3
};

LoadingWidget.propTypes = {
    interval: PropTypes.number,
    dots: PropTypes.number
};

export default LoadingWidget;

