import React, { Component } from 'react';
import c3 from 'c3';


class Price3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            price3: props.price3
        };
    }

    componentDidMount() {
        this.getPrice3Chart()

    }


    getPrice3Chart() {
        const { price3 } = this.state;
        // debugger
        const Price3 = price3.map((obj, i) => {
            // debugger
            return {
                Date: obj.date,
                Cash: obj.cash,
                Credit: obj.credit
            }
        })
        const chart = c3.generate({
            bindto: '#Price3',
            size: {
                height: 200,
                width: 270
            },
            colors: {
                date: "#dd4b39",
            },
            data: {
                json: Price3,
                keys: {
                    x: 'Date',
                    value: ['Cash','Credit'],
                    // value1:[]
                },
                // type: 'bar',
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
                    tick: {
                        format: d3.format('.3f')
                    },
                },
            },
            // bar: {
            //     width: {
            //         ratio: 0.1
            //     },
            // }
        });

    }


    render() {
        return (
            <div className="box-body">
                <div id="Price3"></div >
            </div>
        )
    }
}


export default Price3; 