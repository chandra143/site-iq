import React, { Component } from 'react';
import img from '../../../styles/img/exit.png';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

class Reboot extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h4>Reboot
                            <span className="pull-right">
                            <OverlayTrigger placement="left" overlay={<Tooltip id="line-tip">Reboot</Tooltip>}>
                                <i className="fa fa-info-circle" aria-describedby="line-tip"></i>
                            </OverlayTrigger>
                        </span>
                    </h4>
                </div>
                <div className="panel-body">
                    <div className="text-center">
                        <img src={img} style={{ width: '64px' }} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Reboot;
