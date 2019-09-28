import React, { Component } from 'react';
import { NavItem } from 'react-bootstrap';
import app_state from '../../app_state';
import { SidebarMenu } from '../../utils/Constants';
import { observer } from 'mobx-react';


@observer
class Sidebar1 extends Component {
  constructor() {
    super();
    this.state = {
      userProfile: app_state.user_profile

    };
  }
  componentWillMount() {
    var element = document.getElementsByTagName('body')[0];
    element.classList.add('sidebar-mini');
    if (app_state.sidebar_isCollapsed) {
      element.classList.add('sidebar-collapse');
    }
  }
  componentDidUpdate() {
    var element = document.getElementsByTagName('body')[0];
    if (app_state.sidebar_isCollapsed) {
      element.classList.add('sidebar-collapse');
    } else {
      element.classList.remove('sidebar-collapse');
    }
  }
  toggleSidebar() {
    app_state.sidebar_isCollapsed = !app_state.sidebar_isCollapsed;
  }
  handleClick(key, e) {
    app_state.sidebar_activeKey = key;
  }
  render() {
    if(app_state.user_profile.Role === "Admin" && app_state.user_profile.Type === "SiteIQAdmin"){
      return(
      <aside className="main-sidebar">
         <div className="sidebar-head">
          <h5>SiteIQ</h5>
        </div> 
        <section className="sidebar">
          <ul className="sidebar-menu">
            <li className={app_state.sidebar_activeKey === SidebarMenu.Dashboard.id
              ? 'active'
              : ''} onClick={this.handleClick.bind(this, SidebarMenu.Dashboard.id)}>
              <a href="#/dashboard">
                <i className="fa fa-home"></i>
                <span>Dashboard</span>
              </a>
            </li>
            {/* <li className={app_state.sidebar_activeKey === SidebarMenu.WorkOrder.id
              ? 'active'
              : ''} onClick={this.handleClick.bind(this, SidebarMenu.WorkOrder.id)}>
              <a href="#/workorder">
              <i className="fa fa-tasks"></i>
                <span>Work Order</span>
              </a>
            </li>
            <li className={app_state.sidebar_activeKey === SidebarMenu.DeviceInstallation.id
              ? 'active'
              : ''} onClick={this.handleClick.bind(this, SidebarMenu.DeviceInstallation.id)}>
              <a href="#/device_installation">
                <i className="fa fa-file"></i>
                <span>Device Installation</span>
              </a>
            </li> */}
            <li className={app_state.sidebar_activeKey === SidebarMenu.UserManagement.id
                ? 'active'
                : ''} onClick={this.handleClick.bind(this, SidebarMenu.UserManagement.id)}>
                <a href="#/user_management">
                  <i className="fa fa-users"></i>
                  <span>User Management</span>
                </a>
              </li>
              <li className={app_state.sidebar_activeKey === SidebarMenu.ClientManagement.id
                ? 'active'
                : ''} onClick={this.handleClick.bind(this, SidebarMenu.ClientManagement.id)}>
                <a href="#/client_management">
                <i className="fa fa-user"></i>
                  <span>Client Management</span>
                </a>
              </li>
            {/* <li className={app_state.sidebar_activeKey === SidebarMenu.Support.id
              ? 'active'
              : ''} onClick={this.handleClick.bind(this, SidebarMenu.Support.id)}>
              <a href="#/support">
                <i className="fa fa-support"></i>
                <span>Support</span>
              </a>
            </li> */}
          </ul>
        </section>
      </aside>
    );
    }
    if(app_state.user_profile.Role === "Admin" && app_state.user_profile.Type === "RegionManager"){
      return(
      <aside className="main-sidebar">
         <div className="sidebar-head">
          <h5>SiteIQ</h5>
        </div> 
        <section className="sidebar">
          <ul className="sidebar-menu">
            <li className={app_state.sidebar_activeKey === SidebarMenu.Dashboard.id
              ? 'active'
              : ''} onClick={this.handleClick.bind(this, SidebarMenu.Dashboard.id)}>
              <a href="#/dashboard">
                <i className="fa fa-home"></i>
                <span>Dashboard</span>
              </a>
            </li>
            {/* <li className={app_state.sidebar_activeKey === SidebarMenu.WorkOrder.id
              ? 'active'
              : ''} onClick={this.handleClick.bind(this, SidebarMenu.WorkOrder.id)}>
              <a href="#/workorder">
              <i className="fa fa-tasks"></i>
                <span>Work Order</span>
              </a>
            </li>
            <li className={app_state.sidebar_activeKey === SidebarMenu.DeviceInstallation.id
              ? 'active'
              : ''} onClick={this.handleClick.bind(this, SidebarMenu.DeviceInstallation.id)}>
              <a href="#/device_installation">
                <i className="fa fa-file"></i>
                <span>Device Installation</span>
              </a>
            </li> */}
            <li className={app_state.sidebar_activeKey === SidebarMenu.UserManagement.id
                ? 'active'
                : ''} onClick={this.handleClick.bind(this, SidebarMenu.UserManagement.id)}>
                <a href="#/user_management">
                  <i className="fa fa-users"></i>
                  <span>User Management</span>
                </a>
              </li>
              <li className={app_state.sidebar_activeKey === SidebarMenu.ClientManagement.id
                ? 'active'
                : ''} onClick={this.handleClick.bind(this, SidebarMenu.ClientManagement.id)}>
                <a href="#/client_management">
                <i className="fa fa-user"></i>
                  <span>Client Management</span>
                </a>
              </li>
            {/* <li className={app_state.sidebar_activeKey === SidebarMenu.Support.id
              ? 'active'
              : ''} onClick={this.handleClick.bind(this, SidebarMenu.Support.id)}>
              <a href="#/support">
                <i className="fa fa-support"></i>
                <span>Support</span>
              </a>
            </li> */}
          </ul>
        </section>
      </aside>
    );
    }
    if(app_state.user_profile.Role === "View" && app_state.user_profile.Type === "SiteOwner"){
      return(
      <aside className="main-sidebar">
         <div className="sidebar-head">
          <h5>SiteIQ</h5>
        </div> 
        <section className="sidebar">
          <ul className="sidebar-menu">
            <li className={app_state.sidebar_activeKey === SidebarMenu.Dashboard.id
              ? 'active'
              : ''} onClick={this.handleClick.bind(this, SidebarMenu.Dashboard.id)}>
              <a href="#/dashboard">
                <i className="fa fa-home"></i>
                <span>Dashboard</span>
              </a>
            </li>
            {/* <li className={app_state.sidebar_activeKey === SidebarMenu.WorkOrder.id
              ? 'active'
              : ''} onClick={this.handleClick.bind(this, SidebarMenu.WorkOrder.id)}>
              <a href="#/workorder">
              <i className="fa fa-tasks"></i>
                <span>Work Order</span>
              </a>
            </li> */}
            {/* <li className={app_state.sidebar_activeKey === SidebarMenu.DeviceInstallation.id
              ? 'active'
              : ''} onClick={this.handleClick.bind(this, SidebarMenu.DeviceInstallation.id)}>
              <a href="#/device_installation">
                <i className="fa fa-file"></i>
                <span>Device Installation</span>
              </a>
            </li>
            <li className={app_state.sidebar_activeKey === SidebarMenu.UserManagement.id
                ? 'active'
                : ''} onClick={this.handleClick.bind(this, SidebarMenu.UserManagement.id)}>
                <a href="#/user_management">
                  <i className="fa fa-users"></i>
                  <span>User Management</span>
                </a>
              </li>
              <li className={app_state.sidebar_activeKey === SidebarMenu.ClientManagement.id
                ? 'active'
                : ''} onClick={this.handleClick.bind(this, SidebarMenu.ClientManagement.id)}>
                <a href="#/clientmanagement">
                <i className="fa fa-user"></i>
                  <span>Client Management</span>
                </a>
              </li> */}
            {/* <li className={app_state.sidebar_activeKey === SidebarMenu.Support.id
              ? 'active'
              : ''} onClick={this.handleClick.bind(this, SidebarMenu.Support.id)}>
              <a href="#/support">
                <i className="fa fa-support"></i>
                <span>Support</span>
              </a>
            </li> */}
          </ul>
        </section>
      </aside>
    );
    }
  }
}
export default Sidebar1;
