/**
 * Created by kyle on 10/5/17.
 */
import React from 'react';
import debounce from '../../utils/debounce';

class Searchbar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchTerm: ''
        };
        this.onSearchTermChange = this.onSearchTermChange.bind(this);
        this.searchAction = debounce(this.props.searchAction, 500);
    }


 //   searchAction = loDebounce( this.props.searchAction , 500);

    onSearchTermChange(event){
        const val = event.target.value;
        this.setState({searchTerm: val}, () => {
            this.searchAction(this.state.searchTerm);
        });
    }


    render(){

        return(
           <div style={this.props.styles}>
               <input type="search"
                      placeholder="search or add a post..."
                      value={this.state.searchTerm}
                      onChange={this.onSearchTermChange}
               />

           </div>
        );
    }

}

export default Searchbar;