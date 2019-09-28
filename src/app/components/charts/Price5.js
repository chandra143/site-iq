import React, { Component } from 'react';
import c3 from 'c3';


class Price5 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            price5: props.price5
        };
    }

    componentDidMount() {
        this.getPrice5Chart()

    }


    getPrice5Chart() {
        const { price5 } = this.state;
        // debugger
        const Price5 = price5.map((obj, i) => {
            // debugger
            return {
                Date: obj.date,
                Cash: obj.cash,
                Credit: obj.credit
            }
        })
        const chart = c3.generate({
            bindto: '#Price5',
            size: {
                height: 200,
                width: 270
            },
            colors: {
                date: "#dd4b39",
            },
            data: {
                json: Price5,
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
                <div id="Price5"></div >
            </div>
        )
    }
}


export default Price5; 