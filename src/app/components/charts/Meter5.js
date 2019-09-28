import React, { Component } from 'react';
import c3 from 'c3';


class Meter5 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meter5: props.meter5
        };
    }

    componentDidMount() {
        this.getMeter5Chart()
    }


    getMeter5Chart() {
        const { meter5 } = this.state;
        const Meter5 = meter5.map((obj, i) => {
          return {
            Date: obj.date,
            Volume: obj.volume
          }
        })
        const chart = c3.generate({
          bindto: '#Meter5',
          size: {
            height: 200,
            width: 270
          },
          colors: {
            date: "#dd4b39",
          },
          data: {
            json: Meter5,
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
                <div id="Meter5"></div >
            </div>
        )
    }
}


export default Meter5; 