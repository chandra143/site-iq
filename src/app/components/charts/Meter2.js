import React, { Component } from 'react';
import c3 from 'c3';


class Meter2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meter2: props.meter2
        };
    }

    componentDidMount() {
        this.getMeter2Chart()
    }


    getMeter2Chart() {
        const { meter2 } = this.state;
        const Report = meter2.map((obj, i) => {
          return {
            Date: obj.date,
            Volume: obj.volume
          }
        })
        const chart = c3.generate({
          bindto: '#Meter2',
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
              value: ['Volume'],
              // value1:[]
            },
            type: 'bar',
            xFormat: '%Y-%m-%d'
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
                format: '%e-%b-%y'
              }
            },
            y: {
              // label: 'value'
            },
          },          
            bar: {
                width: {
                    ratio: 0.1
                },
            }
        });
    
      }


    render() {
        return (
            <div className="box-body">
                <div id="Meter2"></div >
            </div>
        )
    }
}


export default Meter2; 