import React, { Component } from 'react';
import siteData from '../../../data/Sites.json';
import technicianData from '../../../data/TechnicianDetails.json';
import { Tabs, Tab, Label } from 'react-bootstrap';
import {
  Table,
  Thead,
  Th,
  Tr,
  Td,
  unsafe
} from 'reactable';
import moment from 'moment';

class Technician extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAlert: undefined
    };
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

  render() {
    const { data, siteData } = this.props;
    const { selectedAlert } = this.state;
    let currentDate = new Date();
    return (
      <div id="techniciancontainer">
        {_.map(data, (s, i) => {
          let tempDateTime = new Date(currentDate.getTime() - (1000 * 60 * 60 * (i + 1)));
          return (
            <div key={i} onClick={this.onLocationClick.bind(this, siteData, s)}
              className={s.status === 'Unassigned' ? "searchlistbox hasWorkOrder" : "searchlistbox"}
            >
              <h5>TECHNICIAN</h5>
              <span style={{ display: "block" }}><strong>Name:</strong> Mason Doe</span>
              <span style={{ display: "block" }}><strong>Address:</strong> Dunseith, North Dakota, Rolette, Code:58329</span>
              <span style={{ display: "block" }}><strong>Email:</strong> mason.doe@test.com</span>
              <span style={{ display: "block" }}><strong>Email:</strong> 555 555 5555</span>
            </div>
          )
        })}
      </div>
    );
  }
}

export default Technician;