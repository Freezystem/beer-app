// type Beer = {id: number; name: string; tagline: string; first_brewed: string};
import './styles.css';
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

export const Beer = ({ id, name, tagline, first_brewed, image_url }) =>
  <li className="beerList_item">
    <Link className="beer" to={`/beers/${id}`}>
      <div className="beer_img" style={{backgroundImage:`url(${image_url})`}}/>
      <span className="beer_name">{name}</span>
      <span className="beer_firstBrew">({first_brewed})</span>
      <em className="beer_tagline">{tagline}</em>
    </Link>
  </li>;

export const BeerList = ({ beers }) =>
  <ul className="beerList">
    { Array.isArray(beers) && beers.map(beer => <Beer key={beer.id} {...beer}/>) }
  </ul>;

export const BeerPagination = ({ page, changePage }) =>
  <label className="beerPagination" htmlFor="page">
    <span>Page:</span>
    <input id="page" type="number" step="1" min="1" value={page} onChange={e => changePage(e.target.value || 1)}/>
  </label>;

export class BeerPage extends Component {
  componentDidMount() {
    let { beers, page, getBeers } = this.props;
    (Array.isArray(beers) && beers.length) || getBeers(page);
  }

  render() {
    let { beers, page, error, state, getBeers } = this.props;
    return (
      <section className="beerPage" style={{padding:'40px 10px'}}>
        <BeerPagination page={page} changePage={getBeers}/>
        { state === requestState.PENDING ? <Loading/> : <BeerList beers={beers}/> }
        { error && 'message' in error ? <p class="beerPage_error">{error.message}</p> : '' }
      </section>
    );
  }
}

const MapStateToProps = state => ({
  beers  : state.beers.data,
  page   : state.beers.page,
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