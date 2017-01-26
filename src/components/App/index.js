// @flow

import './styles.css';

import React      from 'react';
import { Link }   from 'react-router';

const NavBar = () =>
  <nav className="navbar">
    <Link className="navbar_item" activeClassName={'navbar_item-active'} to="/">home</Link>
    <Link className="navbar_item" activeClassName={'navbar_item-active'} to="/beers">beers</Link>
  </nav>;

const App = ({ children }:{ children:React$Element<any> }) =>
  <section className="App">
    <NavBar/>
    { children }
  </section>;

export default App;
