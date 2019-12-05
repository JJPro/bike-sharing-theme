import React from 'react';
import { render } from "react-dom";
import AnalysisPage from './AnalysisPage';
import 'bootstrap';

(
  () => {
    document.addEventListener('DOMContentLoaded', () => {
      render(<AnalysisPage />, document.getElementById('app'));
    });
  }
)();