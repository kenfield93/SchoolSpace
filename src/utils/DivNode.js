/**
 * Created by kyle on 10/8/17.
 */
import React from 'react';
class DivNode{
    constructor(post){
        this.next = null;
        this.post = post;
    }

    generateDiv(){

    }
    getDiv(padding){
        return(
          <div>
             <p style={{paddingLeft: padding || 0}}key={this.post.id}>{this.post.name}:{this.post.text} </p>
              <button > reply </button>
              <br/>
          </div>
        );
    }
    initPost(post){
        this.post = post;
    }
    //Node getting every layer. Need something like treating the node as a tree w/ this as root and printing
    // out divs in breadth first
    getDivChain(){
        const list = [this];
        let ptr = this.next;
        if(ptr){
            list.push(ptr);
            ptr = ptr.next;
        }
        console.log("DivChainList");
        console.log(list);
        return list;
    }
    connect(divNode){
        this.next = divNode;
        return divNode;
    }

}

export default DivNode;