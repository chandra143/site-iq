import React, { Component } from 'react';
import c3 from 'c3';


class Meter3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meter3: props.meter3
        };
    }

    componentDidMount() {
        this.getMeter3Chart()
    }


    getMeter3Chart() {
        const { meter3 } = this.state;
        const Meter3 = meter3.map((obj, i) => {
          return {
            Date: obj.date,
            Volume: obj.volume
          }
        })
        const chart = c3.generate({
          bindto: '#Meter3',
          size: {
            height: 200,
            width: 270
          },
          colors: {
            date: "#dd4b39",
          },
          data: {
            json: Meter3,
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
                <div id="Meter3"></div >
            </div>
        )
    }
}


export default Meter3; 