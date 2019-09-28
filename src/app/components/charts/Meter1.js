import React, { Component } from 'react';
import c3 from 'c3';


class Meter1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meter1: props.meter1
        };
    }

    componentDidMount() {
        this.getMeter1Chart()

    }


    getMeter1Chart() {
        const { meter1 } = this.state;
        // const meterdata = meter1[0]
        const Meter1 = meter1.map((obj, i) => {
            return {
                Date: obj.date,
                Volume: obj.volume
            }
        })
        const chart = c3.generate({
            bindto: '#Meter1',
            size: {
                height: 200,
                width: 270
              },
              colors: {
                date: "#dd4b39",
              },
              data: {
                json: Meter1,
                keys: {
                  x: 'Date',
                  value: ['Volume'],
                  // value1:[]
                },
                type: 'bar',
                xFormat: '%Y-%m-%d'
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
                <div id="Meter1"></div >
            </div>
        )
    }
}


export default Meter1; 