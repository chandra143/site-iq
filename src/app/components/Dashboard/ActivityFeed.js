import React, { Component } from 'react';
import { Tabs, Tab, Label } from 'react-bootstrap';
import { Badge, DropdownButton, MenuItem, Button, FormGroup, InputGroup, FormControl, Checkbox, Popover, OverlayTrigger } from 'react-bootstrap';
import { getAlerts, ignore, errorFix } from '../../services/SiteIQservices'
import AssignModal from '../Modal/Assign'
import DashboardAlert from '../Modal/DashboardAlert'
import app_state from '../../app_state';

class ActivityFeed extends Component {
  constructor(props) {
    super(props);
    this.showSidePanelComponent = this.showSidePanelComponent.bind(this);
    this.hideSidePanelComponent = this.hideSidePanelComponent.bind(this);
    this.showSidePanelComponent1 = this.showSidePanelComponent1.bind(this);
    this.hideSidePanelComponent1 = this.hideSidePanelComponent1.bind(this);
    this.state = {
      selectedAlert: undefined,
      alerts: [],
      showSidePanel: false,
      showSidePanel1: false,
      name: '',
      id: '',
      deviceid: '',
      description: '',
      type: '',
      timestamp: '',
      userProfile: app_state.user_profile,
      ID: '',
      ignore: [],
      buttonName: 'Assign',
      isButtonDisabled: false,
      errorFix: [],
      loading: false,
      assignedId: ''
    };
  }
  hideLoader = () => {
    this.setState({ loading: false });
  }

  showLoader = () => {
    this.setState({ loading: true });
  }
  errorFix(Id) {
    this.showLoader()
    const data = Id.toUpperCase()
    errorFix(data).then((result) => {
      this.setState({ errorFix: result.data })
      this.hideLoader()
    })
  }
  showSidePanelComponent(name, id, deviceid, assign_id) {
    this.state.name = name
    this.state.assignedId = assign_id
    this.state.id = id
    this.state.deviceid = deviceid
    this.setState({ showSidePanel: true });
  }
  hideSidePanelComponent() {
    this.setState({ showSidePanel: false });
  }
  showSidePanelComponent1(name, description, type, timestamp, deviceid) {
    
    this.errorFix(name)
    this.state.name = name
    this.state.description = description
    this.state.type = type
    this.state.timestamp = timestamp
    this.state.deviceid = deviceid
    this.setState({ showSidePanel1: true });
  }
  hideSidePanelComponent1() {
    this.setState({ showSidePanel1: false });
  }
  getDashboardAlertModal() {
    const { showSidePanel1 } = this.state
    return (
      <DashboardAlert show={showSidePanel1} possiblefixes={this.state.errorFix} name={this.state.name} description={this.state.description} type={this.state.type} timestamp={this.state.timestamp} deviceid={this.state.deviceid} closeButton={this.hideSidePanelComponent1}/>
    )
  }
  getAddAssignModal() {
    const { showSidePanel, isButtonDisabled } = this.state
    return (
      <AssignModal show={showSidePanel} button={this.getButton.bind(this)} getAlerts={this.getAlerts.bind(this)} name={this.state.name} id={this.state.id} deviceid={this.state.deviceid} timestamp={this.state.timestamp} closeButton={this.hideSidePanelComponent} />
    )
  }
  getButton() {
    
    getAlerts(this.state.ID).then((res) => {
      
      this.setState({ alerts: res.data })
      this.alerts()
    })  
  }
  getButtons(value) {
    
    this.state.assignedId = value
    if (value != null) {
      this.state.buttonName = 'Assigned'
      this.state.isButtonDisabled = true
    }
    else {
      this.state.buttonName = 'Assign'
      this.state.isButtonDisabled = false
    }
  }
  getIgnore(Id) {
    
    ignore(Id).then((res) => {      
      this.setState({ ignore: res.data })
      this.getAlerts();
    })
  }
  getAlerts() {
    if (app_state.user_profile.Role === "Admin" && app_state.user_profile.Type === "SiteIQAdmin") {
      this.state.ID = this.props.siteData.Site_id
      getAlerts(this.state.ID).then((res) => {
        this.setState({ alerts: res.data })
      })
    }
    if (app_state.user_profile.Role === "Admin" && app_state.user_profile.Type === "RegionManager") {
      this.state.ID = this.props.siteData.id
      getAlerts(this.state.ID).then((res) => {
        this.setState({ alerts: res.data })
      })
    }
    if (app_state.user_profile.Role === "View" && app_state.user_profile.Type === "SiteOwner") {
      this.state.ID = this.props.siteData.id
      getAlerts(this.state.ID).then((res) => {
        this.setState({ alerts: res.data })
      })
    }

  }
  componentDidMount() {
    this.getAlerts()
  }
  getLevelClass(level) {
    let classname = '';
    switch (level) {
      case "MAJOR":
        classname = "text-major";
        break;
      case "CRITICAL":
        classname = "text-critical";
        break;
    }
    return classname;
  }

