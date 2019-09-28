import React, { Component } from 'react';
import { Link } from 'react-router';
import NewSite from '../NewSite';
import Dispensers from '../DispenserDashboard/Dispensers'

class DispenserDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stationName: props.route.match.params.stationName,
            siteId: props.route.match.params.id,
            Id: props.route.match.params.deviceid
        };
    }
    getHeader() {
        return (
          <span>
            <a href="#/">Dashboard</a>
            <span className="title-separator">/</span>
            <a href={'#/station/' + this.state.stationName + '/' + this.state.siteId}>{this.state.stationName + " Dashboard"}</a>
            <span className="title-separator">/</span>
            {this.state.Id}
          </span>      
        );
        
      }

    render() {
        const { stationName, siteId, Id } = this.state
        return (
            <NewSite pageTitle={this.getHeader()}>
                <Dispensers siteName={stationName} site_id={siteId} Id={Id} />
            </NewSite>
        );
    }
}

export default DispenserDashboard;
