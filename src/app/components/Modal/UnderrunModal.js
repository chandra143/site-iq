import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap-button-loader';
import { getDispenserDataById } from '../../services/SiteIQservices'
import StationUnderRun from '../charts/StationUnderRun';
import c3 from 'c3';

class UnderrunModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceId: '',
      error: '',
      buttons: [{ days: "7", name: "7 Days" }, { days: "10", name: "10 Days" }, { days: "30", name: "1 Month" }],
      days: '',
      underrunData: [],
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
      this.state.days = '7'
    }
    const Id = this.state.deviceId
    const days = this.state.days
    getDispenserDataById(Id, days).then((result) => {
      // debugger
      this.setState({ underrunData: result.data })
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

  UnderRunChart(underrnval) {
    // debugger
    const { underrunData } = this.state
    if (underrunData != "") {
      const data1 = underrunData.map((obj, i) => {
        return (
          obj.UnderRuns
        )
      })
      const data = data1[0].graphdata.map((key) => {
        return {
          Date: key.date,
          SideA: key.sidea,
          SideB: key.sideb
        }
      });
      // console.log(data)
      const chart = c3.generate({
        bindto: '#UnderRun',
        size: {
          height: 300,
          width: 450
        },
        colors: {
          date: "#dd4b39",
        },
        data: {
          json: data,
          keys: {
            x: 'Date',
            value: ['SideA', 'SideB'],
          },
          xFormat: '%Y-%m-%d'
        },
        grid: {
          y: {
            show: true,
          }
        },
        axis: {
          x: {
            type: 'timeseries',
            label: 'date',
            tick: {
              count: 5,
              format: '%e-%b-%y'
            }
          },
          y: {
            tick: {
              format: d3.format('d')
            },
            label: {
              // text: 'value',
              position: 'outer-middle'
            }
          },
        }
      });
    }
  }

  render() {
    // { this.getUnderRuns(this.props.device_id) }
    const { bsSize, show, closeButton, dispensers, device_id } = this.props;
    if (this.state.underrunData == "") {
      this.state.underrunData = this.props.data
    }
    const { buttons, underrunData } = this.state
    return (
      <Modal show={show} bsSize="large" id="underun">
        <Modal.Header >
          <Modal.Title className="btn-color"><span style={{ fontSize: "22px" }}>Underrun</span></Modal.Title>
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
          {/* {this.state.underrunData.map((obj, i) => {
            debugger
                            return (
                                <div>
                                    {obj.UnderRuns.graphdata.length > 0 ? */}
                                        <div>
                                           {this.UnderRunChart()}
                                            <div id="UnderRun"></div>                                           
                                        </div>
                                        {/* :
                                        <div className="no-data">No UnderRun's</div>
                                    }
                                </div>
                            )


                        })} */}
          </div>
        </div>

      </Modal>
    );
  }
}

export default UnderrunModal;


