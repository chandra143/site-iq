import React, { Component } from 'react';
import _ from 'lodash';
import SiteIQ_100 from '../../../styles/img/SiteIQ 100.png';
import SiteIQ_23 from '../../../styles/img/SiteIQ 23.png';
import SiteIQ_13 from '../../../styles/img/SiteIQ 13.png';
import { FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';

class REGISTER extends Component {
  constructor(props) {
    super(props);
    this.state = {
        username: '',
        password: '',
        error: ''
      };
  }
  
  render() {
    return (
      <div>
        <img src={SiteIQ_100} alt="SiteIQ 100" width="100%" />
        <div className="login-wrapper text-center">
          <img
            src={SiteIQ_23}
            alt="SiteIQ 23"
            width="11%"
            style={{ marginBottom: '30px', marginTop: '10px' }}
          />

          <img
            src={SiteIQ_13}
            alt="SiteIQ 13"
            width="25%"
            style={{
              marginBottom: '30px',
              marginTop: '10px',
              marginLeft: '8px'
            }}
          />
            <FormGroup
              style={{ marginBottom: '23px', marginLeft: '25px', width: '82%' }}
            >
              <InputGroup>
                {/*<InputGroup.Addon>
                <i className="fa fa-key" />
              </InputGroup.Addon>*/}
                <FormControl
                  type="text"
                  placeholder="Email"
                  value={this.state.password}
                />
              </InputGroup>
              <FormControl.Feedback />
            </FormGroup>
          
            <FormGroup
              style={{ marginBottom: '23px', marginLeft: '25px', width: '82%' }}
            >
              <InputGroup>
                {/*<InputGroup.Addon>
                <i className="fa fa-key" />
              </InputGroup.Addon>*/}
                <FormControl
                  type="Password"
                  placeholder="Password"
                  value={this.state.password}
                />
              </InputGroup>
              <FormControl.Feedback />
            </FormGroup>

            <FormGroup
              style={{ marginBottom: '23px', marginLeft: '25px', width: '82%' }}
            >
              <InputGroup>
                {/*<InputGroup.Addon>
                <i className="fa fa-key" />
              </InputGroup.Addon>*/}
                <FormControl
                  type="Password"
                  placeholder="Confirm Password"
                  value={this.state.password}
                />
              </InputGroup>
              <FormControl.Feedback />
            </FormGroup>
            <Button
              bsStyle="primary"
              block
              style={{ marginBottom: '23px', width: '82%', marginLeft: '25px',backgroundColor:'#3f51b5', color:'white' }}
            >
              REGISTER
            </Button>
          <a href="#/login" style={{ marginLeft: '-50px', color: '#009688' }}>
            <strong>Already have an account?</strong>
          </a>
        </div>
      </div>
    );
  }
}

export default REGISTER;