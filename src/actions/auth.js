import { firebase, googleAuthProvider } from '../firebase/firebase';

export const login = (uid, displayName, photoURL) => ({
  type: 'LOGIN',
  uid,
  displayName,
  photoURL
});

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

export { startLogin, startLogout }
