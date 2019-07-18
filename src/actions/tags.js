import database from '../firebase/firebase';

// ADD_CATEGORY
export const addTag = (tag) => ({
  type: 'ADD_TAG',
  tag
});

export const startAddTag = (tagData = {}) => {
  return (dispatch) => {
    const {
      name ='',
      count = 0
    } = tagData;
    const tag = { name, count };
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

// REMOVE_MAIN_CATEGORY
export const removeTag = (id) => ({
  type: 'REMOVE_TAG',
  id
});

export const startRemoveTag = (id) => {
  return (dispatch) => {
    return database.ref(`tags/${id}`).remove().then(() => {
      dispatch(removeTag(id))
    });
  }
}
