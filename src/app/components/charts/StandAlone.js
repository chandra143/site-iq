import React, { Component } from 'react';
import c3 from 'c3';

class StandAlone extends Component {
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
            bindto: '#StandAlone',
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
                    value: ['SideA', 'SideB'],
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
                    type: 'category',
                    label: {
                        // text:'data',
                        // position:'outer-center',                       
                    },
                    tick: {
                        format: '%e-%b-%y'
                    },
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
            },
            bar: {
                width: {
                    ratio: 0.5
                },
            }
        });
    }

    render() {
        return (
            <div className="box-body">
                <div id="StandAlone"></div >
            </div>
        )
    }
}


export default StandAlone; 
