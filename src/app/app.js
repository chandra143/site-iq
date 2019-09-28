import React, { Component } from 'react';
import Routes from './routers/routes';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import { render } from 'react-dom';

class App extends Component {
  constructor(){
    super();
  }
  render() {
    return (
      <div>
        <Router ref="router">
          {Routes}
        </Router>
      </div>
    );
  }
}

export default App;
