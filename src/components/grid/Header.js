import React from 'react';
import NavBar from '../menu/NavBar';
import { connect } from 'react-redux';
import { startLogin, startLogout } from '../../actions/auth';
import HeaderLinks from '../block/HeaderLinks'
import MessageSnackBar from '../custom/MessageSnackBar'
import { removeMessage } from '../../actions/message'
import { setLanguage } from '../../actions/language'

const Header = (props) => {

  return (
    <div>
      <MessageSnackBar
        {...props.notification}
        handleMessageClose={() => props.handleMessageClose(props.notification.status)}
      />
      <NavBar
        // color="transparent"
        startLogin={startLogin()}
        startLogout={startLogout()}
        rightLinks={<HeaderLinks changeLanguage={props.changeLanguage} />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "black"
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
};

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin()),
  startLogout: () => dispatch(startLogout()),
  handleMessageClose: status => {
    dispatch(removeMessage(status));
  },
  changeLanguage: lang => {
    dispatch(setLanguage(lang))
    window.location.reload();
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Header);
