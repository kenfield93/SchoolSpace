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
             <p style={{paddingLeft: padding || 0}}key={this.post.id}> {this.post.text} </p>
          </div>
        );
    }
    getDivChain(){
        const list = [this];
        let ptr = this.next;
        if(ptr){
            list.push(ptr);
            ptr = ptr.next;
        }
        return list;
    }
    connect(divNode){
        this.next = divNode;
        return divNode;
    }

}

export default DivNode;