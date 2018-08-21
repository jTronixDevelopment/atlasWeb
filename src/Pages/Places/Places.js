import React, { Component } from 'react';
import { Container } from 'reactstrap';

import FeedItem from '../../Components/FeedItem/FeedItem';

// == Classes ===================================================================
import DB from '../../Classes/Firebase/Database/Database';

import './Places.css';

export default class Places extends Component {
  constructor(props) {
    super(props);
    const { firebase } = this.props;
    this.db = new DB(firebase);
    this.firebase = firebase;
    this.state = {
      posts: [],
    };
    console.log(this.props)
  }

  // === Get Post ===============================================================

  componentDidMount() {

  }

  getPosts() {
    this.firebase.firestore().collection('posts')
      .where('location.test', '==', 'test').get()
      .then((querySnapshot) => {
        const posts = querySnapshot.docs;
        posts.postId = querySnapshot.id;
        this.setState({ posts });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { posts } = this.state;
    return (
      <Container className="feed-container">
        {
          posts.map(post => (
            <FeedItem key={post.id} post={post} />
          ))
        }
      </Container>
    );
  }
}
