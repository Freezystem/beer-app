// @flow
// type Beer = {id: number; name: string; tagline: string; first_brewed: string};

import React, {
  Component
}                 from 'react';
import { Link }   from 'react-router';

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

class BeerPage extends Component {
  constructor() {
    super();

    this.state = { beers : [], loading : true };
  }

  componentDidMount() {
    this._getBeers();
  }

  _getBeers(page = 1, perPage = 20) {
    this.setState(Object.assign(this.state, { loading : true }));

    return fetch(`https://api.punkapi.com/v2/beers?page=${page}&per_page=${perPage}`)
      .then(res => {
        if ( res.status === 200 )
          return res.json();
        else
          throw res.statusText;
      })
      .then(beers => {
        this.setState(Object.assign(this.state, { beers, loading : false }));
        return beers;
      })
      .catch(err => {
        console.error('error occurred while fetching for beers:', err);
        this.setState(Object.assign(this.state, { beers : [], loading : false }));
      });
  }

  render() {
    return (
      <section className="BeerPage">
        { this.state.loading ? <Loading/> : <BeerList beers={this.state.beers}/> }
      </section>
    );
  }
}

export default BeerPage;
