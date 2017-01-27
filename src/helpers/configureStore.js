// @flow

import React            from 'react';
import {
  browserHistory
}                       from 'react-router';
import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose
}                       from 'redux';
import {
  routerReducer,
  routerMiddleware
}                       from 'react-router-redux';
import thunkMiddleware  from 'redux-thunk';
import throttle         from 'lodash/throttle';
import {
  saveState,
  loadState
}                       from '../helpers/localStorage';
import isEmpty          from 'lodash/isEmpty';

// Reducers
import beersReducer     from '../components/BeerPage/reducer';
import beerReducer      from '../components/BeerDetails/reducer';

export const saveToLocalStorage = ( store:Object, stateToSave:Object = {}, interval:number = 1000 ) => {
  !isEmpty(stateToSave) && store.subscribe(throttle(() => {
    saveState(stateToSave);
  }, interval));
};

const configureStore = ():Object => {
  // eslint-disable-next-line
  const composer                = process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const initialState            = Object.assign({}, loadState());
  const rootReducer             = combineReducers({
    currentBeer : beerReducer,
    beers       : beersReducer,
    routing     : routerReducer
  });
  const routingMiddleware       = routerMiddleware(browserHistory);
  const middlewares             = composer(applyMiddleware(routingMiddleware, thunkMiddleware));
  const store                   = createStore(rootReducer, initialState, middlewares);
  const stateToSave:stateToSave = {
    currentBeer : {
      data : store.getState().currentBeer.data,
      id   : store.getState().currentBeer.id
    },
    beers : {
      data : store.getState().beers.data,
      page : store.getState().beers.page
    }
  };

  saveToLocalStorage(store, stateToSave);

  return store;
};

export default configureStore;