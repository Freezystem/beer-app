// @flow

import './styles.css';

import React, {
  Component
}                       from 'react';
import { connect }      from 'react-redux';
import { push }         from 'react-router-redux';
import isEmpty          from 'lodash/isEmpty';
import {
  getBeer,
  requestState
}                       from './reducer.js';

class BeerDetails extends Component {
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

    let body:React$Element<any> = <p>loading...</p>;

    if ( error ) {
      body = <p>{error.message}</p>;
    }
    else if ( !loading && !isEmpty(beer) ) {
      const { name, first_brewed, tagline, description, food_pairing, brewers_tips, ingredients, image_url } = beer,
            { hops } = ingredients;


      body = <section className="beerDetails">
          <img className="beerDetails_img" src={image_url} alt={`${name}`}/>
          <div className="beerDetails_data">
            <h2 className="name">{name} - {first_brewed}</h2>
            <em className="tagline">{tagline}</em>
            <p className="description">{description}</p>
            <p className="tips">brewing tips : {brewers_tips}</p>
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
          </div>
        </section>;
    }

    return (<section className="beerDetails" style={{paddingTop:40}}>{body}</section>);
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