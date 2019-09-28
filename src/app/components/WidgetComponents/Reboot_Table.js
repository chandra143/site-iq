import React, { Component } from 'react';
import Pricevolume from '../charts/PriceVolume';
import { OverlayTrigger, Tooltip, Panel } from 'react-bootstrap';
import img from '../../../styles/img/exit.png';

class RebootTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rebootdata: props.rebootdata
        };
    }
    render() {
        const { rebootdata } = this.state
        // console.log(rebootdata)
        return (
            <div className="box box-default">
                <div className="box-header with-border">
                    <h4 style={{ display: "inline-block" }}>Reboot History</h4>

                    <div className="pull-right" style={{ margin: "10px 0 2px 0" }}>
                        <img src={img} className="image" />
                    </div>
                </div>

                <div className="box-body panel-alerts">
                    {rebootdata.map((key, i) => {
                        return (
                            <Panel key={i} className="Panel">
                                <Panel.Heading className="panel_heading">
                                    <Panel.Title toggle>
                                        <div className="panel-sections panel1">
                                            <h6 className="schema-th">Date</h6>
                                            <h4 className="schema-td panel-font">{key.Date}</h4>
                                        </div>
                                        <div className="panel-sections panel2">
                                            <h6 className="schema-th">Time</h6>
                                            <h4 className="schema-td panel-font" ref="schemaGroup">{key.Time}</h4>
                                        </div>
                                        <div className="panel-sections panel3">
                                            <h6 className="schema-th">User</h6>
                                            <h4 className="schema-td panel-font">{key.User}</h4>
                                        </div>
                                        <div className="panel-sections panel4">
                                            <h6 className="schema-th">Note</h6>
                                            <h4 className="schema-td panel-font">{key.Notes}</h4>
                                        </div>
                                    </Panel.Title>
                                </Panel.Heading>
                            </Panel>
                        )
                    }
                    )}
                </div>
            </div>
        )
    }
}


export default RebootTable;






