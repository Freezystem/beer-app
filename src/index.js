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
import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose
}                       from 'redux';
import { Provider }     from 'react-redux';
import {
  syncHistoryWithStore,
  routerReducer,
  routerMiddleware
}                       from 'react-router-redux';
import thunkMiddleware  from 'redux-thunk';
import throttle         from 'lodash/throttle';
import {
  saveState,
  loadState
}                       from './helpers/localStorage';

// Components
import App              from './components/App';
import NotFound         from './components/NotFound';
import HomePage         from './components/HomePage';
import BeerPage         from './components/BeerPage';
import BeerDetails      from './components/BeerDetails';

// Reducers
import beersReducer     from './components/BeerPage/reducer';
import beerReducer      from './components/BeerDetails/reducer';

// App init

const initialState      = Object.assign({}, loadState());
// eslint-disable-next-line
const composer          = process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer       = combineReducers({
                            currentBeer : beerReducer,
                            beers       : beersReducer,
                            routing     : routerReducer
                          });
const routingMiddleware = routerMiddleware(browserHistory);
const middlewares       = composer(applyMiddleware(routingMiddleware, thunkMiddleware));
const store             = createStore(rootReducer, initialState, middlewares);
const history           = syncHistoryWithStore(browserHistory, store);

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

store.subscribe(throttle(() => {
  saveState({
    currentBeer : {
      data : store.getState().currentBeer.data,
      id   : store.getState().currentBeer.id
    },
    beers : {
      data : store.getState().beers.data,
      page : store.getState().beers.page
    }
  });
}, 1000));

export default store;