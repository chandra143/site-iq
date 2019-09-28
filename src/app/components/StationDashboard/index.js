import React, { Component } from 'react';
import NewSite from '../NewSite';
import SiteDashboard from './SiteDashboard';

class StationDashboard extends Component {
  constructor(props) {
    // window.location.reload();
    super(props);
    this.state = {
      selectedWidget: "Error Codes",
      stationName: props.route.match.params.stationName,
      siteId: props.route.match.params.id
    };
  }
  getHeader() {
    return (
      <span>
        <a href="#/">Dashboard</a>
        <span className="title-separator">/</span>
        {this.state.stationName + " Dashboard"}
      </span>      
    );
    
  }
getData(stationName,siteId){
  // debugger
  if (this.props.route.match.params.stationName != stationName) {
    this.setState({stationName: this.props.route.match.params.stationName})
    this.state.stationName = this.props.route.match.params.stationName
  }
  if (this.props.route.match.params.id != siteId) {
    this.setState({siteId: this.props.route.match.params.id})
    this.state.siteId = this.props.route.match.params.id
    window.location.reload()
  }

}

  render() {
    // debugger
    const { stationName,siteId } = this.state
    {this.getData(stationName,siteId)}
    return (
      <NewSite pageTitle={this.getHeader()}>
        <div className="row">
          <div className="col-ms-4">
            <SiteDashboard text={stationName} site_id={siteId} />
          </div>
        </div>
      </NewSite>
    );
  }
}

export default StationDashboard;
