// @flow

import React            from 'react';
import {
  Router,
  Route,
  browserHistory
}                       from 'react-router';
import { Provider }     from 'react-redux';
import {
  syncHistoryWithStore
}                       from 'react-router-redux';

// Components
import App              from '../App';
import NotFound         from '../NotFound';
import HomePage         from '../HomePage';
import BeerPage         from '../BeerPage';
import BeerDetails      from '../BeerDetails';

const Root = ( { store }:Object ) => {
  const history = syncHistoryWithStore(browserHistory, store);

  return (
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
    </Provider>
  );
}


export default Root;
