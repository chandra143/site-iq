import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

class ErrorCodeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const { bsSize, show, closeButton } = this.props
        return (
            < Modal show={show} bsSize="large" >
                <Modal.Body >
                    <a className="bth bth-button-close" onClick={closeButton}>X</a>
                    <div className="row">
                        <div className="col-sm-3">
                            <h6 className="schema"><strong>ERROR CODE:</strong><span className="green">EC5056</span></h6>
                        </div>
                        <div className="col-sm-4">
                            <h6 className="schema"><strong>TIME STAMP:</strong><span className="black"> 26/09/2018 7:20 AM</span></h6>
                        </div>
                        <div className="col-sm-4">
                            <h6 className="schema"><strong>STATUS:</strong><span className="black"> UNASSIGNED</span></h6>
                        </div>
                    </div>
                    <div className="row mtr">
                        <div className="col-md-4">
                            <div className="row mb-model">
                                <h6 className="schema-th body-model"><strong>Pump Information:</strong></h6>
                                <p className="pump-mod model-p">
                                    <strong>Pump Model:</strong> E500 PUMP LON NODE VERSION <br />
                                    <strong>Software Version:</strong> P03040 (03.0.40P) <br />
                                    <strong>Pump Boot Version:</strong> 10305 (V10.3.05)
                                </p>
                            </div>
                            <div className="row mb-model">
                                <h6 className="schema-th body-model"><strong>Alert Description:</strong></h6>
                                <p className="pump-mod model-p" >
                                    Volume unit type is not set(Command Code 71)
                                 </p>
                            </div>
                            <div className="row mb-model">
                                <h6 className="schema-th body-model"><strong>Error Code Description:</strong></h6>
                                <p className="pump-mod model-p">
                                    Conversation factor changed Encore
                              </p>
                            </div>
                            <div className="row mb-model">
                                <h6 className="schema-th body-model"><strong>Ways to fix:</strong></h6>
                                <p className="pump-mod model-p">
                                    <b>.</b>&nbsp;<strong>Encore:</strong> Program volume unit type is command code 71 <br />
                                    <b>.</b>&nbsp;<strong>Advantage:</strong> Power Cycle <br />
                                    <b>.</b>&nbsp;<strong>Advantage:</strong> Master Reset Required <br />
                                    <b>.</b>&nbsp;<strong>Advantage:</strong> Replace controller/logic board
                              </p>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <iframe width="310" height="210" src={"https://www.youtube.com/embed/ycF2s-OIESo"} frameBorder="0"
                                allowFullScreen>
                            </iframe>
                            <div className="row" style={{ marginLeft: "0", marginTop: "8px" }}>
                                <p><a>Check out the documentation here for additional information! <i className="fa fa-external-link"></i></a></p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="dropdown md-dropdown">
                                <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                    Actions
                                  <span className="caret"></span>
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenu4">
                                    <li><a>Delete</a></li>
                                    <li><a>unblock</a></li>
                                    <li><a>Activ</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal >
        )
    }

}

export default ErrorCodeModal;