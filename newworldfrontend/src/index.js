import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"
import Newworld from './components/Newworld';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Newworld />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
