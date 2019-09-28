import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
class AlertModal1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { bsSize, show, closeButton } = this.props;
    return (
      <Modal
        className="alertbox"
        show={show}
        bsSize="small"
        style={{ marginTop: '240px' }}
      >
        <Modal.Header style={{ marginTop: '-30px' }}>
          <Modal.Title className="btn-color">
            <i className="" /> ec5056
          </Modal.Title>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={closeButton}
          >
            <span aria-hidden="true">
              <i className="fa fa-times-circle-o fa-lg" />
            </span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <h1 className="mh pb" id="headingText" />

          <div className="container2">
            <div className="alert-details">
              <div className="alertcontent-align">
                <b>Alert</b>
                <p style={{ color: '#3a3a3a' }}>ec5056</p>
              </div>
              <div className="alertcontent-align">
                <b>Description</b>
                <p style={{ color: '#3a3a3a' }}>Security Switch is Open</p>
              </div>
            
              <div className="alertcontent-align">
                <b>Time</b>
                <p style={{ color: '#3a3a3a' }}>6:25am</p>
              </div>
              <div className="alertcontent-align">
                <b>Notes</b>
                <p style={{ color: '#3a3a3a' }}>door node communication failure on startup</p>
              </div>
              <div className="alertcontent-align">
                <b>Assigned to</b>
                <p style={{ color: '#3a3a3a' }}>David</p>
              </div>
            </div>
         
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default AlertModal1;