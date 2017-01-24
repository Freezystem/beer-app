// @flow

// Constants

export const FETCH_BEERS          = 'FETCH_BEERS';
export const FETCH_BEERS_SUCCESS  = 'FETCH_BEERS_SUCCESS';
export const FETCH_BEERS_ERROR    = 'FETCH_BEERS_ERROR';

export const requestState = {
  PENDING     : 'PENDING',
  FULFILLED   : 'FULFILLED',
  REJECTED    : 'REJECTED'
};

// Actions

export const fetchBeers         = ():{ type:string } =>
  ({ type : FETCH_BEERS });

export const fetchBeersSuccess  = ( data:any ):{ type:string, data:any } =>
  ({ type : FETCH_BEERS_SUCCESS, data });

export const fetchBeersError    = ( error:any ):{ type:string, error:any } =>
  ({ type : FETCH_BEERS_ERROR, error });

// Fetch

export const getBeers = (
  page:number = 1,
  perPage:number = 20
) => {
  console.log('wtf');
  return ( dispatch:any ):void => {
    dispatch(fetchBeers());

    fetch(`https://api.punkapi.com/v2/beers?page=${page}&per_page=${perPage}`)
      .then(res => {
        if ( res.status === 200 )
          return res.json();
        else
          throw res.statusText;
      })
      .then(beers => dispatch(fetchBeersSuccess(beers)))
      .catch(err => dispatch(fetchBeersError(err)));
  }
};

// Reducer

const beersReducer = (
  state:{ requestState:string, data:any, error:any } = {
    requestState : requestState.FULFILLED,
    data         : [],
    error        : null
  },
  action:{ type:string, data?:any, error?:any }
):{ requestState:string, data:any, error:any } => {
  switch ( action.type ) {
    case FETCH_BEERS:
      return Object.assign({}, state, {
        requestState : requestState.PENDING,
        data         : [],
        error        : null
      });
    case FETCH_BEERS_SUCCESS:
      return Object.assign({}, state, {
        requestState : requestState.FULFILLED,
        data         : action.data,
        error        : null
      });
    case FETCH_BEERS_ERROR:
      return Object.assign({}, state, {
        requestState : requestState.REJECTED,
        data         : [],
        error        : action.error
      });
    default:
      return state;
  }
};

export default beersReducer;