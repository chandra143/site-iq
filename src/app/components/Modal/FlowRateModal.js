import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap-button-loader';
import { getFlowRateA, getFlowRateB } from '../../services/SiteIQservices'
import StationUnderRun from '../charts/StationUnderRun';
import c3 from 'c3';

class FlowRateModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceId: '',
      error: '',
      buttons: [{ days: "7", name: "7 Days" }, { days: "10", name: "10 Days" }, { days: "30", name: "1 Month" }],
      days: '',
      flowRate1: [],
      flowRate2: [],
      loading: false
    };

  }
  hideLoader = () => {
    this.setState({ loading: false });
  }

  showLoader = () => {
    this.setState({ loading: true });
  }

  getData() {
    // debugger
    this.showLoader()
    if (this.state.deviceId == "") {
      this.state.deviceId = this.props.device_id[0]
    }
    if (this.state.days == "") {
      this.state.days = "7"
    }
    const Id = this.state.deviceId
    const days = this.state.days
    getFlowRateA(Id, days).then((result) => {
      // debugger
      this.setState({ flowRate1: result.data })
      // this.state.underrunData = result.data 
      this.hideLoader()
    })
    getFlowRateB(Id, days).then((result) => {
      // debugger
      this.setState({ flowRate2: result.data })
      // this.state.underrunData = result.data 
      this.hideLoader()
    })
  }
  handleChange(key, event) {
    let obj = {
      error: '',
    };
    obj[key] = event.currentTarget.value;
    this.setState(obj);
  }

  getFlowRateAChart() {
    const { flowRate1 } = this.state;
    const Report = flowRate1.map((obj, i) => {
      return {
        m1: obj.FlowGrade1,
        m2: obj.FlowGrade2,
        m3: obj.FlowGrade3,
        m4: obj.FlowGrade4,
        m5: obj.FlowGrade5,
        m6: obj.FlowGrade6,
        Date: obj.date
      }
    })
    const chart = c3.generate({
      bindto: '#FlowRateA',
      size: {
        height: 270,
        width: 450
      },
      colors: {
        date: "#dd4b39",
      },
      data: {
        json: Report,
        keys: {
          x: 'Date',
          value: ['m1', 'm2', 'm3', 'm4', 'm5', 'm6'],
          // value1:[]
        },
        // type: 'bar',
        xFormat: '%Y-%m-%d %H:%M:%S'
      },
      grid: {
        y: {
          show: true,
        }
      },
      legend: {
        show: false
      },
      axis: {
        x: {
          type: 'timeseries',
          // label: 'date',
          tick: {
            count: 5,
            format: '%e-%b-%y'
          }
        },
        y: {
          // label: 'value'
        },
      }
    });
  }
  getFlowRateBChart() {
    const { flowRate2 } = this.state;
    const Report = flowRate2.map((obj, i) => {
      return {
        m1: obj.FlowGrade1,
        m2: obj.FlowGrade2,
        m3: obj.FlowGrade3,
        m4: obj.FlowGrade4,
        m5: obj.FlowGrade5,
        m6: obj.FlowGrade6,
        Date: obj.date
      }
    })
    const chart = c3.generate({
      bindto: '#FlowRateB',
      size: {
        height: 270,
        width: 450
      },
      colors: {
        date: "#dd4b39",
      },
      data: {
        json: Report,
        keys: {
          x: 'Date',
          value: ['m1', 'm2', 'm3', 'm4', 'm5', 'm6'],
          // value1:[]
        },
        // type: 'bar',
        xFormat: '%Y-%m-%d %H:%M:%S'
      },
      grid: {
        y: {
          show: true,
        }
      },
      legend: {
        show: false
      },
      axis: {
        x: {
          type: 'timeseries',
          // label: 'date',
          tick: {
            count: 5,
            format: '%e-%b-%y'
          }
        },
        y: {
          // label: 'value'
        },
      }
    });

  }

  render() {
    // { this.getUnderRuns(this.props.device_id) }
    const { bsSize, show, closeButton, dispensers, device_id } = this.props;
    if (this.state.flowRate1 == "") {
      this.state.flowRate1 = this.props.data
    }
    if (this.state.flowRate2 == "") {
      this.state.flowRate2 = this.props.data1
    }
    const { buttons, flowRate1, flowRate2 } = this.state
    return (
      <Modal show={show} bsSize="large" id="flowrates">
        <Modal.Header >
          <Modal.Title className="btn-color"><span style={{ fontSize: "22px" }}>FlowRates</span></Modal.Title>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeButton}>
            <span aria-hidden="true"><i className="fa fa-times-circle-o"></i></span>
          </button>
        </Modal.Header>
        <div className="container">
          <div className="row" style={{ display: "flex", padding: "10px 0", marginRight: "0" }}>
            <div className="col-md-2">
              <select className="form-control" value={this.state.deviceId} onChange={this.handleChange.bind(this, 'deviceId')}>
                {dispensers.map((obj, i) => {
                  return (
                    <option value={obj.device_id}>Dispenser {obj.pumpnumber1 + '/' + obj.pumpnumber2}</option>
                  )
                })}
              </select>
            </div>
            <div className="col-md-2">
              <select className="form-control" value={this.state.days} onChange={this.handleChange.bind(this, 'days')}>
                {buttons.map((obj, i) => {
                  return (
                    <option value={obj.days}>{obj.name}</option>
                  )
                })}
              </select>
            </div>
            <div className="col-md-1">
              <Button type="submit" loading={this.state.loading} onClick={this.getData.bind(this)}>Submit</Button>
            </div>
          </div>
          <br />
          <div className="row under-chart">
              <div className="col-md-6">
                {this.getFlowRateAChart()}
                <div id="FlowRateA"></div>
                <div className="text-center"><b>SideA</b></div>
              </div> 
              <div className="col-md-6">
                {this.getFlowRateBChart()}
                <div id="FlowRateB"></div>
                <div className="text-center"><b>SideB</b></div>
              </div>
          </div>
        </div>

      </Modal>
    );
  }
}

export default FlowRateModal;


