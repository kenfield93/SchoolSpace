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
          <div id={this.post.id}>
             <p style={{paddingLeft: padding || 0}}key={this.post.id}>{this.post.name}:{this.post.text} </p>
              <button > reply </button>
              <br/>
          </div>
        );
    }
    initPost(post){
        this.post = post;
    }

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