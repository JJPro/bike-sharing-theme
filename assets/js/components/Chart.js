import React, { Component } from 'react';
import CanvasJSReact from '../lib/canvasjs-2.3.2/canvasjs.react';

const Chart = ({weather, trip, enabledFactors, scatteredUserFilter, selectedRegions}) => {
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
  const tripColors = ['#5981b7', '#fcaf17', '#8552a1', '#cc333f', '#6666FF'];
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

  var dataForTrips = [];
  if (scatteredUserFilter){
    const allFilters = {
      Gender: [
        {label: 'Gender Unknown', value: '0', color: '#5981b7'}, 
        {label: 'Male', value: '1', color: '#fcaf17'}, 
        {label: 'Female', value: '2', color: '#8552a1'}],
      Age: [
        {label: '<= 20', value: '<= 20', color: '#5981b7'},
        {label: '20-30', value: '20-30', color: '#fcaf17'},
        {label: '30-40', value: '30-40', color: '#8552a1'},
        {label: '40-50', value: '40-50', color: '#cc333f'},
        {label: '> 50',  value: '> 50', color: '#6666FF'},
      ],
      Regions: selectedRegions.map( (s, i) => ({
        value: s.value,
        label: s.label,
        color: tripColors[i]
      }))
    };
    console.log('selectedRegions', selectedRegions);
    dataForTrips = allFilters[scatteredUserFilter].map(
      p => ({
        type: 'line',
        name: p.label,
        color: p.color,
        markerType: "none",
        axisYType: 'secondary',
        showInLegend: true,
        yValueFormString: '#,##0.#',
        dataPoints: trip.filter(t => t[scatteredUserFilter.toLowerCase()] == p.value)
                        .map(t => ({label: t.date, y: parseInt(t.count)}))
      })
    );
  } else {
    dataForTrips = [{
      type: 'line',
      name: 'Rentals',
      color: "#5981b7",
      markerType: "none",
      axisYType: 'secondary',
      showInLegend: true,
      yValueFormString: '#,##0.#',
      dataPoints: trip.map(t => ({
        label: t.date,
        y: parseInt(t.count)
      }))
    }];
  }
  console.log('dataForTrips', dataForTrips);

  const toggleDataSeries = (e) => {
    if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    e.chart.render();
  };
  const options = {
    zoomEnabled: true,
    animationEnabled: true,
    title: {text: "Cross Factor Analysis Chart"},
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
      itemclick: toggleDataSeries,
      reversed: true
    },
    data: [...dataForEnabledFactors, ...dataForTrips]
  };

  return <div id="chart-container">
    <CanvasJSChart options={options} />
  </div>;
}

export default Chart;