import './styles.css';
import React, {
  Component
}                     from 'react';
import { connect }    from 'react-redux';
import { Link }       from 'react-router';
import debounce       from 'lodash/debounce';
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

export class BeerPagination extends Component {
  render() {
    let { page, changePage } = this.props;
    let _label;

    return (
      <label className="beerPagination" htmlFor="page">
        <span>Page:</span>
        <input id="page"
               type="number"
               step="1"
               min="1"
               ref={input => _label = input}
               defaultValue={page}
               onChange={debounce(() => changePage(_label.value || 1), 500)}/>
      </label>
    );
  }
}

export class BeerPage extends Component {
  componentDidMount() {
    let { beers, page, getBeers } = this.props;
    (Array.isArray(beers) && beers.length) || getBeers(page);
  }

  render() {
    let { beers, page, error, loading, getBeers, params, children } = this.props;

    let body = (<section className="beerPage" style={{padding:'40px 10px'}}>{ children }</section>);

    return params.id ? body : (
      <section className="beerPage" style={{padding:'40px 10px'}}>
        <BeerPagination page={page} changePage={getBeers}/>
        { loading ? <Loading/> : <BeerList beers={beers}/> }
        { error && 'message' in error ? <p class="beerPage_error">{error.message}</p> : '' }
      </section>
    );
  }
}

const MapStateToProps = state => ({
  beers   : state.beers.data,
  page    : state.beers.page,
  loading : state.beers.requestState === requestState.PENDING,
  error   : state.beers.error
});

export default connect(
  MapStateToProps,
  { getBeers }
)(BeerPage);