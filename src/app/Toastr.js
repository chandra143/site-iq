import React, { Component } from 'react';
import { render } from 'react-dom';
import ReactToastr, {ToastMessage, ToastContainer} from "react-toastr";

var {animation}  = ToastMessage;

var ToastMessageFactory = React.createFactory(animation);

const notificationContainer =  document.createElement('div');

document.querySelector('body').append(notificationContainer);

const Toastr = render(<ToastContainer
  toastMessageFactory={ToastMessageFactory}
  className="toast-top-right"
/>, notificationContainer);

export default Toastr;