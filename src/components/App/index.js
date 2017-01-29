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
import { Translate }  from 'react-redux-i18n';

export const LangSwitcher = ({ lang, setLang }: { lang:string; setLang:(lang:string) => void }) => {
  const availableLangs:string[] = Object.keys(I18n._translations);

  const changeLocale = ( locale:string ):void => {
    moment.locale(locale);
    setLang(locale);
  };

  return (
    <ul className="langSwitcher">
      <li className="navbar_item navbar_item-disabled">
        <Translate value="LangSwitcher.language"/>
      </li>
      {
        availableLangs.map((locale:string) =>
          <li className={classNames('navbar_item', {'navbar_item-active':lang === locale})}
              key={locale}
              onClick={() => changeLocale(locale)}>
            <Translate value={`LangSwitcher.${locale}`}/>
          </li>
        )
      }
    </ul>
  );
};

export const NavBar = ({ lang, setLang }: { lang:string; setLang:(lang:string) => void }) => {
  const nav:link[] = [
    { href:"/", label:"home" },
    { href:"/beers", label:"beers" }
  ];

  return (
    <nav className="navbar">
      { nav.map(( item:link, id:number ) => (
          <Link key={id}
                className="navbar_item"
                activeClassName={'navbar_item-active'}
                to={item.href}>
            <Translate value={`NavBar.${item.label}`}/>
          </Link>
        ))
      }
      <LangSwitcher lang={lang} setLang={setLang}/>
    </nav>
  );
};

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