import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginComponent from '../components/Login';
import Dashboard from '../components/Dashboard';
import StationDashboard from '../components/StationDashboard';
import DispenserDashboard from '../components/DispenserDashboard';
import Support from '../components/Support';
import UserManagement from '../components/UserManagement';
import WorkOrder from '../components/WorkOrder';
import AddEditWorkOrder from '../components/WorkOrder/AddEditWorkOrder';
import DeviceInstallation from '../components/DeviceInstallation';
import ClientManagement from '../components/ClientManagement';
import app_state from '../app_state';
import { SidebarMenu } from '../utils/Constants';
import Forgot from '../components/Accounts/Forgot';
import Reset from '../components/Accounts/Reset';
import ChangePassword from '../components/Accounts/ChangePassword';
import Register from '../components/Accounts/Register';


const render = (route, Comp) => {
  const isLoginPage = route.location.pathname === "/login";
  if (!isLoginPage) {
    let userProfile = localStorage.getItem("iot:userInfo");
    if (!userProfile) {
      route.history.replace({ pathname: '/login' });
      return null;
    } else {
      app_state.user_profile = JSON.parse(userProfile);
      return (<Comp route={route} />)
    }
  } else {
    return (<Comp route={route} />)
  }
}

const routes = (
  <Switch>
    <Route exact={true} path="/" render={(route) => {
      return render(route, Dashboard)
    }} />
         <Route path="/forgot" exact component={Forgot}/>
    <Route path="/reset" exact component={Reset}/>
    <Route path="/changepassword" exact component={ChangePassword}/>
    <Route path="/register" exact component={Register}/>

    <Route exact={true} path="/dashboard" render={(route) => {
      return render(route, Dashboard)
    }} />
    <Route exact={true} path="/login" render={(route) => {
      return render(route, LoginComponent)
    }} />
    <Route exact={true} path="/station/:stationName/:id" render={(route) => {
      return render(route, StationDashboard)
    }} />
    <Route exact={true} path="/support" render={(route) => {
      return render(route, Support)
    }} />
    <Route exact={true} path="/user_management" render={(route) => {
      return render(route, UserManagement)
    }} />
    <Route exact={true} path="/workorder" render={(route) => {
      return render(route, WorkOrder)
    }} />
    <Route exact={true} path="/workorder/add" render={(route) => {
      return render(route, AddEditWorkOrder)
    }} />
    <Route exact={true} path="/workorder/:id/edit" render={(route) => {
      return render(route, AddEditWorkOrder)
    }} />
    <Route exact={true} path="/device_installation" render={(route) => {
      return render(route, DeviceInstallation)
    }} />
    <Route exact={true} path="/client_management" render={(route) => {
      return render(route, ClientManagement)
    }} />
    <Route exact={true} path="/stationdashboard/:stationName/dispencerdashboard/:id/:deviceid" render={(route) => {
      return render(route, DispenserDashboard)
    }} />
  </Switch>
);

export default routes;
