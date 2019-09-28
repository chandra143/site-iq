import React, { Component } from 'react';
import Pricevolume from '../charts/PriceVolume';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

class PriceVolume extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pricechart: props.pricechart
        };
    }


    render() {
        const { pricechart } = this.state
        const data = pricechart.map((key, i) => {
            return <Pricevolume key={i} pricedata={key} />
        })
        // console.log(data)
        return (
        <div className="row">
            <div className="col-sm-6 col-xxxl-6">
                <div className="element-wrapper">
                    <div className="box-body">
                    {data}
                    </div>
                </div>
            </div>
        </div>
        )
    }
}


export default PriceVolume; 