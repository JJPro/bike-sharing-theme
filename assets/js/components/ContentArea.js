import React, { Component } from 'react';
import CanvasJSReact from '../lib/canvasjs-2.3.2/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ContentArea extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    
  }

  render() {

    const options = {
      animationEnabled: true,
      title:{
        text: "Cross Factor Bike Sharing Chart"
      },
      subtitles: [{
        text: "Click Legend to Hide or Unhide Data Series"
      }], 
      axisX: {
        title: "Dates"
      },
      axisY: [{
        title: "Ozone",
        titleFontColor: "#C0504E",
        lineColor: "#C0504E",
        labelFontColor: "#C0504E",
        tickColor: "#C0504E"
      },
      {
        title: "Temperature - °F",
        suffix: " °F",
        titleFontColor: "#4F81BC",
        lineColor: "#4F81BC",
        labelFontColor: "#4F81BC",
        tickColor: "#4F81BC"
      }],
      axisY2: {
        title: "Rentals",
        titleFontColor: "#3b9820",
        lineColor: "#3b9820",
        labelFontColor: "#3b9820",
        tickColor: "#3b9820"
      },
      toolTip: {
        shared: true
      },
      legend: {
        cursor: "pointer",
        itemclick: toggleDataSeries
      },
      data: [{
        type: "column",
        name: "Temperature",
        axisYIndex: 0,
        showInLegend: true,      
        yValueFormatString: "#,##0.# °F",
        dataPoints: [
          { label: "12/1/2019",  y: 19.5 },
          { label: "12/2/2019", y: 20 },
          { label: "12/3/2019", y: 25 },
          { label: "12/4/2019",  y: 20 },
          { label: "12/5/2019",  y: 28 }
        ]
      },
      {
        type: "column",
        name: "Ozone",
        axisYIndex: 1,
        showInLegend: true,
        yValueFormatString: "#,##0.#",
        dataPoints: [
          { label: "12/1/2019", y: 210.5 },
          { label: "12/2/2019", y: 135 },
          { label: "12/3/2019", y: 425 },
          { label: "12/4/2019", y: 130 },
          { label: "12/5/2019", y: 528 }
        ]
      },
      {
        type: "line",
        name: "Male Rentals",
        axisYType: "secondary",
        showInLegend: true,
        yValueFormatString: "#,##0.#",
        dataPoints: [
          { label: "12/1/2019", y: 210.5 },
          { label: "12/2/2019", y: 135 },
          { label: "12/3/2019", y: 425 },
          { label: "12/4/2019", y: 130 },
          { label: "12/5/2019", y: 528 }
        ]
      },
      {
        type: "line",
        name: "Female Rentals",
        axisYType: "secondary",
        showInLegend: true,
        yValueFormatString: "#,##0.#",
        dataPoints: [
          { label: "12/1/2019", y: 110.5 },
          { label: "12/2/2019", y: 235 },
          { label: "12/3/2019", y: 225 },
          { label: "12/4/2019", y: 230 },
          { label: "12/5/2019", y: 228 }
        ]
      }]
    };

    function toggleDataSeries(e) {
      if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      } else {
        e.dataSeries.visible = true;
      }
      e.chart.render();
    };

    return (
      <div>       
        <CanvasJSChart options={options}/>
      </div>
    );
  }
}

export default ContentArea;