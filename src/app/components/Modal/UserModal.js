import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { getRoles, addUser, getSitesByClientId, getSites } from '../../services/SiteIQservices';
import app_state from '../../app_state';

class UserModal extends Component {
    constructor(props) {
        super(props);
        this.showSidePanelComponent = this.showSidePanelComponent.bind(this);
        this.hideSidePanelComponent = this.hideSidePanelComponent.bind(this);
        this.state = {
            showSidePanel: false,
            roles: [],
            sites: [],
            User_Name: '',
            Role: '',
            Email: '',
            Phone_Number: '',
            Headquarter: '',
            Site: '',
            userProfile: app_state.user_profile,
            error: '',
            error1: '',
            error2: '',
            error3: '',
            error4: '',
            error5: '',
            adminsites: [],
            selectedValues: []
        };
    }
    showSidePanelComponent() {
        this.setState({ showSidePanel: true });
    }
    hideSidePanelComponent() {
        this.setState({ showSidePanel: false });
    }

    getRoles() {
        getRoles().then((result) => {
            this.setState({ roles: result.data })
        })
    }
    getSitesByClientId() {
        const Id = this.state.userProfile.Id
        getSitesByClientId(Id).then((result) => {
            this.setState({ sites: result.data })
        })
    }
    getSites() {
        getSites().then((result) => {
            this.setState({ adminsites: result.data })
        })
    }
    componentDidMount() {
        this.getSites()
        this.getRoles()
        this.getSitesByClientId()
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
            error: '',
            error1: '',
            error2: '',
            error3: '',
            error4: '',
            error5: '',
        };
        obj[key] = event.currentTarget.value;
        this.setState(obj);
    }
    hanldeValidation(e){
        if (this.state.User_Name == "") {
            this.setState({
              error: "Please enter Name"
            });
          }
          if (this.state.Headquarter == "") {
            this.setState({
              error1: "Please enter Head Quarter Name"
            });
          }
          if (this.state.Role == "") {
            this.setState({
              error2: "Please select Type"
            });
          }
          if (this.state.Site == "") {
            this.setState({
              error3: "Please select Site"
            });
          }
          if (this.state.Email == "") {
            this.setState({
              error4: "Please enter valid Email"
            });
          }
          if (this.state.Phone_Number == "") {
            this.setState({
              error5: "Please Enter Phone Number"
            });
          }
          if(this.state.User_Name !="" && this.state.Headquarter != "" && this.state.Role !="" && this.state.Site != "" && this.state.Email !="" && this.state.Phone_Number != ""){
            this.handleSubmit(e)
          }
    }
    handleSubmit(e) {
        e.preventDefault();
        addUser({
            "Client_Id": this.state.userProfile.Id,
            "User_Name": this.state.User_Name,
            "Email": this.state.Email,
            "Site": this.state.Site,
            "Phone_Number": this.state.Phone_Number,
            "Headquarter": this.state.Headquarter,
            "Role_Id": this.state.Role
        }).then((res) => {
            this.setState({
                Client_Id: '',
                User_Name: '',
                Email: '',
                Site: '',
                Phone_Number: '',
                Headquarter: '',
                Role_Id: ''
            })
            this.props.getUser();
            this.props.closeButton();
        })
    }
    render() {
        const { bsSize, show, closeButton } = this.props
        const { roles, sites, adminsites } = this.state;
        return (
            <Modal show={show} bsSize="medium" id="modal-d">
                <Modal.Header >
                    <Modal.Title className="btn-color">
                        <i className="fas fa-user-plus fa-user-icon" style={{ marginRight: '10px', fontSize: '13px' }}></i>
                        <span style={{ color: '#435fbc', fontSize: '13px' }}>Add User</span>
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
                                            <input name="Name" className="form-control" type="text" placeholder="Enter Name" value={this.state.User_Name} onChange={this.handleChange.bind(this, 'User_Name')} required />
                                        </div>
                                        {this.state.error !== '' ? (
                                            <div className="alert alert-danger">{this.state.error}</div>
                                        ) : null}
                                    </div>
                                    <div className="row">
                                        <div className="input-group input-group-lg form-group">
                                            <label className="input-group-addon input-group-bg enter-text-pos">Head Quarter </label>
                                            <input name="Head Quarter" className="form-control" type="text" value={this.state.Headquarter} onChange={this.handleChange.bind(this, 'Headquarter')} required />
                                        </div>
                                        {this.state.error1 !== '' ? (
                                            <div className="alert alert-danger">{this.state.error1}</div>
                                        ) : null}
                                    </div>
                                    <div className="row">
                                        <div className="input-group input-group-lg form-group">
                                            <label className="input-group-addon input-group-bg"><span style={{ color: '#8f8f8f' }}>Select Type</span> </label>
                                            {/* <button 
        onClick={() => this.setState({selectedValues: []})} 
        style = {{
          opacity: this.state.selectedValues.length > 0 ? 1 : 0.2
        }}>
        Reset selected values
      </button>
      <reactSelectize.MultiSelect 
        placeholder = "Select a number"
        values = {this.state.selectedValues}
        onValuesChange = {(values) => this.setState({selectedValues: values})}
      >
        <option value = "one">1</option>
        <option value = "two">2</option>      
        <option value = "three">3</option>            
      </reactSelectize.MultiSelect> */}
                                            <select className="form-control" name="Role" id="role" value={this.state.Role} onChange={this.handleChange.bind(this, 'Role')} required>
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
                                        <div className="input-group input-group-lg form-group">
                                            <label className="input-group-addon input-group-bg site-text-pos"> <span style={{ color: '#8f8f8f' }}> Site </span></label>
                                            <select className="form-control" name="SiteName" id="SiteName" value={this.state.Site} onChange={this.handleChange.bind(this, 'Site')} required>
                                                <option className="size">Select Site</option>
                                                {sites.map((obj, i) => {
                                                    return (
                                                        <option value={obj.ID} className="size">{obj.SiteName}</option>
                                                    )
                                                })}
                                            </select>
                                            {/* <input name="ProductNumber" className="form-control" type="text" placeholder="Enter Site"/> */}
                                        </div>
                                        {this.state.error3 !== '' ? (
                                            <div className="alert alert-danger">{this.state.error3}</div>
                                        ) : null}
                                    </div>


                                    <h1 className="mh pb model-form" id="headingText" >Contact Details</h1>
                                    <div className="row">
                                        <div className="input-group input-group-lg form-group">
                                            <label className="input-group-addon input-group-bg email-text-pos"> <span style={{ color: '#8f8f8f' }}>Email </span></label>
                                            <input name="Email" className="form-control" type="email" placeholder="Enter Email" value={this.state.Email} onChange={this.handleChange.bind(this, 'Email')} required />
                                        </div>
                                        {this.state.error4 !== '' ? (
                                            <div className="alert alert-danger">{this.state.error4}</div>
                                        ) : null}
                                    </div>
                                    <div className="row">
                                        <div className="input-group input-group-lg form-group">
                                            <label className="input-group-addon input-group-bg phone-text-pos"><span style={{ color: '#8f8f8f' }}>Phone</span> </label>
                                            <input name="PhoneNumber" className="form-control" type="phonenumber" placeholder="Enter Phone Number" value={this.state.Phone_Number} onChange={this.handleChange.bind(this, 'Phone_Number')} required />
                                        </div>
                                        {this.state.error5 !== '' ? (
                                            <div className="alert alert-danger">{this.state.error5}</div>
                                        ) : null}
                                    </div>
                                    <div className="form-group buttons-pos">
                                        <div className="col-md-2">
                                            <button className="btn  mbut pull-right btn-mod" onClick={this.hanldeValidation.bind(this)}>Save</button>
                                        </div>

                                        {/* <div className="col-md-2">
                                            <button className="btn mbut2 pull-right btn-mod2" onClick={closeButton.bind(this)}>cancel</button>
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

export default UserModal;