import React, { Component } from 'react';
import { Link } from 'react-router';
import { Panel } from 'react-bootstrap';
import Select from 'react-select';
import { hashHistory } from 'react-router';
import d3 from 'd3';
import Img from '../../../styles/img/group165.png'

const getMarkerIcon = function (obj) {
  const markerWidth = 25, truckWidth = 20;
  const markerObj = {
    width: obj.technician ? markerWidth + truckWidth : markerWidth,
    height: 30
  };

  const tempContainer = d3.select(document.createElement('div'));

  const svg = tempContainer.append('svg')
    .attr({
      xmlns: "http://www.w3.org/2000/svg",
      version: "1.1",
      x: "0px",
      y: "0px",
      'enable-background': "new 0 0 82.93 100",
      width: markerObj.width,
      height: markerObj.height
    });

  svg.append('path')
    .attr({
      d: 'M 13 0.1875 C 8.6875 0.1875 5.1875 3.6875 5.1875 8 C 5.1875 12.3125 12 20.011719 12 25.8125 L 14 25.8125 C 14 20.027344 20.8125 11.964844 20.8125 8 C 20.8125 3.6875 17.3125 0.1875 13 0.1875 Z M 13 11.203125 C 11.230469 11.203125 9.796875 9.765625 9.796875 8 C 9.796875 6.234375 11.230469 4.796875 13 4.796875 C 14.769531 4.796875 16.203125 6.230469 16.203125 8 C 16.203125 9.769531 14.769531 11.203125 13 11.203125 Z ',
      fill: '#' + obj.color
    });

  markerObj.marker = 'data:image/svg+xml;charset=UTF-8;base64,' + btoa(tempContainer.html());
  return markerObj;
};

