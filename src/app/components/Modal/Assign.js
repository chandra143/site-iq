import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import app_state from '../../app_state';
import { assignAlert } from '../../services/SiteIQservices'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

class Assign extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Tech_id: '12fb5357-ecdf-4a14-b309-b4aad501b728',
            error: '',
            userProfile: app_state.user_profile,
        };
    }
    handleChange(key, event) {
        let obj = {
            error: ''
        };
        obj[key] = event.currentTarget.value;
        this.setState(obj);
    }
    handleSubmit(e) {
        e.preventDefault();
        // debugger
        assignAlert({
            "Tech_id": this.state.Tech_id,
            "AssignedBy_id": this.state.userProfile.Id,
            "Alert_id": this.props.id,
            "device_id": this.props.deviceid
        }).then((res) => {
            this.setState({
                Tech_id: '',
            })
            // debugger
            this.props.button(this.props.id);
            this.props.getAlerts()
            this.props.closeButton();
        })
    }
    render() {
        const { bsSize, show, closeButton, name, id, deviceid } = this.props;
        return (

            <Modal show={show} bsSize="medium" id="assign">
                <Modal.Header >
                    <Modal.Title className="btn-color"><span style={{ color: '#3b86ff',fontSize: "15px" }}>{name.toUpperCase()}</span></Modal.Title>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeButton}>
                        <span aria-hidden="true"><i className="fa fa-times-circle-o"></i></span>
                    </button>
                </Modal.Header>
                {/* <Modal.Body> */}
                    <div className="container">
                        <div className="alert-details">
                            <div className="row">
                                <div className="col-md-12 mr-5">
                                    <div className="col-md-2">
                                        <b style={{ fontSize: "15px" }}>Alert</b>
                                    </div>
                                    <div className="col-md-2">
                                        <p style={{ color: '#3a3a3a', fontSize: "12px" }}>{name}</p>
                                    </div>
                                </div>

                                <div className="col-md-12 mr-5">
                                    <div className="col-md-2">
                                        <b style={{ fontSize: "15px" }}>Technician Name</b>
                                    </div>
                                    <div className="col-md-3">
                                        <select className="form-control" onChange={this.handleChange.bind(this, 'Tech_id')} style={{ width: "75%" }}>
                                            <option>Select Technician</option>
                                            <option value={this.state.Tech_id}>John</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-10 mr-5">
                                    <div className="col-md-6" style={{textAlign:"center"}}>
                                        <button className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                {/* </Modal.Body> */}
            </Modal>
        );
    }
}

export default Assign;