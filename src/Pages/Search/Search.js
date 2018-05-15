import React, { Component } from 'react'

import { TabContent, TabPane, Nav, NavItem, NavLink, Container } from 'reactstrap'

import SearchBar from './searchcomponents/searchbar';
import SearchResults from './searchcomponents/searchresults';

export default class App extends Component {
    constructor(props) {
      super(props);

      this.toggle = this.toggle.bind(this);
      this.state = {
        activeTab: 'People',
        peopleResults:"No Results Found",
        placesResults: "No Results Found"
      };
    }

    toggle(tab) {
      if (this.state.activeTab !== tab) {
        this.setState({
          activeTab: tab
        });
      }
    }
  render() {
    return (
      <Container>
        <SearchBar/>
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
              { this.state.peopleResults }
            </Container>
          </TabPane>
          <TabPane tabId="Places">
            <Container>
              { this.state.placesResults }
            </Container>
          </TabPane>
        </TabContent>
      </Container>
    );
  }
}
