// @flow

import React         from 'react';
import { Translate } from 'react-redux-i18n';

const NotFound = () =>
  <section className="notFound" style={{padding:'40px 10px'}}>
    <h1>
      <Translate value="NotFound.error" />
    </h1>
  </section>;

export default NotFound;
