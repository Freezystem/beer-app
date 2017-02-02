import React          from 'react';
import ReactDOM       from 'react-dom';
import Root           from '../src/components/Root';
import configureStore from '../src/helpers/configureStore';

describe('Beer App', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Root store={configureStore()}/>, div);
  });
});
