import React, { Component } from 'react';
import { OverlayTrigger, Tooltip, Panel } from 'react-bootstrap';


class AssetsData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assetsdata: props.assetsdata
        };
    }

    render() {
        const { assetsdata } = this.state
        // console.log(assetsdata)
        return (


            <div className="box box-default">
                <div className="box-header with-border">
                    <h4 style={{ display: "inline-block" }}>Assets Data</h4>
                </div>

                <div className="box-body panel-alerts">
                    {assetsdata.map((key, i) => {
                        return (
                            <div key={i}>
                                <div className="row">
                                    <div className="col-md-5"><b>Pump Model</b></div>
                                    <div className="col-md-1">:</div>
                                    <div className="col-md-5">{key.pump_type}</div>
                                </div>
                                <div className="row">
                                    <div className="col-md-5"><b>software Version</b></div>
                                    <div className="col-md-1">:</div>
                                    <div className="col-md-5">{key.app_software_version}</div>
                                </div>
                                <div className="row">
                                    <div className="col-md-5"><b>Boot Version</b></div>
                                    <div className="col-md-1">:</div>
                                    <div className="col-md-5">{key.boot_version}</div>
                                </div>
                                <div className="row">
                                    <div className="col-md-5"><b>Door Node Version</b></div>
                                    <div className="col-md-1">:</div>
                                    <div className="col-md-5">{key.door_node_b}</div>
                                </div>
                                <div className="row">
                                    <div className="col-md-5"><b>Pulser Type</b></div>
                                    <div className="col-md-1">:</div>
                                    <div className="col-md-5">{key.preset_type}</div>
                                </div>
                                <div className="row">
                                    <div className="col-md-5"><b>Value Type</b></div>
                                    <div className="col-md-1">:</div>
                                    <div className="col-md-5">{key.unit_type}</div>
                                </div>
                            </div>
                        )
                    }
                    )}
                </div>
            </div>
        )
    }
}


export default AssetsData; 