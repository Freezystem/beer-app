// @flow

const localStorage = localStorage || null;

export const loadState = () => {
  try {
    const serializedState = localStorage ? localStorage.getItem('state') : null;
    return serializedState ? JSON.parse(serializedState) : {};
  }
  catch ( err ) {
    console.warn('unable to get state from localStorage: ', err);
    return {};
  }
};

export const saveState = state => {
  try {
    localStorage && localStorage.setItem('state', JSON.stringify(state));
  }
  catch ( err ) {
    console.warn('unable to save state to localStorage: ', err);
  }
};

export default {
  loadState,
  saveState
};