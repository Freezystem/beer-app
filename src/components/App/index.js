// @flow

import React, {
  Component
}                 from 'react';
import { Link }   from 'react-router';

const NavBar = () =>
  <nav>
    <Link to="/">home</Link>
    <Link to="/beers">beers</Link>
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
