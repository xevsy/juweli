import React from 'react';
import ReactDOM from 'react-dom';
import { store, persistor }  from './store/configureStore';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import registerServiceWorker from './registerServiceWorker';
import { firebase } from './firebase/firebase';
import { login, logout } from './actions/auth';
import { getItemsAll } from './actions/items';

import "./styles/scss/material-kit-react.css?v=1.2.0"
import { PersistGate } from 'redux-persist/integration/react'
import { getCategories } from './actions/categories'

const jsx = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>
);

ReactDOM.render(<p>Loading...</p>, document.getElementById('root'));

store.dispatch(getCategories());

store.dispatch(getItemsAll()).then(() => {
  ReactDOM.render(jsx, document.getElementById('root'));
});

registerServiceWorker();

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(user)
    store.dispatch(login(user.uid, user.displayName, user.photoURL, user.email));
  } else {
    store.dispatch(logout());
  }
});
