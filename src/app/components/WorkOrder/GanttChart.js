import React, { Component } from 'react';
import {Link} from 'react-router';
import WorkOrderData from '../../../data/WorkOrderListing.json';
import JSGantt from '../../libs/jsGanttImproved/jsgantt';
import '../../libs/jsGanttImproved/jsgantt.css';

class Chart extends Component {
  constructor(){
    super();
    this.state = {
    };
  }

  componentDidMount(){
    const g = this.g = new JSGantt.GanttChart(this.refs.ChartContainer, 'day');

    _.each(WorkOrderData, (wo, i) => {
      g.AddTaskItem(new JSGantt.TaskItem(i+1, wo.id,     '2016-02-21','2016-02-28', 'gtaskblue',    '',       0, wo.assignedTo, 60,  0, 12, 1, '',      '',      '',      g));
    });

    g.Draw();
  }

  render() {
    return <div className="row" style={{background:'white', padding:'20px'}}>
      <div className="col-md-12" ref="ChartContainer"></div>
    </div>;
  }
}

export default Chart;
