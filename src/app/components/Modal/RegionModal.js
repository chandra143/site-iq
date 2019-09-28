import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { postRegions } from '../../services/SiteIQservices';

class RegionModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region: ''
        };
    }
    handleSubmit(e) {
        e.preventDefault();
        postRegions({
            "Region_Name": this.state.region,
        }).then((res) => {
            this.setState({
                Region_Name: '',                
            })      
            this.props.getRegions();
            this.props.closeButton();
        })         
    }
    RegionChange = (e) => {
        this.setState({ region: e.target.value })
    }
    render() {
        const { bsSize, show, closeButton } = this.props
        return (
            <Modal show={show} bsSize="medium">
                <Modal.Header className="mdl-head">
                    <Modal.Title className="btn-colour"><i className="fa fa-user-plus"></i> Add Region</Modal.Title>
                    <button type="button" className="close cls" data-dismiss="modal" aria-label="Close" onClick={closeButton}>
                        <span aria-hidden="true"><i className="fa fa-times-circle-o"></i></span>
                    </button>
                </Modal.Header>
                <Modal.Body className="mdl-bdy">
                    <div className="main">
                        <div className="container">
                            <div className="booking-content">
                                <form id="booking-form">                                                                      
                                    <div className="row">
                                        <div className="input-group input-group-lg form-group">
                                            <label className="input-group-addon input-group-bg">Region </label>
                                            <input name="ProductNumber" className="form-control" type="text"
                                            onChange={this.RegionChange.bind(this)}
                                            />
                                        </div>
                                    </div>                            
                                    <div className="form-group">
                                        <div className="col-md-7">
                                            <button className="btn btn-primary pull-right" onClick={this.handleSubmit.bind(this)}>Save</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}

export default RegionModal;