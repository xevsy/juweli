import database, { storage } from '../firebase/firebase'
import moment from 'moment';

// ADD_MAIN_ITEM
export const addMainItem = (item) => ({
  type: 'ADD_MAIN_ITEM',
  item
});

export const startAddMainItem = (itemData = {}) => {
  return (dispatch) => {
    const {
      title ='',
      description = '',
      category = '',
      author_id = 0,
      currency = 'UAH',
      amount =  0,
      count = 0,
      image = '',
      createAt = moment().format(),
      updateAt = moment().format()
    } = itemData;
    const item = { title, description, category, author_id, currency, amount, count, image, createAt, updateAt };
    return database.ref('products').push(item).then((ref) => {
      dispatch(addMainItem({
        id: ref.key,
        ...item
      }))
    });
  };
};

// EDIT_EXPENSE
export const editMainItem = (id, updates) => ({
  type: 'EDIT_MAIN_ITEM',
  id,
  updates
});

export const startEditMainItem = (id, itemData = {}) => {
  return (dispatch) => {
    const {
      title ='',
      description = '',
      category = '',
      author_id = 0,
      currency = 'UAH',
      amount =  0,
      count = 0,
      image = '',
      updateAt = moment().format()
    } = itemData;
    const item = { title, description, category, author_id, currency, amount, count, image, updateAt };
    return database.ref(`products/${id}`).update(item).then(() => {
      dispatch(editMainItem({id, item}))
    });
  };
};

export const removeMainItem = (id) => ({
  type: 'REMOVE_MAIN_ITEM',
  id
});

export const startRemoveMainItem = (id) => {
  return (dispatch) => {
    return database.ref(`products/${id}`).remove().then(() => [
      dispatch(removeMainItem(id))
    ]);
  }
}

// SET_MAIN_ITEM
export const setMainItems = (items) => ({
  type: 'SET_MAIN_ITEMS',
  items,
});

export const startSetMainItems = () => {
  return (dispatch) => {
    return database.ref('products').orderByChild('updateAt').once('value').then((snapshot) => {
      const items = [];
      snapshot.forEach((childSnapshot) => {
        items.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
        storage
          .ref("images")
          .child(childSnapshot.val().image)
          .getDownloadURL().then((url) => dispatch(setImageUrl(childSnapshot.key, url)));
      });
      dispatch(setMainItems(items));
    });
  };
};

export const getItemsByCategory = (categoryId) => {
  return (dispatch) => {
    return database.ref('products').orderByChild('category').equalTo(categoryId).once('value').then((snapshot) => {
      const items = [];
      snapshot.forEach((childSnapshot) => {
        items.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
        storage
          .ref("images")
          .child(childSnapshot.val().image)
          .getDownloadURL().then((url) => dispatch(setImageUrl(childSnapshot.key, url)));
      });
      dispatch(setMainItems(items));
    });
  }
}

export const getItemsCount = (items) => ({
  type: 'GET_ITEMS_COUNT',
  items
});

export const setImageUrl = (id, url) => ({
  type: 'SET_IMAGE_URL',
  id,
  url
});
