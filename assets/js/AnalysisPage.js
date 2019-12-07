import React, { Component } from 'react';
import Sidebar from './components/Sidebar';
import ContentArea from './components/ContentArea';

class AnalysisPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  /**
   *
   * @param {Object} params {dateRange, crossFactors, userFilters}
   */
  fetchData(params) {
    // TODO: update state with given params
    console.log('params', params);
    /**
     * 1. fetch weather data within selected date range
     * 2. fetch trip data within selected date range
     */

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
