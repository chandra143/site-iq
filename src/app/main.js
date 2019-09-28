// require('file?name=[name].[ext]!../../index.html'); //for production build

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import App from './app';
import {AppContainer} from 'react-hot-loader';
// import '../styles/css/bootstrap.css';
import 'react-big-scheduler/lib/css/style.css';
import '../styles/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'animate.css/animate.css';
import '../styles/css/toastr.min.css';
import 'react-select/dist/react-select.css';
import 'c3/c3.min.css';
import '../styles/css/style.css';
import '../styles/css/custom.css';

React.PropTypes = PropTypes;

render(
  <AppContainer>
  <App/>
</AppContainer>, document.getElementById('app_root'));

if (module.hot) {
  module.hot.accept('./app', () => {
    const NextApp = require('./app').default;
    render(
      <AppContainer>
      <NextApp/>
    </AppContainer>, document.getElementById('app_container'));
  });
}
