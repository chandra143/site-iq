import React, { Component } from 'react';
import Site from '../Site';
import WorkOrderData from '../../../data/WorkOrderListing.json';
import TechnicianData from '../../../data/TechnicianDetails.json';
import StationData from '../../../data/Sites.json';
import {Badge, DropdownButton, MenuItem, Button,FormGroup,InputGroup,FormControl} from 'react-bootstrap';
import Form from '../../libs/form';
import {String, Select, TextArea, FormCol} from '../../libs/form/Fields';
import WorkOrderForm from './WorkOrderForm';

class AddEditWorkOrder extends Component {
  constructor(props){
    super(props);
    let formData = {};
    let workOrderId = props.route.match.params && props.route.match.params.id ? props.route.match.params.id : null;
    if(workOrderId){
      formData = WorkOrderData.find((f)=>{return f.id == workOrderId;});
    }
    this.state = {
      workOrderId: workOrderId,
      workOrderObj : formData
    };
  }

  getHeader() {
    let {workOrderId} = this.state;
    return (
      <span>
        <a href="#/workorder">Work Order</a>
        <span className="title-separator">/</span>
        {
          !workOrderId
            ? "Add New Work Order"
            : [workOrderId, <span key={"1.1.1"} className="title-separator">/</span>, "Edit"]
        }
      </span>
    );
  }

  render() {
    return <Site pageTitle={this.getHeader()}>
      <WorkOrderForm route={this.props.route} workOrderId={this.state.workOrderId} formData={this.state.workOrderObj}/>
    </Site>;
  }
}

export default AddEditWorkOrder;
