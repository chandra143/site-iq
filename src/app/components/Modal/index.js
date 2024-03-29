import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

const defaultState = {
  show: false,
  title: '',
  btnOkText: '',
  btnCancelText: ''
};

export default class CustomModal extends Component {
  state = defaultState;
  show() {
    var state = state || {};
    state.show = true;
    this.setState(state);
  }
  sure() {
    let resolve = this.props["data-resolve"];
    if (resolve) {
      resolve();
    }
  }
  cancel() {
    let reject = this.props["data-reject"];
    if (reject) {
      reject();
    } else {
      this.hide();
    }
  }
  hide() {
    this.setState({ show: false });
  }
  header() {
    return (
      <Modal.Header closeButton={!this.props.hideCloseBtn}>
        <Modal.Title>
          {this.props["data-title"]}
        </Modal.Title>
      </Modal.Header>
    );
  }
  body() {
    return (
      <Modal.Body>
        {this.props.children}
      </Modal.Body>
    );
  }
  footer() {
    return (
      <Modal.Footer>
        {
          this.props.hideCloseBtn
            ? null
            : <Button bsStyle='default' onClick={this.cancel.bind(this)} data-stest="cancelbtn">
              {this.state.btnCancelText || 'Cancel'}
            </Button>
        }
        {
          this.props.hideOkBtn
            ? null
            : <Button bsStyle='success' onClick={this.sure.bind(this)} data-stest="okbtn" disabled={this.props.btnOkDisabled}>
              {this.state.btnOkText || 'Ok'}
            </Button>
        }
      </Modal.Footer>
    );
  }
  render() {
    return (
      <Modal aria-labelledby='contained-modal-title' backdrop="static" keyboard={this.props.closeOnEsc} onHide={this.cancel.bind(this)} show={this.state.show} {...this.props}>
        {this.props.hideHeader
          ? ''
          : this.header()}
        {this.body()}
        {this.props.hideFooter
          ? ''
          : this.footer()}
      </Modal>
    );
  }
}

var _resolve;
var _reject;

export class Confirm extends CustomModal {
  show(state) {
    var state = state || {};
    state.show = true;
    this.setState(state);
    let promise = new Promise(function (resolve, reject) {
      _resolve = resolve;
      _reject = reject;
    });
    return promise;
  }
  sure() {
    _resolve(this);
  }
  cancel() {
    _reject(this);
    this.setState(defaultState);
  }
  header() {
    return (
      <Modal.Header closeButton={!this.props.hideCloseBtn}>
        <Modal.Title>
          {this.state.title}
        </Modal.Title>
      </Modal.Header>
    );
  }
  body() {
    return '';
  }
  footer() {
    return (
      <Modal.Footer>
        {
          this.props.hideCloseBtn
            ? null
            : <Button bsStyle='danger' onClick={this.cancel.bind(this)} data-stest="confirmBoxCancelBtn">
              {this.state.btnCancelText || 'No'}
            </Button>
        }
        {
          this.props.hideOkBtn
            ? null
            : <Button bsStyle='success' onClick={this.sure.bind(this)} data-stest="confirmBoxOkBtn">
              {this.state.btnOkText || 'Yes'}
            </Button>
        }
      </Modal.Footer>
    );
  }
}
CustomModal.defaultProps = {
  closeOnEsc: true
};
