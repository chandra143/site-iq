import React, { Component } from 'react';
import c3 from 'c3';


class Meter4 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meter4: props.meter4
        };
    }

    componentDidMount() {
        this.getMeter4Chart()
    }


    getMeter4Chart() {
        const { meter4 } = this.state;
        const Meter4 = meter4.map((obj, i) => {  
          return {
            Date: obj.date,
            Volume: obj.volume
          }
        })
        const chart = c3.generate({
          bindto: '#Meter4',
          size: {
            height: 200,
            width: 270
          },
          colors: {
            date: "#dd4b39",
          },
          data: {
            json: Meter4,
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
                <div id="Meter4"></div >
            </div>
        )
    }
}


export default Meter4; 