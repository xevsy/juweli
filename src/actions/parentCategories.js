// GET_PARENT_CATEGORIES
import database from '../firebase/firebase'

export const getMainParentCategories = (parentCategories) => ({
  type: 'GET_PARENT_CATEGORIES',
  parentCategories
});

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