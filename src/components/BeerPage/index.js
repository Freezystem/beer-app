// type Beer = {id: number; name: string; tagline: string; first_brewed: string};

import React, {
  Component
}                     from 'react';
import { connect }    from 'react-redux';
import { Link }       from 'react-router';
import {
  getBeers,
  requestState
}                     from './reducer';

export const Loading = () =>
  <span className="beerLoading">loading...</span>;

export const Beer = ({ id, name, tagline, first_brewed }) =>
  <li className="beerList_item">
    <Link className="beer" to={`/beers/${id}`}>
      <span className="beer_name">{name}</span>
      <span className="beer_tagline">{tagline}</span>
      <span className="beer_firstBrew">{first_brewed}</span>
    </Link>
  </li>;

export const BeerList = ({ beers }) =>
  <ul className="beerList">
    { Array.isArray(beers) && beers.map(beer => <Beer key={beer.id} {...beer}/>) }
  </ul>;

export class BeerPage extends Component {
  componentDidMount() {
    this.props.getBeers();
  }

  render() {
    let { beers, error, state } = this.props;
    return (
      <section className="beerPage">
        { state === requestState.PENDING ? <Loading/> : <BeerList beers={beers}/> }
        { error && 'message' in error ? <p class="beerPage_error">{error.message}</p> : '' }
      </section>
    );
  }
}


const MapStateToProps = state => ({
  beers  : state.beers.data,
  state  : state.beers.requestState,
  error  : state.beers.error
});

const MapDispatchToProps = dispatch => ({
  getBeers : ( page, perPage ) => dispatch(getBeers(page, perPage))
});

export default connect(
  MapStateToProps,
  MapDispatchToProps
)(BeerPage);

