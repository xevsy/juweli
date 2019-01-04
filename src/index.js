import React from 'react';
import ReactDOM from 'react-dom';
import { store, persistor }  from './store/configureStore';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import registerServiceWorker from './registerServiceWorker';
import { firebase } from './firebase/firebase';
import { login, logout } from './actions/auth';
import { getPublishedItemsAll } from './actions/items';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import "./styles/scss/material-kit-react.css?v=1.2.0"
import { PersistGate } from 'redux-persist/integration/react'
import { getCategories, getNestedCategories, getParentCategories } from './actions/categories'
import { getLanguage, setLanguage } from './actions/language'
import axios from 'axios'
import T from 'i18n-react'
import { getCurrency } from './actions/currency'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true
  }
});

const jsx = (
  <MuiThemeProvider theme={theme} >
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRouter />
      </PersistGate>
    </Provider>
  </MuiThemeProvider>
);

ReactDOM.render(<p>Loading...</p>, document.getElementById('root'));

// TODO get from local storage
store.dispatch(getLanguage());
const lang = store.getState().language;
axios.get(`/lang/${lang}.json`).then(res => {
  T.setTexts(res.data);
  store.dispatch(setLanguage(lang));
});

store.dispatch(getCategories());
store.dispatch(getParentCategories());
store.dispatch(getCurrency());
store.dispatch(getNestedCategories());
store.dispatch(getPublishedItemsAll()).then(async () => {
  const user = firebase.auth().currentUser;
  if (user) {
    await store.dispatch(login(user.uid, user.displayName, user.photoURL, user.email));
  }
  ReactDOM.render(jsx, document.getElementById('root'));
});

registerServiceWorker();

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid, user.displayName, user.photoURL, user.email));
  } else {
    store.dispatch(logout());
  }
});
