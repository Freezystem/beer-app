import React        from 'react';
import { connect }  from 'react-redux';

const BeerDetails = ({ beer }) => {
  let { name, first_brewed, tagline, description, food_pairing, brewers_tips, ingredients } = beer;
  let { hops } = ingredients;

  return (
    <div>
      <h2>{name} - {first_brewed}</h2>
      <h3>{tagline}</h3>
      <p>{description}</p>
      <p>{brewers_tips}</p>
      <div>
        <p>food pairing:</p>
        <ul>
          {Array.isArray(food_pairing) && food_pairing.map(( pair, id ) => <li key={id}>{pair}</li>)}
        </ul>
      </div>
      <div>
        <p>hops:</p>
        <ul>
          {Array.isArray(hops) && hops.map(( hop, id ) => <li key={id}>{hop.name} ({hop.amount.value}{hop.amount.unit})</li>)}
        </ul>
      </div>
    </div>
  );
};

const getBeer = (beers = [], id) => {
  let findBeer = Array.isArray(beers) && beers.filter(beer => beer.id === id);
  return findBeer.length ? findBeer[0] : {};
};

const MapStateToProps = (state, props) => ({
  beer : getBeer(state.beers.data, parseInt(props.params.id, 10))
});

export default connect(
  MapStateToProps
)(BeerDetails);