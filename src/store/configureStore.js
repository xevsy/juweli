import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import itemsReducer from '../reducers/items';
import bucketReducer from '../reducers/bucket'
import categoriesReducer from '../reducers/categories'
import tagsReducer from '../reducers/tags'
import { reducer as formReducer } from 'redux-form';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

const composeEnhanemets = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: hardSet,
  blacklist: ['auth', 'categories', 'form', 'products', 'tags']
}

const rootReducer = persistReducer(persistConfig, combineReducers({
  auth: authReducer,
  products: itemsReducer,
  bucket: bucketReducer,
  categories: categoriesReducer,
  tags: tagsReducer,
  form: formReducer
}));

export const store = createStore(
  rootReducer,
  composeEnhanemets(applyMiddleware(thunk))
);

export const persistor = persistStore(store);
