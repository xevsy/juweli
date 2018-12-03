import database, { storage } from '../firebase/firebase'

// ADD_CATEGORY
export const addCategory = (category) => ({
  type: 'ADD_CATEGORY',
  category
});

export const startAddCategory = (categoryData = {}) => {
  return (dispatch) => {
    const {
      title ='',
      description = '',
      parentId = 0,
    } = categoryData;
    const category = { title, description, parentId };
    return database.ref('categories').push(category).then((ref) => {
      dispatch(addCategory({
        id: ref.key,
        ...category
      }))
    });
  };
};

// EDIT_CATEGORY
export const editCategory = (id, updates) => ({
  type: 'EDIT_CATEGORY',
  id,
  updates
});

export const startEditCategory = (id, categoryData = {}) => {
  return (dispatch) => {
    const {
      title ='',
      description = '',
      parentId = 0
    } = categoryData;
    const category = { title, description, parentId};
    console.log(category);
    return database.ref(`categories/${id}`).update(category).then(() => {
      dispatch(editCategory({id, category}))
    });
  };
};

// REMOVE_MAIN_CATEGORY
export const removeMainCategory = (id) => ({
  type: 'REMOVE_MAIN_CATEGORY',
  id
});

export const startRemoveMainCategory = (id) => {
  return (dispatch) => {
    return database.ref(`categories/${id}`).remove().then(() => {
      dispatch(removeMainCategory(id))
    });
  }
}

// GET_MAIN_CATEGORIES
export const getMainCategories = (categories) => ({
  type: 'GET_MAIN_CATEGORIES',
  categories
});

export const getCategories = () => {
  return (dispatch) => {
    return database.ref('categories').once('value').then((snapshot) => {
      const categories = [];
      snapshot.forEach((childSnapshot) => {
        categories.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      dispatch(getMainCategories(categories));
    });
  };
}