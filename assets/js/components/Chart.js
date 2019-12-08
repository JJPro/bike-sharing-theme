import React, { Component } from 'react';
import CanvasJSReact from '../lib/canvasjs-2.3.2/canvasjs.react';

const Chart = ({weather, trip, enabledFactors}) => {
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;
  const corssFactors = [
    { label: 'Precipitation',    value: 'precipAccumulation',     color: '#f7acbc', suffix: 'cm' },
    { label: 'Temperature High', value: 'apparentTemperatureMax', color: '#ffcc99', suffix: '°F' },
    { label: 'Temperature Low',  value: 'apparentTemperatureMin', color: '#9b95c9', suffix: '°F' },
    { label: 'Humidity',         value: 'humidity',               color: '#b2d235', suffix: ''   },
    { label: 'Visibility',       value: 'visibility',             color: '#94d6da', suffix: ''   },
    { label: 'Ozone',            value: 'ozone',                  color: '#999d9c', suffix: ''   },
    { label: 'UV Index',         value: 'uvIndex',                color: '#c76968', suffix: ''   }
  ];
  // const colors = ['#C0504E', '#4F81BC', '#44c320', '#36D7B7', '#CDFFD8', '#FF5A52', '#282829', '#764BC4'];
  // const tripColors = ['#5981b7', '#fcaf17', '#8552a1', '#cc333f', '#6666FF', '#FF5A52', '#282829', '#764BC4'];
  enabledFactors = corssFactors.filter(f => enabledFactors.includes(f.value));
  const dataForEnabledFactors = enabledFactors.map((f, i) => ({
    type: 'column',
    name: f.label,
    color: f.color,
    axisYIndex: i,
    showInLegend: true,
    dataPoints: weather.map(w => ({
      label: w.date,
      y: parseFloat(w[f.value])
    }))
  }));
  const dataForTrips = {
    type: 'line',
    name: 'Rentals',
    color: "#5981b7",
    axisYType: 'secondary',
    showInLegend: true,
    yValueFormString: '#,##0.#',
    dataPoints: trip.map(t => ({
      label: t.date,
      y: parseInt(t.count)
    }))
  };

  console.log('weather data points', enabledFactors.map(f => weather.map(w => ({
    label: w.date,
    y: w[f.value]
  }))));
  console.log('trip data points', trip.map(t => ({
    label: t.date,
    y: t.count
  })));

  const toggleDataSeries = (e) => {
    if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    e.chart.render();
  };
  const options = {
    animationEnabled: true,
    title: {text: "Cross Factor Bike Sharing Chart"},
    subtitles: [{
      text: "Click Legend to Hide or Unhide Data Series"
    }],
    axisX: {
      title: "Dates",
      titleFontSize: 13,
      labelFontSize: 10,
    },
    axisY: enabledFactors.map(f => ({
      labelFontSize: 10,
      titleFontColor: f.color,
      lineColor: f.color,
      labelFontColor: f.color,
      tickColor: f.color,
      suffix: f.suffix,
    })),
    axisY2: {
      title: "Rentals",
      titleFontSize: 13,
      labelFontSize: 10,
      titleFontColor: "#5981b7",
      lineColor: "#5981b7",
      labelFontColor: "#5981b7",
      tickColor: "#5981b7"
    },
    toolTip: {
      shared: true
    },
    legend: {
      cursor: "pointer",
      reversed: true,
      itemclick: toggleDataSeries
    },
    data: [...dataForEnabledFactors, dataForTrips]
  };

  return <div id="chart-container">
    <CanvasJSChart options={options} />
  </div>;
}

export default Chart;