const getTechnicianIcon = () => {
  const markerObj = {
    width: 20,
    height: 30
  };

  const tempContainer = d3.select(document.createElement('div'));

  const svg = tempContainer.append('svg')
    .attr({
      xmlns: "http://www.w3.org/2000/svg",
      version: "1.1",
      x: "0px",
      y: "0px",
      viewBox: "0 0 512.946 512.946",
      width: markerObj.width,
      height: markerObj.height
    });

  svg.html(`
    <g transform="translate(1 1)">
      <path style="fill:#FECC00;" d="M311.485,81.914c0,19.092-11.281,34.712-26.034,34.712c-14.753,0-26.034-15.62-26.034-34.712   s11.281-34.712,26.034-34.712C300.204,47.202,311.485,62.822,311.485,81.914"/>
      <path style="fill:#FFA800;" d="M294.129,47.202c-1.736,0-3.471,0-5.207,0.868c13.017,1.736,22.563,16.488,22.563,33.844   s-9.546,32.108-22.563,33.844c1.736,0.868,3.471,0.868,5.207,0.868c19.092,0,34.712-15.62,34.712-34.712   S313.221,47.202,294.129,47.202"/>
      <path style="fill:#FECC00;" d="M233.383,324.897H120.57l32.976-79.837c6.075-14.753,11.281-24.298,27.77-24.298   s13.017,9.546,19.092,24.298L233.383,324.897z"/>
      <path style="fill:#FFA800;" d="M226.441,245.059c-6.075-14.753-20.827-24.298-36.447-24.298c-1.736,0-3.471,0-6.075,0   c10.414,1.736,8.678,10.414,13.885,23.431l32.976,79.837h28.637L226.441,245.059z"/>
      <g>
        <path style="fill:#FECC00;" d="M191.729,220.761c13.017,0,25.166,6.942,32.108,17.356L297.6,116.626c-1.736,0-2.603,0-4.339,0    c-18.224,0-32.976-13.885-34.712-31.241L173.505,225.1C179.58,222.497,185.655,220.761,191.729,220.761"/>
        <path style="fill:#FECC00;" d="M111.892,160.015H90.197c-13.017,0-24.298-7.81-27.769-19.959L33.79,55.88h104.136v78.102    C137.926,148.734,126.644,160.015,111.892,160.015"/>
      </g>
      <path style="fill:#FFFFFF;" d="M61.56,140.056L33.79,55.88H7.756l27.769,84.176c4.339,12.149,15.62,19.959,28.637,19.959h26.034   C77.18,160.015,65.899,152.205,61.56,140.056"/>
      <path style="fill:#FECC00;" d="M271.566,55.88H137.926v34.712h122.359c0-2.603-0.868-6.075-0.868-8.678   C259.417,71.5,263.756,61.954,271.566,55.88"/>
      <path style="fill:#FFE100;" d="M471.16,258.076l-75.498-83.308c-3.471-3.471,16.488-6.075,11.281-6.075h-79.837   c-8.678,0-15.62,6.942-15.62,15.62v140.583H51.146v74.63c0,6.942,5.207,12.149,12.149,12.149H77.18   c0-28.637-2.603-52.068,26.034-52.068s52.068,23.431,52.068,52.068h156.203h43.39c0-28.637,23.431-52.068,52.068-52.068   s43.39,23.431,43.39,52.068h13.885c6.942,0,12.149-5.207,12.149-12.149V271.961C476.366,266.754,474.631,262.415,471.16,258.076"/>
      <path style="fill:#FFFFFF;" d="M51.146,399.527v-74.63H25.112v74.63c0,6.942,5.207,12.149,12.149,12.149h13.885   c0-2.603,0-5.207,0.868-8.678C51.146,402.131,51.146,400.395,51.146,399.527"/>
      <path style="fill:#FFA800;" d="M497.194,258.076l-75.498-83.308c-3.471-4.339-8.678-6.075-13.885-6.942   c0,0.868-15.62,2.603-12.149,6.942l75.498,83.308c3.471,3.471,5.207,8.678,5.207,13.885v127.566   c0,6.942-5.207,12.149-12.149,12.149h26.034c6.942,0,12.149-5.207,12.149-12.149V271.961   C502.4,266.754,500.665,261.548,497.194,258.076"/>
      <path style="fill:#63D3FD;" d="M395.661,175.636c-3.471-4.339-9.546-6.942-14.753-6.942h-19.092c-3.471,0-6.075,2.603-6.075,6.075   v91.986c0,3.471,2.603,6.075,6.075,6.075h114.549v-0.868c0-5.207-1.736-9.546-5.207-13.885L395.661,175.636z"/>
      <path style="fill:#3DB9F9;" d="M497.194,258.076l-75.498-83.308c-3.471-3.471-9.546-6.075-14.753-6.075h-26.034   c6.075,0,11.281,2.603,14.753,6.942l75.498,83.309c3.471,3.471,5.207,8.678,5.207,13.885l0,0H502.4v-0.868   C502.4,266.754,500.665,262.415,497.194,258.076"/>
      <path style="fill:#FECC00;" d="M432.977,411.676c0,28.637-17.356,52.068-39.051,52.068s-39.051-23.431-39.051-52.068   s17.356-52.068,39.051-52.068S432.977,383.039,432.977,411.676"/>
      <path style="fill:#FFA800;" d="M406.943,359.609c-2.603,0-5.207,0-7.81,0.868c19.092,3.471,33.844,25.166,33.844,51.2   s-14.753,47.729-33.844,51.2c2.603,0,5.207,0.868,7.81,0.868c28.637,0,52.068-23.431,52.068-52.068S435.58,359.609,406.943,359.609   "/>
      <path style="fill:#FECC00;" d="M129.248,411.676c0,28.637-17.356,52.068-39.051,52.068s-39.051-23.431-39.051-52.068   s17.356-52.068,39.051-52.068S129.248,383.039,129.248,411.676"/>
      <path style="fill:#FFA800;" d="M103.214,359.609c-2.603,0-5.207,0-7.81,0.868c19.092,3.471,33.844,25.166,33.844,51.2   s-14.753,47.729-33.844,51.2c2.603,0,5.207,0.868,7.81,0.868c28.637,0,52.068-23.431,52.068-52.068   S131.851,359.609,103.214,359.609"/>
      <path d="M294.129,125.304c-24.298,0-43.39-19.092-43.39-43.39s19.092-43.39,43.39-43.39c24.298,0,43.39,19.092,43.39,43.39   S318.427,125.304,294.129,125.304z M294.129,55.88c-14.753,0-26.034,11.281-26.034,26.034s11.281,26.034,26.034,26.034   c14.753,0,26.034-11.281,26.034-26.034S308.882,55.88,294.129,55.88z"/>
      <path d="M406.943,472.422c-33.844,0-60.746-26.902-60.746-60.746s26.902-60.746,60.746-60.746s60.746,26.902,60.746,60.746   S440.787,472.422,406.943,472.422z M406.943,368.287c-24.298,0-43.39,19.092-43.39,43.39s19.092,43.39,43.39,43.39   s43.39-19.092,43.39-43.39S431.241,368.287,406.943,368.287z"/>
      <path d="M103.214,472.422c-33.844,0-60.746-26.902-60.746-60.746s26.902-60.746,60.746-60.746s60.746,26.902,60.746,60.746   S137.058,472.422,103.214,472.422z M103.214,368.287c-24.298,0-43.39,19.092-43.39,43.39s19.092,43.39,43.39,43.39   s43.39-19.092,43.39-43.39S127.512,368.287,103.214,368.287z"/>
      <path d="M502.4,324.897h-52.068c-5.207,0-8.678-3.471-8.678-8.678c0-5.207,3.471-8.678,8.678-8.678H502.4   c5.207,0,8.678,3.471,8.678,8.678C511.078,321.426,507.607,324.897,502.4,324.897z"/>
      <path d="M490.251,420.354h-39.919v-8.678c0-24.298-19.092-43.39-43.39-43.39s-43.39,19.092-43.39,43.39v8.678H146.604v-8.678   c0-24.298-19.092-43.39-43.39-43.39s-43.39,19.092-43.39,43.39v8.678H37.261c-11.281,0-20.827-9.546-20.827-20.827v-83.308h286.373   V183.446c0-13.017,10.414-24.298,24.298-24.298h79.837c7.81,0,15.62,3.471,21.695,9.546l75.498,83.308   c5.207,5.207,7.81,12.149,7.81,19.959v127.566C511.078,410.809,501.533,420.354,490.251,420.354z M466.821,402.998h23.431   c1.736,0,3.471-1.736,3.471-3.471V271.961c0-2.603-0.868-6.075-3.471-7.81l-74.631-83.308c-2.603-2.603-5.207-3.471-8.678-3.471   h-79.837c-3.471,0-6.942,2.603-6.942,6.942v149.261H33.79v65.953c0,1.736,1.736,3.471,3.471,3.471h6.075   c4.339-29.505,29.505-52.068,59.878-52.068s55.539,22.563,59.878,52.068h183.105c4.339-29.505,29.505-52.068,59.878-52.068   C436.448,350.931,462.482,373.493,466.821,402.998z"/>
      <path d="M120.57,411.676c0,9.546-7.81,17.356-17.356,17.356s-17.356-7.81-17.356-17.356s7.81-17.356,17.356-17.356   S120.57,402.131,120.57,411.676"/>
      <path d="M424.299,411.676c0,9.546-7.81,17.356-17.356,17.356s-17.356-7.81-17.356-17.356s7.81-17.356,17.356-17.356   S424.299,402.131,424.299,411.676"/>
      <path d="M502.4,281.507H360.949c-7.81,0-14.753-6.942-14.753-14.753v-91.986c0-7.81,6.942-14.753,14.753-14.753h45.993   c7.81,0,15.62,3.471,21.695,9.546l75.498,83.308c5.207,5.207,7.81,12.149,7.81,19.959v8.678H502.4z M363.553,264.151h126.698   l-74.63-83.308c-2.603-2.603-5.207-3.471-8.678-3.471h-43.39V264.151z"/>
      <path d="M274.17,333.575H109.288l38.183-91.986c7.81-18.224,25.166-29.505,44.258-29.505s36.447,11.281,44.258,29.505   L274.17,333.575z M135.322,316.219h112.814l-28.637-67.688c-4.339-11.281-15.62-19.092-27.769-19.092   c-12.149,0-23.431,6.942-27.77,19.092L135.322,316.219z"/>
      <path d="M200.407,264.151c0,5.207-3.471,8.678-8.678,8.678c-5.207,0-8.678-3.471-8.678-8.678s3.471-8.678,8.678-8.678   C196.936,255.473,200.407,258.944,200.407,264.151"/>
      <path d="M223.838,246.795c-2.603,0-5.207-1.736-6.942-3.471c-8.678-12.149-25.166-16.488-38.183-10.414   c-3.471,1.736-7.81,0.868-10.414-1.736c-2.603-2.603-3.471-6.942-0.868-10.414l85.044-139.715c1.736-3.471,6.075-5.207,9.546-4.339   c3.471,0.868,6.075,3.471,6.075,7.81c1.736,13.017,13.017,23.431,26.034,23.431c0.868,0,0.868,0,1.736,0h1.736   c3.471,0,6.075,0.868,8.678,4.339c1.736,2.603,1.736,6.075,0,9.546l-73.763,121.492   C229.912,245.059,227.309,246.795,223.838,246.795L223.838,246.795z M192.597,212.083c11.281,0,21.695,4.339,30.373,11.281   l60.746-99.797c-10.414-2.603-19.959-9.546-26.034-19.092L192.597,212.083z"/>
      <path d="M111.892,168.693H64.163c-16.488,0-31.241-10.414-36.447-26.034L-0.054,58.483c-1.736-2.603-0.868-5.207,0.868-7.81   c1.736-1.736,4.339-3.471,6.942-3.471h130.169c5.207,0,8.678,3.471,8.678,8.678v78.102   C146.604,153.073,130.983,168.693,111.892,168.693z M19.905,64.558l24.298,72.027c2.603,8.678,11.281,14.753,19.959,14.753h47.729   c9.546,0,17.356-7.81,17.356-17.356V64.558H19.905z"/>
      <path d="M260.285,99.27H137.926c-5.207,0-8.678-3.471-8.678-8.678V55.88c0-5.207,3.471-8.678,8.678-8.678h133.641   c3.471,0,6.942,2.603,7.81,5.207s0,6.942-2.603,9.546c-6.075,5.207-8.678,12.149-8.678,19.092c0,1.736,0,4.339,0.868,6.075   c0.868,2.603,0,5.207-1.736,7.81C265.492,97.534,263.756,99.27,260.285,99.27z M146.604,81.914h104.136   c0-6.075,0.868-12.149,3.471-17.356H146.604V81.914z"/>
      <rect x="25.112" y="99.27" width="112.814" height="17.356"/>
    </g>`);

  markerObj.marker = 'data:image/svg+xml;charset=UTF-8;base64,' + btoa(tempContainer.html());
  return markerObj;
};

class GMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: '',
    };
    this.siteMarkers = {};
    this.techMarkers = {};
    this.infowindow = null;
  }
  componentWillReceiveProps(newProps) {
    const { data } = this.props;
    if (newProps.data != data) {
      this.removeMarkers();
    }
  }
  componentDidUpdate() {
    if (_.isEmpty(this.siteMarkers)) {
      this.addMarkers();
    }
  }
  componentDidMount() {
    this.initMap();
    this.addMarkers();
  }
  bounceMarker(site) {
    const marker = this.siteMarkers[site.site];
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(() => {
      marker.setAnimation(null);
    }, 400);
  }
  stopBounceMarker(site) {
    const marker = this.siteMarkers[site.site];
    marker.setAnimation(null);
  }
  removeMarkers = () => {
    _.each(this.siteMarkers, (m, k) => {
      m.setMap(null);
      delete this.siteMarkers[k];

      const techMarker = this.techMarkers[k];
      if (techMarker) {
        techMarker.setMap(null);
        delete this.techMarkers[k];
      }
    });
  }
  addMarkers = () => {
    const siteData = this.props.data;
    _.each(siteData, (s) => {
      this.geocodeAddress(s);
    });
  }
  initMap() {
    var myLatlng = { lat: 48.9708532, lng: -101.2823803 };

    var map = this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: myLatlng
    });
  }


  addCluster() {
    const markers = _.map(this.siteMarkers, (marker) => {
      return marker;
    });
    this.markerCluster = new MarkerClusterer(this.map, markers,
      { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
  }
  removeCluster() {
    const markers = _.map(this.siteMarkers, (marker) => {
      return marker;
    });
    if (this.markerCluster) {
      this.markerCluster.removeMarkers(markers);
    }
  }
  geocodeAddress(loc) {
    let color = 'white';
    if (loc.status == 'normal') {
      // color = '5cb85c';
      color = '0000ff';
    } else if (loc.status == 'warning') {
      // color = 'f0ad4e';
      color = '0000ff';
    } else {
      color = '	#FF4500';
      // color = 'd9534f';
    }
    if (loc.site.indexOf('5-') > -1 || loc.site.indexOf('2-') > -1 || loc.site.indexOf('7-') > -1) {
      this.addTechnician(loc);
    }
    const markerObj = {
      color: color
    };
    const icon = getMarkerIcon(markerObj);
    var image = {
      // url: this.getMarker([{color: 'orange'}, {color: 'red'}]),
      url: icon.marker,
      // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(icon.width, icon.height),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new google.maps.Point(0, icon.height)
    };
    var marker = new google.maps.Marker({
      map: this.map,
      icon: image,
      position: { lat: Number(loc.lat), lng: Number(loc.lng) }
    });
    marker.addListener('mouseover', () => {
      // this.infoWindoHandler(loc, marker, technician);
    });
    marker.addListener('click', function (loc) {
      // hashHistory.push('/station/'+loc.site+'/dashboard');
      this.infoWindoHandler(loc, marker);
      this.props.onMarkerClick(loc);
    }.bind(this, loc));
    marker.addListener('mouseout', () => {
      // this.infowindow.close();
    });
    this.siteMarkers[loc.site] = marker;
  }

  addTechnician(loc) {
    let technician;

    const markerObj = {
    };

    const icon = getTechnicianIcon(markerObj);
    var image = {
      // url: this.getMarker([{color: 'orange'}, {color: 'red'}]),
      url: icon.marker,
      // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(icon.width, icon.height),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new google.maps.Point(0, icon.height)
    };
    var marker = new google.maps.Marker({
      map: this.map,
      icon: image,
      position: { lat: Number(loc.lat), lng: Number(loc.lng) + 0.12 }
    });
    marker.addListener('mouseover', () => {
      // this.infoWindoHandler(loc, marker, technician);
    });
    marker.addListener('click', function (loc) {
      // hashHistory.push('/station/'+loc.site+'/dashboard');
      this.technicianInfoWindoHandler(loc, marker, technician);
      // this.props.onMarkerClick(loc);
    }.bind(this, loc));
    marker.addListener('mouseout', () => {
      // this.infowindow.close();
    });
    this.techMarkers[loc.site] = marker;
  }

  panToMarker(siteObj) {
    const marker = this.siteMarkers[siteObj.site];
    this.map.panTo(marker.getPosition());
    this.infoWindoHandler(siteObj, marker);
    // this.map.setZoom(10);
  }

  infoWindoHandler(siteObj, marker, technician) {
    if (this.infowindow) {
      this.infowindow.close();
    }
    // <img src=${Img} />
    // const content = `<h4><a href="#/station/${siteObj.site}/${siteObj.Site_id}">${siteObj.site}</a></h4><span>
   
    // ${siteObj.address}</span>`;
    const content = `<h4><a href="#/station/${siteObj.site}/${siteObj.Site_id}">${siteObj.site}</a></h4><span>
    ${siteObj.address}</span><br/>
    
    <img src="${Img}"/>
    <a href="#/station/${siteObj.site}/${siteObj.Site_id}"
     class="link-station-details popup-btn"><span class="view-site"><img src=${Img} alt="" width="8%" /></span>
    
     <span class="view-site-dashboard ">View site dashboard</span></a>`;
    this.infowindow = new google.maps.InfoWindow({
      content: content
    });
    this.infowindow.open(this.map, marker);
  }

  technicianInfoWindoHandler(siteObj, marker, technician) {
    if (this.infowindow) {
      this.infowindow.close();
    }
    const techDet = `<h4><p><i className="fa fa-user" aria-hidden="true"></i> Steve Rogers</p></h4>
      <p><i className="fa fa-phone" aria-hidden="true"></i> 666 666 6666 <i className="fa fa-envelope" aria-hidden="true"></i> steve.rogers@test.com</p>
      <hr></hr>
      <p style="text-decoration: underline">Today's Schedule :</p>
      <p>
          09:00am - 10:00am - <a href="#/workorder/111/edit"> Work Order #111 </a>
      </p>
      <p>
          11:00am - 12:00pm - <a href="#/workorder/112/edit"> Work Order #112 </a>
      </p>`;
    this.infowindow = new google.maps.InfoWindow({
      content: `${techDet}`
    });
    this.infowindow.open(this.map, marker);
  }

  handleChange = (selectedOption) => {
    if (selectedOption) {
      this.panToMarker(selectedOption);
    }
    this.setState({ selectedOption });
  }

  render() {
    const { selectedOption } = this.state;
    const value = selectedOption;
    return (
      <div id="map">MAP</div>
    );
  }
}

export default GMap;
