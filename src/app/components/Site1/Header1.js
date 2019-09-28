import React, { Component } from 'react';
import app_state from '../../app_state';
import { observer } from 'mobx-react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, DropdownButton } from 'react-bootstrap';
import _ from 'lodash';
import { withRouter } from 'react-router'; 
import Img from '../../../styles/img/logo.png';
import Img1 from '../../../styles/img/logo 4.png';
import Img2 from '../../../styles/img/avatar-img.png';

@observer
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      userProfile: app_state.user_profile
    };
  }
  handleLogout = (e) => {
    localStorage.removeItem('iot:userInfo');
    this.props.history.push('/login');
  }


  render() {
    return (
      <header className="main-header">
        {/* <a href="#/dashboard" className="logo">
          <span className="logo-mini" style={{ textAlign: 'center' }}>
            <img src={Img1} alt="IQ" width="70%" />
          </span>
          <span className="logo-lg" style={{ textAlign: 'center' }}>
            <img src={Img} alt="SITE IQ" width="55%" />
          </span>
        </a> */}
        <nav className="head-nav navbar navbar-default navbar-static-top">
          <div>
            <div className="headContentText">
              {this.props.headerContent}
            </div>
            <ul className="nav pull-right">
              <li className="profiledropdown">
                <button id="actionprofiledropdown" className="dropdown-toggle dropdown-toggle btn btn-link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span>{app_state.user_profile.Role}</span> <span className="caret"></span> <span className="avatar"><img src={Img2} className="img-circle" alt="" /></span>
                </button>
                {/* <button id="actionprofiledropdown" className="dropdown-toggle dropdown-toggle btn btn-link" onClick={this.handleLogout}>
                  <i className="fa fa-user"></i> <span>Logout</span>
                </button> */}
                <ul className="dropdown-menu">
                  {/* <li><a href="#">Action</a></li>
                  <li><a href="#">Another action</a></li>
                  <li><a href="#">Something else here</a></li>
                  <li role="separator" className="divider"></li> */}
                  <li><a onClick={this.handleLogout} style={{cursor:"pointer"}}>Logout</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default withRouter(Header);
