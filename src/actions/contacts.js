// ADD_CONTACTS
import database from '../firebase/firebase'
import { getMainTags } from './tags'

export const addContacts = (data) => ({
  type: 'ADD_CONTACTS',
  data
});

export const setMainContacts = (data = '') => {
  return (dispatch) => {
    return database.ref('contacts').set(data).then((ref) => {
      dispatch(addContacts(data))
    });
  };
};

// GET_CONTACTS
export const getContacts = (data) => ({
  type: 'GET_CONTACTS',
  data
});

export const getMainContacts = () => {
  return (dispatch) => {
    return database.ref('contacts').once('value').then((snapshot) => {
      dispatch(getContacts(snapshot.val()));
    });
  };
}