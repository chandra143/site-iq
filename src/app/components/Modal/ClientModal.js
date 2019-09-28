import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { getRoles, getRegions, addClient, getRegionsById } from '../../services/SiteIQservices';
import RegionModal from '../Modal/RegionModal';
import app_state from '../../app_state';

class ClientModal extends Component {
    constructor(props) {
        super(props);
        this.showSidePanelComponent = this.showSidePanelComponent.bind(this);
        this.hideSidePanelComponent = this.hideSidePanelComponent.bind(this);
        this.state = {
            showSidePanel: false,
            roles: [],
            regions: [],
            clientRegions: [],
            Client_Name: '',
            Role_Id: '',
            Region: '',
            Email: '',
            Phone: '',
            Headquarter: '',
            Address: '',
            userProfile: app_state.user_profile,
            error: '',
            error1: '',
            error2: '',
            error3: '',
            error4: '',
            error5: '',
            error6:'',
            region: []
        };
    }
    showSidePanelComponent() {
        this.setState({ showSidePanel: true });
    }
    hideSidePanelComponent() {
        this.setState({ showSidePanel: false });
    }
    getAddRegionModel(i) {
        const { showSidePanel } = this.state
        return (
            <RegionModal key={i} show={showSidePanel} closeButton={this.hideSidePanelComponent} getRegions={this.getRegions.bind(this)} bsSize="medium" />
        )
    }
    getRoles() {
        getRoles().then((result) => {
            this.setState({ roles: result.data })
        })
    }
    getRegions() {
        getRegions().then((result) => {
            this.setState({ regions: result.data })
        })
    }
    getRegionsById() {
        const Id = this.state.userProfile.Id
        const Type = this.state.userProfile.Type
        getRegionsById(Id, Type).then((result) => {
            this.setState({ clientRegions: result.data })
        })
    }
    componentDidMount() {
        this.getRoles()
        this.getRegions()
    }
    handleMultiChange(option) {
        this.setState(state => {
            return {
                multiValue: option
            };
        });
    }
    handleChange(key, event) {
        let obj = {
            error: ''
        };
        obj[key] = event.currentTarget.value;
        this.setState(obj);
    }
    hanldeValidation(e){
        if (this.state.Client_Name== "") {
            this.setState({
              error: "Please enter Name"
            });
          }
          if (this.state.Headquarter == "") {
            this.setState({
              error1: "Please enter Head Quarter Name"
            });
          }
          if (this.state.Role_Id == "") {
            this.setState({
              error2: "Please select Type"
            });
          }
          if (this.state.Region == "") {
            this.setState({
              error3: "Please Enter Region"
            });
          }
          if (this.state.Address == "") {
            this.setState({
              error6: "Please Enter Address"
            });
          }
          if (this.state.Email == "") {
            this.setState({
              error4: "Please enter valid Email"
            });
          }
          if (this.state.Phone == "") {
            this.setState({
              error5: "Please Enter Phone Number"
            });
          }
          if(this.state.Client_Name !="" && this.state.Headquarter != "" && this.state.Role_Id !="" && this.state.Region != "" && this.state.Address !="" && this.state.Email !="" && this.state.Phone_Number != ""){
            this.handleSubmit(e)
          }
    }
    handleSubmit(e) {
        e.preventDefault();
        addClient({
            "Client_Name": this.state.Client_Name,
            "Email": this.state.Email,
            "Address": this.state.Address,
            "Phone": this.state.Phone,
            "Headquarter": this.state.Headquarter,
            "Region": this.state.Region,
            "Role_Id": this.state.Role_Id,
            "TopClient_Id": this.state.userProfile.Id
        }).then((res) => {
            this.setState({
                Client_Name: '',
                Email: '',
                Address: '',
                Phone: '',
                Headquarter: '',
                Region: '',
                Role_Id: ''
            })
            this.props.getClient();
            this.props.closeButton();
        })
    }

