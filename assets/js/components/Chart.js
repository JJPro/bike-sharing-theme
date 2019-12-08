import React, { Component } from 'react';
import CanvasJSReact from '../lib/canvasjs-2.3.2/canvasjs.react';

const Chart = ({weather, trip, enabledFactors}) => {
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;
  const corssFactors = [
    { label: 'Precipitation',    value: 'precipAccumulation',     color: '#C0504E', suffix: 'cm' },
    { label: 'Temperature High', value: 'apparentTemperatureMax', color: '#4F81BC', suffix: '°F' },
    { label: 'Temperature Low',  value: 'apparentTemperatureMin', color: '#44c320', suffix: '°F' },
    { label: 'Humidity',         value: 'humidity',               color: '#36D7B7' },
    { label: 'Visibility',       value: 'visibility',             color: '#CDFFD8' },
    { label: 'Ozone',            value: 'ozone',                  color: '#FF5A52' },
    { label: 'UV Index',         value: 'uvIndex',                color: '#282829' }
  ];
  // const colors = ['#C0504E', '#4F81BC', '#44c320', '#36D7B7', '#CDFFD8', '#FF5A52', '#282829', '#764BC4'];
  enabledFactors = corssFactors.filter(f => enabledFactors.includes(f.value));
  const dataForEnabledFactors = enabledFactors.map(f => ({
    type: 'column',
    name: f.label,
    dataPoints: []
  }));
  const dataForTrips = {
    type: 'line',
    name: 'Rentals',
    axisYType: 'secondary',
    dataPoints: trip.map(t => ({

    }))
  };
  const options = {
    title: {text: "Cross Factor Bike Sharing Chart"},
    subtitles: [{
      text: "Click Legend to Hide or Unhide Data Series"
    }],
    axisX: {
      title: "Dates"
    },
    axisY: enabledFactors.map(f => ({
      title: f.label,
      titleFontColor: f.color,
      lineColor: f.color,
      labelFontColor: f.color,
      tickColor: f.color,
      suffix: f.suffix,
    })),
    axisY2: {
      title: "Rentals",
      titleFontColor: "#764BC4",
      lineColor: "#764BC4",
      labelFontColor: "#764BC4",
      tickColor: "#764BC4"
    },
    // data:
  };

  return <div id="chart-container">
    <CanvasJSChart options={options} />
  </div>;
}

export default Chart;