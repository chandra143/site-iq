import React, { Component } from 'react';
import app_state from '../../app_state';
import { observer } from 'mobx-react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, DropdownButton } from 'react-bootstrap';
import _ from 'lodash';
import { withRouter } from 'react-router';
import Img from '../../../styles/img/logo.png';
import Img1 from '../../../styles/img/logo 4.png'

@observer
class NewHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  handleLogout = (e) => {
    localStorage.removeItem('iot:userInfo');
    this.props.history.push('/login');
  }


  render() {
    return (
      <header className="main-header1">
        <a className="logo">
          <span className="logo-lg" style={{ textAlign: 'center' }}>
            <img src={Img} alt="SITE IQ" width="55%" />
          </span>
        </a>
        <nav className="navbar navbar-default navbar-static-top">
          <div>
            <div className="headContentText">
              {this.props.headerContent}
            </div>
          </div>
        </nav>
      </header>
    );
  }
}



  

export default withRouter(NewHeader);
