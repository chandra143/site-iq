import React, { Component } from 'react';
import c3 from 'c3';

class DoorAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Alertdata: props.Alertdata
    };
  }

  componentDidMount() {
    this.DoorAlertChart();
  }

  DoorAlertChart() {
    const { Alertdata } = this.state;
    // const Ratedata = flowdata.map((key) => {
    //     return {
    //         FlowRate: key.value,
    //         Time: key.report_time
    //     }
    // });
    //  console.log(Ratedata)
    const chart = c3.generate({
      bindto: '#DoorAlert',
      size: {
        height: 120,
        width: 140
      },
      data: {
        columns: [['Alert', 3, 5, 10, 23, 30]]
      },
      axis: {
        y: {
          tick: {
            count: 4,
            values: [10, 20, 30]
          }
        }
      }
    });
  }

  render() {
    return (
      <div className="box-body">
        <div id="DoorAlert" />
      </div>
    );
  }
}

export default DoorAlert;
