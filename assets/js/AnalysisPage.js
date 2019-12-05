import React, { Component } from 'react';
import Sidebar from './components/Sidebar';
import ContentArea from './components/ContentArea';

const AnalysisPage = () => {
  return <div className="container">
    <div className="page-header text-center">
      <h1>Cross Factor Bike Sharing Analysis in Boston Area</h1>
    </div>
    <div className="row">
      <div className="col-lg-3 sidebar"><Sidebar /></div>
      <div className="col-lg-9 main"><ContentArea /></div>
    </div>
  </div>;
};

export default AnalysisPage;