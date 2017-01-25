// @flow
type beer = {
  id:number,
  name:string,
  tagline:string,
  first_brewed:string,
  description:string,
  food_pairing:any,
  brewers_tips:string,
  ingredients:{ hops:any },
  image_url:string
};
// Constants

export const FETCH_BEER          = 'FETCH_BEER';
export const FETCH_BEER_SUCCESS  = 'FETCH_BEER_SUCCESS';
export const FETCH_BEER_ERROR    = 'FETCH_BEER_ERROR';

export const requestState = {
  PENDING     : 'PENDING',
  FULFILLED   : 'FULFILLED',
  REJECTED    : 'REJECTED'
};

// Actions

export const fetchBeer         = ( id:number ):{ type:string, id:number } =>
  ({ type : FETCH_BEER, id });

export const fetchBeerSuccess  = ( data:beer ):{ type:string, data:beer } =>
  ({ type : FETCH_BEER_SUCCESS, data });

export const fetchBeerError    = ( error:any ):{ type:string, error:any } =>
  ({ type : FETCH_BEER_ERROR, error });

// Fetch

export const getBeer = (
  id:number,
  beers:beer[] = []
) => {
  return ( dispatch:any ):void => {
    dispatch(fetchBeer(id));

    let findBeer = Array.isArray(beers) && beers.filter(beer => beer.id === id);

    if ( findBeer.length ) {
      console.log('from store', findBeer[0]);
      dispatch(fetchBeerSuccess(findBeer[0]));
    }
    else {
      fetch(`https://api.punkapi.com/v2/beers/${id}`)
        .then(res => {
          if ( res.status === 200 )
            return res.json();
          else
            throw new Error(res.statusText);
        })
        .then(beers => {
          if (Array.isArray(beers) && beers.length) {
            console.log('from api', beers[0]);
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
  state:{ requestState:string, data:beer, id:number, error:any } = {
    requestState : requestState.FULFILLED,
    data         : {},
    id           : 0,
    error        : null
  },
  action:{ type:string, data?:beer, id?:number, error?:any }
):{ requestState:string, data:beer, id:number, error:any } => {
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