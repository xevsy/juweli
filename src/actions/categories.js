import database from '../firebase/firebase'

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
      images = [],
    } = categoryData;
    const category = { title, description, parentId, images };
    return database.ref('categories').push(category).then((ref) => {
      dispatch(addCategory({
        id: ref.key,
        ...category
      }))
    });
  };
};

// EDIT_CATEGORY
export const editCategory = (id, updates) => (console.log(updates) || {
  type: 'EDIT_CATEGORY',
  id,
  updates
});

export const startEditCategory = (id, categoryData = {}) => {
  return (dispatch) => {
    const {
      title ='',
      description = '',
      parentId = 0,
      images = [],
    } = categoryData;
    const category = { title, description, parentId, images };
    return database.ref(`categories/${id}`).update(category).then(() => {
      dispatch(editCategory(id, category))
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
  categories: categories
});

// GET_MAIN_PARENT_CATEGORIES
export const getMainParentCategories = (categories) => ({
  type: 'GET_MAIN_PARENT_CATEGORIES',
  categories: categories
});

// GET_MAIN_NESTED_CATEGORIES
export const getMainNestedCategories = (categories) => ({
  type: 'GET_MAIN_NESTED_CATEGORIES',
  categories: categories
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

export const getParentCategories = () => {
  return (dispatch) => {
    return database.ref('categories').orderByChild("parentId").equalTo(0).once('value').then((snapshot) => {
      const categories = [];
      snapshot.forEach((childSnapshot) => {
        categories.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      dispatch(getMainParentCategories(categories));
    });
  };
}

export const getNestedCategories = () => {
  return (dispatch) => {
    return database.ref('categories').orderByChild("parentId").once('value').then((snapshot) => {
      let categories = {};
      snapshot.forEach((childSnapshot) => {
        const parentId = childSnapshot.val().parentId;
        if (parentId === 0) {
          categories[childSnapshot.key] = childSnapshot.val();
        } else {
          if (!categories[parentId].subcategory) {
            categories[parentId].subcategory = {};
          }
          categories[parentId].subcategory[childSnapshot.key] = childSnapshot.val();
        }
      });
      dispatch(getMainNestedCategories(categories));
    });
  };
}