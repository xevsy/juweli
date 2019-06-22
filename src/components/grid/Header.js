import React from 'react';
import NavBar from '../menu/NavBar';
import { connect } from 'react-redux';
import { startLogin, startLogout } from '../../actions/auth';
import HeaderLinks from '../block/HeaderLinks'
import MessageSnackBar from '../custom/MessageSnackBar'
import { removeMessage } from '../../actions/message'
import { setLanguage } from '../../actions/language'
import axios from 'axios'
import T from 'i18n-react'

const Header = (props) => {

  return (
    <div>
      <MessageSnackBar
        {...props.notification}
        handleMessageClose={() => props.handleMessageClose(props.notification.status)}
      />
      <NavBar
        color="#ecbebe"
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
    language: state.language,
  }
};

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin()),
  startLogout: () => dispatch(startLogout()),
  handleMessageClose: status => {
    dispatch(removeMessage(status));
  },
  changeLanguage: lang => {
    axios.get(`/lang/${lang}.json`).then(res => {
      T.setTexts(res.data);
      dispatch(setLanguage(lang));
    });
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Header);
