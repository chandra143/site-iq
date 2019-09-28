import React, { Component } from 'react';
import { Link } from 'react-router';
import Site from '../Site';
import { Badge, DropdownButton, MenuItem, Button, FormGroup, InputGroup, FormControl, Checkbox } from 'react-bootstrap';
import Device from '../../../data/deviceInstallation.json';

class DeviceInstallation extends Component {
    constructor() {
        super();
        this.state = {
            Device: Device
        };
    }


    getDeviceInstallationData() {
        const { Device } = this.state
        return (
            <table className="table table-bordered table-striped">
                <thead className="thead-light">
                    <tr>
                        <th column="SiteName">SiteName</th>
                        <th column="DeviceID">Device ID</th>
                        <th column="PumpNO">Pump NO</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {Device.map((obj, i) => {
                        return (
                            <tr key={i}>
                                <td>{obj.site_name}</td>
                                <td>{obj.device_id}</td>
                                <td>{obj.pump_number}</td>
                                <td><a className="pointer-arrow">Edit</a></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }

    render() {
        return (
            <Site pageTitle="Device Installation">
                <div className="col-md-12">
                    <div className="box">
                        <div className="box-body">
                            <div className="col-md-12">
                                <div className="dropdown mr">
                                    <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                        Select
                                 <span className="caret"></span>
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu4">
                                        <li><a>site-1-Dunseith</a></li>
                                        <li><a>site-2-Mylo</a></li>
                                        <li><a>site-3-Antler</a></li>
                                        <li><a>site-4-Bottineanu</a></li>
                                        <li><a>site-5-Gardena</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-12">
                                {this.getDeviceInstallationData()}
                            </div>
                        </div>
                    </div>
                </div>
            </Site>
        )
    }
}

export default DeviceInstallation;