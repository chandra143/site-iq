import React, { Component } from 'react';
import c3 from 'c3';

class UnderRun extends Component {
    constructor(props) {
        super(props);
        this.state = {
            underrundata: props.data
        };
    }

    componentDidMount() {
        // debugger
        this.UnderRunChart()
    }


    UnderRunChart() {
        // debugger
        const { underrundata } = this.state
        const UnderRunData = underrundata.graphdata.map((key,i) => {
            return {
                Date: key.date,
                SideA: key.sidea,
                SideB: key.sideb
            }
        });
        // console.log(UnderRunData)
        const chart = c3.generate({
            bindto: '#UnderRun',
            size: {
                height: 200,
                width: 270
            },
            colors: {
                date: "#dd4b39",
            },
            data: {
                json: UnderRunData,
                keys: {
                    x: 'Date',
                    value: ['SideA','SideB'],
                },
                groups: [['SideA', 'SideB']],
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
                    // label: 'date',
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
                    <div id="UnderRun"></div >
                </div>
        )
    }
}


export default UnderRun; 
