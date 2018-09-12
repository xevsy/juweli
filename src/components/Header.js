import React from 'react';
import NavBar from './NavBar';
import { connect } from 'react-redux';
import { startLogin, startLogout } from '../actions/auth';
import { startSetMainItems } from '../actions/items'

const Header = () => (
  <div>
    <NavBar
      startLogin={startLogin()}
      startLogout={startLogout()}
      startSetMainItems={startSetMainItems()}
      fixed
      changeColorOnScroll={{
        height: 400,
        color: "black"
      }}
    />
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin()),
  startLogout: () => dispatch(startLogout()),
  startSetMainItems: () => dispatch(startSetMainItems())
});


export default connect(undefined, mapDispatchToProps)(Header);
