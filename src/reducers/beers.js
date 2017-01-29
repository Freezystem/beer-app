// @flow

import requestState   from '../helpers/requestState';

// Constants

export const FETCH_BEERS:string          = 'FETCH_BEERS';
export const FETCH_BEERS_SUCCESS:string  = 'FETCH_BEERS_SUCCESS';
export const FETCH_BEERS_ERROR:string    = 'FETCH_BEERS_ERROR';

export { requestState };

// Actions

export const fetchBeers         = ( page:number ):action<{ page:number }> =>
  ({ type : FETCH_BEERS, page });

export const fetchBeersSuccess  = ( data:beer[] ):action<{ data:beer[] }> =>
  ({ type : FETCH_BEERS_SUCCESS, data });

export const fetchBeersError    = ( error:Object ):action<{ error:Error }> =>
  ({ type : FETCH_BEERS_ERROR, error });

// Fetch

export const getBeers = (
  page:number = 1,
  perPage:number = 20
) => {
  return ( dispatch:dispatch ):void => {
    dispatch(fetchBeers(page));

    fetch(`https://api.punkapi.com/v2/beers?page=${page}&per_page=${perPage}`)
      .then(( res:Object ):Promise<beer[]> => {
        if ( res.status === 200 ) {
          return res.json();
        }
        else {
          throw new Error(res.statusText || 'BeerPage.error_api');
        }
      })
      .then(( beers:beer[] ):void => {
        if (Array.isArray(beers) && beers.length) {
          dispatch(fetchBeersSuccess(beers));
        }
        else {
          throw new Error('BeerPage.error_no_beers');
        }
      })
      .catch(( err:Error ):void => dispatch(fetchBeersError(err)));
  }
};

// Reducer

const beersReducer = (
  state:beersState = {
    requestState : requestState.FULFILLED,
    data         : [],
    page         : 1,
    error        : null
  },
  action:action<{ data?:beer[], page?:number, error?:Error }>
):beersState => {
  switch ( action.type ) {
    case FETCH_BEERS:
      return {
        ...state,
        requestState : requestState.PENDING,
        data         : [],
        page         : action.page,
        error        : null
      };
    case FETCH_BEERS_SUCCESS:
      return {
        ...state,
        requestState : requestState.FULFILLED,
        data         : action.data,
        error        : null
      };
    case FETCH_BEERS_ERROR:
      return {
        ...state,
        requestState : requestState.REJECTED,
        data         : [],
        error        : action.error
      };
    default:
      return state;
  }
};

export default beersReducer;