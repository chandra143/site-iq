import React, { Component } from 'react';
import c3 from 'c3';


class Price2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            price2: props.price2
        };
    }

    componentDidMount() {
        this.getPrice2Chart()

    }


    getPrice2Chart() {
        const { price2 } = this.state;
        // debugger
        const Price2 = price2.map((obj, i) => {
            // debugger
            return {
                Date: obj.date,
                Cash: obj.cash,
                Credit: obj.credit
            }
        })
        const chart = c3.generate({
            bindto: '#Price2',
            size: {
                height: 200,
                width: 270
            },
            colors: {
                date: "#dd4b39",
            },
            data: {
                json: Price2,
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
                <div id="Price2"></div >
            </div>
        )
    }
}


export default Price2; 