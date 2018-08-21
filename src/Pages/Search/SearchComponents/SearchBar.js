// Search SearchResults
import React, { Component } from 'react';
import '../Search.css';

import {
  FormGroup,
  Form,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  Badge,
} from 'reactstrap';

import { SearchIcon } from '../../../imgs/icons';

import DB from '../../../Classes/Firebase/Database/Database';


class App extends Component {
  constructor(props) {
    super(props);
    const {
      firebase,
    } = this.props;
    this.firebase = firebase;
    this.db = new DB(firebase);
    this.searchPeople = this.searchPeople.bind(this);
  }

  componentDidMount() {
    this.searchInput = document.getElementById('searchInput');
  }

  getSearchResults() {
    console.log('cool');
    this.firebase.firestore().collection('users')
      .where('firstName', '==', this.searchInput.value).get()
      .then((querySnapshot) => {
        this.showResults(querySnapshot.docs.map(doc => doc.data()));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  searchPeople() {
    this.getSearchResults();
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <InputGroup className="search-bar">
            <Input id="searchInput" />
            <InputGroupAddon addonType="append">
              <Button onClick={this.searchPeople}>
                <img alt="searchIcon" className="search-bar-icon" src={SearchIcon} />
              </Button>
            </InputGroupAddon>
          </InputGroup>
          <div className="flex-container">
            <h4><Badge className="primary-background black-text">Places</Badge></h4>
            <h4><Badge className="primary-background black-text">people</Badge></h4>
          </div>
        </FormGroup>
      </Form>
    );
  }
}

export default App;
