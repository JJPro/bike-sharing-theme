import React, { Component } from 'react';
import Sidebar from './components/Sidebar';
import Chart from './components/Chart';
import Axios from 'axios';
// import Loader from 'react-loader-spinner';
import { css } from '@emotion/core';
import { BounceLoader } from 'react-spinners';

class AnalysisPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hasData: false,
      isLoading: false,
      weather: {},
      trip: {},
      enabledCrossFactors: [],
      scatteredUserFilter: null,
      selectedRegions: [],
    };
  }

  /**
   * update state with given params
   * @param {Object} params {dateRange, crossFactors, userFilters}
   */
  fetchData(params) {
    console.log('params', params);
    this.setState({
      isLoading: true,
      enabledCrossFactors: params.crossFactors,
      scatteredUserFilter: params.scatteredUserFilter,
      selectedRegions: params.selectedRegions
    });
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
    const {start: startDate, end: endDate} = params.dateRange;
    const [{ gender }, { age }, { regions }] = params.userFilters;
    Axios.all(
      [
        // 1. fetch weather data
        Axios.get(`/wp-json/bikes/v1/weather/${startDate.format('YMMDD')}-${endDate.format('YMMDD')}`),
        // 2. fetch trip data
        Axios.get(`/wp-json/bikes/v1/trip/${startDate.format('YMMDD')}-${endDate.format('YMMDD')}`, {
          params: {
            gender, age,
            regions: regions.join(','),
            scatteredUserFilter: params.scatteredUserFilter
          }
        })
      ]
    )
    .then(Axios.spread( (weatherRes, tripRes) => {
      if (weatherRes.status === 200 && tripRes.status === 200){
        const {data: weather} = weatherRes;
        const {data: trip} = tripRes;
        console.log('weather', weather);
        console.log('trip', trip); // [{[optional att,] date, count}]
        this.setState({weather, trip, hasData: true, isLoading: false});
      }
    }));
  }

  render() {

    const style = {
      display: 'flex',
      width: '100%',
      height: '100vh',
      maxHeight: '700px',
      alignItems: 'center',
      justifyContent: 'center',
    };
    var ContentArea = <div style={style}><span>Make a selection on the left</span></div>;
    if (this.state.hasData) {
      ContentArea = <Chart
        weather={this.state.weather}
        trip={this.state.trip}
        enabledFactors={this.state.enabledCrossFactors}
        scatteredUserFilter={this.state.scatteredUserFilter}
        selectedRegions={this.state.selectedRegions}
      />;
    }
    if (this.state.isLoading) {
      ContentArea = <div style={style}>
        <BounceLoader
          size={150}
          sizeUnit={"px"}
          loading={this.state.isLoading}
          color="#36D7B7"
        />
      </div>;
    }

    return <div className="container">
      <div className="page-header text-center">
        <h1>Cross Factor Bike Sharing Analysis in Boston Area</h1>
      </div>
      <div className="row">
        <div className="col-lg-3 sidebar"><Sidebar applyFilters={params => this.fetchData(params)} /></div>
        <div className="col-lg-9 main">
          {ContentArea}
        </div>
      </div>
    </div>;
  }
}

export default AnalysisPage;
