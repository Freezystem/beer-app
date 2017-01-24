import './styles.css';

import React, {
  Component
}                 from 'react';
import { Link }   from 'react-router';

const NavBar = () =>
  <nav className="navbar">
    <Link className="navbar_item" activeClassName={'navbar_item-active'} to="/">home</Link>
    <Link className="navbar_item" activeClassName={'navbar_item-active'} to="/beers">beers</Link>
  </nav>;

class App extends Component {
  render() {
    return (
      <section className="App">
        <NavBar/>
        { this.props.children }
      </section>
    );
  }
}

export default App;
