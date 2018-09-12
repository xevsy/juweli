import React from 'react';
import ReactDOM from 'react-dom';
import configureStore  from './store/configureStore';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import registerServiceWorker from './registerServiceWorker';
import { firebase } from './firebase/firebase';
import { login, logout } from './actions/auth';
import { startSetMainItems } from './actions/items';

import "./styles/scss/material-kit-react.css?v=1.2.0"
import { startSetCategories } from './actions/categories'

export const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(<p>Loading...</p>, document.getElementById('root'));

store.dispatch(startSetCategories());

store.dispatch(startSetMainItems()).then(() => {
  ReactDOM.render(jsx, document.getElementById('root'));
});

registerServiceWorker();

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid, user.displayName));
  } else {
    store.dispatch(logout());
  }
});
