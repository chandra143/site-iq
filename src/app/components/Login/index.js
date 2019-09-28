import React, { Component } from 'react';
import _ from 'lodash';
import app_state from '../../app_state';
import SiteIQ_100 from '../../../styles/img/SiteIQ 100.png';
import SiteIQ_23 from '../../../styles/img/SiteIQ 23.png';
import SiteIQ_13 from '../../../styles/img/SiteIQ 13.png';
import { FormGroup, InputGroup, FormControl } from 'react-bootstrap';
import { login } from '../../services/SiteIQservices';
import Button from 'react-bootstrap-button-loader';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
      error1 :'',
      loading:false
    };
  }
  hideLoader = () => {
    this.setState({ loading: false });
  }

  showLoader = () => {
    this.setState({ loading: true });
  }
  componentDidMount() {
    document.body.className = 'login-page';
  }
  componentWillUnmount() {
    document.body.className = '';
  }
  handleChange(key, event) {
    let obj = {
      error: '',
      error1: ''
    };
    obj[key] = event.currentTarget.value;
    this.setState(obj);
  }
  handleSubmit() {
    if (this.state.username == "") {
      this.setState({
        error: "Username must not empty"
      });
    }
    if (this.state.password == "") {
      this.setState({
        error1: "Password must not empty"
      });
    }
    if(this.state.username !="" && this.state.password != ""){
      this.handleLogin()
    }
  }

  handleLogin() {
    this.showLoader()
    // debugger
    login({
      "Email": this.state.username,
      "Password": this.state.password,
    }).then((res) => {
      // debugger
      if(res.status == 400){
        this.setState({
          error: "Invalid Username / Password"
        });
        this.hideLoader()
    }    
      else {
      app_state.user_profile = res.data;
      localStorage.setItem("iot:userInfo", JSON.stringify(res.data));
      this.props.route.history.push("/dashboard");
      // window.location.reload()
      this.setState({
        Email: '',
        Password: ''
      })
      this.hideLoader()
    }
  })
  }

  render() {
    return (
      <div>
        <img src={SiteIQ_100} alt="SiteIQ 100" width="100%" className="login-bg pos" />
        <div className="login-wrapper pos text-center">
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

          {this.state.error !== '' ? (
            <div className="alert alert-danger alert-login">{this.state.error}</div>
          ) : null}
           {this.state.error1 !== '' ? (
            <div className="alert alert-danger alert-login">{this.state.error1}</div>
          ) : null}
          <div
            onKeyPress={event => {
              if (event.key === 'Enter') {
                this.handleLogin();
              }
            }}
          >
            <FormGroup
              style={{ marginBottom: '23px', marginLeft: '25px', width: '82%' }}
            >
              <InputGroup>
                {/*<InputGroup.Addon>
                 <i className="fa fa-user" />
              </InputGroup.Addon>*/}
                <FormControl
                  type="text"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={this.handleChange.bind(this, 'username')}
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
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleChange.bind(this, 'password')}
                />
              </InputGroup>
              <FormControl.Feedback />
            </FormGroup>
            <Button
              type="submit"
              bsStyle="primary"
              className="login-btn"
              block
              loading={this.state.loading}
              onClick={this.handleSubmit.bind(this)}
            >
              LOGIN
            </Button>
          </div>
          <a href="#/forgot" className="links">
            <strong>Forgot password?</strong>
          </a>
        </div>
      </div>
    );
  }
}

export default Login;