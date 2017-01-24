// @flow

//Libs
import 'whatwg-fetch';
import React          from 'react';
import ReactDOM       from 'react-dom';
import {
  Router,
  Route,
  browserHistory
}                     from 'react-router';

// Components
import App            from './components/App';
import NotFound       from './components/NotFound';
import BeerPage       from './components/BeerPage';
import BeerDetails    from './components/BeerDetails';

import './index.css';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="beers" component={BeerPage}/>
      <Route path="beers/:id" component={BeerDetails}/>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
