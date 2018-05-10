import React, { Component } from 'react';

//=== Style ====================================================================
import './Post'

export default class Post extends Component{

  constructor(props){
    super(props)
  }

  //=== Component Life Cycle ===================================================

  componentWillMount(){}

  componentWillUnmount() {}

  componentWillReceiveProps(){}

  componentWillUpdate(){}

  componentShouldUpdate(){}

  componentDidUpdate(){}

  componentDidMount(){}

  render(){
    return(
        <div>
          Post
        </div>
    )
  }
}
