// @flow

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
import beersReducer     from '../reducers/beers';
import beerReducer      from '../reducers/beer';

export let stopSavingToLocalStorage:unsubscriber|null = null;

export const saveToLocalStorage = ( store:Object, stateToSave:Object = {}, interval:number = 1000 ):unsubscriber|null => {
  return isEmpty(stateToSave) ? null : store.subscribe(throttle(() => saveState(stateToSave), interval));
};

const configureStore = ():Object => {
  const composer          = ( process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ) || compose;
  const initialState      = Object.assign({}, loadState());
  const rootReducer       = combineReducers({
    currentBeer : beerReducer,
    beers       : beersReducer,
    routing     : routerReducer
  });
  const routingMiddleware = routerMiddleware(browserHistory);
  const middlewares       = composer(applyMiddleware(routingMiddleware, thunkMiddleware));
  const store             = createStore(rootReducer, initialState, middlewares);
  const stateToSave       = {
    currentBeer : {
      data : store.getState().currentBeer.data,
      id   : store.getState().currentBeer.id
    },
    beers : {
      data : store.getState().beers.data,
      page : store.getState().beers.page
    }
  };

  typeof stopSavingToLocalStorage === 'function' && stopSavingToLocalStorage();
  stopSavingToLocalStorage = saveToLocalStorage(store, stateToSave);

  return store;
};

export default configureStore;