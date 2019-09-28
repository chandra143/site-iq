import React, { Component } from 'react';
import { getSiteData, errorFix, getDispenserDataById, getSiteData1,getFlowRateA, getFlowRateB } from '../../services/SiteIQservices';
import AlertModal from '../Modal/AlertModal';
import UnderrunModal from '../Modal/UnderrunModal';
import OverrunModal from '../Modal/OverRun'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from 'react-bootstrap-button-loader';
import FlowRateModal from '../Modal/FlowRateModal'
import right from '../../../styles/img/righttick.png'

class SiteDashboard extends Component {
    constructor(props) {
        super(props);
        this.showSidePanelComponent = this.showSidePanelComponent.bind(this);
        this.hideSidePanelComponent = this.hideSidePanelComponent.bind(this);
        this.showSidePanelComponent1 = this.showSidePanelComponent1.bind(this);
        this.hideSidePanelComponent1 = this.hideSidePanelComponent1.bind(this);
        this.showSidePanelComponent2 = this.showSidePanelComponent2.bind(this);
        this.hideSidePanelComponent2 = this.hideSidePanelComponent2.bind(this);
        this.showSidePanelComponent3 = this.showSidePanelComponent3.bind(this);
        this.hideSidePanelComponent3 = this.hideSidePanelComponent3.bind(this);
        this.state = {
            stationName: props.text,
            showSidePanel: false,
            Dashboard: [],
            site_id: props.site_id,
            startDate: new Date(),
            showSidePanel1: false,
            showSidePanel2: false,
            showSidePanel3: false,
            // day7: '7',
            // day10: '10',
            // day30: '30',
            errorFix: [],
            name: '',
            deviceid: '',
            description: '',
            loading: false,
            loading1:false,
            timestamp: '',
            underrunData: [],
            overrunData: [],
            index: 0,
            active: '',
            buttons: [{ days: "7", name: "7 Days" }, { days: "30", name: "1 Month" }],
            flowRate1:[],
            flowRate2:[],
            alertId:'',
            assignId:'',
            deviceId:''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
        let tempDate = date;
        var selectedDate = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate();
        this.SiteData(selectedDate)
    }
    hideLoader = () => {
        this.setState({ loading: false });
    }
    
    showLoader = () => {
        this.setState({ loading: true });
    }

    showLoader1 = () => {
        this.setState({ loading1: true });
    }
    hideLoader1 = () => {
        this.setState({ loading1: false });
    }

    errorFix(Id) {
        this.showLoader()
        const data = Id.toUpperCase()
        errorFix(data).then((result) => {
            this.setState({ errorFix: result.data })
            this.hideLoader()
        })
    }
    componentDidMount() {
        this.getSiteData();
    }
    getSiteData() {
        this.showLoader1()
        getSiteData(this.state.site_id).then((result) => {
            this.setState({ Dashboard: result.data })
            this.hideLoader1()
        })
    }
    getSiteData1(days) {
        // debugger
        this.showLoader()
        const date =""
        getSiteData1(this.state.site_id,date,days).then((result) => {
            this.setState({ Dashboard: result.data })
            this.hideLoader()
        })
    }
    isActive(name, days) {
        this.setState({ active: name })
        this.getSiteData1(days)
    }
    SiteData(date) {
        this.state.active = ""
        this.showLoader1()
        const days =""
        getSiteData1(this.state.site_id, date,days).then((result) => {
            this.setState({ Dashboard: result.data })           
            this.hideLoader1()
        })
    }
    showSidePanelComponent(name, description, timestamp, alertId, assignId, deviceId) {
        this.errorFix(name)
        this.state.name = name
        this.state.description = description
        this.state.timestamp = timestamp
        this.state.alertId = alertId
        this.state.assignId = assignId
        this.state.deviceId = deviceId
        this.setState({
            showSidePanel: {
                [name]: true
            }
        });
    }
    hideSidePanelComponent() {
        this.setState({ showSidePanel: false });
    }

    showSidePanelComponent1() {
        this.getDeviceId()
        this.setState({ showSidePanel1: true });
    }
    hideSidePanelComponent1() {
        this.setState({ showSidePanel1: false });
    }
    showSidePanelComponent2() {
        // debugger
        this.getDeviceId1()
        this.setState({ showSidePanel2: true });
    }
    hideSidePanelComponent2() {
        this.setState({ showSidePanel2: false });
    }
    showSidePanelComponent3() {
        // debugger
        this.getDeviceId2()
        this.getDeviceId3()
        this.setState({ showSidePanel3: true });
    }
    hideSidePanelComponent3() {
        this.setState({ showSidePanel3: false });
    }
    getAddAlertModal(i) {
        const { showSidePanel } = this.state
        return (
            <AlertModal key={i} show={showSidePanel} siteId={this.props.site_id} possiblefixes={this.state.errorFix} name={this.state.name} description={this.state.description} timestamp={this.state.timestamp} alertId={this.state.alertId} assignId={this.state.assignId} deviceId={this.state.deviceId} closeButton={this.hideSidePanelComponent} bsSize="medium" />
        )
    }
    getAddUnderrunModal(i) {
        // debugger
        const { showSidePanel1 } = this.state
        return (
            <UnderrunModal key={i} show={showSidePanel1} dispensers={this.state.Dashboard} device_id={this.state.deviceid} data={this.state.underrunData} closeButton={this.hideSidePanelComponent1} bsSize="large" />
        )
    }
    getAddOverrunModal(i) {
        // debugger
        const { showSidePanel2 } = this.state
        return (
            <OverrunModal key={i} show={showSidePanel2} dispensers={this.state.Dashboard} device_id={this.state.deviceid} data={this.state.overrunData} closeButton={this.hideSidePanelComponent2} bsSize="large" />
        )
    }
    getAddOverrunModal(i) {
        // debugger
        const { showSidePanel2 } = this.state
        return (
            <OverrunModal key={i} show={showSidePanel2} dispensers={this.state.Dashboard} device_id={this.state.deviceid} data={this.state.overrunData} closeButton={this.hideSidePanelComponent2} bsSize="large" />
        )
    }
    getFlowRateModal(i) {
        // debugger
        const { showSidePanel3 } = this.state
        return (
            <FlowRateModal key={i} show={showSidePanel3} dispensers={this.state.Dashboard} device_id={this.state.deviceid} data={this.state.flowRate1} data1={this.state.flowRate2} closeButton={this.hideSidePanelComponent3} bsSize="large" />
        )
    }
    getErrorClass(Name) {
        let classname = '';
        switch (Name) {
            case "Minor":
                classname = "level-minor";
                break;
            case "Med":
                classname = "level-med";
                break;
            case "Major":
                classname = "level-Major";
                break;
            case "Critical":
                classname = "level-critical";
                break;
        }
        return classname;
    }

    getFlowrate(Name) {
        if (Name) {
            if (Name >= '12') {
                return <div className="flow_rate_red">{/*<i className="fa fa-exclamation-triangle" aria-hidden="true"></i>*/} <span style={{ color: '#f4511e' }}><b>High</b></span></div>
            }
            if (Name > '8' && Name <= '12') {
                return <div className="flow_rate_Green">{/*<i className="fa fa-exclamation-triangle" aria-hidden="true"></i>*/} <span style={{ color: '##f4971e' }}><b>Medium</b></span></div>
            }
            if (Name <= '8') {
                return <div className="flow_rate_yellow">{/*<i className="fa fa-exclamation-triangle" aria-hidden="true"></i>*/} <span style={{ color: '#40cc5c' }}><b>Low</b></span></div>
            }
        }
        else if (Name == null || Name == "" || Name == undefined) {
            return false
        }
    }
    getRecentalerts(value) {
        if (value == 1) {
            return (
                <div className="openalrt"><div className="openalrt-adjust">Open</div></div>
            )
        }
        if (value == 0) {
            return (
                <div className="closedalrt"><div className="closedalrt-adjust">Closed</div></div>
            )
        }
    }
    getDoorActive(value) {
        if (value == 1) {
            return (
                <div className="openalrt1"><div className="openalrt1-adjust">Open</div></div>
            )
        }
        if (value == 0) {
            return (
                <div className="closedalrt1"><div className="closedalrt1-adjust">Closed</div></div>
            )
        }
    }
    getSeverity(value) {
        if (value == 1) {
            return (
                <b className="EC-pad pad-left-0">Super Major</b>
            )
        }
        if (value == 2) {
            return (
                <b className="EC-pad pad-left-0">Major</b>
            )
        }
    }
    getAssign(value) {
        if (value != "") {
            return (
                <b className="EC-pad ec-pad1 pad-left-0">Not Assigned</b>
            )
        }
        else {
            <b className="EC-pad ec-pad1 pad-left-0">Assigned To :{value}</b>
        }
    }
    getErrorCodesNotAvilable(data) {
        if (data == "" || data == null || data == undefined) {
            return <div className="cl"><img src={right} style={{width:"13%"}} /> No Recent Error Codes</div>
        }

    }
    getDoorAlertsNotAvilable(data) {
        if (data == "" || data == null || data == undefined) {
            return <div className="cl"><img src={right} style={{width:"13%"}} /> No Door Alerts</div>
        }

    }
    getStandAloneNotAvilable(data) {
        if (data == "" || data == null || data == undefined) {
            return <div className="cl"><img src={right} style={{width:"13%"}} /> No StandAlones</div>
        }

    }

    getDeviceId() {
        const { Dashboard } = this.state
        this.state.deviceid = Dashboard.map((obj, i) => {
            if (i == 0) {
                return (
                    obj.device_id
                )
            }
        })
        this.getUnderRuns(this.state.deviceid)
    }
    getDeviceId1() {
        // debugger
        const { Dashboard } = this.state
        this.state.deviceid = Dashboard.map((obj, i) => {
            if (i == 0) {
                return (
                    obj.device_id
                )
            }
        })
        this.getOverRuns(this.state.deviceid)
    }
    getDeviceId2() {
        // debugger
        const { Dashboard } = this.state
        this.state.deviceid = Dashboard.map((obj, i) => {
            if (i == 0) {
                return (
                    obj.device_id
                )
            }
        })
        this.getFlowRate1(this.state.deviceid)
    }
    getDeviceId3() {
        // debugger
        const { Dashboard } = this.state
        this.state.deviceid = Dashboard.map((obj, i) => {
            if (i == 0) {
                return (
                    obj.device_id
                )
            }
        })
        this.getFlowRate2(this.state.deviceid)
    }
    getUnderRuns(device_id) {
        const Id = device_id[0]
        if (Id != undefined) {
            const day = '7'
            getDispenserDataById(Id, day).then((result) => {
                this.setState({ underrunData: result.data })
            })
        }
    }
    getOverRuns(device_id) {
        const Id = device_id[0]
        if (Id != undefined) {
            const day = '7'
            getDispenserDataById(Id, day).then((result) => {
                this.setState({ overrunData: result.data })
            })
        }
    }
    getFlowRate1(device_id) {
        const Id = device_id[0]
        if (Id != undefined) {
            const day = '7'
            getFlowRateA(Id, day).then((result) => {
                this.setState({ flowRate1: result.data })
            })
        }
    }
    getFlowRate2(device_id) {
        const Id = device_id[0]
        if (Id != undefined) {
            const day = '7'
            getFlowRateB(Id, day).then((result) => {
                this.setState({ flowRate2: result.data })
            })
        }
    }
    getFlow1(value) {
        if (value != 0) {
            // var twoPlacedFloat = parseFloat((10.02745).toFixed(2));
            return (
                <div className="col-md-12 col-adjust" style={{ borderBottom: "1px solid rgb(191, 184, 184)" }}>
                    <div className="col-md-6 sta-mtr">
                        Meter1
                    </div>
                    <div className="col-md-6 sta-mtr-val">
                        <div className="str-mtr-val-adjust">
                            {parseFloat(value).toFixed(2)}
                        </div>
                    </div>
                </div>
            )
        }
    }
    getFlow2(value) {
        if (value != 0) {
            return (
                <div className="col-md-12 col-adjust" style={{ borderBottom: "1px solid rgb(191, 184, 184)" }}>
                    <div className="col-md-6 sta-mtr">
                        Meter2
                    </div>
                    <div className="col-md-6 sta-mtr-val">
                        <div className="str-mtr-val-adjust">
                            {parseFloat(value).toFixed(2)}
                        </div>
                    </div>
                </div>
            )
        }
    }
    getFlow3(value) {
        if (value != 0) {
            return (
                <div className="col-md-12 col-adjust" style={{ borderBottom: "1px solid rgb(191, 184, 184)" }}>
                    <div className="col-md-6 sta-mtr">
                        Meter3
                    </div>
                    <div className="col-md-6 sta-mtr-val">
                        <div className="str-mtr-val-adjust">
                            {parseFloat(value).toFixed(2)}
                        </div>
                    </div>
                </div>
            )
        }
    }
    getFlow4(value) {
        if (value != 0) {
            return (
                <div className="col-md-12 col-adjust" style={{ borderBottom: "1px solid rgb(191, 184, 184)" }}>
                    <div className="col-md-6 sta-mtr">
                        Meter4
                    </div>
                    <div className="col-md-6 sta-mtr-val">
                        <div className="str-mtr-val-adjust">
                            {parseFloat(value).toFixed(2)}
                        </div>
                    </div>
                </div>
            )
        }
    }
    getFlow5(value) {
        if (value != 0) {
            return (
                <div className="col-md-12 col-adjust" style={{ borderBottom: "1px solid rgb(191, 184, 184)" }}>
                    <div className="col-md-6 sta-mtr">
                        Meter5
                    </div>
                    <div className="col-md-6 sta-mtr-val">
                        <div className="str-mtr-val-adjust">
                            {parseFloat(value).toFixed(2)}
                        </div>
                    </div>
                </div>
            )
        }
    }
    getFlow6(value) {
        if (value != 0) {
            return (
                <div className="col-md-12 col-adjust" style={{ borderBottom: "1px solid rgb(191, 184, 184)" }}>
                    <div className="col-md-6 sta-mtr">
                        Meter6
                    </div>
                    <div className="col-md-6 sta-mtr-val">
                        <div className="str-mtr-val-adjust">
                            {parseFloat(value).toFixed(2)}
                        </div>
                    </div>
                </div>
            )
        }
    }
    doorName(value) {
        if (value == "TOP_DOOR_A") {
            return (
                <b className="EC-pad">SideA</b>
            )
        }
        if (value == "TOP_DOOR_B") {
            return (
                <b className="EC-pad">SideB</b>
            )
        }
    }
    reset() {
        this.state.startDate = new Date()
        this.state.active = ""
        this.getSiteData();
    }
    dispenserRight() {
        document.getElementById('dp').scrollLeft += 250;
    }
    dispenserLeft() {
        document.getElementById('dp').scrollLeft -= 250;
    }
    render() {
        const { stationName, Dashboard, site_id, time, day10, day30, day7, buttons,loading } = this.state
        const Loader = () => <div><i className="fa fa-spinner fa-spin fa-3x fa-fw" style={{ color: "#fff", marginTop: "25%" }}></i></div>;
        return (
            <div className="container-ipad mr-left-6">
                <div className="report-pack" style={{ paddingTop: "50px" }}>
                    <div className="col-md-12 site-adjust">
                        <div className="col-md-8" id="myDiv">
                            <div className="report-check">
                                {buttons.map((name, i) => {
                                    return (
                                        <Button type="submit" loading={this.state.loading} className={this.state.active === name.name ? 'btn sta-btn active' : 'btn sta-btn' || this.state.active === "" ? 'btn sta-btn' : 'btn sta-btn'} key={name.name} disabled={loading} onClick={this.isActive.bind(this, name.name, name.days)}>
                                            {/* {isLoading && <i className="fa fa-refresh fa-spin"></i>} */}
                                            {name.name}
                                        </Button>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div style={{ float: "right" }}>
                                <DatePicker
                                loading ={this.state.loading1}
                                    className="datepicker"
                                    selected={this.state.startDate}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div className="col-md-1">
                            <span className="fa-stack" onClick={this.reset.bind(this)} style={{ cursor: "pointer" }}>
                                <i className="fa fa-circle fa-stack-2x"></i>
                                <i className="fa fa-undo fa-stack-1x fa-inverse"></i>
                            </span>
                        </div>

                        <div className="col-md-1">
                            <div className="nextdispenser">
                                <span className="arrow-btn">
                                    <a id="previous-column" onClick={() => this.dispenserLeft()} >
                                        <i className="fa fa-chevron-left pull-left" aria-hidden="true"></i>
                                        {/*<th key={i} show={this.showSidePanelComponent}/>*/}</a>
                                    <a id="next-column" onClick={() => this.dispenserRight()}>
                                        <i className="fa fa-chevron-right pull-right" aria-hidden="true"></i>
                                        {/*<th key={i} closeButton={this.hideSidePanelComponent}/>*/}</a>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="table-responsive" id="dp">
                        <table className="table table1" style={{ borderRadius: "5px" }} id="colon-strip">
                            <thead className="header-pos">
                                <tr>
                                    <th scope="col" className="left-tab">

                                    </th>

                                    {Dashboard.map((key, i) => {
                                        let device_id = key.device_id;
                                        return (
                                            <th key={i} className="header-tab">
                                                <a className="aa" href={'#/stationdashboard/' + stationName + '/dispencerdashboard' + '/' + site_id + '/' + device_id}>
                                                    <h3 className="txt">
                                                        <div className="name"><i className="fas fa-gas-pump"></i> Dispenser {key.pumpnumber1 + '/' + key.pumpnumber2} &nbsp;<i className="fas fa-arrow-right"></i></div>
                                                    </h3>
                                                </a>
                                                {/* <span onClick={this.moveNext.bind(this,i)}><i className="fa fa-arrow-right"></i></span> <span><i className="fa fa-arrow-left"></i></span> */}
                                            </th>
                                        )
                                    })}

                                </tr>

                            </thead>
                            <tbody style={{ backgroundColor: "white" }}>
                                <tr>
                                    <td className="td-side table-primary col1 col-md-4 td-pad"><span className="td-opacity">Recent Error Codes
                                    {/* <i className="fa fa-external-link lnk" aria-hidden="true"></i> */}
                                    </span>
                                    {this.getFlowRateModal()}
                                    </td>
                                    {Dashboard.map((key, i) => {
                                        return (
                                            <td key={i} className="crd col">
                                                {key.recent_alerts.length > 0 ? key.recent_alerts.map((recentalerts, i) => {
                                                    return (
                                                        <div className="bc">
                                                            <span className="col-md-12 font-family sta-pad">
                                                                <div className="col-md-3 pad-left-0">
                                                                    <b className="EC-pad" onClick={this.showSidePanelComponent.bind(this, recentalerts.name, recentalerts.description, recentalerts.created_at, recentalerts.id, recentalerts.assign_id, recentalerts.device_id)}><a>{recentalerts.name}</a>
                                                                    </b>
                                                                </div>
                                                                <div className="col-md-9 sta-err">
                                                                    <span style={{ fontSize: "11px", color: "lightgray" }}>{recentalerts.created_at}
                                                                    </span>
                                                                </div>
                                                            </span>
                                                            <span className="col-md-12 font-family sta-pad">
                                                                <div className="col-md-6 pad-left-0">
                                                                    {this.getSeverity(recentalerts.severity)}
                                                                </div>
                                                                <div className="col-md-6">
                                                                    {this.getRecentalerts(recentalerts.active)}
                                                                </div>
                                                            </span>
                                                            {this.getAddAlertModal()}
                                                        </div>
                                                    )
                                                }) :
                                                    <div className="fnt bc">
                                                        {this.getErrorCodesNotAvilable(key.recent_alerts)}
                                                    </div>
                                                }
                                            </td>
                                        )
                                    })}
                                </tr>
                                {/* <tr>
                                    <td className="td-side table-primary col1 col-md-4 td-pad"><span className="td-opacity"><a onClick={this.showSidePanelComponent3}>Max Flow Rate
                                    <i className="fa fa-external-link lnk" aria-hidden="true"></i></a>
                                    </span>
                                    </td>
                                    {Dashboard.map((key, i) => {
                                        return (
                                            <td key={i} className="crd col col-md-4">
                                                <div className="col-md-12 sta-pad">
                                                    <div className="col-md-6 pad-left-0">
                                                        <table className="sidea">
                                                            <tr><td className="sidea-clr">SideA</td>
                                                            </tr>
                                                            {this.getFlow1(key.flow_rate.sidea.meter1)}
                                                            {this.getFlow2(key.flow_rate.sidea.meter2)}
                                                            {this.getFlow3(key.flow_rate.sidea.meter3)}
                                                            {this.getFlow4(key.flow_rate.sidea.meter4)}
                                                            {this.getFlow5(key.flow_rate.sidea.meter5)}
                                                            {this.getFlow6(key.flow_rate.sidea.meter6)}
                                                        </table>
                                                    </div>
                                                    <div className="col-md-6 pad-left-10">
                                                        <table className="sideb">
                                                            <tr><td className="sideb-clr">SideB</td>
                                                            </tr>
                                                            {this.getFlow1(key.flow_rate.sideb.meter1)}
                                                            {this.getFlow2(key.flow_rate.sideb.meter2)}
                                                            {this.getFlow3(key.flow_rate.sideb.meter3)}
                                                            {this.getFlow4(key.flow_rate.sideb.meter4)}
                                                            {this.getFlow5(key.flow_rate.sideb.meter5)}
                                                            {this.getFlow6(key.flow_rate.sideb.meter6)}
                                                        </table>
                                                    </div>
                                                </div>
                                            </td>
                                        )
                                    }
                                    )}
                                </tr> */}

                                <tr>
                                    <td className="td-side table-primary col1 col-md-4 td-pad"><span className="td-opacity">Door Alert
                                    {/* <i className="fa fa-external-link lnk" aria-hidden="true"></i> */}
                                    </span>
                                    </td>
                                    {Dashboard.map((key, i) => {
                                        return (
                                            <td className="crd col">
                                                {key.door_alarm.length > 0 ? key.door_alarm.map((dooralarm, i) => {
                                                    return (
                                                        <div className="bc">
                                                            <span className="col-md-12 font-family sta-pad">
                                                                <div className="col-md-3 pad-left-0">
                                                                    {this.doorName(dooralarm.name)}
                                                                </div>
                                                                <div className="col-md-9 sta-err">
                                                                    <span style={{ fontSize: "11px", color: "lightgray" }}>{dooralarm.created_at}
                                                                    </span>
                                                                </div>
                                                            </span>
                                                            <span className="col-md-12 font-family sta-pad">
                                                                <div className="col-md-9 pad-left-0">
                                                                    {this.getAssign(dooralarm.assign_id)}
                                                                </div>
                                                                <div className="col-md-3">
                                                                    {this.getDoorActive(dooralarm.active)}
                                                                </div>
                                                            </span>
                                                        </div>
                                                    )
                                                })
                                                    :
                                                    <div className="fnt bc">
                                                        {this.getDoorAlertsNotAvilable(key.door_alarm)}
                                                    </div>
                                                }

                                            </td>
                                        )
                                    })}
                                </tr>
                                {/* <tr>
                                    <td className="td-side table-primary col1 col-md-4 td-pad"><span className="td-opacity"><a onClick={this.showSidePanelComponent1}>Under Run<i className="fa fa-external-link lnk" aria-hidden="true"></i></a></span>
                                        {this.getAddUnderrunModal()}
                                    </td>
                                    {Dashboard.map((key, i) => {
                                        return (
                                            <td key={i} className="crd col col-md-4">
                                                <div className="sides col-md-12 sta-pad sta-pad-adjust">
                                                    <div className="col-md-6 pad-left-0">
                                                        <table className="sidea">
                                                            <tr><td className="sidea-clr">SideA</td>
                                                            </tr>
                                                            <tr><td>{key.under_runs.sidea}</td></tr>
                                                        </table>
                                                    </div>
                                                    <div className="col-md-6 pad-left-10 pad-left-10-adjust">
                                                        <table className="sideb">
                                                            <tr><td className="sideb-clr">SideB</td>
                                                            </tr>
                                                            <tr><td>{key.under_runs.sideb}</td></tr>
                                                        </table>
                                                    </div>
                                                </div>
                                            </td>
                                        )
                                    })}
                                </tr> */}
                                <tr>
                                    <td className="td-side table-primary col1 col-md-4 td-pad"><span className="td-opacity"><a onClick={this.showSidePanelComponent2}>Over Run<i className="fa fa-external-link lnk" aria-hidden="true"></i></a></span>
                                        {this.getAddOverrunModal()}
                                    </td>

                                    {Dashboard.map((key, i) => {
                                        return (
                                            <td key={i} className="crd col col-md-4">
                                                <div className="sides col-md-12 sta-pad sta-pad-adjust">
                                                    <div className="col-md-6 pad-left-0">
                                                        <table className="sidea">
                                                            <tr><td className="sidea-clr">SideA</td>
                                                            </tr>
                                                            <tr><td>{key.over_runs.sidea}</td></tr>
                                                        </table>
                                                    </div>
                                                    <div className="col-md-6 pad-left-10 pad-left-10-adjust">
                                                        <table className="sideb">
                                                            <tr><td className="sideb-clr">SideB</td>
                                                            </tr>
                                                            <tr><td>{key.over_runs.sideb}</td></tr>
                                                        </table>
                                                    </div>
                                                </div>
                                            </td>
                                        )
                                    })}
                                </tr>
                                <tr>
                                    <td className="td-side table-primary col1 col-md-4 td-pad"><span className="td-opacity">Stand Alone
                                    {/* <i className="fa fa-external-link lnk" aria-hidden="true"></i> */}
                                    </span>
                                    </td>

                                    {Dashboard.map((key, i) => {
                                        return (
                                            <td key={i} className="crd col col-md-4">
                                                {key.stand_alone_count.sideb.length > 0 ? key.stand_alone_count.sideb.map((obj, i) => {
                                                    return (
                                                        <div className="bc">
                                                            {/* <span className="col-md-12 font-family sta-pad">
                                                                <div className="col-md-3 pad-left-0">
                                                                    {this.doorName(dooralarm.name)}
                                                                </div>
                                                                <div className="col-md-9 sta-err">
                                                                    <span style={{ fontSize: "11px", color: "lightgray" }}>{dooralarm.created_at}
                                                                    </span>
                                                                </div>
                                                            </span>
                                                            <span className="col-md-12 font-family sta-pad">
                                                                <div className="col-md-9 pad-left-0">
                                                                    {this.getAssign(dooralarm.assign_id)}
                                                                </div>
                                                                <div className="col-md-3">
                                                                    {this.getDoorActive(dooralarm.active)}
                                                                </div>
                                                            </span> */}
                                                        </div>
                                                    )
                                                })
                                                    :
                                                    <div className="fnt bc">
                                                        {this.getStandAloneNotAvilable(key.stand_alone_count.sideb)}
                                                    </div>
                                                }
                                            </td>
                                        )
                                    })}
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="text-center"> {(this.state.loading1) ? <div className="fade modal-backdrop modal-backdrop1 backdrop in"><Loader /></div> : null}</div>
                {/* </div> */}
            </div>
        );
    }
}

export default SiteDashboard;