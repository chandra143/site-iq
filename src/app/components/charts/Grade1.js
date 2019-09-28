// import React, { Component } from 'react';
// import c3 from 'c3';


// class Grade1 extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             grade1: props.grade1
//         };
//     }

//     componentDidMount() {
//         this.getGrade1Chart()

//     }


//     getGrade1Chart() {
//         const { Grade1 } = this.state;
//         // const meterdata = meter1[0]
//         const grade1 = grade1.map((obj, i) => {
//             debugger
//             return {
//                 Date: obj.date,
//                 Cash: obj.cash,
//                 Credit:obj.credit,
//             }
//         })
//         const chart = c3.generate({
//             bindto: '#Grade',
//             size: {
//                 height: 200,
//                 width: 270
//             },
//             colors: {
//                 date: "#dd4b39",
//             },
//             data: {
//                 json: Grade1,
//                 keys: {
//                     x: 'Date',
//                     value: ['Cash'],
//                     value1:['Credit']
//                 },
//                 type: 'bar',
//                 xFormat: '%Y-%m-%d'
//             },
//             grid: {
//                 y: {
//                 show: true,
//                 }
//                 },
//             legend: {
//                 show: false
//             },
//             axis: {
//                 x: {
//                     type: 'timeseries',
//                     // label: 'date',
//                     tick: {
//                         count: 5,
//                         format: '%e-%b-%y'
//                     }
//                 },
//                 y: {
//                     // label: 'value'
//                 },
//             },
//             bar: {
//                 width: {
//                     ratio: 0.1
//                 },
//             }
//         });

//     }


//     render() {
//         return (
//             <div className="box-body">
//                 <div id="Grade"></div >
//             </div>
//         )
//     }
// }


// export default Grade1; 