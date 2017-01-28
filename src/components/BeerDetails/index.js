// @flow

import './styles.css';

import React, {
  Component
}                     from 'react';
import { connect }    from 'react-redux';
import { push }       from 'react-router-redux';
import isEmpty        from 'lodash/isEmpty';
import {
  Loading,
  ErrorMessage
}                     from '../BeerPage';
import moment         from 'moment';
import {
  getBeer,
  requestState
}                     from '../../reducers/beer.js';

export class BeerDetails extends Component {
  props:{
    loading:boolean;
    error:Error;
    beers:beer[];
    beer:beer;
    params:Object;
    getBeer:(id:number) => void;
    push:(url:string) => void
  };

  componentDidMount() {
    const { beers, beer, params } = this.props,
          id = parseInt(params.id, 10);

    if ( isEmpty(beer) || beer.id !== id ) {
      this.props.getBeer(id, beers);
    }
  }

  render() {
    const { beer, loading, error, push } = this.props;

    let body:React$Element<any> = <Loading/>;

    if ( error ) {
      body = <ErrorMessage text={error.message}/>;
    }
    else if ( !loading && !isEmpty(beer) ) {
      const { name, first_brewed, tagline, description, food_pairing, brewers_tips, ingredients, image_url } = beer,
            { hops } = ingredients;


      body = <div className="beerDetails_data">
            <div className="img" style={{backgroundImage:`url(${image_url})`}}></div>
            <h2 className="name">{name} - {moment(first_brewed, 'MM/YYYY').format('MMMM Y')}</h2>
            <em className="tagline">{tagline}</em>
            <p className="description">{description}</p>
            <p className="tips">
              <span>brewing tips:</span>
              <span>{brewers_tips}</span>
            </p>
            <div className="pairing">
              <p>food pairing:</p>
              <ul>
                {Array.isArray(food_pairing) && food_pairing.map(( pair, id ) => <li key={id}>{pair}</li>)}
              </ul>
            </div>
            <div className="hops">
              <p>hops:</p>
              <ul>
                {Array.isArray(hops) && hops.map(( hop, id ) => <li key={id}>{hop.name} ({hop.amount.value}{hop.amount.unit})</li>)}
              </ul>
            </div>
            <button className="back" onClick={() => push('/beers')}>back to beers</button>
          </div>;
    }

    return (<section className="beerDetails">{body}</section>);
  }
}

const MapStateToProps = (state, { params }) => ({
  beers   : state.beers.data,
  beer    : state.currentBeer.data,
  loading : state.currentBeer.requestState === requestState.PENDING,
  error   : state.currentBeer.error
});

export default connect(
  MapStateToProps,
  { push, getBeer }
)(BeerDetails);