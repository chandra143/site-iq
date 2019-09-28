import React, { Component } from 'react';
import { Link } from 'react-router';
import Site from '../Site1';
import { Badge, DropdownButton, MenuItem, Button, FormGroup, InputGroup, FormControl, Checkbox, Modal, Popover, OverlayTrigger } from 'react-bootstrap';
import ClientModal from '../Modal/ClientModal';
import { getClient } from '../../services/SiteIQservices'
import app_state from '../../app_state';

class ClientManagement extends Component {
    constructor(props) {
        super(props);
        this.showSidePanelComponent = this.showSidePanelComponent.bind(this);
        this.hideSidePanelComponent = this.hideSidePanelComponent.bind(this);
        this.state = {
            showSidePanel: false,
            ClientData: [],
            clientManagement: [],
            userProfile: app_state.user_profile,
            searchText:''
        }
    }
    getClient() {
        const Id = this.state.userProfile.Id
        getClient(Id).then((result) => {
            this.setState({ ClientData: result.data,clientManagement: result.data })
        })
    }
    onSearchChange = (e) => {
        this.setState({ searchText: e.currentTarget.value });
      }
      onSearchKeyPress = (e) => {
        if (e.key === "Enter") {
          this.handleSearch(e);
        }
      }
      handleSearch = (e) => {
        const{clientManagement} = this.state
        var updatedList = clientManagement
          updatedList = updatedList.filter(function (item) {
            return (item.Client_Id.toLowerCase().search(
              e.target.value.toLowerCase()) !== -1);
          });
          this.setState({ ClientData: updatedList });
      }
    componentDidMount() {
        this.getClient();
    }

    showSidePanelComponent() {
        this.setState({ showSidePanel: true });
    }
    hideSidePanelComponent() {
        this.setState({ showSidePanel: false });
    }

    getAddClientModel(i) {
        const { showSidePanel } = this.state
        return (
            <ClientModal key={i} show={showSidePanel} closeButton={this.hideSidePanelComponent} getClient={this.getClient.bind(this)} bsSize="medium" />
        )
    }

    getUserManagementData() {
        const { ClientData } = this.state;
        return (
            <table className="table table-bordered table-striped table-content table-pos mb-40">
                <thead className="thead-light">
                    <tr>
                        <th className="theader"><input type="checkbox" ></input></th>
                        <th className="theader">Name</th>
                        <th className="theader">Type</th>
                        <th className="theader">Area</th>
                        <th className="theader">Email</th>
                        <th className="theader">Phone Number</th>
                        {/* <th className="theader">Actions</th> */}
                    </tr>
                </thead>

                <tbody>
                    {ClientData.map((obj, i) => {
                        return (
                            <tr key={i} >
                                <td className="theader"><input type="checkbox" /></td>
                                <td className="theader">{obj.Client_Id}</td>
                                <td className="theader">{obj.Type}</td>
                                <td className="theader">{obj.HeadQuarters}</td>
                                <td className="theader">{obj.Email}</td>
                                <td className="theader">{obj.Phone_Number}</td>
                                {/* <td className="theader"><a className="pointer-arrow"><span><i className="fa fa-pencil-square-o"></i></span> &nbsp;
                               <span className="dropdown mr" >
                                        <i className="fa fa-ellipsis-v dropdown dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
                                        <ul className="dropdown-menu menu-prop box3 arrow-top " aria-labelledby="dropdownMenu4">
                                            <li ><a>Delete</a></li>
                                            <li><a>Unblock</a></li>
                                            <li><a>Active</a></li>
                                        </ul>
                                    </span>
                                </a></td> */}
                            </tr>)
                    })}
                </tbody>
            </table >
        )
    }

    render() {
        const {searchText} = this.state
        return (
            <Site pageTitle="Client Management">
                <div className="manage-cu">
                    <div className="row mr-uc">
                        <div className="col-md-4">
                            {/* <h3 className="overview">842 Total | Sort by : <span style={{ color: '#535353' }}> Date created</span> */}
                                <div className="dropdown mr">
                                    {/* <div className=" caret dropdown-toggle caret-pos" type="caret" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    </div>
                                    <ul className="dropdown-menu menu-pos" aria-labelledby="dropdownMenu4">
                                        <li><a>march   </a></li>
                                        <li><a>april</a></li>
                                        <li><a>may</a></li>
                                        <li><a>june</a></li>
                                        <li><a>july</a></li>
                                    </ul> */}
                                </div>
                            {/* </h3> */}
                        </div>
                        <div className="col-md-8 ">
                            <button type="button" className="btn btn-default pull-right mr-10 btn-color btn-pos" onClick={this.showSidePanelComponent}><i className="fas fa-user-plus"></i> Add Client</button>
                            {this.getAddClientModel()}
                        </div>
                    </div>

                    <div className="row row-pos">
                        <div className="col-md-12 search-bg">
                            <div className="form-group form-search has-search">
                                <span className="fa fa-search form-control-feedback icon-pos"></span>
                                <input type="text" className="form-control form-pos" placeholder="Search"
                                value={searchText}
                                onKeyPress={this.onSearchKeyPress}
                                onChange={this.onSearchChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row row2-pos">
                        <div className="col-md-12">
                            <div className="row">
                            </div>
                            {this.getUserManagementData()}
                        </div>
                    </div>
                </div>
            </Site >
        )
    }

}

export default ClientManagement;
