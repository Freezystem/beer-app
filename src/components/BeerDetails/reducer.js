// @flow

import requestState   from '../../helpers/requestState';

// Constants

export const FETCH_BEER:string          = 'FETCH_BEER';
export const FETCH_BEER_SUCCESS:string  = 'FETCH_BEER_SUCCESS';
export const FETCH_BEER_ERROR:string    = 'FETCH_BEER_ERROR';

export { requestState };

// Actions

export const fetchBeer         = ( id:number ):action & { id:number } =>
  ({ type : FETCH_BEER, id });

export const fetchBeerSuccess  = ( data:beer ):action & { data:beer } =>
  ({ type : FETCH_BEER_SUCCESS, data });

export const fetchBeerError    = ( error:Object ):action & { error:Error } =>
  ({ type : FETCH_BEER_ERROR, error });

// Fetch

export const getBeer = (
  id:number,
  beers:beer[] = []
) => {
  return ( dispatch:dispatch ):void => {
    dispatch(fetchBeer(id));

    let findBeer:beer[] = beers.filter(beer => beer.id === id);

    if ( findBeer.length ) {
      dispatch(fetchBeerSuccess(findBeer[0]));
    }
    else {
      fetch(`https://api.punkapi.com/v2/beers/${id}`)
        .then(( res:Object ):Promise<beer[]>  => {
          if ( res.status === 200 )
            return res.json();
          else
            throw new Error(res.statusText);
        })
        .then(( beers:beer[] ):void => {
          if (Array.isArray(beers) && beers.length) {
            dispatch(fetchBeerSuccess(beers[0]));
          }
          else {
            throw new Error(`no beer with id:${id}`);
          }
        })
        .catch(err => dispatch(fetchBeerError(err)));
    }
  }
};

// Reducer

const beerReducer = (
  state:beerState = {
    requestState : requestState.FULFILLED,
    data         : {},
    id           : 0,
    error        : null
  },
  action:action & { data?:beer; id?:number; error?:Error }
):beerState => {
  switch ( action.type ) {
    case FETCH_BEER:
      return Object.assign({}, state, {
        requestState : requestState.PENDING,
        data         : {},
        id           : action.id,
        error        : null
      });
    case FETCH_BEER_SUCCESS:
      return Object.assign({}, state, {
        requestState : requestState.FULFILLED,
        data         : action.data,
        error        : null
      });
    case FETCH_BEER_ERROR:
      return Object.assign({}, state, {
        requestState : requestState.REJECTED,
        data         : {},
        error        : action.error
      });
    default:
      return state;
  }
};

export default beerReducer;