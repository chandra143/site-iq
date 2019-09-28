import React, { Component } from 'react';
import c3 from 'c3';


class FlowRateB extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flowdata: props.flowRateB
        };
    }

    componentDidMount() {
        this.getFlowRateBChart()
    }


    getFlowRateBChart() {
        const { flowdata } = this.state;
        const Report = flowdata.map((obj, i) => {
          
          return {
            m1: obj.FlowGrade1,
            m2: obj.FlowGrade2,
            m3: obj.FlowGrade3,
            m4: obj.FlowGrade4,
            m5: obj.FlowGrade5,
            m6: obj.FlowGrade6,
            Date: obj.date
          }
        })
        const chart = c3.generate({
          bindto: '#FlowRateB',
          size: {
            height: 200,
            width: 270
          },
          colors: {
            date: "#dd4b39",
          },
          data: {
            json: Report,
            keys: {
              x: 'Date',
              value: ['m1', 'm2', 'm3', 'm4', 'm5', 'm6'],
              // value1:[]
            },
            // type: 'bar',
            xFormat: '%Y-%m-%d %H:%M:%S'
          },
          grid: {
            y: {
            show: true,
            }
            },
          legend: {
            show: false
        },
          axis: {
            x: {
              type: 'timeseries',
              // label: 'date',
              tick: {
                count: 5,
                format: "%b-%d"
              }
            },
            y: {
              // label: 'value'
            },
          }
        });
    
      }


    render() {
        return (
            <div className="box-body">
                <div id="FlowRateB"></div>
            </div>
        )
    }
}


export default FlowRateB; 