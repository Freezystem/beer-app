// @flow

import './index.css';

// Libs
import 'whatwg-fetch';
import React            from 'react';
import ReactDOM         from 'react-dom';
import {
  Router,
  Route,
  browserHistory
}                       from 'react-router';
import { Provider }     from 'react-redux';
import {
  syncHistoryWithStore
}                       from 'react-router-redux';
import configureStore   from './helpers/configureStore';

// Components
import App              from './components/App';
import NotFound         from './components/NotFound';
import HomePage         from './components/HomePage';
import BeerPage         from './components/BeerPage';
import BeerDetails      from './components/BeerDetails';

// App init
const store                   = configureStore();
const history                 = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route component={App}>
        <Route path="/" component={HomePage}/>
        <Route path="beers" component={BeerPage}>
          <Route path="/beers/:id" component={BeerDetails}/>
        </Route>
        <Route path="*" component={NotFound}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);