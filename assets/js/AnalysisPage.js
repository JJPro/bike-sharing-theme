import React, { Component } from 'react';
import Sidebar from './components/Sidebar';
import ContentArea from './components/ContentArea';
import Axios from 'axios';

class AnalysisPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hasData: false,
      weather: {},
      trip: {}
    };
  }

  /**
   * update state with given params
   * @param {Object} params {dateRange, crossFactors, userFilters}
   */
  fetchData(params) {
    console.log('params', params);
    /**
     * 1. fetch weather data within selected date range
     *    - endpoint: /wp-json/bikes/v1/weather/YYYYmmdd-YYYYmmdd
     * 2. fetch trip data within selected date range
     *    - endpoint: /wp-json/bikes/v1/trip/YYYYmmdd-YYYYmmdd
     *    - optional query vars:
     *        - gender: 0|1|2
     *        - age: 'All'|'<= 16'|'BETWEEN 16 AND 30'|'BETWEEN 30 AND 40'|'> 40'
     *        - regions : comma separetad numbers, no space in between
     */
    // 1. fetch weather data
    const {start: startDate, end: endDate} = params.dateRange;
    Axios.get(`/wp-json/bikes/v1/weather/${startDate.format('YMMDD')}-${endDate.format('YMMDD')}`)
    .then(res => {
      if (res.status === 200){
        const {data: weather} = res;
        console.log('weather', weather);
        this.setState({weather});
      }
    });

    // 2. fetch trip data
    const [{ gender }, { age }, { regions }] = params.userFilters;
    Axios.get(`/wp-json/bikes/v1/trip/${startDate.format('YMMDD')}-${endDate.format('YMMDD')}`, {
      params: {
        gender, age,
        regions: regions.join(',')
      }
    })
    .then(res => {
      if (res.status === 200){
        // console.log('data', res.data);
        const {data: trip} = res;
        console.log('trip', trip); // [{region_id, trip: [{date, count}]}]
        this.setState({trip, hasData: true});
      }
    });
  }

  render() {

    return <div className="container">
      <div className="page-header text-center">
        <h1>Cross Factor Bike Sharing Analysis in Boston Area</h1>
      </div>
      <div className="row">
        <div className="col-lg-3 sidebar"><Sidebar applyFilters={params => this.fetchData(params)} /></div>
        <div className="col-lg-9 main"><ContentArea /></div>
      </div>
    </div>;
  }
}

export default AnalysisPage;
