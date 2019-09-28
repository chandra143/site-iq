import React, { Component } from 'react';
import c3 from 'c3';


class Meter6 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meter6: props.meter6
        };
    }

    componentDidMount() {
        this.getMeter6Chart()
    }


    getMeter6Chart() {
        const { meter6 } = this.state;
        const Meter6 = meter6.map((obj, i) => { 
          return {
            Date: obj.date,
            Volume: obj.volume
          }
        })
        const chart = c3.generate({
          bindto: '#Meter6',
          size: {
            height: 200,
            width: 270
          },
          colors: {
            date: "#dd4b39",
          },
          data: {
            json: Meter6,
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
                <div id="Meter6"></div >
            </div>
        )
    }
}


export default Meter6; 