import React, { Component } from 'react';
import c3 from 'c3';


class Price6 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            price6: props.price6
        };
    }

    componentDidMount() {
        this.getPrice6Chart()

    }


    getPrice6Chart() {
        const { price6 } = this.state;
        // debugger
        const Price6 = price6.map((obj, i) => {
            // debugger
            return {
                Date: obj.date,
                Cash: obj.cash,
                Credit: obj.credit
            }
        })
        const chart = c3.generate({
            bindto: '#Price6',
            size: {
                height: 200,
                width: 270
            },
            colors: {
                date: "#dd4b39",
            },
            data: {
                json: Price6,
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
                <div id="Price6"></div >
            </div>
        )
    }
}


export default Price6; 