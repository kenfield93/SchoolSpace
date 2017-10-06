/**
 * Created by kyle on 10/6/17.
 */
import React from 'react';
import Searchbar from './Searchbar';
import ThreadList from './ThreadList';

const styles = {
    container_style:
    {
        width: '20%',
        position: 'absolute',
        paddingBottom: 10,
        borderStyle: 'solid',
        borderColor: '#aaaeef',
        borderWidth: 1,
        marginBottom: 10,
        marginLeft: '0px'
    },
    searchbar_style:
    {
        width: '100%',
        paddingBottom: 5,
        borderBottomStyle: 'solid',
        borderBottomColor: 'blue',
        borderBottomWidth: 2,
        marginBottom: 2
    }
};

class ThreadDirectory extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchTerm: ''
        };

        this.onSearchTermChange = this.onSearchTermChange.bind(this);
    }

    onSearchTermChange(newSearchTerm){
        this.setState({searchTerm: newSearchTerm});
    }
    filterThreadByTerm(list, term){
        if(!list || !term || !term.trim())
            return list;
        return list.filter(thread => {
           const termRegex = new RegExp(term, 'i');
           return(
               (thread.title.match(termRegex) || ( thread.text && thread.text.match(termRegex) ) )
           );
        });
    }
    render(){
        return(
            <div style={styles.container_style} className="container"  >
                    <h2> Threads and stuff</h2>
                    <Searchbar styles={styles.searchbar_style} searchAction={this.onSearchTermChange}/>
                   <hr />
                    <ThreadList threads={this.filterThreadByTerm(this.props.threads, this.state.searchTerm)} />
            </div>
        );
    }
}

export default ThreadDirectory;