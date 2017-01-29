// @flow

import './styles.css';

import React        from 'react';
import { Link }     from 'react-router';
import { connect }  from 'react-redux';
import Helmet       from 'react-helmet';

const NavBar = () =>
  <nav className="navbar">
    <Link className="navbar_item" activeClassName={'navbar_item-active'} to="/">home</Link>
    <Link className="navbar_item" activeClassName={'navbar_item-active'} to="/beers">beers</Link>
  </nav>;

const App = ({ lang, children }:{ lang:string; children:React$Element<any> }) =>
  <section className="App">
    <Helmet htmlAttributes={{ lang }}/>
    <NavBar/>
    { children }
  </section>;

const MapStateToProps = state => ({
  lang  : state.i18n.locale
});

export default connect(
  MapStateToProps
)(App);