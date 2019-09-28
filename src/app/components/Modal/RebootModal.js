import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { Checkbox } from 'react-bootstrap';
import Button from 'react-bootstrap-button-loader';
import app_state from '../../app_state';
import { reboot, forceReboot } from '../../services/SiteIQservices'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

class RebootModal extends Component {
    constructor(props) {        
        super(props);
        this.state = {
            notes: '',
            error: '',
            userProfile: app_state.user_profile,
            target: '',
            loading: false,
            checked: true,
            showText: false,
            text:'This will take some time please wait..',             
        };
        this.getChangeHandler = this.getChangeHandler.bind(this);
    }
   
    hideLoader = () => {
        this.setState({ loading: false });
    }

    showLoader = () => {
        this.setState({ loading: true });
    }
    handleChange(key, event) {
        let obj = {
            error: ''
        };
        obj[key] = event.currentTarget.value;
        this.setState(obj);
    }
    checked() {
        // debugger
        if (this.state.target == "") {
            this.state.target = 'pump'
            this.handleReboot();
        }
        else {
            this.state.target = 'force'
            this.handleForceReboot();
        }
    }
    getChangeHandler() {
        // debugger
        this.setState({ checked: !this.state.checked });
        if (this.state.checked) {
            this.state.target = 'force';
        }
        else {
            this.state.target = ""
        }
    }
    handleForceReboot() {
        this.showLoader()
        this.state.showText = true
        // debugger
        forceReboot(
            {
                "Id": this.props.Id
            },
            {
                "target": this.state.target
            },
            {
                "notes": this.state.notes,
                "userId": this.state.userProfile.Id
            }).then((res) => {
                // debugger
                this.setState({
                    notes: '',
                    target:''
                })                
                toastr.options = {
                    positionClass : 'toast-top-right',
                    hideDuration: 500,
                    timeOut: 2000
                  }
                  toastr.clear()
                  setTimeout(() => toastr.success(res.data.message), 500)
                this.state.showText = false
                this.props.rebootHistory();
                this.hideLoader()                
                this.props.closeButton();
            })
    }
    handleReboot() {
        this.showLoader()
        this.state.showText = true
        // debugger
        reboot(
            {
                "Id": this.props.Id
            },
            {
                "target": this.state.target
            },
            {
                "notes": this.state.notes,
                "userId": this.state.userProfile.Id
            }).then((res) => {
                // debugger
                this.setState({
                    notes: '',
                    target:''
                })
                if(res.status == 200){
                toastr.options = {
                    positionClass : 'toast-top-right',
                    hideDuration: 500,
                    timeOut: 2000
                  }
                  toastr.clear()
                //   setTimeout(() => toastr.success(res.data.Message), 500)
                // toastr.success(res.data.Message)      
                this.state.showText = false
                this.props.rebootHistory();                
                this.hideLoader()
                this.props.rebootData(res.data)
                this.props.closeButton();
                }
                if(res.status == 400){
                    toastr.options = {
                        positionClass : 'toast-top-right',
                        hideDuration: 500,
                        timeOut: 3000
                      }
                      toastr.clear()
                      setTimeout(() => toastr.success(res.data.message), 700)
                    // toastr.success(res.data.Message)      
                    this.state.showText = false
                    this.props.rebootHistory();                
                    this.hideLoader()
                    // this.props.rebootData(res.data.essage)
                    this.props.closeButton();
                }
            })
    }
    render() {
        const { bsSize, show, closeButton, } = this.props;
        const { notes } = this.state
        return (

            <Modal show={show} bsSize="medium" id="reboot">
                <Modal.Header >
                    <Modal.Title className="btn-color"><span style={{ color: '#3b86ff', fontSize: "15px" }}>Reboot</span></Modal.Title>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeButton}>
                        <span aria-hidden="true"><i className="fa fa-times-circle-o"></i></span>
                    </button>
                </Modal.Header>
                <div className="container">
                    <div className="alert-details">
                        <div className="row">
                            <br />
                            <div className="col-md-12">
                                <p style={{ fontSize: "18px" }}>Are you Sure Do You want to Reboot?</p>
                            </div>
                            <div className="col-md-12 mr-5">
                                <div className="col-md-1">
                                    <b style={{ fontSize: "15px" }}>Comments</b>
                                </div>
                                <div className="col-md-3">
                                    <textarea
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Comments"
                                        value={this.state.notes}
                                        onChange={this.handleChange.bind(this, 'notes')}
                                    />
                                </div>
                            </div>
                            <div className="col-md-12 mr-5">
                            <Checkbox
                                className="col-md-3 check"
                                onChange={this.getChangeHandler}>
                                <span className="inp-check">Force Reboot</span>
                            </Checkbox>
                        </div>
                            <div className="col-md-10 mr-5">
                                <div className="col-md-5" style={{ textAlign: "center" }}>
                                    <Button className="btn" loading={this.state.loading} style={{ margin: "0 10px" }} onClick={this.checked.bind(this)}>Yes</Button>
                                    <Button className="btn" data-dismiss="modal" aria-label="Close" onClick={closeButton}>No</Button>
                                </div>
                            </div>
                            <div className="col-md-10 mr-5">
                            {this.state.showText && <p>{this.state.text}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default RebootModal;