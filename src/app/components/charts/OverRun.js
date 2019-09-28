import React, { Component } from 'react';
import c3 from 'c3';

class OverRun extends Component {
    constructor(props) {
        super(props);
        this.state = {
            overrundata: props.data
        };
    }

    componentDidMount() {
        this.OverRunChart()
    }


    OverRunChart() {
        const { overrundata } = this.state
        const OverRunData = overrundata.map((key) => {
            return {
                Date: key.date,
                SideA: key.sidea,
                SideB: key.sideb
            }
        });
        // console.log(UnderRunData)
        const chart = c3.generate({
            bindto: '#OverRun',
            size: {
                height: 200,
                width: 270
            },
            colors: {
                date: "#dd4b39",
            },
            data: {
                json: OverRunData,
                keys: {
                    x: 'Date',
                    value: ['SideA','SideB'],
                },
                type: 'bar',
                xFormat: '%Y-%m-%d'
            },
            grid: {
                y: {
                show: true,
                }
                },
            axis: {
                x: {
                    type: 'timeseries',
                    label: {
                        // text:'data',
                        // position:'outer-center',                       
                    },
                    tick: {
                        count:5,
                        format: "%b-%d"
                    },
                },
                y: {
                    tick: {
                        format: d3.format('d')
                    },
                    label: {
                        // text: 'value',
                        position: 'outer-middle'
                    }
                },
            },
            bar: {
                width: {
                    ratio: 0.3
                },
            }
        });
    }

    render() {
        return (
                <div className="box-body">
                    <div id="OverRun"></div >
                </div>
        )
    }
}


export default OverRun; 
