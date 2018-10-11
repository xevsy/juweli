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
      published = true,
      title ='',
      description = '',
      category = '',
      author_id = 0,
      currency = 'UAH',
      amount =  0,
      count = 0,
      image = '',
      tags = [],
      createAt = moment().format(),
      updateAt = moment().format()
    } = itemData;
    const item = { published, title, description, category, author_id, currency, amount, count, image, tags, createAt, updateAt };
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
      published = true,
      title ='',
      description = '',
      category = '',
      author_id = 0,
      currency = 'UAH',
      amount =  0,
      count = 0,
      image = '',
      tags = [],
      updateAt = moment().format()
    } = itemData;
    const item = { published, title, description, category, author_id, currency, amount, count, image, tags, updateAt };
    return database.ref(`products/${id}`).update(item).then(() => {
      dispatch(editMainItem({id, item}))
    });
  };
};

export const removeMainItem = (id) => ({
  type: 'REMOVE_MAIN_ITEM',
  id
});

export const startRemoveMainItem = (id, image) => {
  return (dispatch) => {
    return database.ref(`products/${id}`).remove().then(() => {
      storage.ref(`images/${image.image}`).delete().then(() => {
        dispatch(removeMainItem(id))
      })
    });
  }
}

// GET_MAIN_ITEM
export const getMainItems = (items) => ({
  type: 'GET_MAIN_ITEMS',
  items,
});

export const getItemsAll = () => {
  return (dispatch) => {
    return database.ref('products').orderByChild('updateAt').once('value').then((snapshot) => {
      const items = [];
      snapshot.forEach((childSnapshot) => {
        items.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
        storage
          .ref("images/350x")
          .child('thumb_' + childSnapshot.val().image)
          .getDownloadURL().then((url) => dispatch(getImageUrl(childSnapshot.key, url)));
      });
      dispatch(getMainItems(items));
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
          .ref("images/350x")
          .child('thumb_' + childSnapshot.val().image)
          .getDownloadURL().then((url) => dispatch(getImageUrl(childSnapshot.key, url)));
      });
      dispatch(getMainItems(items));
    });
  }
}

export const getImageUrl = (id, url) => ({
  type: 'GET_IMAGE_URL',
  id,
  url
});
