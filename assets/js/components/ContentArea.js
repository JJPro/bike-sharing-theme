import React, { Component } from 'react';
import CanvasJSReact from '../lib/canvasjs.react.js';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ContentArea extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const options = {
      animationEnabled: true,
      //exportEnabled: true,
      theme: "light2", //"light1", "dark1", "dark2"
      title: {
        text: "Basic Column Chart in React - CanvasJS"
      },
      data: [
        {
          type: "column",
          dataPoints: [
            { label: "apple", y: 10 },
            { label: "orange", y: 15 },
            { label: "banana", y: 25 },
            { label: "mango", y: 30 },
            { label: "grape", y: 28 }
          ]
        }
      ]
    }
    return (
      <div>       
        <CanvasJSChart options={options}/>
      </div>
    );
  }
  
}

export default ContentArea;