import React, { Component } from 'react';

class NewFooter extends Component {
  constructor(){
    super();
    this.state = {};
  }
  render() {
    return <footer className="main-footer">
      <div className="pull-right hidden-xs"></div>
      <strong>Copyright © 2019
        <a href="javascript:void(0);"> Site IQ</a>.
      </strong> All rights reserved.
    </footer>;
  }
}

export default NewFooter;
