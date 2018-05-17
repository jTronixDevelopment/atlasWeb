import React, { Component } from 'react'

import { TabContent, TabPane, Nav, NavItem, NavLink, Container } from 'reactstrap'

import SearchBar from './searchcomponents/searchbar';

import FeedItem from './../../Components/FeedItem/FeedItem';
import PersonItem from './../../Components/PersonItem/PersonItem';

export default class App extends Component {
    constructor(props) {
      super(props);
      this.toggle = this.toggle.bind(this);
      this.state = {
        activeTab: 'People',
        peopleResults:[],
        placesResults: []
      };
    }

    toggle(tab) {
      if (this.state.activeTab !== tab) {
        this.setState({
          activeTab: tab
        });
      }
    }

    addPosts(posts){
      console.log(posts)
      this.setState({
        peopleResults : posts
      })
    }

  render() {
    return (
      <Container>
        <SearchBar firebase={this.props.firebase} showResults={this.addPosts.bind(this)}/>
        <Nav tabs>
          <NavItem>
            <NavLink className={ this.state.activeTab === 'People'?'active':'' } onClick={() => { this.toggle('People') }}>
              People
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={ this.state.activeTab === 'Places'?'active':'' } onClick={() => { this.toggle('Places') }}>
              Places
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="People">
            <Container>
              {
                this.state.peopleResults.map((post,i)=><PersonItem  key={i} userInfo={post}/>)
              }
            </Container>
          </TabPane>
          <TabPane tabId="Places">
            <Container>
              { this.state.placesResults.map((post,i)=><FeedItem key={i} userInfo={post}/>) }
            </Container>
          </TabPane>
        </TabContent>
      </Container>
    );
  }
}
