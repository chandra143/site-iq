import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  FormGroup,
  Col,
  FormControl,
  Checkbox,
  Radio,
  ControlLabel,
  Popover,
  InputGroup,
  OverlayTrigger
} from 'react-bootstrap';
import ReactSelect, {Creatable} from 'react-select';
import validation from './ValidationRules';
import _ from 'lodash';

export class BaseField extends Component {
  type = 'FormField';
  getField = () => {}
  validate(value) {
    let errorMsg = '';
    if (this.props.validation) {
      this.props.validation.forEach((v) => {
        if (errorMsg == '') {
          errorMsg = validation[v](value, this.context.Form, this);
        } else {
          return;
        }
      });
    }
    const {Form} = this.context;
    Form.state.Errors[this.props.valuePath] = errorMsg;
    Form.setState(Form.state);
    return !errorMsg;
  }

  render() {
    const {className} = this.props;
    return (
      <FormGroup className={className}>
        <label>{this.props.label}
        {this.props.validation && this.props.validation.indexOf('required') !== -1
          ?
          <span className="text-danger">*</span>
          :
          null
        }
        </label>
        {this.getField()}
        {<p className="text-danger">{this.context.Form.state.Errors[this.props.valuePath]}</p>}
      </FormGroup>
    );
  }
}

BaseField.contextTypes = {
  Form: PropTypes.object
};

export class FormCol extends BaseField {
  validate(){
    return this.context.Form.validate.call(this);
  }
  render(){
    return <div className="col-sm-6">
      {this.props.children.map((child, i) => {
        return React.cloneElement(child, {
          ref: child.props
            ? (child.props._ref || i)
            : i,
          key: i,
          data: this.props.data
        });
      })}
    </div>;
  }
}

export class String extends BaseField {
  handleChange = () => {
    const value = this.refs.input.value;
    const {Form} = this.context;
    this.props.data[this.props.value] = value;
    Form.setState(Form.state, () => {
      this.validate(value);
    });
  }

  validate(){
    return super.validate(this.props.data[this.props.value]);
  }

  getField = () => {
    let disabledField = this.context.Form.props.readOnly;

    return (<input type="text" className={
        this.context.Form.state.Errors[this.props.valuePath]
        ?
        "form-control invalidInput"
        :
        "form-control"
      }
      ref="input"
      value={this.props.data[this.props.value] || ''}
      disabled={disabledField}
      {...this.props.attrs}
      onChange={this.handleChange}/>
    );
  }
}

export class Select extends BaseField {
  handleChange = (val) => {
    const value = val;
    const {Form} = this.context;
    this.props.data[this.props.value] = value;
    Form.setState(Form.state, () => {
      this.validate(value);
    });
  }

  validate(){
    return super.validate(this.props.data[this.props.value]);
  }

  getField = () => {
    let disabledField = this.context.Form.props.readOnly;

    return (<ReactSelect className={
        this.context.Form.state.Errors[this.props.valuePath]
        ?
        "invalidSelect"
        :
        ""
      }
      ref="input"
      value={this.props.data[this.props.value] || ''}
      disabled={disabledField}
      onChange={this.handleChange}
      {...this.props.attrs}/>
    );
  }
}

export class TextArea extends String {
  getField = () => {
    let disabledField = this.context.Form.props.readOnly;

    return (<textarea className={
        this.context.Form.state.Errors[this.props.valuePath]
        ?
        "form-control invalidInput"
        :
        "form-control"
      }
      ref="input"
      value={this.props.data[this.props.value] || ''}
      disabled={disabledField}
      {...this.props.attrs}
      onChange={this.handleChange}
      style={{maxWidth: '100%'}}
      />
    );
  }
}


export class File extends BaseField {
  handleChange = (e) => {
    const value = e.target.files[0];
    const {Form} = this.context;
    this.props.data[this.props.value] = value;
    Form.setState(Form.state, () => {
      this.validate(value);
    });
  }

  validate(){
    return super.validate(this.props.data[this.props.value]);
  }

  getField = () => {
    let disabledField = this.context.Form.props.readOnly;

    return (<input type="file" className={
        this.context.Form.state.Errors[this.props.valuePath]
        ?
        "form-control invalidInput"
        :
        "form-control"
      }
      ref="input"
      disabled={disabledField}
      {...this.props.attrs}
      onChange={this.handleChange}/>
    );
  }
}