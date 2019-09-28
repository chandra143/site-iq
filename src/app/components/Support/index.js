import React, { Component } from 'react';
import {Link} from 'react-router';
import Site from '../Site';

class Support extends Component {
  constructor(){
    super();
    this.state = {};
  }

  render() {
    return <Site pageTitle="Support"></Site>;
  }
}

export default Support;
