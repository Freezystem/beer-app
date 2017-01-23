// @flow

import React, {
  Component
}                 from 'react';

class BeerDetails extends Component {
  constructor() {
    super();
    console.log('state', this.state);
  }

  render() {
    return (<div>beer details : {this.props.params.id}</div>);
  }
}

export default BeerDetails;