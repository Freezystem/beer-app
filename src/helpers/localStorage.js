// @flow

const localStorage:Object|null = window.localStorage || null;

export const loadState = ():Object => {
  try {
    const serializedState:string = localStorage ? localStorage.getItem('state') : null;
    return serializedState ? JSON.parse(serializedState) : {};
  }
  catch ( err ) {
    console.warn('unable to get state from localStorage: ', err);
    return {};
  }
};

export const saveState = ( state:Object ):void => {
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