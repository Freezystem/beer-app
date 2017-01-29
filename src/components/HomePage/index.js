// @flow
import React  from 'react';
import { Translate } from 'react-redux-i18n';

const HomePage = () =>
  <section className="homePage" style={{padding:'40px 10px'}}>
    <h1>
      <Translate value="HomePage.welcome"/>
    </h1>
  </section>;

export default HomePage;
