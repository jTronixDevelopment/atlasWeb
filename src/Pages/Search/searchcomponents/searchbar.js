//Search SearchResults
import React, { Component } from 'react'
import './../search.css'

import { SearchIcon } from './../../../imgs/icons.js';

import DB from '../../../Classes/Firebase/Database/Database'

import { FormGroup, Form, Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      searchInput : ""
    }
    this.db = new DB(this.props.firebase);
  }

  searchPeople(){
    this.setState({
      searchInput: this.searchInput.value
    })
    this.getSearchResults()
  }

  getSearchResults(){
    console.log('cool')
    this.props.firebase.firestore().collection('users')
      .where("firstName", '==' , this.searchInput.value ).get()
      .then((querySnapshot)=>{
        this.props.showResults(querySnapshot.docs.map(doc=>doc.data()))
      }).catch((err)=>{
        console.log(err)
      })
  }

  componentDidMount(){
    this.searchInput = document.getElementById('searchInput')
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <InputGroup className='search-bar'>
            <Input id='searchInput' />
            <InputGroupAddon addonType="append">
              <Button onClick={ this.searchPeople.bind(this) }>
                <img alt='searchIcon' className='search-bar-icon' src={ SearchIcon }/>
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </FormGroup>
      </Form>
    );
  }
}

export default App;