  onLocationClick = (d, alert, e) => {
    this.setState({ selectedAlert: alert });
  }

  eventCreateOrder = (stationData, alertData, e) => {
    this.props.showSidePanelComponent(stationData, alertData);
  }
  alerts() {    
    const { siteData } = this.props;
    const { alerts } = this.state;
    let currentDate = new Date();
    return (
      <div>
        {alerts.map((s, i) => {
          let tempDateTime = new Date(currentDate.getTime() - (1000 * 60 * 60 * (i + 1)));
          
          this.state.assignedId = s.assign_id;
          if (this.state.assignedId != null) {
            this.state.buttonName = 'Assigned'
            this.state.isButtonDisabled = true
          }
          else {
            this.state.buttonName = 'Assign'
            this.state.isButtonDisabled = false
          }
          return (
            <div className="bgc">
              <div key={"keyprop"+i} onClick={this.onLocationClick.bind(this, siteData, s)}
                className={s.status === 'Unassigned' ? "searchlistbox hasWorkOrder" : "searchlistbox"}
              >
                {/* <span className="pull-right" style={{ fontSize: '11px' }}><i className="fa fa-clock-o"></i> {moment.duration(moment(currentDate).diff(tempDateTime)).humanize()} ago</span> */}
                <div className="col-md-4 pad-left-0">
                  <span className="pop-mrb" disabled={!this.state.id} key={"keyprop"+i} style={{ display: "block" }}><strong></strong><a onClick={this.showSidePanelComponent1.bind(this, s.name, s.description, s.type, s.timestamp, s.device_id)}> {s.name} </a>
                    {this.getDashboardAlertModal()}
                  </span>
                </div>
                <div className="col-md-8">
                  <span className="alert-time">{s.timestamp}</span>
                </div>
                <div className="col-md-12 pad-left-0">
                  <span className="pop-mrb" style={{ display: "block" }}> {s.description}</span>
                </div>

                {/* <strong className={this.getLevelClass(s.errorType.trim())}>{s.errorType.trim() + ":"}</strong> */}
                <div className="pop-mrb">
                  <div className="row">
                    <div className="col-md-6 col-sm-6">
                      <Button className="btn btnpop1" key={i} onClick={this.showSidePanelComponent.bind(this, s.name, s.id, s.device_id, s.assign_id)} disabled={this.state.isButtonDisabled}>{this.state.buttonName}</Button>
                      {this.getAddAssignModal()}
                    </div>
                    <div className="col-md-6 col-sm-6">
                      <Button className="btn btnpop2" onClick={this.getIgnore.bind(this, s.id)} disabled={this.state.isButtonDisabled}>Ignore</Button>
                    </div>
                    {/* <div className="col-md-6 col-sm-6">
                      <Button className="btn btnpop3" disabled={this.state.isButtonDisabled}>Close</Button>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          )
        })
        }
      </div>
    );
  }
  render() {
    return (
      this.alerts()
    )
  }
}

export default ActivityFeed;
