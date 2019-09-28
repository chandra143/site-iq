import React, { Component } from 'react';
import { Link } from 'react-router';
import Site from '../Site1';
import { getUser} from '../../services/SiteIQservices'
import app_state from '../../app_state';
import { Badge, DropdownButton, MenuItem, Button, FormGroup, InputGroup, FormControl, Checkbox, Modal } from 'react-bootstrap';
import UserModal from '../Modal/UserModal';


class UserManagement extends Component {
  constructor() {
    super();
    this.showSidePanelComponent = this.showSidePanelComponent.bind(this);
    this.hideSidePanelComponent = this.hideSidePanelComponent.bind(this);
    this.state = {
      showSidePanel: false,
      userData: [],
      userManagement: [],
      userProfile: app_state.user_profile,
      searchText:''
    };
  }

  getUser() {
    // debugger
    const Id = this.state.userProfile.Id
    getUser(Id).then((result) => {
      // debugger
      this.setState({ userData: result.data,userManagement: result.data })
    })
  }
  onSearchChange = (e) => {
    // debugger
    this.setState({ searchText: e.currentTarget.value });
  }
  onSearchKeyPress = (e) => {
    // debugger
    if (e.key === "Enter") {
      this.handleSearch(e);
    }
  }
  handleSearch = (e) => {
    const{userManagement} = this.state
    var updatedList = userManagement
      updatedList = updatedList.filter(function (item) {
        return (item.User_Name.toLowerCase().search(
          e.target.value.toLowerCase()) !== -1);
      });
      this.setState({ userData: updatedList });
  }
  componentDidMount() {
    this.getUser();
  }
  showSidePanelComponent() {
    this.setState({ showSidePanel: true });
  }
  hideSidePanelComponent() {
    this.setState({ showSidePanel: false });
  }

  getAddUserModel(i) {
    const { showSidePanel } = this.state
    return (
      <UserModal key={i} show={showSidePanel} closeButton={this.hideSidePanelComponent} getUser={this.getUser.bind(this)} bsSize="medium" />
    )
  }


  getUserManagementData() {
    const { userData } = this.state
    return (
      <table className="table table-bordered table-striped table-content table-pos mb-40">
        <thead className="thead-light">
          <tr>
            <th className="theader"><input type="checkbox" /></th>
            <th className="theader">Name</th>
            <th className="theader">Role</th>
            <th className="theader">Email</th>
            <th className="theader">Site</th>
            <th className="theader">Phone Number</th>
            {/* <th className="theader">Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {userData.map((obj, i) => {
            return (
              <tr key={i}>
                <td className="theader"><input type="checkbox" /></td>
                <td className="theader">{obj.User_Name}</td>
                <td className="theader">{obj.Role}</td>
                <td className="theader">{obj.Email}</td>
                <td className="theader">{obj.Site}</td>
                <td className="theader">{obj.Phone_Number}</td>
                {/* <td className="theader"><a className="pointer-arrow"><span><i className="fa fa-pencil-square-o"></i></span> &nbsp;
                               <span className="dropdown mr">
                    <i className="fa fa-ellipsis-v dropdown dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
                    <ul className="dropdown-menu menu-prop box3 arrow-top " aria-labelledby="dropdownMenu4">
                      <li ><a>Delete</a></li>
                      <li><a>Unblock</a></li>
                      <li><a>Active</a></li>
                    </ul>
                  </span>

                </a></td> */}
              </tr>
            );
          })}
        </tbody>
      </table >
    )
  }

  render() {
    const {searchText} = this.state
    return (
      <Site pageTitle="User Management">
        <div className="manage-cu">
          <div className="row mr-uc">
            <div className="col-md-4">
              {/* <h3 className="overview">842 Total | Sort by : <span style={{ color: '#535353' }}> Date created</span> */}
                <div className="dropdown mr">
                  {/* <div className=" caret dropdown-toggle caret-pos" type="caret" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  </div>
                  <ul className="dropdown-menu menu-pos" aria-labelledby="dropdownMenu4" id="MPos">
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
              <button type="button" className="btn pull-right mr-10 btn-color btn-pos" onClick={this.showSidePanelComponent}><i className="fas fa-user-plus"></i> Add User</button>
              {this.getAddUserModel()}
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
      </Site>
    )
  }
}

export default UserManagement;
