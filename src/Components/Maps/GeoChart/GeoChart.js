import React, { Component } from 'react';
import './GeoChart.css';

//=== Classes ==================================================================

//=== Components ===============================================================

//=== Classes ==================================================================
export default class ProfilePage extends Component {

  constructor(props){
    super(props);
  }

//=== Geochart Setup ===========================================================

  setUpGeoChart(){
    window.google.charts.load('current', {
      'packages': ['geochart'],
      'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
    });
    window.google.charts.setOnLoadCallback(this.showCountryPosts.bind(this));
  }

  showCountryPosts(){
    this.chart = new window.google.visualization.GeoChart(document.getElementById('map'));
    var data = window.google.visualization.arrayToDataTable([['Country', 'Posts'],["USA",100]])
    var options = {
      region: 'world', // Africa
      colorAxis: {colors: ['#fff','#e31b23']},
      backgroundColor: '#81d4fa',
      datalessRegionColor: '#fff',
      defaultColor: '#f5f5f5'
    };
    this.chart.draw(data, options);
  }

//=== Component Lifecycle ======================================================

  componentDidMount(){
    this.setUpGeoChart()
  }

  render() {
    return (
        <div ref='map'  id='map' style ={{ height:"auto",width:'100%' }}></div>
    )
  }
}
