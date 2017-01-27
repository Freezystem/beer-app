// @flow

import './index.css';

// Libs
import 'whatwg-fetch';
import React            from 'react';
import ReactDOM         from 'react-dom';
import Root             from './components/Root';
import configureStore   from './helpers/configureStore';

ReactDOM.render(
  <Root store={configureStore()}/>,
  document.getElementById('root')
);