// @flow

import './styles.css';
import React, {
  Component
}                     from 'react';
import { connect }    from 'react-redux';
import { Link }       from 'react-router';
import { debounce }   from 'lodash';
import {
  getBeers,
  requestState
}                     from '../../reducers/beers';
import {
  Translate,
  Localize
}                     from 'react-redux-i18n';

const PUBLIC_URL:string = process.env.PUBLIC_URL || '';

export const Loading = () =>
  <p className="beerLoading">
    <span className="dot"></span>
    <span className="dot"></span>
    <span className="dot"></span>
  </p>;

export const ErrorMessage = ({ text, vars = {} }:{ text:string; vars?:Object }) =>
  <p className="beerPage_error">
    <Translate value={text} {...vars}/>
  </p>;

export const Beer = ({ id, name, tagline, first_brewed, image_url }:beer) =>
  <li className="beerList_item">
    <Link className="beer" to={`/beers/${id}`}>
      <div className="beer_img" style={{backgroundImage:`url(${image_url}), url(${PUBLIC_URL}/beer.jpg)`}}/>
      <span className="beer_name">{name}</span>
      <span className="beer_firstBrew">
        <Translate value="BeerPage.first_brewed"/>
        <Localize value={first_brewed} dateFormat="BeerPage.date_format" options={{parseFormat:'MM/YYYY'}}/>
      </span>
      <em className="beer_tagline">{tagline}</em>
      <Translate className="beer_button" value="BeerPage.see_details"/>
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

  static displayName = 'BeerPagination';
  
  render() {
    const { page, changePage } = this.props;
    let _label:HTMLInputElement;

    return (
      <label className="beerPagination" htmlFor="page">
        <Translate value="BeerPage.page"/>
        <input id="page"
               type="number"
               step="1"
               min="1"
               max="15"
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

  static displayName = 'BeerPage';

  componentDidMount() {
    const { beers, page, getBeers } = this.props;
    (Array.isArray(beers) && beers.length) || getBeers(page);
  }

  render() {
    const { beers, page, error, loading, getBeers, params, children } = this.props;

    if ( params.id ) {
      return <section className="beerPage" style={{padding:'40px 10px'}}>{ children }</section>;
    }
    else {
      let body = <BeerList beers={beers}/>;

      if ( loading ) {
        body = <Loading/>;
      }
      else if ( error ) {
        body = <ErrorMessage text={error.message}/>;
      }

      return <section className="beerPage" style={{padding:'40px 10px'}}>
               <BeerPagination page={page} changePage={getBeers}/>
               { body }
             </section>;
    }
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