/**
 * Created by kyle on 10/6/17.
 */
import React from 'react';
import Searchbar from './Searchbar';
import ThreadList from './ThreadList';

//TODO make this connected component and change the thread display frame (need to create) everytime  state.focusedThreadId changes
const styles = {
    container_style:
    {
        float: 'left',
        width: '30%'
        /*
        width: '25%',
      //  position: 'absolute',
        //paddingBottom: 10,
        borderStyle: 'solid',
        borderColor: '#aaaeef',
        borderWidth: 1,
        marginBottom: 10,
        marginLeft: '0px',
        float: 'left'
        */
    },
    searchbar_style:
    {
        /*
        width: '100%',
        paddingBottom: 5,
        borderBottomStyle: 'solid',
        borderBottomColor: 'blue',
        borderBottomWidth: 2,
        marginBottom: 2
        */
    }
};

class ThreadDirectory extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchTerm: '',
            focusedThreadId: -1
        };

        this.onSearchTermChange = this.onSearchTermChange.bind(this);
        this.generateOnThreadClick = this.generateOnThreadClick.bind(this);
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
   generateOnThreadClick(threadId){
       return function(){
           this.props.setThreadFocus(threadId);
       }.bind(this);


    }
    render(){
        return(
            <div style={styles.container_style}  >
                    <h2> Threads and stuff</h2>
                    <Searchbar styles={styles.searchbar_style} searchAction={this.onSearchTermChange}/>
                   <hr />
                    <ThreadList onThreadClickGenerator={this.generateOnThreadClick}
                                threads={this.filterThreadByTerm(this.props.threads, this.state.searchTerm)}
                    />
            </div>
        );
    }
}

export default ThreadDirectory;