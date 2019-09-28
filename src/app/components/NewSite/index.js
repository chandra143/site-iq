import React, { Component } from 'react';
import { Link } from 'react-router';
import NewFooter from './NewFooter';
import Header from '../Site/Header';
import SideBar1 from '../Site/SideBar1';
import NewSideBar from './NewSidebar';

class NewSite extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { pageTitle, breadcrumbData } = this.props;
    return (
      <div>
        <Header headerContent={pageTitle} />
        <SideBar1 />
        <NewSideBar />
        <section className="content-wrapper editorHandler content-change">
          {this.props.children}
        </section>
        <NewFooter />
      </div>
    )
  }
}

export default NewSite;
