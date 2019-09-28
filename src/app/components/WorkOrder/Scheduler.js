import React, { Component } from 'react';
import {Link} from 'react-router';
import WorkOrderData from '../../../data/WorkOrderListing.json';
import TechnicianDetails from '../../../data/TechnicianDetails.json';
import Scheduler, {SchedulerData, ViewTypes, DATE_FORMAT, ResourceList, TaskList, DnDSource} from 'react-big-scheduler';
import {Panel, Button, OverlayTrigger, Tooltip, FieldGroup, Popover} from 'react-bootstrap';
import moment from 'moment';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import app_state from '../../app_state';

if(!app_state.dragDropContext){
  app_state.dragDropContext = DragDropContext(HTML5Backend);
}

const Data = {};

class test extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    const width = this.refs.schedulerContainer.clientWidth;
    if(this.schedulerData && this.schedulerData.config.schedulerWidth != width){
      this.schedulerData.config.schedulerWidth = (width-35);
      this.forceUpdate();
    }
  }

  getViewModel(){
    let schedulerData;

    if(this.schedulerData){
      schedulerData = this.schedulerData;
    }else{
      let width =300;

      if(this.refs.schedulerContainer){
        width = this.refs.schedulerContainer.clientWidth;
      }

      schedulerData = new SchedulerData('2018-04-27', ViewTypes.Day, false, false, {
        movable: false,
        startResizable: false,
        endResizable: false,
        eventItemHeight: 30,
        eventItemLineHeight: 32,
        dayCellWidth: 40,
        checkConflict: true,
        schedulerWidth: (width - 35),
        dayStartFrom: 7,
        dayStopTo: 20,
        eventItemPopoverEnabled:false,
        views: [
          {viewName: 'Day', viewType: ViewTypes.Day, showAgenda: false, isEventPerspective: false},
          {viewName: 'Week', viewType: ViewTypes.Week, showAgenda: false, isEventPerspective: false}
        ]
      });

      Data.resources = [];

      _.each(TechnicianDetails, (d)=>{
          Data.resources.push({
            id: d.technicianEmail,
            name: d.technicianName
          });
      });
      schedulerData.setResources(Data.resources);

      Data.events = [];

      _.each(WorkOrderData, (d)=>{
        d.schedule.formData = d;
        Data.events.push(d.schedule);
      });

      schedulerData.setEvents(Data.events);

      this.schedulerData = schedulerData;
    }

    return schedulerData;
  }

  getScheduler(){
    let {workOrderObj} = this.state;
    const viewModel = this.getViewModel();
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
        eventItemTemplateResolver={this.eventItemTemplateResolver}
      />
    </div>;
  }

  render() {
    return <div className="row">
      <div className="col-sm-12"  style={{overflow: 'auto', background:'white', padding:'10px'}} ref="schedulerContainer">
        {this.getScheduler()}
      </div>
    </div>;
  }

  eventItemTemplateResolver = (schedulerData, event, bgColor, isStart, isEnd, mustAddCssClass, mustBeHeight, agendaMaxEventWidth) => {
    let borderWidth = isStart ? '4' : '0';
    let borderColor =  'rgba(0,139,236,1)', backgroundColor = '#80C5F6';
    let titleText = schedulerData.behaviors.getEventTextFunc(schedulerData, event);
    if(!!event.type){
      borderColor = event.type == 1 ? 'rgba(0,139,236,1)' : (event.type == 3 ? 'rgba(245,60,43,1)' : '#999');
      backgroundColor = event.type == 1 ? '#80C5F6' : (event.type == 3 ? '#FA9E95' : '#D9D9D9');
    }
    let divStyle = {borderLeft: borderWidth + 'px solid ' + borderColor, backgroundColor: backgroundColor, height: mustBeHeight };
    if(!!agendaMaxEventWidth){
      divStyle = {...divStyle, maxWidth: agendaMaxEventWidth};
    }

    const eventItem = <div key={event.id} className={mustAddCssClass} style={divStyle}>
      <span style={{marginLeft: '4px', lineHeight: `${mustBeHeight}px` }}>{titleText}</span>
    </div>;

    const {localeMoment, config} = schedulerData;
    const dateFormat = config.eventItemPopoverDateFormat;
    const formData = event.formData;
    const overlayContent = <Popover id="event-tip">
      <div>
        <table className="table schduler-popover-table">
          <thead>
            <th width="150">Workorder ID :</th><th>{(titleText || '').split('#')[1]}</th>
          </thead>
          <tbody>
            <tr>
              <td>Station:</td><td>{formData.stationName.site}</td>
            </tr>
            <tr>
              <td>Station Address:</td><td>{formData.stationName.add}</td>
            </tr>
            <tr>
              <td>Error Code:</td><td>{formData.errorCode}</td>
            </tr>
          </tbody>
        </table>
        <span className="header1-text">{localeMoment(event.start).format('HH:mm')}</span><span className="help-text" style={{marginLeft: '8px'}}>{localeMoment(event.start).format(dateFormat)}</span><span className="header2-text"  style={{marginLeft: '8px'}}>-</span><span className="header1-text" style={{marginLeft: '8px'}}>{localeMoment(event.end).format('HH:mm')}</span><span className="help-text" style={{marginLeft: '8px'}}>{localeMoment(event.end).format(dateFormat)}</span>
      </div>
    </Popover>;

    return <OverlayTrigger placement="top" overlay={overlayContent}>
      {eventItem}
    </OverlayTrigger>;
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
    schedulerData.setEvents(Data.events);
    this.setState({
      viewModel: schedulerData
    });
  }

  onViewChange = (schedulerData, view) => {
    schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
    schedulerData.setEvents(Data.events);
    this.setState({
      viewModel: schedulerData
    });
  }

  onSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date);
    schedulerData.setEvents(Data.events);
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

    let newEvent = {
      id: newFreshId,
      title: 'New Order',
      start: start,
      end: end,
      resourceId: slotId,
      bgColor: '#2F696E'
    };
    schedulerData.addEvent(newEvent);
    this.setState({
      viewModel: schedulerData
    });
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

export default app_state.dragDropContext(test);
