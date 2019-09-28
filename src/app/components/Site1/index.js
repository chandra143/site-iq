import React, { Component } from 'react';
import { Link } from 'react-router';
import Header from './Header1';
import Footer from './Footer';
import SideBar from './SideBar';

class Site extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { pageTitle, breadcrumbData } = this.props;
    // console.log(this.props.children)
    return (
      <div>
        <Header headerContent={pageTitle} />
        <SideBar />
        <section className="content-wrapper editorHandler">
          {this.props.children}
        </section>
        <Footer />
      </div>
    )
  }
}

export default Site;
