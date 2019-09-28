import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import circle from '../../../styles/img/Circle.png';
import data from '../../../styles/img/datadescription.png';
import set from '../../../styles/img/settings1.png';
import toe from '../../../styles/img/toe.png';
import person from '../../../styles/img/person.png';
import person1 from '../../../styles/img/person1.png';
import gas from '../../../styles/img/gas.png';
import gas1 from '../../../styles/img/gas1.png';
import AssignModal from '../Modal/PossibleFixesAssign'
import { getAlerts } from '../../services/SiteIQservices'

class AlertModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errordata: [],
      errorFix: [],
      assignId: '',
      alertId: '',
      buttonName: 'Assign',
      isButtonDisabled: false,
      showSidePanel: false,
      alerts: [],
      Id: ''
    };
    this.showSidePanelComponent = this.showSidePanelComponent.bind(this);
    this.hideSidePanelComponent = this.hideSidePanelComponent.bind(this);
  }
  showSidePanelComponent() {
    this.setState({
      showSidePanel: true
    });
  }
  hideSidePanelComponent() {
    this.setState({ showSidePanel: false });
  }
  getAddAssignModal() {
    const { showSidePanel, isButtonDisabled } = this.state
    return (
      <AssignModal show={showSidePanel} alert={this.getAlerts.bind(this)} name={this.props.name} id={this.props.alertId} deviceid={this.props.deviceId} timestamp={this.props.timestamp} closeButton={this.hideSidePanelComponent} />
    )
  }
  getAlerts(data) {
    this.state.Id = data.assign_id
    // if (this.state.assignedId != null) {
    //   this.state.buttonName = 'Assigned'
    //   this.state.isButtonDisabled = true
    // }
    // else {
    //   this.state.buttonName = 'Assign'
    //   this.state.isButtonDisabled = false
    // }
  }
  render() {
    if (this.state.Id == "") {
      const { bsSize, show, closeButton, name, description, timestamp, alertId, assignId } = this.props;
      if (this.state.errorFix == undefined) {
        this.state.errorFix = []
      }
      if (this.state.errordata == undefined) {
        this.state.errordata = []
      }
      this.state.errorFix = this.props.possiblefixes
      this.state.errordata = this.props.possiblefixes
      const { errordata, errorFix } = this.state
      this.state.assignedId = assignId;
      if (this.state.assignedId != null) {
        this.state.buttonName = 'Assigned'
        this.state.isButtonDisabled = true
      }
      else {
        this.state.buttonName = 'Assign'
        this.state.isButtonDisabled = false
      }

      return (
        <div>
          <Modal show={show} bsSize="medium" className="backdrop-background">
            <Modal.Header >
              <Modal.Title className="btn-color"><span style={{ color: '#3b86ff', fontSize: "15px" }}>{name.toUpperCase()}</span></Modal.Title>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeButton}>
                <span aria-hidden="true"><i className="fa fa-times-circle-o"></i></span>
              </button>
            </Modal.Header>
            <div className="container">
              <br />
              <div className="col-md-12">
                <div className="col-md-1">
                  <p style={{ color: '#3b86ff', position: "relative", right: "15px" }}><b style={{ fontSize: '15px' }}>{name.toUpperCase()}</b></p>
                </div>
                <div className="col-md-4">
                  <p style={{ color: '#3b86ff', float: "right" }}><b style={{ fontSize: '15px' }}>{timestamp}</b></p>
                </div>
              </div>
              <br />
              <div className="col-md-5">
                <div className="col-md-12 err-des mr-5">
                  {Object.values(errordata).map((obj, i) => {
                    if (i == 7) {
                      return (
                        Object.values(errorFix.TypeOfError).map((d, i) => {
                          return (
                            Object.values(d.Gilbarco).map((j, i) => {
                              return (
                                <div className="error-model-adjust">
                                  <h6 className="model-p-adjust"><b>{j.TypeOfError}</b></h6>
                                </div>
                              )
                            })
                          )
                        })
                      )
                    }
                  })}

                  {Object.values(errordata).map((obj, i) => {
                    if (i == 0) {
                      return (
                        Object.values(errorFix.Description).map((d, i) => {
                          return (
                            Object.values(d.Gilbarco).map((j, i) => {
                              return (
                                <div className="row">
                                  <div className="col-md-1">
                                    <img src={data} style={{ width: "35px" }} />
                                  </div>
                                  <div className="col-md-10">
                                    <h6 className="body-model schema-th-adjust"><strong>Alert Description</strong></h6>
                                    <p className="pump-mod model-p model-p-adjust">
                                      {j.Description}
                                    </p>
                                  </div>
                                </div>
                              )
                            })
                          )
                        })
                      )
                    }
                  })}
                </div>
                <div className="row">
                  <div className="col-sm-6" style={{ marginTop: "8px" }}>
                    <iframe width="200" height="100" style={{ margin: "0px 45%" }} src={"https://www.youtube.com/embed/ycF2s-OIESo"} frameBorder="0"
                      allowFullScreen>
                    </iframe>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    {Object.values(errordata).map((obj, i) => {
                      if (i == 6) {
                        return (
                          Object.values(errorFix.TechnicianRelevancy).map((d, i) => {
                            return (
                              Object.values(d.Gilbarco).map((j, i) => {
                                if (j.TechnicianRelevancy == "YES") {
                                  return (
                                    <div>
                                      <h6><strong style={{ color: "#3b86ff" }}>Technician Relevancy:<span><img src={person} style={{ width: '20%' }} /></span></strong></h6>
                                    </div>
                                  )
                                }
                                else {
                                  return (
                                    <div>
                                      <h6><strong style={{ color: "#3b86ff" }}>Technician Relevancy:<span><img src={person1} style={{ width: '20%' }} /></span></strong></h6>
                                    </div>
                                  )
                                }

                              })
                            )
                          })
                        )
                      }
                    })
                    }
                  </div>
                  <div className="col-md-6">
                    {Object.values(errordata).map((obj, i) => {
                      if (i == 5) {
                        return (
                          Object.values(errorFix.StoreOwnerRelevancy).map((d, i) => {
                            return (
                              Object.values(d.Gilbarco).map((j, i) => {
                                if (j.StoreOwnerRelevancy == "YES") {
                                  return (
                                    <div>
                                      <h6><strong style={{ color: "#3b86ff" }}>Store Owner Relevancy:<span><img src={gas} style={{ width: '20%' }} /></span></strong></h6>
                                    </div>
                                  )
                                }
                                else {
                                  return (
                                    <div>
                                      <h6><strong style={{ color: "#3b86ff" }}>Store Owner Relevancy:<span><img src={gas1} style={{ width: '20%' }} /></span></strong></h6>
                                    </div>
                                  )
                                }
                              })
                            )
                          })
                        )
                      }
                    })}
                  </div>
                </div>
                <div className="row fix-mg-tp">
                  <div className="col-md-12">
                    <h6><img src={set} style={{ width: "20px" }} /><strong className="pos-fix" style={{ color: "#3b86ff" }}>Possible Fixes:</strong></h6>
                  </div>
                  {Object.values(errordata).map((obj, i) => {
                    if (i == 2) {
                      return (
                        Object.values(errorFix.PossibleFixes).map((d, i) => {
                          return (
                            Object.values(d.Gilbarco).map((j, i) => {
                              return (
                                <div>
                                  <div className="row">
                                    <div className="row">
                                      <div className="col-md-12">
                                        <div className="col-md-12">
                                          <div className="col-md-1">
                                            <img src={circle} style={{ width: "30px" }} /><span className="possible-adjust">{j.Priority}</span>
                                          </div>
                                          <div className="col-md-10">
                                            <p className="pump-mod fix-ft-wt" style={{ color: "#3b86ff" }}>
                                              Fix {j.Priority}
                                            </p>
                                            <p className="pump-mod fix-issue">
                                              {j.Description}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                            })
                          )
                        })
                      )
                    }
                  })}
                </div>
                <div className="row">
                  <div className="col-md-5 text-center">
                    <Button className="sub-btn" onClick={this.showSidePanelComponent} disabled={this.state.isButtonDisabled}>{this.state.buttonName}</Button>
                    {this.getAddAssignModal()}
                  </div>
                  <div className="col-md-4 text-center">
                    <Button className="sub-btn" disabled={this.state.isButtonDisabled}>Ignore</Button>
                  </div>
                  {/* <div className="col-md-4 text-center">
                  <Button className="sub-btn" onClick={this.props.closeButton.bind(this)}>Close</Button>
                </div> */}
                </div>
              </div>
            </div>
          </Modal >
        </div>
      );
    }
    else{
      const { bsSize, show, closeButton, name, description, timestamp, alertId, assignId } = this.props;
      if (this.state.errorFix == undefined) {
        this.state.errorFix = []
      }
      if (this.state.errordata == undefined) {
        this.state.errordata = []
      }
      this.state.errorFix = this.props.possiblefixes
      this.state.errordata = this.props.possiblefixes
      const { errordata, errorFix } = this.state
  
      if (this.state.Id != null) {
        this.state.buttonName = 'Assigned'
        this.state.isButtonDisabled = true
      }
      else {
        this.state.buttonName = 'Assign'
        this.state.isButtonDisabled = false
      }

      return (
        <div>
          <Modal show={show} bsSize="medium" className="backdrop-background">
            <Modal.Header >
              <Modal.Title className="btn-color"><span style={{ color: '#3b86ff', fontSize: "15px" }}>{name.toUpperCase()}</span></Modal.Title>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeButton}>
                <span aria-hidden="true"><i className="fa fa-times-circle-o"></i></span>
              </button>
            </Modal.Header>
            <div className="container">
              <br />
              <div className="col-md-12">
                <div className="col-md-1">
                  <p style={{ color: '#3b86ff', position: "relative", right: "15px" }}><b style={{ fontSize: '15px' }}>{name.toUpperCase()}</b></p>
                </div>
                <div className="col-md-4">
                  <p style={{ color: '#3b86ff', float: "right" }}><b style={{ fontSize: '15px' }}>{timestamp}</b></p>
                </div>
              </div>
              <br />
              <div className="col-md-5">
                <div className="col-md-12 err-des mr-5">
                  {Object.values(errordata).map((obj, i) => {
                    if (i == 7) {
                      return (
                        Object.values(errorFix.TypeOfError).map((d, i) => {
                          return (
                            Object.values(d.Gilbarco).map((j, i) => {
                              return (
                                <div className="error-model-adjust">
                                  <h6 className="model-p-adjust"><b>{j.TypeOfError}</b></h6>
                                </div>
                              )
                            })
                          )
                        })
                      )
                    }
                  })}

                  {Object.values(errordata).map((obj, i) => {
                    if (i == 0) {
                      return (
                        Object.values(errorFix.Description).map((d, i) => {
                          return (
                            Object.values(d.Gilbarco).map((j, i) => {
                              return (
                                <div className="row">
                                  <div className="col-md-1">
                                    <img src={data} style={{ width: "35px" }} />
                                  </div>
                                  <div className="col-md-10">
                                    <h6 className="body-model schema-th-adjust"><strong>Alert Description</strong></h6>
                                    <p className="pump-mod model-p model-p-adjust">
                                      {j.Description}
                                    </p>
                                  </div>
                                </div>
                              )
                            })
                          )
                        })
                      )
                    }
                  })}
                </div>
                <div className="row">
                  <div className="col-sm-6" style={{ marginTop: "8px" }}>
                    <iframe width="200" height="100" style={{ margin: "0px 45%" }} src={"https://www.youtube.com/embed/ycF2s-OIESo"} frameBorder="0"
                      allowFullScreen>
                    </iframe>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    {Object.values(errordata).map((obj, i) => {
                      if (i == 6) {
                        return (
                          Object.values(errorFix.TechnicianRelevancy).map((d, i) => {
                            return (
                              Object.values(d.Gilbarco).map((j, i) => {
                                if (j.TechnicianRelevancy == "YES") {
                                  return (
                                    <div>
                                      <h6><strong style={{ color: "#3b86ff" }}>Technician Relevancy:<span><img src={person} style={{ width: '20%' }} /></span></strong></h6>
                                    </div>
                                  )
                                }
                                else {
                                  return (
                                    <div>
                                      <h6><strong style={{ color: "#3b86ff" }}>Technician Relevancy:<span><img src={person1} style={{ width: '20%' }} /></span></strong></h6>
                                    </div>
                                  )
                                }

                              })
                            )
                          })
                        )
                      }
                    })
                    }
                  </div>
                  <div className="col-md-6">
                    {Object.values(errordata).map((obj, i) => {
                      if (i == 5) {
                        return (
                          Object.values(errorFix.StoreOwnerRelevancy).map((d, i) => {
                            return (
                              Object.values(d.Gilbarco).map((j, i) => {
                                if (j.StoreOwnerRelevancy == "YES") {
                                  return (
                                    <div>
                                      <h6><strong style={{ color: "#3b86ff" }}>Store Owner Relevancy:<span><img src={gas} style={{ width: '20%' }} /></span></strong></h6>
                                    </div>
                                  )
                                }
                                else {
                                  return (
                                    <div>
                                      <h6><strong style={{ color: "#3b86ff" }}>Store Owner Relevancy:<span><img src={gas1} style={{ width: '20%' }} /></span></strong></h6>
                                    </div>
                                  )
                                }
                              })
                            )
                          })
                        )
                      }
                    })}
                  </div>
                </div>
                <div className="row fix-mg-tp">
                  <div className="col-md-12">
                    <h6><img src={set} style={{ width: "20px" }} /><strong className="pos-fix" style={{ color: "#3b86ff" }}>Possible Fixes:</strong></h6>
                  </div>
                  {Object.values(errordata).map((obj, i) => {
                    if (i == 2) {
                      return (
                        Object.values(errorFix.PossibleFixes).map((d, i) => {
                          return (
                            Object.values(d.Gilbarco).map((j, i) => {
                              return (
                                <div>
                                  <div className="row">
                                    <div className="row">
                                      <div className="col-md-12">
                                        <div className="col-md-12">
                                          <div className="col-md-1">
                                            <img src={circle} style={{ width: "30px" }} /><span className="possible-adjust">{j.Priority}</span>
                                          </div>
                                          <div className="col-md-10">
                                            <p className="pump-mod fix-ft-wt" style={{ color: "#3b86ff" }}>
                                              Fix {j.Priority}
                                            </p>
                                            <p className="pump-mod fix-issue">
                                              {j.Description}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                            })
                          )
                        })
                      )
                    }
                  })}
                </div>
                <div className="row">
                  <div className="col-md-5 text-center">
                    <Button className="sub-btn" onClick={this.showSidePanelComponent} disabled={this.state.isButtonDisabled}>{this.state.buttonName}</Button>
                    {this.getAddAssignModal()}
                  </div>
                  <div className="col-md-4 text-center">
                    <Button className="sub-btn" disabled={this.state.isButtonDisabled}>Ignore</Button>
                  </div>
                  {/* <div className="col-md-4 text-center">
                  <Button className="sub-btn" onClick={this.props.closeButton.bind(this)}>Close</Button>
                </div> */}
                </div>
              </div>
            </div>
          </Modal >
        </div>
      );
    }
  }
}

export default AlertModal;