import React, { Component } from 'react';
import SearchListing from '../Dashboard/SearchListing';
import app_state from '../../app_state';
import { getSites, getRegionsById, getRegionSites,getSitesByRegionId } from '../../services/SiteIQservices';

class NewSidebar extends Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      filteredData: [],
      siteMapData: [],
      selectedStatus: ['warning'],
      selectedSite: undefined,
      workOrderObj: null,
      showSidePanel: false,
      regions: [],
      userProfile: app_state.user_profile,
      region: [],
      sitedata: [],
      regionSites: [],
      filteredData1:[],
      sites:[],
    };
  }

  componentDidMount() {
    document.querySelector('body').classList.add('c-v-dashboard');

    const sideBarHeight = document.querySelector('.main-sidebar').clientHeight;
    document.documentElement.style.setProperty(`--map-height`, (sideBarHeight - 90) + 'px');
    document.documentElement.style.setProperty(`--search-conrainer-height`, (sideBarHeight - 68 - 160) + 'px');
    document.documentElement.style.setProperty(`--search-detail-conrainer-height`, (sideBarHeight - 260) + 'px');
    document.documentElement.style.setProperty(`--activity-conrainer-height`, (sideBarHeight - 90 - 73) + 'px');

    this.handleSearch();
    if (app_state.user_profile.Role === "Admin" && app_state.user_profile.Type === "SiteIQAdmin") {
      this.getSite()
      this.getSite1()
    }
    else if (app_state.user_profile.Role === "Admin" && app_state.user_profile.Type === "RegionManager") {
      this.getRegionSites()
      this.getSite1()
    }
    else {
      this.getRegionsById();
      this.getSite1()
    }
  }
  componentWillUnmount() {
    document.querySelector('body').classList.remove('c-v-dashboard');
  }
  getRegionsById() {
    // debugger
    const Id = this.state.userProfile.Id
    const Type = this.state.userProfile.Type
    getRegionsById(Id, Type).then((result) => {
      this.setState({ region: result.data })
    })
  }
  getRegionSites() {
    const Id = this.state.userProfile.Id
    const Type = this.state.userProfile.Type
    getRegionSites(Id, Type).then((result) => {
      this.setState({ regionSites: result.data })
      // this.change()
    })
  }
  getSite() {
    getSites().then((result) => {
      this.setState({ filteredData: result.data })
      this.setState({ siteMapData: result.data })
    })
  }

  getSite1() {
    getSites().then((result) => {
      this.setState({ filteredData1: result.data })
    })
  }
  getSiteslist(Id){
    getSitesByRegionId(Id).then((result) => {
      this.setState({ sites: result.data })
    })
  }
  onChange(Id){
    // debugger
    this.getSiteslist(Id)
  }
  change(){
    // debugger
      const {regionSites} = this.state
      // debugger
      {regionSites.map((obj,i)=>{
        if(i == 0){
          this.onChange(obj.Region_Id);
        }          
      })}
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
    // debugger
    const { searchText, selectedStatus, siteMapData} = this.state;
    if (app_state.user_profile.Role === "Admin" && app_state.user_profile.Type === "SiteIQAdmin") {
      var updatedList = siteMapData
      updatedList = updatedList.filter(function (item) {
        // debugger
        return (item.site.toLowerCase().search(
          e.target.value.toLowerCase()) !== -1);
      });
      // debugger
      this.setState({ filteredData: updatedList, selectedSite: undefined });
    }
  }
  onLocationClick = (location) => {
    // this.refs.gmap.panToMarker(location);
    this.setState({ selectedSite: location });
  }

  onStatusChange = (status) => {
    // debugger
    const { selectedStatus } = this.state;
    const ind = selectedStatus.indexOf(status);
    if (ind > -1) {
      selectedStatus.splice(ind, 1);
    } else {
      selectedStatus.push(status);
    }

    this.setState({ selectedStatus }, () => {
      this.handleSearch();
    });
  }
  getSearchBox() {
    // debugger
    const { searchText, selectedStatus } = this.state;
    if (app_state.user_profile.Role === "Admin" && app_state.user_profile.Type === "SiteIQAdmin") {
    return <div key={1.1} className="row dashboard-search-container dashboard-search-container-bg">

      <div className="searchInputContainer">
        <div className="form-group has-search">
          <span className="fa fa-search form-control-feedback"></span>
          <input type="text" className="form-control" placeholder="Search"
            value={searchText}
            onKeyPress={this.onSearchKeyPress}
            onChange={this.onSearchChange} />
        </div>
      </div>
    </div>;
    }
  }
  getBackButton() {
    return <div key={1.1} className="row dashboard-search-container dashboard-search-container-bg"
      style={{
        padding: '0 15px 15px',
        fontSize: '12px',
        cursor: 'pointer',
        color: 'white'
      }}
      onClick={() => { this.setState({ selectedSite: undefined }); }}
    >
      <i className="fa fa-arrow-left"></i> Back
    </div>;
  }
  showSidePanelComponent = (stationData, alertData) => {
    this.tempAlertData = alertData;
    let newObj = Object.assign({}, stationData, alertData);
    let obj = {
      stationName: newObj.site,
      stationAddress: newObj.add,
      errorCode: newObj.errorCode,
      level: newObj.errorType,
      pumpDetail: newObj.pumpId + " - " + newObj.side,
    };
    this.setState({ showSidePanel: true, workOrderObj: obj });
  }
  saveAndHideSidePanel = (workOrderObj) => {
    // console.log(workOrderObj);
    this.tempAlertData.status = "In-Progress";
    this.tempAlertData.assignedTo = workOrderObj.technicianName.technicianName;
    this.tempAlertData.workorderId = workOrderObj.id;
    this.setState({ showSidePanel: false, workOrderObj: null }, () => {
      delete this.tempAlertData;
    });
  }
  hideSidePanelComponent = () => {
    this.setState({ showSidePanel: false, workOrderObj: null });
  }
  render() {
    // debugger
    const { filteredData, filteredData1, selectedSite, showSidePanel, workOrderObj, region, regionSites } = this.state;
    if (app_state.user_profile.Role === "Admin" && app_state.user_profile.Type === "SiteIQAdmin") {
      this.state.sitedata = filteredData
    }
    else if (app_state.user_profile.Role === "Admin" && app_state.user_profile.Type === "RegionManager") {
      this.state.sitedata = regionSites
      const data = regionSites.map((obj, i) => {
        return (
          obj.Sites
        )
      })
      this.state.filteredData1 = data[0]
    }
    else {
      this.state.sitedata = region
      if(region !=""){
      const data = region.Sites.map((obj,i)=>{
        return(
          obj
        )
      })    
      this.state.filteredData1 = data 
    }      
    }
    return (
      <aside className="main-sidebar1">
      <section className="Sidebar">
      <div>
          <div className="col-sm-2 search-n-activity search-activity-container1 search-bg-container">
            {this.getSearchBox()}

            <SearchListing key={1.2} data={this.state.sitedata} regionsitedata={this.state.sitedata} onLocationClick={this.onLocationClick}
              // onLocationHover={this.onLocationHover.bind(this)}
              // onLocationLeave={this.onLocationLeave.bind(this)}
              site={selectedSite}
              showSidePanelComponent={this.showSidePanelComponent}
            />
          </div>
        {/* </div> */}
      </div>
      </section>
      </aside>
    );
  }
}

export default NewSidebar;
