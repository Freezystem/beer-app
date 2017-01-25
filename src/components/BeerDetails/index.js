import './styles.css';

import React            from 'react';
import { connect }      from 'react-redux';
import { goBack }       from 'react-router-redux';

const BeerDetails = ({ beer, goBack }) => {
  if ( !Object.keys(beer).length ) {
    goBack();
    return <p>loading...</p>;
  }
  else {
    let { name, first_brewed, tagline, description, food_pairing, brewers_tips, ingredients, image_url } = beer;
    let { hops } = ingredients;

    return (
      <section className="beerDetails" style={{paddingTop:40}}>
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
          <button className="back" onClick={goBack}>back to beers</button>
        </div>
      </section>
    );
  }
};

const getBeer = (beers = [], id) => {
  let findBeer = Array.isArray(beers) && beers.filter(beer => beer.id === id);
  return findBeer.length ? findBeer[0] : {};
};

const MapStateToProps = (state, { params }) => ({
  beer : getBeer(state.beers.data, parseInt(params.id, 10))
});

export default connect(
  MapStateToProps,
  { goBack }
)(BeerDetails);