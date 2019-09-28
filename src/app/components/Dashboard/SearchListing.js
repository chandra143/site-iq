import React, { Component } from 'react';
import { Link } from 'react-router';
import Site from '../Site';
import { Popover, OverlayTrigger, Overlay } from 'react-bootstrap';
import SiteDetail from './SiteDetail';
import Img from '../../../styles/img/Group145.png'
import { getSitesByRegionId } from '../../services/SiteIQservices';
import app_state from '../../app_state';

class SearchListing extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      hide: false,
      sites: [],
      regionSites:[],
      id: '',
      userProfile: app_state.user_profile,
      searchText: '',
      siteOwner:[]
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, Id) {
    this.setState({ Id: e.target.value });
    this.getSitesByRegionId(e.target.value)
  }
  getSitesByRegionId(Id) {
    getSitesByRegionId(Id).then((result) => {
      this.setState({ sites: result.data,regionSites: result.data })
    })
  }
  onChange(Id){
    this.getSitesByRegionId(Id)
  }
  change(){
      const {data} = this.props
      {data.map((obj,i)=>{
        if(i == 0){
          this.onChange(obj.Region_Id);
        }          
      })}
  }

  onLocationClick = (d, e) => {
    this.props.onLocationClick(d);
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
    if (app_state.user_profile.Role === "Admin" && app_state.user_profile.Type === "RegionManager") {
      var updatedList = this.props.regionsitedata
      updatedList = updatedList[0].Sites.filter(function (item,i) {
        return (item.site.toLowerCase().search(
          e.target.value.toLowerCase()) !== -1);
      });
       updatedList =[{"Sites": updatedList}]
      this.setState({ sites: updatedList});
    }
    if (app_state.user_profile.Role === "View" && app_state.user_profile.Type === "SiteOwner") {
      // debugger
      var updatedList = this.props.data
      updatedList = updatedList.Sites.filter(function (item,i) {
        // debugger
        return (item.site.toLowerCase().search(
          e.target.value.toLowerCase()) !== -1);
      });
      // debugger
       updatedList ={"Sites": updatedList}
      this.setState({ siteOwner: updatedList});
    }
  }
  // onLocationEnter = (d, e) => {
  //   this.props.onLocationHover(d);
  // }
  // onLocationLeave = (d, e) => {
  //   this.props.onLocationLeave(d);
  // }
  getSearchBox() {
    const { searchText } = this.state;
    return <div key={1.1} className="dashboard-search-container dashboard-search-container-bg">

      <div className="searchInputContainer">
        <div className="form-group has-search">
          <span className="fa fa-search form-control-feedback"></span>
          <input type="text" className="form-control" placeholder="Search"
            value={searchText}
            onKeyPress={this.onSearchKeyPress}
            onChange={this.onSearchChange} 
            />
        </div>
      </div>
    </div>;
  }
  render() {
    if (app_state.user_profile.Role === "Admin" && app_state.user_profile.Type === "SiteIQAdmin") {
      const icons = {
        normal: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Location_arithmetic_vertical.svg/2000px-Location_arithmetic_vertical.svg.png",
        warning: "https://png.pngtree.com/svg/20170724/38501bfa9c.png", 
        error: "https://png.pngtree.com/svg/20170126/aff1ebc38b.png", 
      };
      const { data, site, showSidePanelComponent } = this.props;
      return <div id="searchListContainer" className="row">
        {_.map(data, (s, i) => {
          return (
            <div key={s.Site_id}>

              <div ref="dest" onClick={() => {
                this.setState({ show: !this.state.show + s.Site_id });

              }} className="border">
                <div
                  key={i}
                  onClick={this.onLocationClick.bind(this, s)}
                  className="searchlistbox searchlistborder"
                >
                  <i className='fas fa-map-marker-alt pull-left img-style'></i>
                  <b style={{ display: 'block', fontWeight: '500' }} className="text-primary text-normal">{s.site}</b>
                  <span className="addr-size" style={{ display: "flex" }}>{s.address}</span>
                </div>
              </div>
              <Overlay rootClose={false} show={this.state.show} trigger="click" placement="right">
                <div className="lbl">
                  <Popover id={"popover-positioned-right" + s.Site_id} className="sm">
                    <SiteDetail site={site} showSidePanelComponent={showSidePanelComponent} onClick={() => {
                      this.setState({ show: this.state.hide });
                    }} />
                  </Popover>
                </div>
              </Overlay>
            </div>
          )
        })}
      </div>;
    }
    if (app_state.user_profile.Role === "Admin" && app_state.user_profile.Type === "RegionManager") {
      const icons = {
        normal: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Location_arithmetic_vertical.svg/2000px-Location_arithmetic_vertical.svg.png",
        warning: "https://png.pngtree.com/svg/20170724/38501bfa9c.png",
        error: "https://png.pngtree.com/svg/20170126/aff1ebc38b.png",
      };
      const { data, site, showSidePanelComponent,regionsitedata } = this.props;     
      if(this.state.sites == ""){
        // debugger
        this.state.sites = regionsitedata
      }
      const { sites } = this.state
      // this.Change()
      
      return (        
        <div id="searchListContainer" className="row reg-searchListContainer">
          {this.getSearchBox()}
          <select className="form-control searchlistbox select-box" onChange={this.handleChange.bind(this)}>
            {/* <option>Select Region</option> */}
            {_.map(data, (s, i) => {
              return (
                <option value={s.Region_Id}>{s.RegionName}</option>
              )
            })}
          </select>
          <div>
            {sites.map((obj, i) => {
              // debugger
              return (
                obj.Sites.map((s, i) => {
                  return (
                    <div key={s.Site_id}>

                      <div ref="dest" onClick={() => {
                        this.setState({ show: !this.state.show + s.Site_id });

                      }} className="border">
                        <div
                          key={i}
                          onClick={this.onLocationClick.bind(this, s)}
                          className="searchlistbox searchlistborder"
                        >
                          <i className='fas fa-map-marker-alt pull-left img-style'></i>
                          <b style={{ display: 'block', fontWeight: '500' }} className="text-primary text-normal">{s.site}</b>
                          <span className="addr-size" style={{ display: "flex" }}>{s.address}</span>
                        </div>
                      </div>
                      <Overlay rootClose={false} show={this.state.show} trigger="click" placement="right">
                        <div className="lbl">
                          <Popover id={"popover-positioned-right" + s.Site_id} className="sm">
                            <SiteDetail site={site} showSidePanelComponent={showSidePanelComponent} onClick={() => {
                              this.setState({ show: this.state.hide });
                            }} />
                          </Popover>
                        </div>
                      </Overlay>
                    </div>
                  )
                })
              )
            }
            )}
          </div>
        </div>
      )
    }
    if (app_state.user_profile.Role === "View" && app_state.user_profile.Type === "SiteOwner") {
      const icons = {
        normal: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Location_arithmetic_vertical.svg/2000px-Location_arithmetic_vertical.svg.png",
        warning: "https://png.pngtree.com/svg/20170724/38501bfa9c.png", 
        error: "https://png.pngtree.com/svg/20170126/aff1ebc38b.png",
      };
      const { data, site, showSidePanelComponent } = this.props;
      if(this.state.siteOwner ==""){
      this.state.siteOwner = data
    }
    const { siteOwner } = this.state
      return (
      <div id="searchListContainer" className="row reg-searchListContainer">
        {this.getSearchBox()}
        <div>
          {Object.values(siteOwner).map((obj, i) => {
            return (
              obj.map((s, i) => {
                return (
                  <div key={s.Site_id}>
                    <div ref="dest" onClick={() => {
                      this.setState({ show: !this.state.show + s.Site_id });

                    }} className="border">
                      <div
                        key={i}
                        onClick={this.onLocationClick.bind(this, s)}
                        className="searchlistbox searchlistborder"
                      >
                        <i className='fas fa-map-marker-alt pull-left img-style'></i>
                        <b style={{ display: 'block', fontWeight: '500' }} className="text-primary text-normal">{s.site}</b>
                        <span className="addr-size" style={{ display: "flex" }}>{s.address}</span>
                      </div>
                    </div>
                    <Overlay rootClose={false} show={this.state.show} trigger="click" placement="right">
                      <div className="lbl">
                        <Popover id={"popover-positioned-right" + s.Site_id} className="sm">
                          <SiteDetail site={site} showSidePanelComponent={showSidePanelComponent} onClick={() => {
                            this.setState({ show: this.state.hide });
                          }} />
                        </Popover>
                      </div>
                    </Overlay>
                  </div>
                )
              })
            )
          })}

        </div>
      </div>
      )
    }
    // const icons = {
    //       normal: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Location_arithmetic_vertical.svg/2000px-Location_arithmetic_vertical.svg.png",
    //     warning:"https://png.pngtree.com/svg/20170724/38501bfa9c.png",
    //     error:"https://png.pngtree.com/svg/20170126/aff1ebc38b.png", 
    //   };

    // const {data, site, showSidePanelComponent } = this.props;

    //     return (

    //   <div id="searchListContainer" className="row">
    //       {_.map(data, (s, i) => {
    //         return (
    //           <div key={s.Site_id}>

    //             <div ref="dest" onClick={() => {
    //               this.setState({ show: !this.state.show + s.Site_id });

    //             }} className="border">
    //               <div
    //                 onClick={this.onLocationClick.bind(this, s)}
    //                 onMouseEnter={this.onLocationEnter.bind(this, s)}
    //                 onMouseLeave={this.onLocationLeave.bind(this, s)}
    //                 className="searchlistbox searchlistborder">
    //                 <i className='fas fa-map-marker-alt pull-left img-style'></i>
    //                 <strong style={{ display: 'block', fontWeight: '500' }} className="text-primary text-normal">{s.site}</strong>
    //                 <span className="addr-size" style={{ display: "flex" }}>{s.address}</span>
    //               </div>
    //             </div>
    //             <Overlay rootClose={false} show={this.state.show} trigger="click" placement="right">
    //               <div className="lbl">
    //                 <Popover id={"popover-positioned-right" + s.Site_id} className="sm">
    //                   <SiteDetail site={site} showSidePanelComponent={showSidePanelComponent} onClick={() => {
    //                     this.setState({ show: this.state.hide });
    //                   }} />
    //                 </Popover>
    //               </div>
    //             </Overlay>
    //           </div>
    //         )
    //       })}
    //     </div>

    //     )
  }
}

export default SearchListing;
