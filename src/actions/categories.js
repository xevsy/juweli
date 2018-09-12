import database from '../firebase/firebase';

// ADD_CATEGORY
export const addCategory = (category) => ({
  type: 'ADD_CATEGORY',
  category
});

export const startAddCategory = (categoryData = {}) => {
  return (dispatch) => {
    const {
      title ='',
      description = ''
    } = categoryData;
    const category = { title, description };
    return database.ref('categories').push(category).then((ref) => {
      dispatch(addCategory({
        id: ref.key,
        ...category
      }))
    });
  };
};

// SET_MAIN_CATEGORIES
export const setMainCategories = (categories) => ({
  type: 'SET_MAIN_CATEGORIES',
  categories
});

export const startSetCategories = () => {
  return (dispatch) => {
    return database.ref('categories').once('value').then((snapshot) => {
      const categories = [];
      snapshot.forEach((childSnapshot) => {
        categories.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      dispatch(setMainCategories(categories));
    });
  };
}