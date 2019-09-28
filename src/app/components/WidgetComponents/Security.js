import React, { Component } from 'react';
import { OverlayTrigger, Tooltip, Panel } from 'react-bootstrap';

class System extends Component {
    constructor(props) {
        super(props);
        this.state = {
            securitydata: props.securitydata
        };
    }

    render() {
        const { securitydata } = this.state
        // console.log(securitydata)
        return (

            <div className="box box-default">
                <div className="box-header with-border">
                    <h4 style={{ display: "inline-block" }}>Security</h4>
                </div>
                {securitydata.length > 0 ? securitydata.map((key, i) => {
                    return (
                        <div>
                            <div className="box-body panel-alerts">
                                <h5 className="element-header h1color h5">Door Alarms</h5>
                                {key.Door_Alarms.map((key, i) => {
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

                            <div className="box-body panel-alerts">
                                <h5 className="element-header h1color h5">Stand Alone Alarms</h5>
                                {key.Stand_Alone_Alarm.map((key, i) => {
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
                }) : null}

            </div>
        )
    }
}




export default System;