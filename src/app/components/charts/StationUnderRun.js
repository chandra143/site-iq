import React, { Component } from 'react';
import c3 from 'c3';

class StationUnderRun extends Component {
    constructor(props) {
        super(props);
        this.state = {
            underrundata: props.data
        };
    }
    componentDidMount() {
        this.UnderRunChart()
    }
    UnderRunChart() {
        // debugger
        const { underrundata } = this.state
        const UnderRunData = underrundata.graphdata.map((key) => {
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
                height: 300,
                width: 450
            },
            colors: {
                date: "#dd4b39",
            },
            data: {
                json: UnderRunData,
                keys: {
                    x: 'Date',
                    value: ['SideA', 'SideB'],
                },
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
                        count: 5,
                        format: '%e-%b-%y'
                    }
                },
                y: {
                    tick: {
                        format: d3.format('.1f')
                    },
                    label: {
                        // text: 'value',
                        position: 'outer-middle'
                    }
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


export default StationUnderRun; 
