import './styles.css';

import React        from 'react';
import { connect }  from 'react-redux';
import { replace }  from 'react-router-redux';
import store        from '../../index';

const BeerDetails = ({ beer }) => {
  let { name, first_brewed, tagline, description, food_pairing, brewers_tips, ingredients, image_url } = beer;
  let { hops } = ingredients;

  return (
    <section className="beerDetails" style={{paddingTop:40}}>
      <img className="beerDetails_img" src={image_url} alt={`${name} image`}/>
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
      </div>
    </section>
  );
};

const fetchBeerFromAPI = ( id ) => {
  return fetch(`https://api.punkapi.com/v2/beers/${id}`)
    .then(res => {
      if ( res.status === 200 )
        return res.json();
      else
        throw res.statusText;
    })
    .then(beers => {
      if ( Array.isArray(beers) && beers.length ) {
        return beers[0];
      }
      else {
        throw { message : `unable to find beer for id: ${id}` };
      }
    })
    .catch((err) => store.dispatch(replace('/beers')));
};

const getBeer = (beers = [], id) => {
  let findBeer = Array.isArray(beers) && beers.filter(beer => beer.id === id);
  return findBeer.length ? findBeer[0] : fetchBeerFromAPI(id);
};

const MapStateToProps = (state, props) => ({
  beer : getBeer(state.beers.data, parseInt(props.params.id, 10))
});

export default connect(
  MapStateToProps
)(BeerDetails);