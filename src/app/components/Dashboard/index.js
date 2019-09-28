import React, { Component } from 'react';
import { Link } from 'react-router';
import Site from '../Site';
import AdminDashboard from './AdminDashboard';

import StationDashboard from '../StationDashboard';
import app_state from '../../app_state';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      userProfile: app_state.user_profile
    };
  }
  render() {
    return <Site pageTitle="Dashboard">
      {app_state.user_profile.Role === "Admin" && app_state.user_profile.Type === "SiteIQAdmin" ? <AdminDashboard /> : null}
      {app_state.user_profile.Role === "Admin" && app_state.user_profile.Type === "RegionManager" ? <AdminDashboard /> : null}
      {app_state.user_profile.Role === "View" && app_state.user_profile.Type === "SiteOwner" ? <AdminDashboard /> : null}
    </Site>;
  }
}

export default Dashboard;
