import React, { Component } from 'react';
import c3 from 'c3';


class MeaterValue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meaterdata: props.meaterdata
        };
    }

    componentDidMount() {
        this.MeaterValueChart()
    }


    MeaterValueChart() {
        // const { meaterdata } = this.state
        // const Meaterdata = meaterdata.map((key) => {
        //     return {
        //         Meater: key.volume,
        //         Time: key.report_time
        //     }
        // });
        // console.log(Meaterdata)
        const chart = c3.generate({
            bindto: '#MeaterValue',
            size: {
                height: 120,
                width:140,
            },

            data: {
                columns: [
                    ['Meter', 100, 150, 125, 200, 250],
                ]
            },
            axis: {
                y: {
                    tick: {
                        count: 4,
                        values: [100, 200, 300]
                    }
                }
            },
        });
    }


    render() {
        return (
            <div className="box-body">
                <div id="MeaterValue"></div >
            </div>
        )
    }
}


export default MeaterValue; 
