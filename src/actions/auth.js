import { firebase, googleAuthProvider } from '../firebase/firebase';
import database from '../firebase/firebase'
import { addMessage } from './message'

export const login = (uid, displayName, photoURL, email) => {
  return (dispatch) => {
    return database.ref(`users/${uid}`).update({uid}).then(() => {
      database.ref(`users/${uid}`).once('value').then((snapshot) => {
        dispatch({type: 'LOGIN', uid, displayName, photoURL, email, 'role': snapshot.val().role});
        dispatch(addMessage("ВЫ успешно зашли в систему как " + (displayName ? displayName : email), 'success'));
      });
    });
  };
};

const startLogin = () => {
  return() => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  }
}

export const logout = () => ({
  type: 'LOGOUT'
});

const startLogout = () => {
  return() => {
    return firebase.auth().signOut();
  }
}

export const startSmartLogin = (email, password) => {
  return (dispatch) => {
    firebase.auth().fetchSignInMethodsForEmail(email)
      .then(provider => {
        if(provider.length === 0) {
          return firebase.auth().createUserWithEmailAndPassword(email, password)
        } else if (provider.indexOf("password") === -1) {
          return firebase.auth().signInWithPopup(googleAuthProvider);
        } else {
          return firebase.auth().signInWithEmailAndPassword(email, password);
        }
      }).catch((e) => {
        return dispatch(addMessage(e.message, 'error'));
    });
  }
}

export { startLogin, startLogout }
