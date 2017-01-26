// @flow

import './styles.css';
import React, {
  Component
}                     from 'react';
import { connect }    from 'react-redux';
import { Link }       from 'react-router';
import debounce       from 'lodash/debounce';
import moment         from 'moment';
import {
  getBeers,
  requestState
}                     from './reducer';

export const Loading = () =>
  <span className="beerLoading">loading...</span>;


export const Beer = ({ id, name, tagline, first_brewed, image_url }:beer) =>
  <li className="beerList_item">
    <Link className="beer" to={`/beers/${id}`}>
      <div className="beer_img" style={{backgroundImage:`url(${image_url})`}}/>
      <span className="beer_name">{name}</span>
      <span className="beer_firstBrew">first brewed in {moment(first_brewed, "MM/YYYY").format('MMMM Y')}</span>
      <em className="beer_tagline">{tagline}</em>
    </Link>
  </li>;

export const BeerList = ({ beers }:{ beers:beer[] }) =>
  <ul className="beerList">
    { Array.isArray(beers) && beers.map(beer => <Beer key={beer.id} {...beer}/>) }
  </ul>;

export class BeerPagination extends Component {
  props:{
    page:number;
    changePage:(page:number) => void
  };
  
  render() {
    const { page, changePage } = this.props;
    let _label:HTMLInputElement;

    return (
      <label className="beerPagination" htmlFor="page">
        <span>Page:</span>
        <input id="page"
               type="number"
               step="1"
               min="1"
               ref={input => _label = input}
               defaultValue={page}
               onChange={debounce(() => changePage(parseInt(_label.value, 10) || 1), 500)}/>
      </label>
    );
  }
}

export class BeerPage extends Component {
  props:{
    beers:beer[];
    page:number;
    loading:boolean;
    error:Error;
    getBeers:(page:number) => void;
    params:Object;
    children:React$Element<any>
  };

  componentDidMount() {
    const { beers, page, getBeers } = this.props;
    (Array.isArray(beers) && beers.length) || getBeers(page);
  }

  render() {
    const { beers, page, error, loading, getBeers, params, children } = this.props;

    return params.id ?
      (<section className="beerPage" style={{padding:'40px 10px'}}>{ children }</section>) :
      (
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