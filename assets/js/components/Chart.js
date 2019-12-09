import React, { Component } from 'react';
import CanvasJSReact from '../lib/canvasjs-2.3.2/canvasjs.react';

const Chart = ({weather, trip, enabledFactors, scatteredUserFilter, selectedRegions}) => {
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;
  const corssFactors = [
    { label: 'Precipitation',    value: 'precipAccumulation',     color: '#C0504E', suffix: 'cm' },
    { label: 'Temperature High', value: 'apparentTemperatureMax', color: '#4F81BC', suffix: '°F' },
    { label: 'Temperature Low',  value: 'apparentTemperatureMin', color: '#44c320', suffix: '°F' },
    { label: 'Humidity',         value: 'humidity',               color: '#36D7B7', suffix: ''   },
    { label: 'Visibility',       value: 'visibility',             color: '#CDFFD8', suffix: ''   },
    { label: 'Ozone',            value: 'ozone',                  color: '#FF5A52', suffix: ''   },
    { label: 'UV Index',         value: 'uvIndex',                color: '#282829', suffix: ''   }
  ];
  // const colors = ['#C0504E', '#4F81BC', '#44c320', '#36D7B7', '#CDFFD8', '#FF5A52', '#282829', '#764BC4'];
  enabledFactors = corssFactors.filter(f => enabledFactors.includes(f.value));
  const dataForEnabledFactors = enabledFactors.map((f, i) => ({
    type: 'column',
    name: f.label,
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
      Gender: [{label: 'Gender Unknown', value: '0'}, {label: 'Male', value: '1'}, {label: 'Female', value: '2'}],
      Age: [
        {label: '<= 16', value: '<= 16'},
        {label: '16-30', value: '16-30'},
        {label: '30-40', value: '30-40'},
        {label: '> 40',  value: '> 40' },
      ],
      Regions: selectedRegions
    };
    // console.log('allfil', allFilters);
    dataForTrips = allFilters[scatteredUserFilter].map(
      p => ({
        type: 'line',
        name: p.label,
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
      axisYType: 'secondary',
      // showInLegend: true,
      yValueFormString: '#,##0.#',
      dataPoints: trip.map(t => ({
        label: t.date,
        y: parseInt(t.count)
      }))
    }];
  }
  console.log('dataForTrips', dataForTrips);
  // const dataForTrips = {
  //   type: 'line',
  //   name: 'Rentals',
  //   axisYType: 'secondary',
  //   // showInLegend: true,
  //   yValueFormString: '#,##0.#',
  //   dataPoints: trip.map(t => ({
  //     label: t.date,
  //     y: parseInt(t.count)
  //   }))
  // };

  // console.log('weather data points', enabledFactors.map(f => weather.map(w => ({
  //   label: w.date,
  //   y: w[f.value]
  // }))));
  // console.log('trip data points', trip.map(t => ({
  //   label: t.date,
  //   y: t.count
  // })));

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
    toolTip: {
      shared: true
    },
    legend: {
      cursor: "pointer",
      itemclick: toggleDataSeries
    },
    data: [...dataForEnabledFactors, ...dataForTrips]
  };

  return <div id="chart-container">
    <CanvasJSChart options={options} />
  </div>;
}

export default Chart;