import React, { Component } from 'react';
import {Link} from 'react-router';
import Site from '../Site';
import WorkOrderData from '../../../data/WorkOrderListing.json';
import TechnicianData from '../../../data/TechnicianDetails.json';
import StationData from '../../../data/Sites.json';
import {Badge, DropdownButton, MenuItem, Button,FormGroup,InputGroup,FormControl} from 'react-bootstrap';
import Form from '../../libs/form';
import {String, Select, TextArea, FormCol} from '../../libs/form/Fields';
import Toastr from '../../Toastr';
import Scheduler, {SchedulerData, ViewTypes, DATE_FORMAT, ResourceList, TaskList, DnDSource} from 'react-big-scheduler';
import app_state from '../../app_state';


import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

if(!app_state.dragDropContext){
  app_state.dragDropContext = DragDropContext(HTML5Backend);
}

const DemoData = {};

class WorkOrderForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      workOrderId: props.workOrderId,
      workOrderObj : props.formData,
      movable: false,
      resizable: false
    };
  }

  componentDidMount(){
    const width = this.refs.schedulerContainer.clientWidth;
    if(this.schedulerData && this.schedulerData.config.schedulerWidth != width){
      this.schedulerData.config.schedulerWidth = (width-35);
      this.forceUpdate();
    }
  }

  getViewModel(technician){
    let schedulerData;

    if(this.schedulerData){
      schedulerData = this.schedulerData;
    }else{
      let width =300;

      if(this.refs.schedulerContainer){
        width = this.refs.schedulerContainer.clientWidth;
      }

      schedulerData = new SchedulerData('2018-04-27', ViewTypes.Day, false, false, {
        eventItemHeight: 30,
        eventItemLineHeight: 32,
        checkConflict: true,
        schedulerWidth: (width - 35),
        dayStartFrom: 8,
        dayStopTo: 18,
        views: [
          {viewName: 'Day', viewType: ViewTypes.Day, showAgenda: false, isEventPerspective: false},
          {viewName: 'Week', viewType: ViewTypes.Week, showAgenda: false, isEventPerspective: false}
        ]
      });
    }

    DemoData.resources = [{
      id: 'r1',
      name: technician.technicianName
    }];
    schedulerData.setResources(DemoData.resources);

    DemoData.events = [{
      id: 1,
      start: '2018-04-27 09:30:00',
      end: '2018-04-27 13:30:00',
      resourceId: 'r1',
      title: '#106',
      bgColor: '#D9D9D9'
    }];

    const {workOrderObj} = this.state;

    if(workOrderObj.schedule){
      DemoData.events.push(workOrderObj.schedule);
    }

    schedulerData.setEvents(DemoData.events);

    this.schedulerData = schedulerData;

    return schedulerData;
  }

  componentWillReceiveProps(newProps){
    const {formData} = this.props;
    if(newProps.formData != formData){
      this.setState({workOrderObj: newProps.formData});
    }
  }

  addWorkOrder = () => {
    const Form = this.refs.Form;
    if(Form.validate()){
      // console.log(Form.state.FormData);
      const obj = Form.state.FormData;
      obj.level = typeof obj.level === "string" ? obj.level : obj.level.value;
      obj.status = "Assigned";
      obj.assignedTo = typeof obj.technicianName === "string" ? obj.technicianName : obj.technicianName.technicianName;
      const newOrder = !obj.id ? true : false;
      if(!obj.id){
        obj.id = WorkOrderData[WorkOrderData.length - 1].id + 1;
        if(!obj.schedule){
          Toastr.error(
            <strong>Please select schedule</strong>,null,
            {
              timeOut: 3000,
              closeButton: true,
              tapToDismiss: false,
              extendedTimeOut: 0,
              preventDuplicates:true
            }
          );
          return;
        }
        obj.schedule.title = obj.id;
        WorkOrderData.push(obj);
      }else{
        const index = WorkOrderData.indexOf(obj);
        WorkOrderData.splice(index, 1 , obj);
      }
      if(this.props.saveAndHideSidePanel){
        this.props.saveAndHideSidePanel(obj);
      } else {
        this.props.route.history.push("/workorder");
      }
      let msg = '';
      if(newOrder){
        msg = 'Work Order Created Successfully';
      }else{
        msg = 'Work Order Updated Successfully';
      }
      Toastr.success(
        <strong>{msg}</strong>,null,
        {
          timeOut: 3000,
          closeButton: true,
          tapToDismiss: false,
          extendedTimeOut: 0,
          preventDuplicates:true
        }
      );
    }
  }

  cancelWorkOrder = () => {
    if(this.props.hideSidePanelComponent){
      this.props.hideSidePanelComponent();
    } else {
      this.props.route.history.push("/workorder");
    }
  }

  onSiteChange = (site) => {
    const {Form} = this.refs;
    const formState = Form.state;
    if(site){
      formState.FormData.stationName = site;
      formState.FormData.stationAddress = site.add;
    }else{
      formState.FormData.stationName = undefined;
      formState.FormData.stationAddress = undefined;
    }
    Form.setState(formState, () => {
      Form.refs.FormCol1.refs.stationName.validate(site);
      // Form.refs.FormCol1.refs.stationAddress.validate(site);
    });
  }

  onTechnicianChange = (technician) => {
    const {Form} = this.refs;
    const formState = Form.state;
    if(technician){
      formState.FormData.technicianName = technician;
      formState.FormData.technicianAddress = technician.technicianAdd;
      formState.FormData.technicianContact = technician.technicianNumber;
    }else{
      formState.FormData.technicianName = undefined;
      formState.FormData.technicianAddress = undefined;
      formState.FormData.technicianContact = undefined;
    }
    Form.setState(formState, () => {
      if(Form.refs.FormCol2){
        Form.refs.FormCol2.refs.technicianName.validate(technician);
      }
      this.forceUpdate();
      // Form.refs.FormCol2.refs.technicianAddress.validate(technician);
      // Form.refs.FormCol2.refs.technicianContact.validate(technician);
    });
  }

  getScheduler(){
    let {workOrderObj} = this.state;

    const {Form} = this.refs;

    let technician;
    if(Form){
      const formState = Form.state;
      technician = formState.FormData.technicianName;
    }else if(workOrderObj.technicianName){
      technician = workOrderObj.technicianName;
    }else{
      technician = '';
    }

    if(technician){
      const viewModel = this.getViewModel(technician);

      return <div >
        {/*<label>Create Schedule*</label>*/}
        <Scheduler schedulerData={viewModel}
          prevClick={this.prevClick}
          nextClick={this.nextClick}
          onSelectDate={this.onSelectDate}
          onViewChange={this.onViewChange}
          eventItemClick={this.eventClicked}
          viewEventClick={this.ops1}
          viewEventText=""
          viewEvent2Text=""
          viewEvent2Click={this.ops2}
          updateEventStart={this.updateEventStart}
          updateEventEnd={this.updateEventEnd}
          moveEvent={this.moveEvent}
          newEvent={this.newEvent}
          conflictOccurred={this.conflictOccurred}
        />
      </div>;
    }else{
      return null;
    }

  }

  render() {
    let {workOrderObj} = this.state;

    return <div className="row" style={{background:'white', padding:'20px 10px'}} ref="formContainer">
          {/* {this.props.saveAndHideSidePanel && this.props.hideSidePanelComponent ?
            <Form FormData={workOrderObj} ref="Form" className="col-sm-12">
              <String label="Title" value="title" valuePath="title" validation={['required']}/>
              <TextArea label="Description" value="workOrderDesc" valuePath="workOrderDesc" validation={['required']}/>
              <Select
                _ref="technicianName"
                label="Technician Name"
                value="technicianName"
                valuePath="technicianName"
                validation={['required']}
                attrs={{
                  options:TechnicianData,
                  labelKey:"technicianName",
                  valueKey:"technicianName",
                  onChange: this.onTechnicianChange
                }}
              />
              <TextArea _ref="technicianAddress" label="Technician Address" value="technicianAddress" valuePath="technicianAddress" attrs={{readOnly: true}}/>
              <String _ref="technicianContact" label="Technician Contact" value="technicianContact" valuePath="technicianContact" attrs={{readOnly: true}}/>
            </Form>
           : */}
           <Form FormData={workOrderObj} ref="Form">
            <FormCol _ref="FormCol1" key={1.1}>
               <Select
                 _ref="stationName"
                 label="Station Name"
                 value="stationName"
                 valuePath="stationName"
                 validation={['required']}
                 attrs={{
                   options:StationData,
                   labelKey:"site",
                   valueKey:"site",
                   onChange: this.onSiteChange
                 }}
               />
               <TextArea _ref="stationAddress" label="Station Address" value="stationAddress" valuePath="stationAddress" validation={[/*'required'*/]} attrs={{readOnly: true}}/>
               <String label="Error Code" value="errorCode" valuePath="errorCode" validation={['required']}/>
               <Select
                 label="Error Level"
                 value="level"
                 valuePath="level"
                 validation={['required']}
                 attrs={{
                   options:[{label:'MAJOR', value:'MAJOR'},{label:'CRITICAL', value:'CRITICAL'}]
                 }}
               />
               <String label="Pump Detail" value="pumpDetail" valuePath="pumpDetail" validation={['required']}/>
               <TextArea label="Description" value="workOrderDesc" valuePath="workOrderDesc" validation={['required']}/>
             </FormCol>
              <FormCol _ref="FormCol2" key={1.2}>
               <String label="Title" value="title" valuePath="title" validation={['required']}/>
               {/*<String label="Scheduled Technician" value="startDate" valuePath="startDate" validation={['required']}/>*/}
               <Select
                 _ref="technicianName"
                 label="Technician Name"
                 value="technicianName"
                 valuePath="technicianName"
                 validation={['required']}
                 attrs={{
                   options:TechnicianData,
                   labelKey:"technicianName",
                   valueKey:"technicianName",
                   onChange: this.onTechnicianChange
                 }}
               />
               <TextArea _ref="technicianAddress" label="Technician Address" value="technicianAddress" valuePath="technicianAddress" validation={[/*'required'*/]} attrs={{readOnly: true}}/>
               <String _ref="technicianContact" label="Technician Contact" value="technicianContact" valuePath="technicianContact" validation={[/*'required'*/]} attrs={{readOnly: true}}/>
              </FormCol>
            </Form>
          {/* } */}
        <div className="col-sm-12" style={{overflow: 'auto'}} ref="schedulerContainer">
          {this.getScheduler()}
        </div>
        {this.props.saveAndHideSidePanel && this.props.hideSidePanelComponent ?
          null
        : <div className="col-md-12 text-center">
          <Button bsStyle="primary" onClick={this.addWorkOrder}>Save</Button>
          <Button bsStyle="default" onClick={this.cancelWorkOrder} style={{marginLeft: "10px"}}>Cancel</Button>
        </div>}
      </div>;
  }
  prevClick = (schedulerData) => {
    schedulerData.prev();
    schedulerData.setEvents(schedulerData.events);
    this.setState({
      viewModel: schedulerData
    });
  }

  nextClick = (schedulerData) => {
    schedulerData.next();
    schedulerData.setEvents(DemoData.events);
    this.setState({
      viewModel: schedulerData
    });
  }

  onViewChange = (schedulerData, view) => {
    schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
    schedulerData.setEvents(DemoData.events);
    this.setState({
      viewModel: schedulerData
    });
  }

  onSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date);
    schedulerData.setEvents(DemoData.events);
    this.setState({
      viewModel: schedulerData
    });
  }

  eventClicked = (schedulerData, event) => {
    alert(`You just clicked an event: {id: ${event.id}, title: ${event.title}}`);
  };

  ops1 = (schedulerData, event) => {
    alert(`You just executed ops1 to event: {id: ${event.id}, title: ${event.title}}`);
  };

  ops2 = (schedulerData, event) => {
    alert(`You just executed ops2 to event: {id: ${event.id}, title: ${event.title}}`);
  };

  newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
    // if (confirm(`Do you want to create a new event? {slotId: ${slotId}, slotName: ${slotName}, start: ${start}, end: ${end}, type: ${type}, item: ${item}}`)) {

    let newFreshId = 0;
    schedulerData.events.forEach((item) => {
      if (item.id >= newFreshId){
        newFreshId = item.id + 1;
      }
    });

    const {workOrderObj} = this.state;

    let newEvent = {
      id: newFreshId,
      title: '#' + (workOrderObj.id || 'New Order'),
      start: start,
      end: end,
      resourceId: slotId,
      bgColor: '#2F696E'
    };
    // schedulerData.addEvent(newEvent);

    workOrderObj.schedule = newEvent;
    this.setState({
      workOrderObj: workOrderObj
    });
    // }
  }

  updateEventStart = (schedulerData, event, newStart) => {
    // if (confirm(`Do you want to adjust the start of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newStart: ${newStart}}`)) {
    schedulerData.updateEventStart(event, newStart);
    // }
    this.setState({
      viewModel: schedulerData
    });
  }

  updateEventEnd = (schedulerData, event, newEnd) => {
    // if (confirm(`Do you want to adjust the end of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newEnd: ${newEnd}}`)) {
    schedulerData.updateEventEnd(event, newEnd);
    // }
    this.setState({
      viewModel: schedulerData
    });
  }

  moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
    // if (confirm(`Do you want to move the event? {eventId: ${event.id}, eventTitle: ${event.title}, newSlotId: ${slotId}, newSlotName: ${slotName}, newStart: ${start}, newEnd: ${end}`)) {
    schedulerData.moveEvent(event, slotId, slotName, start, end);
    this.setState({
      viewModel: schedulerData
    });
    // }
  }

  conflictOccurred = (schedulerData, action, event) => {
    alert(`Conflict occurred. {action: ${action}, event: ${event}`);
  }
}

export default app_state.dragDropContext(WorkOrderForm);
