import React, { Component } from 'react';
import c3 from 'c3';

class Guage2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guagedata: props.errorcodedata
    };
  }

  componentDidMount() {
    // debugger
    this.guageChart();
  }

  guageChart() {
    // debugger
    const { guagedata } = this.state
    const errordata = guagedata.map((key,i) => {
      return {
        Date: key.date,
        Major: key.major,
        SuperMajor: key.supermajor
      }
    });
    const chart = c3.generate({
      bindto: '#Guage2',

      size: {
        height: 200,
        width: 500
      },
      data: {
        json: errordata,
        keys: {
          x: 'Date',
          value: ['Major', 'SuperMajor'],
        },
        xFormat: '%Y-%m-%d'
      },
      grid: {
        y: {
        show: true,
        }
        },
      axis: {
        x: {
          type: 'timeseries',
          // label: 'date',
          tick: {
            count: 5,
            format: '%e-%b-%y'
          }
        },
        y: {
          tick: {
            format: d3.format('.1f')
        },
          // label: 'value'
        },
      }
    });
  }
  render() {
    const {errorcodedata} = this.props
    // debugger
    return (
      <div className="box-body">
        <div id="Guage2" />
      </div>
    );
  }
}

export default Guage2;