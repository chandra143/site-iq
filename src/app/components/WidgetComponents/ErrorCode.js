import React, { Component } from 'react';
import ErrorCodeMode from '../Modal/ErrorcodeModel';
import moment from 'moment';
import { OverlayTrigger, Tooltip, Panel } from 'react-bootstrap';

class ErrorCode extends Component {
    constructor(props) {
        super(props);
        this.showSidePanelComponent = this.showSidePanelComponent.bind(this);
        this.hideSidePanelComponent = this.hideSidePanelComponent.bind(this);
        this.state = {
            showSidePanel: false,
            errorcode: props.errorcode
        };
    }

    showSidePanelComponent() {
        this.setState({ showSidePanel: true });
    }
    hideSidePanelComponent() {
        this.setState({ showSidePanel: false });
    }

    getErrorCodeData() {
        const { showSidePanel } = this.state
        return (
            <ErrorCodeMode show={showSidePanel} closeButton={this.hideSidePanelComponent} bsSize="large" />
        )
    }

    getErrorClass(level) {
        // debugger
        let classname = '';
        switch (level) {
            case "low":
                classname = "level-low";
                break;
            case "Normal":
                classname = "level-Normal";
                break;
            case "Critical":
                classname = "level-Critical";
                break;
        }
        return classname;
    }


    render() {
        const { errorcode } = this.state;
        // debugger
        return (

            <div className="box box-default">
                <div className="box-header with-border">
                    <h4 style={{ display: "inline-block" }}>ErrorCode</h4>

                    <div className="pull-right" style={{ margin: "10px 0 2px 0" }}>
                        <OverlayTrigger placement="top" overlay={<Tooltip id="line-tip">Show all alerts</Tooltip>}>
                            <a><i className="fa fa-external-link"></i></a>
                        </OverlayTrigger>
                    </div>
                </div>

                <div className="box-body panel-alerts">
                    {errorcode.map((key, i) => {
                        // debugger;
                        return (
                            <Panel key={i} className="Panel">
                                <Panel.Heading className="panel_heading">
                                    <Panel.Title toggle>
                                        <div className="panel-sections">
                                            <h6 className="schema-th">Error Code</h6>
                                            <h4 className="schema-td panel-font">{key.code}</h4>
                                        </div>
                                        <div className="panel-sections">
                                            <h6 className="schema-th panel2">Timestamp</h6>
                                            <h4 className="schema-td panel-font" ref="schemaGroup">{key.TimeStamp}</h4>
                                        </div>
                                        <div className="panel-sections panel4">
                                            <h6 className="schema-th">Note</h6>
                                            <h4 className="schema-td panel-font">{key.description}</h4>
                                        </div>
                                        <div className="panel-sections panel3">
                                            <h6 className="schema-th">Status</h6>
                                            <h4 className="schema-td panel-font">{key.level}</h4>
                                        </div>
                                    </Panel.Title>
                                </Panel.Heading>

                                <Panel.Collapse>
                                    <Panel.Body style={{ backgroundColor: "#fbfbfb", padding: "25px", color: "#8a8a8a" }}>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div className="row" style={{ marginBottom: "15px" }}>
                                                    <h6 className="schema-th" style={{ marginBottom: "10px" }}><strong>Pump Information:</strong></h6>
                                                    <p>
                                                        <strong>Pump Model:</strong> E500 PUMP LON NODE VERSION <br />
                                                        <strong>Software Version:</strong> P03040 (03.0.40P) <br />
                                                        <strong>Pump Boot Version:</strong> 10305 (V10.3.05)
                                        </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Panel.Body>
                                </Panel.Collapse>
                            </Panel>
                        )
                    }
                    )}
                </div>
            </div>
        )
    }
}


export default ErrorCode; 