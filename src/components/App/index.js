// @flow

import './styles.css';

import React          from 'react';
import { Link }       from 'react-router';
import { connect }    from 'react-redux';
import Helmet         from 'react-helmet';
import moment         from 'moment';
import classNames     from 'classnames';
import {
  I18n,
  setLocale
}                     from 'react-redux-i18n';

export const LangSwitcher = ({ lang, setLang }: { lang:string; setLang:(lang:string) => void }) => {
  const availableLangs:language[] = Object.keys(I18n._translations);
  const langs:language[] = [
    { code : "en", label : "english" },
    { code : "fr", label : "français" }
  ].filter((l:language):boolean => ~availableLangs.indexOf(l.code));

  const changeLocale = ( language:string ):void => {
    moment.locale(language);
    setLang(language);
  };

  return (
    <ul className="langSwitcher">
      <li className="navbar_item navbar_item-disabled">language:</li>
      {
        langs.map((l:language) =>
          <li className={classNames('navbar_item', {'navbar_item-active':lang === l.code})}
              key={l.code}
              onClick={() => changeLocale(l.code)}>{l.label}</li>
        )
      }
    </ul>
  );
}

export const NavBar = ({ lang, setLang }: { lang:string; setLang:(lang:string) => void }) =>
  <nav className="navbar">
    <Link className="navbar_item" activeClassName={'navbar_item-active'} to="/">home</Link>
    <Link className="navbar_item" activeClassName={'navbar_item-active'} to="/beers">beers</Link>
    <LangSwitcher lang={lang} setLang={setLang}/>
  </nav>;

const App = ({ lang, setLocale, children }:{ lang:string; setLocale:(lang:string) => void; children:React$Element<any> }) =>
  <section className="App">
    <Helmet htmlAttributes={{ lang }}/>
    <NavBar lang={lang} setLang={setLocale}/>
    { children }
  </section>;

const MapStateToProps = state => ({
  lang  : state.i18n.locale
});

export default connect(
  MapStateToProps,
  { setLocale }
)(App);