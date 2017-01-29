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
}                         from '../helpers/localStorage';
import {
  loadTranslations,
  setLocale,
  syncTranslationWithStore,
  i18nReducer
}                         from 'react-redux-i18n';
import translations       from '../i18n';

// Reducers
import beersReducer       from '../reducers/beers';
import beerReducer        from '../reducers/beer';

export let stopSavingToLocalStorage:unsubscriber|null = null;

export const saveToLocalStorage = ( store:Object, interval:number = 1000 ):unsubscriber|null => {
  return store.subscribe(throttle(() => saveState({
      currentBeer : {
        data : store.getState().currentBeer.data,
        id   : store.getState().currentBeer.id
      },
      beers : {
        data : store.getState().beers.data,
        page : store.getState().beers.page
      },
      i18n : {
        locale : store.getState().i18n.locale
      }
    }), interval));
};

const configureStore = ():Object => {
  const composer          = ( process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ) || compose;
  const initialState      = Object.assign({}, loadState());
  const rootReducer       = combineReducers({
    currentBeer : beerReducer,
    beers       : beersReducer,
    routing     : routerReducer,
    i18n        : i18nReducer
  });
  const routingMiddleware = routerMiddleware(browserHistory);
  const middlewares       = composer(applyMiddleware(routingMiddleware, thunkMiddleware));
  const store             = createStore(rootReducer, initialState, middlewares);

  // Local Storage Persistence
  typeof stopSavingToLocalStorage === 'function' && stopSavingToLocalStorage();
  stopSavingToLocalStorage = saveToLocalStorage(store);

  // Translation
  syncTranslationWithStore(store);
  store.dispatch(loadTranslations(translations));
  !store.getState().i18n.locale && store.dispatch(setLocale('en'));

  return store;
};

export default configureStore;