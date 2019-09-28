import React, { Component } from 'react';
import FlowRate from '../charts/FlowRate';
import MeaterValue from '../charts/MeaterValue';
import OverRun from '../charts/OverRun';
import UnderRun from '../charts/UnderRun'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

class CustomerExperience extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerdata: props.customerdata
        };
    }
    render() {
        const { customerdata } = this.state
        // console.log(customerdata)
        return (

            <div>
                {customerdata.map((key, i) => {
                    return (
                        <div>
                            <div className="row">
                                <div className="col-sm-6 col-xxxl-6">
                                    <FlowRate flowdata={key.Flow_Rate} />
                                </div>
                                <div className="col-sm-6 col-xxxl-6">
                                    <MeaterValue meaterdata={key.Meter_Value} />
                                </div>

                                <div className="col-sm-6 col-xxxl-6">
                                    <OverRun overrundata={key.Over_Run} />
                                </div>
                                <div className="col-sm-6 col-xxxl-6">
                                    <UnderRun underrundata={key.Under_Run} />
                                </div>
                            </div>
                        </div>
                    )

                })}
            </div>

        )
    }
}


export default CustomerExperience; 