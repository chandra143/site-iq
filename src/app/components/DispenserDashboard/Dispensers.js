import React, { Component } from 'react';
// Widget
import { getDeviceBySiteId, getDispenserDataById, rebootHistory, errorFix, getFlowRateA, getFlowRateB, Gettemp, getTwoWireRequest, checkTwoWireStatus } from '../../services/SiteIQservices';
import cable from '../../../styles/img/cable.png';
import RebootModal from '../Modal/RebootModal';
import app_state from '../../app_state';
import AlertModal from '../Modal/AlertModal';
import c3 from 'c3';
import moment from 'moment';
import Button from 'react-bootstrap-button-loader';
import Reboot from '../../../styles/img/icon-gas-pump.png';
import right from '../../../styles/img/right.png';
import Wrong from '../../../styles/img/false.png';
import Modal from 'react-modal';

class Dispensers extends Component {
    constructor(props) {
        super(props);
        this.showSidePanelComponent = this.showSidePanelComponent.bind(this);
        this.hideSidePanelComponent = this.hideSidePanelComponent.bind(this);
        this.showSidePanelComponent1 = this.showSidePanelComponent1.bind(this);
        this.hideSidePanelComponent1 = this.hideSidePanelComponent1.bind(this);
        this.openModal = this.openModal.bind(this);
        // this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.state = {
            showSidePanel: false,
            showSidePanel1: false,
            Dispenserdata: [],
            dipenserReportData: [],
            Dispenser: [],
            pump: '',
            userProfile: app_state.user_profile,
            rebootHistory: [],
            day7: '7',
            day10: '10',
            day30: '30',
            days: '',
            isButtonDisabled: false,
            errorFix: [],
            name: '',
            deviceid: '',
            description: '',
            loading: false,
            isLoading: false,
            loading1: false,
            timestamp: '',
            active: '7 Days',
            buttons: [{ days: "7", name: "7 Days" }, { days: "10", name: "10 Days" }, { days: "30", name: "1 Month" }],
            flowRateA: [],
            flowRateB: [],
            temp: [],
            meter1: 'Meter1',
            meter2: 'Meter2',
            meter3: 'Meter3',
            meter4: 'Meter4',
            meter5: 'Meter5',
            meter6: 'Meter6',
            // grade1: 'Grade1',
            datetime: '',
            twoWireRequest: '',
            twoWireData: [],
            twoWireData1: [],
            rebootData: [],
            rebootData1: [],
            modalIsOpen: false,
            alertId:'',
            assignId:''
        };
    }
    openModal() {
        this.setState({ modalIsOpen: true });
    }
    closeModal() {
        this.setState({ modalIsOpen: false });
    }
    getTemp() {
        const { Id } = this.props;
        const day = this.state.day7
        Gettemp(Id, day).then((result) => {
            this.setState({ temp: result.data })
        });
        // this.getTwoWireStatus()
    }
    getTempHumidity(day) {
        // this.showLoader1()
        const { Id } = this.props;
        Gettemp(Id, day).then((result) => {
            this.setState({ temp: result.data })
            // this.hideLoader1()
        });

    }
    getFlowRateA() {
        const { Id } = this.props;
        const day = this.state.day7
        getFlowRateA(Id, day).then((result) => {
            this.setState({ flowRateA: result.data })
        });
    }
    flowRateA(day) {
        // this.showLoader1()
        const { Id } = this.props;
        getFlowRateA(Id, day).then((result) => {
            this.setState({ flowRateA: result.data })
            // this.hideLoader1()
        });

    }
    flowRateB(day) {
        // this.showLoader1()
        const { Id } = this.props;
        getFlowRateB(Id, day).then((result) => {
            this.setState({ flowRateB: result.data })
            // this.hideLoader1()
        });

    }
    getFlowRateB() {
        const { Id } = this.props;
        const day = this.state.day7
        getFlowRateB(Id, day).then((result) => {
            this.setState({ flowRateB: result.data })
        });
    }
    getTwoWireStatus() {
        // debugger
        this.showLoader()
        const { Id } = this.props;
        getTwoWireRequest(Id).then((result) => {
            this.setState({ twoWireRequest: result.data.Message });
            setTimeout(() => this.checkTwoWireStatus(), 30000)
        })
    }
    checkTwoWireStatus() {
        // debugger
        this.showLoader()
        const { Id } = this.props;
        checkTwoWireStatus(Id).then((result) => {
            // debugger
            if (result.status == 200) {
                this.setState({ twoWireData: result.data });
            }
            else {
                this.setState({ twoWireData1: result.data.Message });
            }
            this.hideLoader()
        })

    }

    componentDidMount() {
        this.getDeviceBySiteId();
        this.getDispensersById();
        this.getRebootHistory()
        // this.getFlowRateA()
        // this.getFlowRateB()
        this.getTemp()

    }
    async getDeviceBySiteId() {
        const { site_id } = this.props;
        getDeviceBySiteId(site_id).then((result) => {
            this.setState({ Dispenser: result.data })
        })
    }
    getRebootHistory() {
        const { Id } = this.props;
        rebootHistory(Id).then((result) => {
            this.setState({ rebootHistory: result.data })
        })
    }
    rebootData(data) {
        // debugger
        this.state.rebootData = data
        this.state.rebootData1 = data
        this.openModal()
    }
    isActive(name, days) {
        this.setState({ active: name })
        this.getDispenserDataById(days)
        this.flowRateA(days)
        this.flowRateB(days)
        this.getTempHumidity(days)
    }
    getDispenserDataById(days) {
        this.showLoader2()
        const { Id } = this.props;
        getDispenserDataById(Id, days).then((result) => {
            // debugger
            if (result == undefined) {
                this.state.dipenserReportData = "Internal server error"
                this.hideLoader2()
            }
            else if (result.status == 200) {
                this.setState({ Dispenserdata: result.data })
                this.hideLoader2()
            }
            else {
                this.setState({ dipenserReportData: result.data.message })
                this.hideLoader2()
            }
        })

    }
    getDispensersById() {
        this.showLoader2()
        const { Id } = this.props;
        const day = this.state.day7
        getDispenserDataById(Id, day).then((result) => {
            // debugger
            if (result == undefined) {
                this.state.dipenserReportData = "Internal server error"
                this.hideLoader2()
            }
            else if (result.status == 200) {
                this.setState({ Dispenserdata: result.data })
                this.hideLoader2()
            }
            else {
                this.setState({ dipenserReportData: result.data.message })
                this.hideLoader2()
            }
        })
    }
    getDeviceData(device_id) {
        let Id = device_id;
        getDispenserDataById(Id).then((result) => {
            if (result.status == 200) {
                this.setState({ Dispenserdata: result.data })
                this.hideLoader2()
            }
            else {
                this.setState({ dipenserReportData: result.data })
                this.hideLoader2()
            }
        })
    }
    showSidePanelComponent() {
        this.setState({ showSidePanel: true });
    }
    hideSidePanelComponent() {
        this.setState({ showSidePanel: false });
    }
    getRebootModal(i) {
        const { showSidePanel } = this.state
        return (
            <RebootModal key={i} show={showSidePanel} rebootData={this.rebootData.bind(this)} rebootHistory={this.getRebootHistory.bind(this)} Id={this.props.Id} closeButton={this.hideSidePanelComponent} bsSize="medium" />
        )
    }
    hideLoader1 = () => {
        // debugger
        this.setState({ isLoading: false });
    }

    showLoader1 = () => {
        // debugger
        this.setState({ isLoading: true });
    }

    hideLoader = () => {
        // debugger
        this.setState({ loading: false });
    }

    showLoader = () => {
        // debugger
        this.setState({ loading: true });
    }

    hideLoader2 = () => {
        // debugger
        this.setState({ loading1: false });
    }

    showLoader2 = () => {
        // debugger
        this.setState({ loading1: true });
    }
    errorFix(Id) {
        this.showLoader()
        const data = Id.toUpperCase()
        errorFix(data).then((result) => {
            this.setState({ errorFix: result.data })
            this.hideLoader()
        })
    }
    showSidePanelComponent1(name, description, timestamp,alertId,assignId) {
        this.errorFix(name)
        this.state.name = name
        this.state.description = description
        this.state.timestamp = timestamp
        this.state.alertId = alertId
        this.state.assignId = assignId
        this.setState({ showSidePanel1: true });
    }
    hideSidePanelComponent1() {
        this.setState({ showSidePanel1: false });
    }
    getAddAlertModal(i) {
        const { showSidePanel1 } = this.state
        return (
            <AlertModal key={i} show={showSidePanel1} possiblefixes={this.state.errorFix} name={this.state.name} deviceId={this.props.Id} alertId={this.state.alertId} assignId={this.state.assignId} description={this.state.description} timestamp={this.state.timestamp} closeButton={this.hideSidePanelComponent1} bsSize="medium" />
        )
    }
    getActive(value, description) {
        if (value == 1) {
            return (
                <div>
                    <span style={{ color: "red" }}>Critical:</span><span style={{ fontSize: "12px" }}> Security swith is open</span>
                </div>
            )
        }
        // if (value == 0) {
        //     return (
        //         <button className="btn btn-pop">CLOSED</button>
        //     )
        // }
    }
    standAloneA(value) {
        if (value != 0) {
            return (
                <p className="p-font">Side A - {value}</p>
            )
        }
        else {
            return (
                <p className="p-font">Side A - No Change</p>
            )
        }
    }
    standAloneB(value) {
        if (value != 0) {
            return (
                <p className="p-font">Side B - {value}</p>
            )
        }
        else {
            return (
                <p className="p-font">Side B - No Change</p>
            )
        }
    }
    overRunA(value) {
        if (value != 0) {
            return (
                <p className="p-font">Side A - {value}</p>
            )
        }
        else {
            return (
                <p className="p-font">Side A - No Change</p>
            )
        }
    }
    overRunB(value) {
        if (value != 0) {
            return (
                <p className="p-font">Side B - {value}</p>
            )
        }
        else {
            return (
                <p className="p-font">Side B - No Change</p>
            )
        }
    }
    underRunA(value) {
        if (value != 0) {
            return (
                <p className="p-font">Side A - {value}</p>
            )
        }
        else {
            return (
                <p className="p-font">Side A - No Change</p>
            )
        }
    }
    underRunB(value) {
        if (value != 0) {
            return (
                <p className="p-font">Side B - {value}</p>
            )
        }
        else {
            return (
                <p className="p-font">Side B - No Change</p>
            )
        }
    }
    rebootButton() {
        if (app_state.user_profile.Role === "Admin" && app_state.user_profile.Type === "SiteIQAdmin") {
            // debugger

            // const data = this.state.twoWireData.map((obj, i) => {
            //     return (
            //         obj.PumpInUse
            //     )
            // })
            // if (this.state.twoWireData != "") {
            //     if (data[0] == "true") {
            //         return (
            //             <div style={{ position: "relative", height: "45px" }}>
            //                 <div className="col-md-2" style={{ top: "7px" }}>
            //                     <img src={Reboot} className="img-responsive" style={{ width: "30px", height: "30px" }} />
            //                 </div>
            //                 <div className="col-md-6" style={{ top: "12px" }}>Dispenser In Use</div>
            //             </div>
            //         )
            //     }
                // else if (data[0] == "false") {
                    return (
                        <div className="text-center">
                            <button type="button" className="btn btn-danger danger" onClick={this.showSidePanelComponent}><img src={cable} style={{ width: "27px" }} /> Reboot Now</button>
                            {this.getRebootModal()}
                        </div>
                    )
            //     }
            // }
            // else {
            //     if (this.state.twoWireData1 != "") {
            //         return (
            //             <div className="checktwowire-400">
            //                 {this.state.twoWireData1}
            //                 <Button className="btn btn-primary try" loading={this.state.loading} onClick={this.getTwoWireStatus.bind(this)}>Try Again</Button>
            //             </div>
            //         )
            //     }
            //     else {
            //         return (
            //             <div className="checktwowire-400">
            //                 <Button loading={this.state.loading}>Checking two wire status please wait..!</Button>
            //             </div>
            //         )
            //     }
            // }

        }
        if (app_state.user_profile.Role === "Admin" && app_state.user_profile.Type === "RegionManager") {
            return (
                <div className="text-center">
                    <button type="button" className="btn btn-danger danger" onClick={this.showSidePanelComponent}><img src={cable} style={{ width: "27px" }} /> Reboot Now</button>
                    {this.getRebootModal()}
                </div>
            )
        }
        if (app_state.user_profile.Role === "View" && app_state.user_profile.Type === "SiteOwner") {
            this.state.isButtonDisabled = true
            const { isButtonDisabled } = this.state
            return (
                <div className="text-center">
                    <button type="button" className="btn btn-danger danger" disabled={isButtonDisabled}><img src={cable} style={{ width: "27px" }} /> Reboot Now</button>
                </div>
            )
        }
    }
    underRunChart(underrundata) {
        const UnderRunData = underrundata.graphdata.map((key) => {
            return {
                Date: key.date,
                SideA: key.sidea,
                SideB: key.sideb
            }
        });
        // console.log(UnderRunData)
        const chart = c3.generate({
            bindto: d3.select('.underrun'),
            // bindto: '#UnderRun',
            size: {
                height: 200,
                // width: 300
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
                groups: [['SideA', 'SideB']],
                type: 'bar',
                xFormat: '%Y-%m-%d'
            },
           //  grid: {
 //               y: {
    //                show: true,
   //             }
        //    },
            axis: {
                x: {
                    type: 'timeseries',
                    // label: 'date',
                    tick: {
                        count: 5,
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
                    ratio: 0.1
                },
            }
        });
    }
    getFlowRateAChart(flowRateA) {
        // const { flowRateA } = this.state;
        const Report = flowRateA.map((obj, i) => {
            return {
                m1: obj.FlowGrade1,
                m2: obj.FlowGrade2,
                m3: obj.FlowGrade3,
                m4: obj.FlowGrade4,
                m5: obj.FlowGrade5,
                m6: obj.FlowGrade6,
                Date: obj.date
            }
        })
        const chart = c3.generate({
            bindto: d3.select('.flowratea'),
            // bindto: '#FlowRateA',
            size: {
                height: 200,
                // width: 300
            },
            colors: {
                date: "#dd4b39",
            },
            data: {
                json: Report,
                keys: {
                    x: 'Date',
                    value: ['m1', 'm2', 'm3', 'm4', 'm5', 'm6'],
                    // value1:[]
                },
                // type: 'bar',
                xFormat: '%Y-%m-%d %H:%M:%S'
            },
           //  grid: {
 //               y: {
    //                show: true,
   //             }
        //    },
            legend: {
                show: false
            },
            axis: {
                x: {
                    type: 'timeseries',
                    // label: 'date',
                    tick: {
                        count: 5,
                        format: "%b-%d"
                    }
                },
                y: {
                    // label: 'value'
                },
            }
        });

    }
    getFlowRateBChart(flowRateB) {
        // const { flowRateB } = this.state;
        const Report = flowRateB.map((obj, i) => {
            return {
                m1: obj.FlowGrade1,
                m2: obj.FlowGrade2,
                m3: obj.FlowGrade3,
                m4: obj.FlowGrade4,
                m5: obj.FlowGrade5,
                m6: obj.FlowGrade6,
                Date: obj.date
            }
        })
        const chart = c3.generate({
            bindto: d3.select('.flowrateb'),
            // bindto: '#FlowRateB',
            size: {
                height: 200,
                // width: 300
            },
            colors: {
                date: "#dd4b39",
            },
            data: {
                json: Report,
                keys: {
                    x: 'Date',
                    value: ['m1', 'm2', 'm3', 'm4', 'm5', 'm6'],
                    // value1:[]
                },
                // type: 'bar',
                xFormat: '%Y-%m-%d %H:%M:%S'
            },
           //  grid: {
 //               y: {
    //                show: true,
   //             }
        //    },
            legend: {
                show: false
            },
            axis: {
                x: {
                    type: 'timeseries',
                    // label: 'date',
                    tick: {
                        count: 5,
                        format: "%b-%d"
                    }
                },
                y: {
                    // label: 'value'
                },
            }
        });

    }
    getTempReport() {

        const { temp } = this.state;
        const TempReport = temp.map((obj, i) => {
            return {
                Temperature: obj.temp,
                Date: obj.date
            }
        })
        const chart = c3.generate({
            bindto: d3.select('.temp'),
            // bindto: '#temp',
            size: {
                height: 200,
                // width: 300
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
           //  grid: {
 //               y: {
    //                show: true,
   //             }
        //    },
            bar: {
                width: {
                    ratio: 1
                }
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
            axis: {
                x: {
                    type: 'timeseries',
                    // label: 'date',
                    tick: {
                        count: 3,
                        // format: '%e-%b-%y'
                        format: "%b-%d"
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

    getHumidityReport() {

        const { temp } = this.state;
        const HumidityReport = temp.map((obj, i) => {
            return {
                Humidity: obj.humidity,
                Date: obj.date
            }
        })
        const chart = c3.generate({
            bindto: d3.select('.humidity'),
            // bindto: '#humidity',
            size: {
                height: 200,
                // width: 300
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
           //  grid: {
 //               y: {
    //                show: true,
   //             }
        //    },
            bar: {
                width: {
                    ratio: 1
                }
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
            axis: {
                x: {
                    type: 'timeseries',
                    // label: 'date',
                    tick: {
                        count: 3,
                        // format: '%e-%b-%y'
                        format: "%b-%d"
                        // %H:%M:%S
                    }
                },
                y: {
                    // label: 'value',
                    position: 'outer-middle'
                },
            },
        });

    }
    meter1(meter1) {
        const Meter1 = meter1.map((obj, i) => {
            // debugger
            return {
                Date: obj.date,
                Volume: obj.volume
            }
        })
        const chart = c3.generate({
            bindto: d3.select('.meter1'),
            // bindto: '#Meter1',
            size: {
                height: 200,
                // width: 300
            },
            colors: {
                date: "#dd4b39",
            },
            data: {
                json: Meter1,
                keys: {
                    x: 'Date',
                    value: ['Volume'],
                    // value1:[]
                },
                type: 'bar',
                xFormat: '%Y-%m-%d'
            },
            // grid: {
            //     y: {
            //         show: true,
            //     }
            // },
            legend: {
                show: false
            },
            axis: {
                x: {
                    type: 'timeseries',
                    // label: 'date',
                    tick: {
                        count: 5,
                        format: "%b-%d"
                    }
                },
                y: {
                    // label: 'value'
                },
            },
            bar: {
                width: {
                    ratio: 0.1
                },
            }
        });

    }
    meter2(meter2) {
        const Report = meter2.map((obj, i) => {
            // debugger
            return {
                Date: obj.date,
                Volume: obj.volume
            }
        })
        const chart = c3.generate({
            bindto: d3.select('.meter2'),
            // bindto: '#Meter2',
            size: {
                height: 200,
                // width: 300
            },
            colors: {
                date: "#dd4b39",
            },
            data: {
                json: Report,
                keys: {
                    x: 'Date',
                    value: ['Volume'],
                    // value1:[]
                },
                type: 'bar',
                xFormat: '%Y-%m-%d'
            },
            legend: {
                show: false
            },
            axis: {
                x: {
                    type: 'timeseries',
                    //   label: 'date',
                    tick: {
                        count: 5,
                        format: "%b-%d"
                    }
                },
                y: {
                    // label: 'value'
                },
            },
            bar: {
                width: {
                    ratio: 0.1
                },
            }
        });

    }
    meter3(meter3) {
        const Meter3 = meter3.map((obj, i) => {
            // debugger
            return {
                Date: obj.date,
                Volume: obj.volume
            }
        })
        const chart = c3.generate({
            bindto: d3.select('.meter3'),
            // bindto: '#Meter3',
            size: {
                height: 200,
                // width: 300
            },
            colors: {
                date: "#dd4b39",
            },
            data: {
                json: Meter3,
                keys: {
                    x: 'Date',
                    value: ['Volume'],
                    // value1:[]
                },
                type: 'bar',
                xFormat: '%Y-%m-%d'
            },
            legend: {
                show: false
            },
            axis: {
                x: {
                    type: 'timeseries',
                    //   label: 'date',
                    tick: {
                        count: 5,
                        format: "%b-%d"
                    }
                },
                y: {
                    // label: 'value'
                },
            },
            bar: {
                width: {
                    ratio: 0.1
                },
            }
        });
    }
    meter4(meter4) {
        const Meter4 = meter4.map((obj, i) => {
            // debugger
            return {
                Date: obj.date,
                Volume: obj.volume
            }
        })
        const chart = c3.generate({
            bindto: d3.select('.meter4'),
            // bindto: '#Meter4',
            size: {
                height: 200,
                // width: 300
            },
            colors: {
                date: "#dd4b39",
            },
            data: {
                json: Meter4,
                keys: {
                    x: 'Date',
                    value: ['Volume'],
                    // value1:[]
                },
                type: 'bar',
                xFormat: '%Y-%m-%d'
            },
            legend: {
                show: false
            },
            axis: {
                x: {
                    type: 'timeseries',
                    //   label: 'date',
                    tick: {
                        count: 5,
                        format: "%b-%d"
                    }
                },
                y: {
                    // label: 'value'
                },
            },
            bar: {
                width: {
                    ratio: 0.1
                },
            }
        });
    }
    meter5(meter5) {
        const Meter5 = meter5.map((obj, i) => {
            // debugger
            return {
                Date: obj.date,
                Volume: obj.volume
            }
        })
        const chart = c3.generate({
            bindto: d3.select('.meter5'),
            // bindto: '#Meter5',
            size: {
                height: 200,
                // width: 300
            },
            colors: {
                date: "#dd4b39",
            },
            data: {
                json: Meter5,
                keys: {
                    x: 'Date',
                    value: ['Volume'],
                    // value1:[]
                },
                type: 'bar',
                xFormat: '%Y-%m-%d'
            },
            legend: {
                show: false
            },
            axis: {
                x: {
                    type: 'timeseries',
                    //   label: 'date',
                    tick: {
                        count: 5,
                        format: "%b-%d"
                    }
                },
                y: {
                    // label: 'value'
                },
            },
            bar: {
                width: {
                    ratio: 0.1
                },
            }
        });
    }
    meter6(meter6) {
        this.showLoader1.bind(this)
        const Meter6 = meter6.map((obj, i) => {
            // debugger
            return {
                Date: obj.date,
                Volume: obj.volume
            }
        })
        const chart = c3.generate({
            bindto: d3.select('.meter6'),
            // bindto: '#Meter6',
            size: {
                height: 200,
                // width: 300
            },
            colors: {
                date: "#dd4b39",
            },
            data: {
                json: Meter6,
                keys: {
                    x: 'Date',
                    value: ['Volume'],
                    // value1:[]
                },
                type: 'bar',
                xFormat: '%Y-%m-%d'
            },
            legend: {
                show: false
            },
            axis: {
                x: {
                    type: 'timeseries',
                    //   label: 'date',
                    tick: {
                        count: 5,
                        format: "%b-%d"
                    }
                },
                y: {
                    // tick: {
                    //     format: d3.format('d')
                    // },
                },
            },
            bar: {
                width: {
                    ratio: 0.1
                },
            }
        });
        this.hideLoader1.bind(this)
    }
    overRunChart(overrundata) {
        this.showLoader1.bind(this)
        // const { overrundata } = this.state
        const OverRunData = overrundata.map((key) => {
            return {
                Date: key.date,
                SideA: key.sidea,
                SideB: key.sideb
            }
        });
        // // console.log(UnderRunData)
        const chart = c3.generate({
            bindto: d3.select('.overrun'),
            // bindto: '#OverRun',
            size: {
                height: 200,
                // width: 300
            },
            colors: {
                date: "#dd4b39",
            },
            data: {
                json: OverRunData,
                keys: {
                    x: 'Date',
                    value: ['SideA', 'SideB'],
                },
                type: 'bar',
                xFormat: '%Y-%m-%d'
            },
           //  grid: {
 //               y: {
    //                show: true,
   //             }
        //    },
            axis: {
                x: {
                    type: 'timeseries',
                    label: {
                        // text:'data',
                        // position:'outer-center',                       
                    },
                    tick: {
                        count: 5,
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
        this.hideLoader1.bind(this)
    }
    getTime(date) {
        // debugger
        const timestamp = moment(date).format('DD-MM HH:mm')
        this.state.datetime = timestamp
        return (
            this.state.datetime
        )
    }
    door(value) {
        if (this.value == 0) {
            return (
                <div className="door-close">Close</div>
            )
        }
        else {
            return (
                <div className="door-open">Open</div>
            )
        }
    }
    getPrice1Chart(price1) {
        const Price1 = price1.map((obj, i) => {
            // debugger
            return {
                Date: obj.date,
                Cash: obj.cash,
                Credit: obj.credit
            }
        })
        const chart = c3.generate({
            bindto: d3.select('.price1'),
            // bindto: '#Price1',
            size: {
                height: 200,
                // width: 300
            },
            colors: {
                date: "#dd4b39",
            },
            data: {
                json: Price1,
                keys: {
                    x: 'Date',
                    value: ['Cash', 'Credit'],
                    // value1:[]
                },
                // type: 'bar',
                xFormat: '%Y-%m-%d'
            },
           //  grid: {
 //               y: {
    //                show: true,
   //             }
        //    },
            legend: {
                show: false
            },
            axis: {
                x: {
                    type: 'timeseries',
                    // label: 'date',
                    tick: {
                        count: 5,
                        format: "%b-%d"
                    }
                },
                y: {
                    tick: {
                        format: d3.format('.3f')
                    }
                },
            },
            // bar: {
            //     width: {
            //         ratio: 0.1
            //     },
            // }
        });

    }
    getPrice2Chart(price2) {
        const Price2 = price2.map((obj, i) => {
            // debugger
            return {
                Date: obj.date,
                Cash: obj.cash,
                Credit: obj.credit
            }
        })
        const chart = c3.generate({
            bindto: d3.select('.price2'),
            // bindto: '#Price2',
            size: {
                height: 200,
                // width: 300
            },
            colors: {
                date: "#dd4b39",
            },
            data: {
                json: Price2,
                keys: {
                    x: 'Date',
                    value: ['Cash', 'Credit'],
                    // value1:[]
                },
                // type: 'bar',
                xFormat: '%Y-%m-%d'
            },
           //  grid: {
 //               y: {
    //                show: true,
   //             }
        //    },
            legend: {
                show: false
            },
            axis: {
                x: {
                    type: 'timeseries',
                    // label: 'date',
                    tick: {
                        count: 5,
                        format: "%b-%d"
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
    getPrice3Chart(price3) {
        const Price3 = price3.map((obj, i) => {
            // debugger
            return {
                Date: obj.date,
                Cash: obj.cash,
                Credit: obj.credit
            }
        })
        const chart = c3.generate({
            bindto: d3.select('.price3'),
            // bindto: '#Price3',
            size: {
                height: 200,
                // width: 300
            },
            colors: {
                date: "#dd4b39",
            },
            data: {
                json: Price3,
                keys: {
                    x: 'Date',
                    value: ['Cash', 'Credit'],
                    // value1:[]
                },
                // type: 'bar',
                xFormat: '%Y-%m-%d'
            },
           //  grid: {
 //               y: {
    //                show: true,
   //             }
        //    },
            legend: {
                show: false
            },
            axis: {
                x: {
                    type: 'timeseries',
                    // label: 'date',
                    tick: {
                        count: 5,
                        format: "%b-%d"
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
    getPrice4Chart(price4) {
        const Price4 = price4.map((obj, i) => {
            // debugger
            return {
                Date: obj.date,
                Cash: obj.cash,
                Credit: obj.credit
            }
        })
        const chart = c3.generate({
            bindto: d3.select('.price4'),
            // bindto: '#Price4',
            size: {
                height: 200,
                // width: 300
            },
            colors: {
                date: "#dd4b39",
            },
            data: {
                json: Price4,
                keys: {
                    x: 'Date',
                    value: ['Cash', 'Credit'],
                    // value1:[]
                },
                // type: 'bar',
                xFormat: '%Y-%m-%d'
            },
           //  grid: {
 //               y: {
    //                show: true,
   //             }
        //    },
            legend: {
                show: false
            },
            axis: {
                x: {
                    type: 'timeseries',
                    // label: 'date',
                    tick: {
                        count: 5,
                        format: "%b-%d"
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
    getPrice5Chart(price5) {
        const Price5 = price5.map((obj, i) => {
            // debugger
            return {
                Date: obj.date,
                Cash: obj.cash,
                Credit: obj.credit
            }
        })
        const chart = c3.generate({
            bindto: d3.select('.price5'),
            // bindto: '#Price5',
            size: {
                height: 200,
                // width: 300
            },
            colors: {
                date: "#dd4b39",
            },
            data: {
                json: Price5,
                keys: {
                    x: 'Date',
                    value: ['Cash', 'Credit'],
                    // value1:[]
                },
                // type: 'bar',
                xFormat: '%Y-%m-%d'
            },
           //  grid: {
 //               y: {
    //                show: true,
   //             }
        //    },
            legend: {
                show: false
            },
            axis: {
                x: {
                    type: 'timeseries',
                    // label: 'date',
                    tick: {
                        count: 5,
                        format: "%b-%d"
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
    getPrice6Chart(price6) {
        const Price6 = price6.map((obj, i) => {
            // debugger
            return {
                Date: obj.date,
                Cash: obj.cash,
                Credit: obj.credit
            }
        })
        const chart = c3.generate({
            bindto: d3.select('.price6'),
            // bindto: '#Price6',
            size: {
                height: 200,
                // width: 300
            },
            colors: {
                date: "#dd4b39",
            },
            data: {
                json: Price6,
                keys: {
                    x: 'Date',
                    value: ['Cash', 'Credit'],
                    // value1:[]
                },
                // type: 'bar',
                xFormat: '%Y-%m-%d'
            },
           //  grid: {
 //               y: {
    //                show: true,
   //             }
        //    },
            legend: {
                show: false
            },
            axis: {
                x: {
                    type: 'timeseries',
                    // label: 'date',
                    tick: {
                        count: 5,
                        format: "%b-%d"
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
    getValues(value) {
        if (value == "true") {
            return (
                <img src={right} className="checkststus-stl" />
            )
        }
        else {
            return (
                <img src={Wrong} className="checkststus-stl" />
            )
        }
    }
    render() {
        const customStyles = {
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                width: '35%'
            }
        };
        const { Id, stationName, siteId } = this.props
        // debugger
        const { Dispenserdata, dipenserReportData, rebootHistory, day7, day10, day30, buttons, flowRateA, flowRateB, temp, isLoading } = this.state
        const Loader = () => <div><i className="fa fa-spinner fa-spin fa-3x fa-fw" style={{ color: "#fff", marginTop: "25%" }}></i></div>;
        if (Dispenserdata != "") {
            return (
                <div>
                    <div className="col-md-12 dis-bottom">
                        <Modal
                            isOpen={this.state.modalIsOpen}
                            style={customStyles}
                            contentLabel="Example Modal">
                            <div className="col-md-12">
                                {Object.values(this.state.rebootData1).map((obj, i) => {
                                    if (i == 0) {
                                        return (
                                            <div className="mrb">
                                                {this.getValues(this.state.rebootData.Point1.Status)}
                                                {this.state.rebootData.Point1.message}

                                            </div>
                                        )
                                    }
                                    if (i == 1) {
                                        return (
                                            <div className="mrb">
                                                {this.getValues(this.state.rebootData.Point2.Status)}
                                                {this.state.rebootData.Point2.message}

                                            </div>
                                        )
                                    }
                                    if (i == 2) {
                                        return (
                                            <div className="mrb">
                                                {this.getValues(this.state.rebootData.Point3.Status)}
                                                {this.state.rebootData.Point3.message}

                                            </div>
                                        )
                                    }
                                    if (i == 3) {
                                        return (
                                            <div className="mrb">
                                                {this.getValues(this.state.rebootData.Point4.Status)}
                                                {this.state.rebootData.Point4.message}

                                            </div>
                                        )
                                    }
                                    if (i == 4) {
                                        return (
                                            <div className="mrb">
                                                {this.getValues(this.state.rebootData.Point5.Status)}
                                                {this.state.rebootData.Point5.message}

                                            </div>
                                        )
                                    }
                                    if (i == 5) {
                                        return (
                                            <div className="mrb">
                                                {this.getValues(this.state.rebootData.RebootStatus.Status)}
                                                {this.state.rebootData.RebootStatus.message}
                                            </div>
                                        )
                                    }
                                    // if (i == 6) {
                                    //     return (
                                    //         <div className="mrb">
                                    //             {this.state.rebootData.Message}
                                    //         </div>
                                    //     )
                                    // }
                                })}
                            </div>
                            <div className="col-md-12 text-center mrb">
                                <button className="btn btn-primary" onClick={this.closeModal}>close</button>
                            </div>
                        </Modal>
                        {Dispenserdata.map((obj, i) => {
                            return (
                                <div className="row pad-top">
                                    <div className="col-md-12 div-pos" id="myDiv" style={{ paddingTop: "15px", paddingRight: "10px" }}>
                                        <div style={{ float: "right" }}>
                                            {buttons.map((name, i) => {
                                                return (
                                                    <Button type="submit" loading={this.state.loading1} className={this.state.active === name.name ? 'btn sta-btn active' : 'btn sta-btn'} key={name.name} disabled={isLoading} onClick={this.isActive.bind(this, name.name, name.days)}>
                                                        {/* {isLoading && <i className="fa fa-refresh fa-spin"></i>} */}
                                                        {name.name}
                                                    </Button>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className="row right-align pos" style={{ marginRight: "-24px" }}>
                                        <div className="col-md-12" style={{ paddingRight: "0px" }}>
                                            <div className="col-md-8 col-xs-8 errorlog-pos pad" style={{ paddingLeft: "15px", paddingRight: "0px" }}>
                                                <div className="card card-styling">
                                                    <div className="box" key={i}>
                                                        <div className="box-header box-hdr box-bg1">Error Logs</div>
                                                        <div className="box-body box-bdy card-height">
                                                            <div className="col-md-12">
                                                                <div className="box border1">
                                                                    <div className="box-header box-hdr box-bg2">
                                                                        <div className="col-md-6 pad-left-0">Live Critical Errors</div>
                                                                        {/* <div className="col-md-6">
                                                                        <span className="dis-more">More <i className="fa fa-angle-right"></i></span>
                                                                    </div> */}
                                                                    </div>
                                                                    {obj.Live_ErrorLog_Alerts.length > 0 ?
                                                                        <div className="box-body">
                                                                            <table className="table table-bordered1">
                                                                                <thead>
                                                                                    <tr>
                                                                                        <th><b>Error Code</b></th>
                                                                                        <th><b>Description</b></th>
                                                                                        <th><b>Time</b></th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    {obj.Live_ErrorLog_Alerts.map((key, i) => {
                                                                                        return (
                                                                                            <tr>
                                                                                                <td><a onClick={this.showSidePanelComponent1.bind(this, key.code, key.description, key.timestamp,key.id,key.assign_id)}><strong>{key.code}</strong></a> &nbsp;<span className="btn-pop1">Critical</span>
                                                                                                    {this.getAddAlertModal()}
                                                                                                </td>
                                                                                                <td className="fnt-13">{key.description}</td>
                                                                                                <td className="fnt-13">{key.timestamp}</td>
                                                                                            </tr>
                                                                                        )
                                                                                    }
                                                                                    )}
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                        :
                                                                        <div className="col-md-12">
                                                                            <h4><strong>No Live Critical Errors</strong></h4>
                                                                        </div>
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12">
                                                                <div className="box border2">
                                                                    <div className="box-header box-hdr box-bg3">
                                                                        <div className="col-md-6 pad-left-0">Closed Critical Errors</div>
                                                                        {/* <div className="col-md-6">
                                                                        <span className="dis-more">More <i className="fa fa-angle-right"></i></span>
                                                                    </div> */}
                                                                    </div>
                                                                    {obj.Closed_ErrorLog_Alerts.length > 0 ?
                                                                        <div className="box-body">
                                                                            <table className="table table-bordered1">
                                                                                <thead>
                                                                                    <tr>
                                                                                        <th><b>Error Code</b></th>
                                                                                        <th><b>Description</b></th>
                                                                                        <th><b>Time</b></th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    {obj.Closed_ErrorLog_Alerts.map((key, i) => {
                                                                                        return (
                                                                                            <tr>
                                                                                                <td><a onClick={this.showSidePanelComponent1.bind(this, key.code, key.description, key.timestamp,key.id,key.assign_id)}><strong>{key.code}</strong></a>
                                                                                                    {this.getAddAlertModal()}
                                                                                                </td>
                                                                                                <td className="fnt-13">{key.description}</td>
                                                                                                <td className="fnt-13">{key.timestamp}</td>
                                                                                            </tr>
                                                                                        )
                                                                                    }
                                                                                    )}
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                        :
                                                                        <div className="col-md-12">
                                                                            <h4><strong>No Closed Critical Errors</strong></h4>
                                                                        </div>
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12">
                                                                <div className="box border3">
                                                                    <div className="box-header box-hdr box-bg4">
                                                                        <div className="col-md-6 pad-left-0">Non Critical Errors</div>
                                                                        {/* <div className="col-md-6">
                                                                        <span className="dis-more">More <i className="fa fa-angle-right"></i></span>
                                                                    </div> */}
                                                                    </div>
                                                                    {obj.Non_Critical_ErrorLogs.length > 0 ?
                                                                        <div className="box-body box-height">
                                                                            <table className="table table-bordered1">
                                                                                <thead>
                                                                                    <tr>
                                                                                        <th><b>Error Code</b></th>
                                                                                        <th><b>Description</b></th>
                                                                                        <th><b>Time</b></th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    {obj.Non_Critical_ErrorLogs.map((key, i) => {
                                                                                        return (
                                                                                            <tr>
                                                                                                <td><a><strong>{key.code}</strong></a>
                                                                                                {/* onClick={this.showSidePanelComponent1.bind(this, key.code, key.description, key.TimeStamp)} */}
                                                                                                    {/* {this.getAddAlertModal()} */}
                                                                                                </td>
                                                                                                <td className="fnt-13">{key.description}</td>
                                                                                                <td className="fnt-13">{key.TimeStamp}</td>
                                                                                            </tr>
                                                                                        )
                                                                                    }
                                                                                    )}
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                        :
                                                                        <div className="col-md-12">
                                                                            <h4><strong>No Non Critical Errors</strong></h4>
                                                                        </div>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 card-styling1 mr-top-15">
                                                <div className="box">
                                                    {/* <div className="box-header box-hdr">Reboot</div> */}
                                                    <div className="box-body">
                                                        {this.rebootButton()}
                                                    </div>
                                                </div>
                                                <div className="box box2">
                                                    <div className="box-header box-hdr box-bg7">Reboot History</div>
                                                    {rebootHistory.length > 0 ?
                                                        <div className="box-body box-bdy hj">
                                                            <table>
                                                                <thead>
                                                                    <tr>
                                                                        <th className="dis-th">Date</th>
                                                                        <th className="dis-th">User</th>
                                                                        <th className="dis-th">Note</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {rebootHistory.map((obj, i) => {
                                                                        return (
                                                                            <tr>
                                                                                <td className="dis-td">{obj.report_time}</td>
                                                                                <td className="dis-td">{obj.user}</td>
                                                                                <td className="dis-td">{obj.notes}</td>
                                                                            </tr>
                                                                        )
                                                                    })}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        :
                                                        <div className="box box2 box2-dis-err">
                                                            <div className="box-body box-bdy">
                                                                No Reboot History for this device
                                                        </div>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12" style={{ paddingRight: "0px", marginBottom: "15px" }}>
                                            <div className="col-md-8 col-xs-8 customexp-pos pad" style={{ paddingLeft: "15px", paddingRight: "0px" }}>
                                                <div className="table-responsives card-styling2">
                                                    <div className="box">
                                                        <div className="box-header box-hdr box-bg5">Customer's Experience</div>
                                                        <div className="box-body box-bdy">
                                                            <div className="col-md-12">
                                                                <div className="col-md-6">
                                                                    <div className="box">
                                                                        <div className="box-header box-hdr">MaxFlowRate-A</div>
                                                                        {obj.PerformanceAFlowRates.length > 0 ?
                                                                            <div className="box-body">
                                                                                {/* <FlowRateA flowRateA={obj.PerformanceAFlowRates} /> */}
                                                                                <div id="FlowRateA" className="flowratea"></div>
                                                                                {this.getFlowRateAChart(obj.PerformanceAFlowRates)}
                                                                            </div>
                                                                            :
                                                                            <div className="box">
                                                                                <div className="dis-err">No Change..</div>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="box">
                                                                        <div className="box-header box-hdr">MaxFlowRate-B</div>
                                                                        {obj.PerformanceBFlowRates.length > 0 ?
                                                                            <div className="box-body">
                                                                                {/* <FlowRateB flowRateB={obj.PerformanceBFlowRates} /> */}
                                                                                <div id="FlowRateB" className="flowrateb"></div>
                                                                                {this.getFlowRateBChart(obj.PerformanceBFlowRates)}
                                                                            </div>
                                                                            :
                                                                            <div className="box">
                                                                                <div className="dis-err">No Change..</div>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12">
                                                                <div className="col-md-6">
                                                                    {obj.OverRuns.length > 0 ?
                                                                        <div className="box">
                                                                            <div className="box-header box-hdr">Over Run</div>
                                                                            <div className="box-body">
                                                                                <div id="OverRun" className="overrun"></div>
                                                                                {/* <OverRun data={obj.OverRuns} /> */}
                                                                                {this.overRunChart(obj.OverRuns)}
                                                                            </div>
                                                                        </div> :
                                                                        <div className="box">
                                                                            <div className="dis-err">No OverRun's..</div>
                                                                        </div>
                                                                    }
                                                                </div>
                                                                {/* <div className="col-md-6">
                                                                    {obj.UnderRuns.graphdata.length > 0 ?
                                                                        <div className="box">
                                                                            <div className="box-header box-hdr">Under Run</div>
                                                                            <div className="box-body">
                                                                                <div id="UnderRun" className="underrun"></div>
                                                                                {this.underRunChart(obj.UnderRuns)}
                                                                            </div>                                                                            
                                                                        </div> :
                                                                        <div className="box">
                                                                            <div className="dis-err">No Underrun's..</div>
                                                                        </div>
                                                                    }
                                                                </div> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 card-styling1">
                                                <div className="box">
                                                    <div className="box-header box-hdr box-bg8">Security</div>
                                                    <div className="box-body box-bdy">
                                                        {obj.DoorAlerts.length > 0 ?
                                                            <div className="box" style={{ marginBottom: "7px", height: "247px" }}>
                                                                <div className="box-header box-hdr">Door Alerts</div>
                                                                <div className="box-body bdy-pos">
                                                                    <div className="table-responsives">
                                                                        <table className="table table-border">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th className="dis-th">Door</th>
                                                                                    <th className="dis-th">Time</th>
                                                                                    <th className="dis-th">Description</th>
                                                                                    <th className="dis-th">Status</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {obj.DoorAlerts.map((key, i) => {
                                                                                    return (
                                                                                        <tr>
                                                                                            <td className="dis-td bdy-height">{key.door}</td>
                                                                                            <td className="dis-td bdy-height">
                                                                                                {this.getTime(key.timestamp)}
                                                                                            </td>
                                                                                            <td className="dis-td bdy-height">{key.description}</td>
                                                                                            <td className="dis-td bdy-height">{this.door(key.active)}</td>
                                                                                        </tr>
                                                                                    )
                                                                                })}

                                                                            </tbody>
                                                                        </table>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            :
                                                            <table className="table">
                                                                <tbody>
                                                                    <tr>
                                                                        <td className="dis-err">No Recent Door Alert's</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        }
                                                        <div className="box" style={{ marginBottom: "0" }}>
                                                            {/* <div className="box-header box-hdr">Door Alerts</div> */}
                                                            <div className="box-body box-bdy">
                                                                <div className="table-responsives">
                                                                    <table className="table">
                                                                        <tbody className="bg1 scroll">
                                                                            <tr>
                                                                                <td className="dis-err">No Recent StandAlone Alert's</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 dis-pad">
                                            <div className="col-md-8 col-xs-8 volume-pos pad" style={{ paddingLeft: "15px", paddingRight: "0px" }}>
                                                <div className="table-responsives card-styling2">
                                                    <div className="box">
                                                        <div className="box-header box-hdr box-bg6">Volume</div>
                                                        <div className="box-body box-bdy">
                                                            <div className="col-md-12">
                                                                <div className="col-md-6">
                                                                    {obj.Volume.map((v, i) => {
                                                                        if (this.state.meter1 == Object.keys(obj.Volume[i])[0]) {
                                                                            return (
                                                                                // this.state.Meter1 = Object.keys(obj.Volume[0])[0]
                                                                                <div className="box">
                                                                                    <div className="box-header box-hdr">Meter1</div>
                                                                                    {v.Meter1.length > 0 ?
                                                                                        <div className="box-body">
                                                                                            {/* <Meter1 meter1={v.Meter1} /> */}
                                                                                            <div id="Meter1" className="meter1"></div>
                                                                                            {this.meter1(v.Meter1)}
                                                                                        </div> :
                                                                                        <div className="box">
                                                                                            <div className="dis-err">No data..</div>
                                                                                        </div>
                                                                                    }
                                                                                </div>
                                                                            )
                                                                        }
                                                                    })}
                                                                </div>
                                                                <div className="col-md-6">
                                                                    {obj.Volume.map((v, i) => {
                                                                        if (this.state.meter2 == Object.keys(obj.Volume[i])[0]) {
                                                                            return (
                                                                                <div className="box">
                                                                                    <div className="box-header box-hdr">Meter2</div>
                                                                                    {v.Meter2.length > 0 ?
                                                                                        <div className="box-body">
                                                                                            <div id="Meter2" className="meter2"></div>
                                                                                            {/* <Meter2 meter2={v.Meter2} /> */}
                                                                                            {this.meter2(v.Meter2)}
                                                                                        </div> :
                                                                                        <div className="box">
                                                                                            <div className="dis-err">No data..</div>
                                                                                        </div>
                                                                                    }
                                                                                </div>
                                                                            )
                                                                        }
                                                                    })}
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12">
                                                                <div className="col-md-6">
                                                                    {obj.Volume.map((v, i) => {
                                                                        if (this.state.meter3 == Object.keys(obj.Volume[i])[0]) {
                                                                            return (
                                                                                <div className="box">
                                                                                    <div className="box-header box-hdr">Meter3</div>
                                                                                    {v.Meter3.length > 0 ?
                                                                                        <div className="box-body">
                                                                                            <div id="Meter3" className="meter3"></div>
                                                                                            {/* <Meter3 meter3={v.Meter3} /> */}
                                                                                            {this.meter3(v.Meter3)}
                                                                                        </div> :
                                                                                        <div className="box">
                                                                                            <div className="dis-err">No data..</div>
                                                                                        </div>
                                                                                    }
                                                                                </div>
                                                                            )
                                                                        }
                                                                    })}
                                                                </div>
                                                                <div className="col-md-6">
                                                                    {obj.Volume.map((v, i) => {
                                                                        if (this.state.meter4 == Object.keys(obj.Volume[i])[0]) {
                                                                            return (
                                                                                <div className="box">
                                                                                    <div className="box-header box-hdr">Meter4</div>
                                                                                    {v.Meter4.length > 0 ?
                                                                                        <div className="box-body">
                                                                                            <div id="Meter4" className="meter4"></div>
                                                                                            {/* <Meter4 meter4={v.Meter4} /> */}
                                                                                            {this.meter4(v.Meter4)}
                                                                                        </div> :
                                                                                        <div className="box">
                                                                                            <div className="dis-err">No data..</div>
                                                                                        </div>
                                                                                    }
                                                                                </div>
                                                                            )
                                                                        }
                                                                    })}
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12">
                                                                <div className="col-md-6">
                                                                    {obj.Volume.map((v, i) => {
                                                                        if (this.state.meter5 == Object.keys(obj.Volume[i])[0]) {
                                                                            return (
                                                                                <div className="box">
                                                                                    <div className="box-header box-hdr">Meter5</div>
                                                                                    {v.Meter5.length > 0 ?
                                                                                        <div className="box-body">
                                                                                            <div id="Meter5" className="meter5"></div>
                                                                                            {/* <Meter5 meter5={v.Meter5} /> */}
                                                                                            {this.meter5(v.Meter5)}
                                                                                        </div> :
                                                                                        <div className="box">
                                                                                            <div className="dis-err">No data..</div>
                                                                                        </div>
                                                                                    }
                                                                                </div>
                                                                            )
                                                                        }
                                                                    })}
                                                                </div>
                                                                <div className="col-md-6">
                                                                    {obj.Volume.map((v, i) => {
                                                                        if (this.state.meter6 == Object.keys(obj.Volume[i])[0]) {
                                                                            return (
                                                                                <div className="box">
                                                                                    <div className="box-header box-hdr">Meter6</div>
                                                                                    {v.Meter6.length > 0 ?
                                                                                        <div className="box-body">
                                                                                            <div id="Meter6" className="meter6"></div>
                                                                                            {/* <Meter6 meter6={v.Meter6} /> */}
                                                                                            {this.meter6(v.Meter6)}
                                                                                        </div> :
                                                                                        <div className="box">
                                                                                            <div className="dis-err">No data..</div>
                                                                                        </div>
                                                                                    }
                                                                                </div>
                                                                            )
                                                                        }
                                                                    })}
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 card-styling1">
                                                <div className="box" style={{ marginBottom: "8px" }}>
                                                    <div className="box-header box-hdr box-bg9">Technical Data</div>
                                                    <div className="box-body box-bdy">
                                                        {Dispenserdata.map((obj, i) => {
                                                            return (
                                                                <div>
                                                                    <p><b>Pump Model</b></p>
                                                                    <p className="rbt-font">{obj.TechnicalData.pump_type}</p>
                                                                    <p><b>software Version</b></p>
                                                                    <p className="rbt-font">{obj.TechnicalData.app_software_version}</p>
                                                                    <p><b>Boot Version</b></p>
                                                                    <p className="rbt-font">{obj.TechnicalData.boot_version}</p>
                                                                    <p><b>Door Node Version</b></p>
                                                                    <p className="rbt-font">{obj.TechnicalData.door_version}</p>
                                                                    {/* <p><b>FirmWare Version</b></p>
                                                                    <p className="rbt-font">{obj.TechnicalData.firmware_version}</p> */}
                                                                    <p><b>MIP Version</b></p>
                                                                    <p className="rbt-font">{obj.TechnicalData.MIP_version}</p>
                                                                    <p><b>Unit Type</b></p>
                                                                    <p className="rbt-font">{obj.TechnicalData.unit_type}</p>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 dis-pad">
                                            <div className="col-md-8 col-xs-8 price-pos pad" style={{ paddingLeft: "15px", paddingRight: "0px" }}>

                                                <div className="table-responsives card-styling2">
                                                    <div className="box">
                                                        <div className="box-header box-hdr box-bg5">Price</div>
                                                        <div className="box-body box-bdy">
                                                            <div className="col-md-6">
                                                                {obj.Price.map((v, i) => {
                                                                    if (i == 0) {
                                                                        return (
                                                                            <div>
                                                                                <div className="box">
                                                                                    <div className="box-header box-hdr">Grade1 (Regular)</div>
                                                                                    {v.Grade1.length > 0 ?
                                                                                        <div className="box-body">
                                                                                            <div id="Price1" className="price1"></div>
                                                                                            {/* <Price1 price1={v.Grade1} /> */}
                                                                                            {this.getPrice1Chart(v.Grade1)}
                                                                                        </div>
                                                                                        :
                                                                                        <div className="box">
                                                                                            <div className="dis-err">No data..</div>
                                                                                        </div>
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }
                                                                })}
                                                            </div>
                                                            <div className="col-md-6">
                                                                {obj.Price.map((v, i) => {
                                                                    if (i == 1) {
                                                                        return (
                                                                            <div>

                                                                                <div className="box">
                                                                                    <div className="box-header box-hdr">Grade2 (Mid-grade)</div>
                                                                                    {v.Grade2.length > 0 ?
                                                                                        <div className="box-body">
                                                                                            <div id="Price2" className="price2"></div>
                                                                                            {/* <Price2 price2={v.Grade2} /> */}
                                                                                            {this.getPrice2Chart(v.Grade2)}
                                                                                        </div>
                                                                                        :
                                                                                        <div className="box">
                                                                                            <div className="dis-err">No data..</div>
                                                                                        </div>
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }
                                                                })}
                                                            </div>
                                                            <div className="col-md-6">
                                                                {obj.Price.map((v, i) => {
                                                                    if (i == 2) {
                                                                        return (
                                                                            <div>
                                                                                <div className="box">
                                                                                    <div className="box-header box-hdr">Grade3 (Premium)</div>
                                                                                    {v.Grade3.length > 0 ?
                                                                                        <div className="box-body">
                                                                                            <div id="Price3" className="price3"></div>
                                                                                            {/* <Price3 price3={v.Grade3} /> */}
                                                                                            {this.getPrice3Chart(v.Grade3)}
                                                                                        </div>
                                                                                        :
                                                                                        <div className="box">
                                                                                            <div className="dis-err">No data..</div>
                                                                                        </div>
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }
                                                                })}
                                                            </div>
                                                            <div className="col-md-6">
                                                                {obj.Price.map((v, i) => {
                                                                    if (i == 3) {
                                                                        return (
                                                                            <div>
                                                                                <div className="box">
                                                                                    <div className="box-header box-hdr">Grade4</div>
                                                                                    {v.Grade4.length > 0 ?
                                                                                        <div className="box-body">
                                                                                            <div id="Price4" className="price4"></div>
                                                                                            {/* <Price4 price4={v.Grade4} /> */}
                                                                                            {this.getPrice4Chart(v.Grade4)}
                                                                                        </div> :
                                                                                        <div className="box">
                                                                                            <div className="dis-err">No data..</div>
                                                                                        </div>
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }
                                                                })}
                                                            </div>
                                                            <div className="col-md-6">
                                                                {obj.Price.map((v, i) => {
                                                                    if (i == 4) {
                                                                        return (
                                                                            <div>
                                                                                <div className="box">
                                                                                    <div className="box-header box-hdr">Grade5</div>
                                                                                    {v.Grade5.length > 0 ?
                                                                                        <div className="box-body">
                                                                                            <div id="Price5" className="price5"></div>
                                                                                            {/* <Price5 price5={v.Grade5} /> */}
                                                                                            {this.getPrice5Chart(v.Grade5)}
                                                                                        </div> :
                                                                                        <div className="box">
                                                                                            <div className="dis-err">No data..</div>
                                                                                        </div>
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }
                                                                })}
                                                            </div>
                                                            <div className="col-md-6">
                                                                {obj.Price.map((v, i) => {
                                                                    if (i == 5) {
                                                                        return (
                                                                            <div>
                                                                                <div className="box">
                                                                                    <div className="box-header box-hdr">Grade6 (Diesel)</div>
                                                                                    {v.Grade6.length > 0 ?
                                                                                        <div className="box-body">
                                                                                            <div id="Price6" className="price6"></div>
                                                                                            {/* <Price6 price6={v.Grade6} /> */}
                                                                                            {this.getPrice6Chart(v.Grade6)}
                                                                                        </div> :
                                                                                        <div className="box">
                                                                                            <div className="dis-err">No data..</div>
                                                                                        </div>
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }
                                                                })}
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 card-styling1">
                                                <div className="box">
                                                    <div className="box-header box-hdr box-bg10">Sensor Data</div>
                                                    <div className="box-body box-bdy">
                                                        <div className="box">
                                                            <div className="box-header box-hdr">Temperature</div>
                                                            <div className="box-body">
                                                                <div id="temp" className="temp"></div >
                                                                {/* <Temparature temp={temp} /> */}
                                                                {this.getTempReport()}
                                                            </div>
                                                        </div>
                                                        <div className="box">
                                                            <div className="box-header box-hdr">Humidity</div>
                                                            <div className="box-body">
                                                                <div id="humidity" className="humidity"></div >
                                                                {/* <Humidity temp={temp} /> */}
                                                                {this.getHumidityReport()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="text-center"> {(this.state.loading1) ? <div className="fade modal-backdrop modal-backdrop1 backdrop in"><Loader /></div> : null}</div>
                </div>
            )
        }
        else {
            return (
                <div className="mr-left-32">
                    <div className="text-center"> {(this.state.loading1) ? <div className="fade modal-backdrop modal-backdrop1 backdrop in"><Loader /></div> : null}</div>
                    {dipenserReportData.length > 0 ?
                        <div className="box  data-error">
                            <div className="box-body box-bdy">
                                <div className="text-center"><i className="fa fa-warning" style={{ fontsize: "48px", color: "red" }}></i> {dipenserReportData}</div>
                            </div>
                        </div> :
                        <div></div>
                    }

                </div>
            )
        }
    }
}

export default Dispensers;