    render() {
        const { bsSize, show, closeButton } = this.props
        const { roles, regions, clientRegions } = this.state;
        return (
            <Modal show={show} bsSize="medium" id="modal-d">
                <Modal.Header >
                    <Modal.Title className="btn-color">
                        <i className="fas fa-user-plus fa-user-icon" style={{ marginRight: '10px', fontSize: '13px' }}></i>
                        <span style={{ color: '#435fbc', fontSize: '13px' }}>Add Client</span>
                    </Modal.Title>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeButton}>
                        <span aria-hidden="true"><span className="glyphicon glyphicon-prop glyphicon-remove-circle "></span></span>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <h1 className="mh pb" id="headingText" >Primary Details</h1>
                    <div className="main">
                        <div className="container">
                            <div className="booking-content">
                                <form id="booking-form">
                                    <div className="row">
                                        <div className="input-group input-group-lg form-group">
                                            <label className="input-group-addon input-group-bg enter-text-pos"><span style={{ color: '#8f8f8f' }}>Enter Name</span> </label>
                                            <input name="ProductNumber" className="form-control" type="text" placeholder="Enter Name" value={this.state.Client_Name} onChange={this.handleChange.bind(this, 'Client_Name')} />
                                        </div>
                                        {this.state.error !== '' ? (
                                            <div className="alert alert-danger">{this.state.error}</div>
                                        ) : null}
                                    </div>
                                    <div className="row">
                                        <div className="input-group input-group-lg form-group">
                                            <label className="input-group-addon input-group-bg enter-text-pos"><span style={{ color: '#8f8f8f' }}>Head Quater</span> </label>
                                            <input name="ProductNumber" className="form-control" type="text" placeholder="Enter HeadQuater" value={this.state.Headquarter} onChange={this.handleChange.bind(this, 'Headquarter')} />
                                        </div>
                                        {this.state.error1 !== '' ? (
                                            <div className="alert alert-danger">{this.state.error1}</div>
                                        ) : null}
                                    </div>
                                    <div className="row">
                                        <div className="input-group input-group-lg form-group">
                                            <label className="input-group-addon input-group-bg"><span style={{ color: '#8f8f8f' }}>Select Type</span> </label>
                                            <select className="form-control" name="time" id="time" value={this.state.Role_Id} onChange={this.handleChange.bind(this, 'Role_Id')} required>
                                                <option>Select Type</option>
                                                {roles.map((obj, i) => {
                                                    return (
                                                        <option value={obj.id}>{obj.role_name}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        {this.state.error2 !== '' ? (
                                            <div className="alert alert-danger">{this.state.error2}</div>
                                        ) : null}
                                    </div>

                                    <h1 className="mh pb model-form" id="headingText" >Location Details</h1>
                                    <div className="row">
                                        <div className="col-md-10" style={{paddingLeft:"0"}}>
                                            <div className="input-group input-group-lg form-group">
                                                <label className="input-group-addon input-group-bg region-text-pos"><span style={{ color: '#8f8f8f' }}>Region</span> </label>
                                                <input name="ProductNumber" className="form-control" type="text" placeholder="Enter Region" value={this.state.Region} onChange={this.handleChange.bind(this, 'Region')} />
                                            </div>
                                        </div>
                                        <div className="col-md-1">
                                            <button type="button" className="btn btn-default pull-right mr-10 btn-color btn-adj" onClick={this.showSidePanelComponent}>Add</button>
                                            {this.getAddRegionModel()}
                                        </div>                                        
                                        {this.state.error3 !== '' ? (
                                            <div className="alert alert-danger">{this.state.error3}</div>
                                        ) : null}
                                    </div>
                                    <div className="row">
                                        <div className="input-group input-group-lg form-group">
                                            <label className="input-group-addon input-group-bg site-text-pos"> <span style={{ color: '#8f8f8f' }}> Address </span></label>
                                            <input name="ProductNumber" className="form-control" type="text" placeholder="Enter Address" value={this.state.Address} onChange={this.handleChange.bind(this, 'Address')}/>
                                        </div>                                        
                                        {this.state.error6 !== '' ? (
                                            <div className="alert alert-danger">{this.state.error6}</div>
                                        ) : null}
                                    </div>


                                    <h1 className="mh pb model-form" id="headingText" >Contact Details</h1>
                                    <div className="row">
                                        <div className="input-group input-group-lg form-group">
                                            <label className="input-group-addon input-group-bg email-text-pos"> <span style={{ color: '#8f8f8f' }}>Email </span></label>
                                            <input name="ProductNumber" className="form-control" type="text" placeholder="Enter Email" type="text" value={this.state.Email} onChange={this.handleChange.bind(this, 'Email')} />
                                        </div>                                        
                                        {this.state.error4 !== '' ? (
                                            <div className="alert alert-danger">{this.state.error4}</div>
                                        ) : null}
                                    </div>
                                    <div className="row">
                                        <div className="input-group input-group-lg form-group">
                                            <label className="input-group-addon input-group-bg phone-text-pos"><span style={{ color: '#8f8f8f' }}>Phone</span> </label>
                                            <input name="ProductNumber" className="form-control" type="text" placeholder="Enter Phone Number" value={this.state.Phone} onChange={this.handleChange.bind(this, 'Phone')} />
                                        </div>                                        
                                        {this.state.error5 !== '' ? (
                                            <div className="alert alert-danger">{this.state.error5}</div>
                                        ) : null}
                                    </div>
                                    <div className="form-group buttons-pos">
                                        <div className="col-md-2">
                                            <button className="btn  pull-right btn-mod" onClick={this.hanldeValidation.bind(this)}>Save</button>
                                        </div>

                                        {/* <div className="col-md-2">
                                            <button className="btn pull-right btn-mod2"  onClick={closeButton.bind(this)}>cancel</button>
                                        </div> */}

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

export default ClientModal;