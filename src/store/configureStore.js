import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import itemsReducer from '../reducers/items';
import bucketReducer from '../reducers/bucket'
import categoriesReducer from '../reducers/categories'
import { reducer as formReducer } from 'redux-form';

const composeEnhanemets = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  return createStore(
    combineReducers({
      auth: authReducer,
      products: itemsReducer,
      bucket: bucketReducer,
      categories: categoriesReducer,
      form: formReducer
    }),
    composeEnhanemets(applyMiddleware(thunk))
  );
}
