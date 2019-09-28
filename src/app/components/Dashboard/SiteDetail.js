import React, { Component } from 'react';
import ActivityFeed from './ActivityFeed';
import feedData from '../../../data/ErrorCodes.json';
import Img from '../../../styles/img/group165.png';
import Img2 from '../../../styles/img/Group 154.png';
import Img1 from '../../../styles/img/Group 151.png';
import Img3 from '../../../styles/img/Group 164.png';
import app_state from '../../app_state';

class SearchListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile: app_state.user_profile,
    };
  }
  onLocationClick = (d, e) => {
    this.props.onLocationClick(d);
  }
  hideSidePanelComponent() {
    this.setState({ showSidePanel: false });
  }
  render() {
    if (app_state.user_profile.Role === "Admin" && app_state.user_profile.Type === "SiteIQAdmin") {
      const icons = {
        warning:"https://unixtitan.net/images250_/vertical-line-clipart-2.png", /*blue*/
        error:"https://png.pngtree.com/svg/20170126/aff1ebc38b.png", /*orange*/
      }
      const { site, hide } = this.props;
      return (  
        <div className="pop-content">
          <div className="mb-10">
            <span><strong  className="text-primary text-size">{site.site}</strong></span>
            <span>
              <i onClick={this.props.onClick} className="fa fa-times st1"></i>
            </span>
          </div>
          <div id="searchDetailContainer" className="row">
            <div className="panel-group">
              <div className="panel panel-default">
                <div className="locationDetails">
                  <img src={Img2} className="pull-left" style={{ padding: "1px 10px 10px 0",width: "25px",height:"35 px" }} />
                  <span style={{ display: "flex" }} className="site-add">{site.address}</span>
                </div>
                <div className="contactno">
                <span><img src={Img1} style={{ height:"18px",fontSize:'12px' }}/> &ensp; 586 586 5869</span>
                </div>
            <div className="panel-group" id="accordion">
                <div className="alert-group"></div>
                <div id="collapseOne" className="panel-collapse collapse in">
                  <div className="panel-body">
                  <h4 className="panel-title">
                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne">Technician</a>
                  </h4>
                    <span className="dp"><strong className="text-primary"><img src={Img1} style={{ height:"18px" }}/> &ensp;</strong> 555 555 5555</span>
                  </div>
                </div>
                <div className="alert-group"></div>
                {/* <Link to={'#/station/' + site.site + '/' + site.Site_id} className="link-station-details"><span className="view-site"><img src={Img} alt="" width="8%" /></span><span className="view-site-dashboard">View site dashboard</span></Link> */}
                <a href={'#/station/' + site.site + '/' + site.Site_id} className="link-station-details"><span className="view-site"><img src={Img} alt="" width="8%" /></span><span className="view-site-dashboard">View site dashboard</span></a>
  
                <div id="collapseTwo" className="panel-collapse collapse in">
                  <div className="panel-body">
                  <h4 className="panel-title">
                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo"><span className="img-pad"><img src={Img3} style={{height: "15px"}}/></span>Recent Alerts</a>
                  </h4>
                    <ActivityFeed siteData={site} showSidePanelComponent={this.props.showSidePanelComponent} data={feedData.slice(0, 10)} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      )
    }
    if (app_state.user_profile.Role === "Admin" && app_state.user_profile.Type === "RegionManager") {
      const icons = {
        warning:"https://unixtitan.net/images250_/vertical-line-clipart-2.png", /*blue*/
        error:"https://png.pngtree.com/svg/20170126/aff1ebc38b.png", /*orange*/
      };
      const { site, hide } = this.props;
      return (
  
        <div className="pop-content">
          <div className="mb-10">
            <span><strong  className="text-primary text-size">{site.site}</strong></span>
            <span>
              <i onClick={this.props.onClick} className="fa fa-times st1"></i>
            </span>
          </div>
          <div id="searchDetailContainer" className="row">
            <div className="panel-group">
              <div className="panel panel-default">
                <div className="locationDetails">
                  <img src={Img2} className="pull-left" style={{ padding: "1px 10px 10px 0",width: "25px",height:"35 px" }} />
                  <span style={{ display: "flex" }} className="site-add">{site.address}</span>
                </div>
                <div className="contactno">
                <span><img src={Img1} style={{ height:"18px",fontSize:'12px' }}/> &ensp; 586 586 5869</span>
                </div>
            <div className="panel-group" id="accordion">
                <div className="alert-group"></div>
                <div id="collapseOne" className="panel-collapse collapse in">
                  <div className="panel-body">
                  <h4 className="panel-title">
                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne">Technician</a>
                  </h4>
                    <span className="dp"><strong className="text-primary"><img src={Img1} style={{ height:"18px" }}/> &ensp;</strong> 555 555 5555</span>
                  </div>
                </div>
                <div className="alert-group"></div>
                <a href={'#/station/' + site.site + '/' + site.Site_id} className="link-station-details"><span className="view-site"><img src={Img} alt="" width="8%" /></span><span className="view-site-dashboard">View site dashboard</span></a>
  
                <div id="collapseTwo" className="panel-collapse collapse in">
                  <div className="panel-body">
                  <h4 className="panel-title">
                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo"><span className="img-pad"><img src={Img3} style={{height: "15px"}}/></span>Recent Alerts</a>
                  </h4>
                    <ActivityFeed siteData={site} showSidePanelComponent={this.props.showSidePanelComponent} data={feedData.slice(0, 10)} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      )
    }
    if (app_state.user_profile.Role === "View" && app_state.user_profile.Type === "SiteOwner") {
      const icons = {
        warning:"https://unixtitan.net/images250_/vertical-line-clipart-2.png", /*blue*/
        error:"https://png.pngtree.com/svg/20170126/aff1ebc38b.png", /*orange*/
      };
      const { site, hide } = this.props;
      return (
  
        <div className="pop-content">
          <div className="mb-10">
            <span><strong  className="text-primary text-size">{site.site}</strong></span>
            <span>
              <i onClick={this.props.onClick} className="fa fa-times st1"></i>
            </span>
          </div>
          <div id="searchDetailContainer" className="row">
            <div className="panel-group">
              <div className="panel panel-default">
                <div className="locationDetails">
                  <img src={Img2} className="pull-left" style={{ padding: "1px 10px 10px 0",width: "25px",height:"35 px" }} />
                  <span style={{ display: "flex" }} className="site-add">{site.address}</span>
                </div>
                <div className="contactno">
                <span><img src={Img1} style={{ height:"18px",fontSize:'12px' }}/> &ensp; 586 586 5869</span>
                </div>
            <div className="panel-group" id="accordion">
                <div className="alert-group"></div>
                <div id="collapseOne" className="panel-collapse collapse in">
                  <div className="panel-body">
                  <h4 className="panel-title">
                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne">Technician</a>
                  </h4>
                    <span className="dp"><strong className="text-primary"><img src={Img1} style={{ height:"18px" }}/> &ensp;</strong> 555 555 5555</span>
                  </div>
                </div>
                <div className="alert-group"></div>
                <a href={'#/station/' + site.site + '/' + site.Site_id} className="link-station-details"><span className="view-site"><img src={Img} alt="" width="8%" /></span><span className="view-site-dashboard">View site dashboard</span></a>
  
                <div id="collapseTwo" className="panel-collapse collapse in">
                  <div className="panel-body">
                  <h4 className="panel-title">
                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo"><span className="img-pad"><img src={Img3} style={{height: "15px"}}/></span>Recent Alerts</a>
                  </h4>
                    <ActivityFeed siteData={site} showSidePanelComponent={this.props.showSidePanelComponent} data={feedData.slice(0, 10)} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      )
    }
    
  }
}

export default SearchListing;
