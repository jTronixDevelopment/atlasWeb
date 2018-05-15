import React, { Component } from 'react';
import { Container } from 'reactstrap';

import FeedItem from './../../Components/FeedItem/FeedItem';

//== Classes ===================================================================
import DB from './../../Classes/Firebase/Database/Database';

import './Places.css'

export default class Places extends Component {

  constructor(props){
    super(props);
    this.db = new DB(this.props.firebase);
    this.firebase = this.props.firebase;
    this.state = {
      posts : []
    }
  }

  //=== Get Post ===============================================================

  getPosts(){
    this.props.firebase.firestore().collection('posts')
      .where('location.test','==','test').get()
      .then((querySnapshot)=>{
        var posts = querySnapshot.docs;
        posts.postId = querySnapshot.id;
        this.setState({ posts : posts})
        console.log(posts)
      })
      .catch((error)=>{
        console.log('error')
      })
  }

  componentWillMount(){
  }

  componentDidMount() {
    this.getPosts()
  }

  render() {
    return (
      <Container className='feed-container'>
        { this.state.posts.map((post)=>{
          return (
            <FeedItem key={post.id} firebase={this.props.firebase} post={post}/>
          )
        }) }
      </Container>
    );
  }
}
