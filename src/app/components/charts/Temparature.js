import React, { Component } from 'react';
import c3 from 'c3';
import moment from 'moment';

class Temparature extends Component {
    constructor(props) {
        super(props);
        this.state = {
            temp: props.temp
        };
    }

    componentDidMount() {
        // debugger
            this.gettempreport()
        
    }


    gettempreport() {
        const { temp } = this.state;
        const TempReport = temp.map((obj, i) => {
            return {
                Temperature: obj.temp,
                Date: obj.date
            }
        })
        const chart = c3.generate({
            bindto: '#temp',
            size: {
                height: 200,
                width: 270
            },
            colors: {
                date: "#dd4b39",
            },
            data: {
                json: TempReport,
                keys: {
                    x: 'Date',
                    value: ['Temperature'],
                },
                colors: {
                    Temperature: '#FFB6C1'
                },
                xFormat: '%Y-%m-%d %H:%M:%S'
                // type: 'bar',
            },
            legend: {
                show: false
            },
            tooltip: {
                format: {
                  title: function (d, index) {
                    //   var format= new Date(d);
                       return moment(d).format('YYYY-MM-DD HH:mm:ss'); 
                    }
                }
              },
            bar: {
                width: {
                    ratio: 1
                }
            },
            axis: {
                x: {
                    type: 'timeseries',
                    // label: 'date',
                    tick: {
                        count: 3,
                        // format: '%e-%b-%y'
                        format: '%Y-%m-%d'
                        // %H:%M:%S
                    }
                },
                y: {
                    // label: 'value',
                    position: 'outer-middle'
                },
            }
        });

    }


    render() {
        return (
            <div className="box-body">
                <div id="temp"></div >
            </div>
        )
    }
}


export default Temparature; 