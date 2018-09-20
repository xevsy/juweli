import React from 'react';
import NavBar from '../menu/NavBar';
import { connect } from 'react-redux';
import { startLogin, startLogout } from '../../actions/auth';
import HeaderLinks from '../block/HeaderLinks'

const Header = () => (
  <div>
    <NavBar
      // color="transparent"
      startLogin={startLogin()}
      startLogout={startLogout()}
      rightLinks={<HeaderLinks />}
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
});


export default connect(undefined, mapDispatchToProps)(Header);
