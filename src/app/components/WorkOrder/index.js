import React, { Component } from 'react';
import Site from '../Site';
import WorkOrderData from '../../../data/WorkOrderListing.json';
import {Badge, DropdownButton, MenuItem, Button,FormGroup,InputGroup,FormControl} from 'react-bootstrap';
// import GanttChart from './GanttChart';
import Scheduler from './Scheduler';
import ToggleButton from 'react-toggle-button';
import {
  Table,
  Thead,
  Th,
  Tr,
  Td,
  unsafe
} from 'reactable';

class WorkOrder extends Component {
  constructor(){
    super();
    this.state = {
      sorted: {
        key: 'id',
        text: 'Work Order ID'
      },
      listView:false
    };
  }

  generateStatusText = (obj) => {
    switch(obj.status){
    case "Unassigned":
      return "Unassigned";
      break;
    case "Assigned":
      return "Assigned to: " + obj.technicianName.technicianName;
      break;
    case "Completed":
      return "Completed by: " +obj.technicianName.technicianName;
      break;
    }
  }

  getWorkOrderWidget(){
    return WorkOrderData.map((obj,i)=>{
      return (
        <div key={i} className="col-sm-3 work-order-widget">
          <div
            // className={obj.level === "MAJOR" ? "box box-default major-level-widget" : "box box-default critical-level-widget"}
            className={"box box-default"}
            onClick={this.handleWidgetClick.bind(this, obj.id)}
          >
            <div className="box-body sw-container" style={{cursor: "pointer"}}>
              <b>#: {obj.id}</b>
              <Badge className={"pull-right background-"+obj.level.toLowerCase()}>{obj.level}</Badge>
              <div className="sw-text-container">
                <h5 className="sw-text">{obj.workOrderDesc}</h5>
                <h6>{this.generateStatusText(obj)}</h6>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  getWorkOrderTable(){
    return <table
      className="table table-hover table-bordered"
      noDataText="No records found."
      // currentPage={0}
      // itemsPerPage={data.length > 10 ? 10 : 0}
      // previousPageLabel={<i className="fa fa-angle-double-left"></i>}
      // nextPageLabel={<i className="fa fa-angle-double-right"></i>}
    >
      <thead>
        <tr>
          <th column="workOrderID">WorkOrder ID</th>
          <th column="level">Error</th>
          <th column="workOrderDesc">Description</th>
          <th column="status">Status</th>
        </tr>
      </thead>
      <tbody>
      {WorkOrderData.map((obj, i) => {
        return (
          <tr key={i}>
            <td column="workOrderID"><a href={"#/workorder/"+obj.id+"/edit"}><span>{obj.id}</span></a></td>
            <td column="level"><span>{obj.level}</span></td>
            <td column="workOrderDesc"><span>{obj.workOrderDesc}</span></td>
            <td column="status"><span>{this.generateStatusText(obj)}</span></td>

          </tr>
        );
      })}
      </tbody>
    </table>;
  }

  handleWidgetClick(id){
    this.props.router.push("workorder/"+id+"/edit");
  }

  sortByKey = (string) => {
    switch (string) {
    case "id":
      return "Work Order ID";
      break;
    case "startTime":
      return "Start Time";
      break;
    case "status":
      return "Status";
      break;
    default:
      return "Work Order ID";
    }
  }

  onSortByClicked = (eventKey, el) => {
    const liList = el.target.parentElement.parentElement.children;
    for (let i = 0; i < liList.length; i++) {
      liList[i].setAttribute('class', '');
    }
    el.target.parentElement.setAttribute("class", "active");
    const sortKey = eventKey;
    const sortObj = {
      key: eventKey,
      text: this.sortByKey(eventKey)
    };
    this.setState({sorted: sortObj});
  }

  render() {
    const {sorted, listView} = this.state;
    const sortTitle = <span>Sort:<span style={{
      color: "#006ea0"
    }}>&nbsp;{sorted.text}</span>
    </span>;
    return <Site pageTitle="Work Order">
      <div className="row" style={{marginBottom:'10px'}}>
        <div className="col-sm-12">
          <ToggleButton
            value={ listView }
            containerStyle={{display:'inline-block',width:'65px', float:'right', marginLeft: "25px"}}
            thumbStyle={{borderRadius: 2}}
            trackStyle={{width:'65px', borderRadius: 2}}
            thumbAnimateRange={[1, 46]}
            activeLabelStyle={{ width:'25px', top: '1px', left:'8px' }}
            inactiveLabelStyle={{ width:'40px', top: '1px', left:'-2px' }}
            activeLabel={<label>LIST</label>}
            inactiveLabel={<label>CHART</label>}
            onToggle={(value) => {
              this.setState({
                listView: !value
              });
            }} />
          <a className="btn btn-primary btn-xs pull-right" href="#/workorder/add">Add New Order</a>
        </div>
      </div>
      {listView ?
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6 text-right">
              <FormGroup>
                <InputGroup>
                <FormControl type="text" placeholder="Search" className="" />
                <InputGroup.Addon>
                  <i className="fa fa-search"></i>
                </InputGroup.Addon>
                </InputGroup>
              </FormGroup>
            </div>
            <div className="col-md-2 col-md-offset-2 text-center">
              <DropdownButton title={sortTitle} id="sortDropdown" className="sortDropdown ">
                <MenuItem active={sorted.key === "id" ? true : false } onClick={this.onSortByClicked.bind(this, "id")}>
                  &nbsp;Work Order ID
                </MenuItem>
                <MenuItem active={sorted.key === "startTime" ? true : false } onClick={this.onSortByClicked.bind(this, "startTime")}>
                  &nbsp;Start Time
                </MenuItem>
                <MenuItem active={sorted.key === "status" ? true : false } onClick={this.onSortByClicked.bind(this, "status")}>
                  &nbsp;Status
                </MenuItem>
              </DropdownButton>
            </div>
          </div>
        </div>
       : null}
      {listView ?
      <div className="row">
        <div className="col-sm-12" style={{background:'white', padding:'20px'}}>
          {/*this.getWorkOrderWidget()*/}
          {this.getWorkOrderTable()}
        </div>
      </div>
      :
      <Scheduler />
      }
    </Site>;
  }
}

export default WorkOrder;
