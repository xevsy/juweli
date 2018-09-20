import database from '../firebase/firebase';

// ADD_CATEGORY
export const addTag = (category) => ({
  type: 'ADD_TAG',
  category
});

export const startAddTag = (tagData = {}) => {
  return (dispatch) => {
    const {
      name =''
    } = tagData;
    const tag = { name };
    return database.ref('tags').push(tag).then((ref) => {
      dispatch(addTag({
        id: ref.key,
        ...tag
      }))
    });
  };
};

// GET_MAIN_TAGS
export const getMainTags = (tags) => ({
  type: 'GET_MAIN_TAGS',
  tags
});

export const getTags = () => {
  return (dispatch) => {
    return database.ref('tags').once('value').then((snapshot) => {
      const tags = [];
      snapshot.forEach((childSnapshot) => {
        tags.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      dispatch(getMainTags(tags));
    });
  };
}
