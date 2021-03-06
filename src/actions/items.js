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
      identifier = '',
      category = '',
      author_id = 0,
      currency = 'USD',
      amount =  0,
      count = 0,
      images = [],
      tags = [],
      createAt = moment().format(),
      updateAt = moment().format()
    } = itemData;
    const item = { published, title, description, identifier, category, author_id, currency, amount, count, images, tags, createAt, updateAt };
    return database.ref('products').push(item).then((ref) => {
      dispatch(addMainItem({
        id: ref.key,
        ...item
      }))
    });
  };
};

// EDIT_CATEGORY
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
      identifier = '',
      category = '',
      author_id = 0,
      currency = 'USD',
      amount =  0,
      count = 0,
      images = [],
      tags = [],
      updateAt = moment().format()
    } = itemData;
    const item = { published, title, description, identifier, category, author_id, currency, amount, count, images, tags, updateAt };
    return database.ref(`products/${id}`).update(item).then(() => {
      dispatch(editMainItem(id, item))
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
          // storage
          //   .ref("images/350x")
          //   .child('thumb_' + childSnapshot.val().image)
          //   .getDownloadURL().then((url) => dispatch(getImageUrl(childSnapshot.key, url)));
      });
      dispatch(getMainItems(items.reverse()));
    });
  };
};

export const getPublishedItemsAll = () => {
  return (dispatch) => {
    return database.ref('products').orderByChild('updateAt').once('value').then((snapshot) => {
      const items = [];
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val().published === true) {
          items.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
          // if (childSnapshot.val().images && childSnapshot.val().images.length > 0) {
          //   storage
          //     .ref("images/350x")
          //     .child('thumb_' + childSnapshot.val().images[0].public_id)
          //     .getDownloadURL().then((url) => dispatch(getImageUrl(childSnapshot.key, url)));
          // }
        }
      });
      dispatch(getMainItems(items.reverse()));
    });
  };
};

export const getPublishedItemsByCategory = (categoryId) => {
  return (dispatch) => {
    return database.ref('products').orderByChild('category').equalTo(categoryId).once('value').then((snapshot) => {
      const items = [];
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val().published === true) {
          items.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
          // storage
          //   .ref("images/350x")
          //   .child('thumb_' + childSnapshot.val().image)
          //   .getDownloadURL().then((url) => dispatch(getImageUrl(childSnapshot.key, url)));
        }
      });
      dispatch(getMainItems(items.reverse()));
    });
  }
}

export const getImageUrl = (id, url) => ({
  type: 'GET_IMAGE_URL',
  id,
  url
});
