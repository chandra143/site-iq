import React, { Component } from 'react';
import c3 from 'c3';
import moment from 'moment';

class Humidity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            temp: props.temp
        };
    }

    componentDidMount() {
        // debugger
            this.gethumidityreport()
        
    }


    gethumidityreport() {

        const { temp } = this.state;
        const HumidityReport = temp.map((obj, i) => {
            return {
                Humidity: obj.humidity,
                Date: obj.date
            }
        })
        const chart = c3.generate({
            bindto: '#humidity',
            size: {
                height: 200,
                width: 270
            },
            colors: {
                date: "#dd4b39",
            },
            data: {
                json: HumidityReport,
                keys: {
                    x: 'Date',
                    value: ['Humidity'],
                    // value1:[]
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
                <div id="humidity"></div >
            </div>
        )
    }
}


export default Humidity; 