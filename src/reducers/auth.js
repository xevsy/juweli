export default (state = {errorMessage: ''}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        uid: action.uid,
        displayName: action.displayName,
        photoURL: action.photoURL,
        email: action.email,
        role: action.role,
        errorMessage: ''
      };
    case 'LOGOUT':
      return {};
    case 'LOGIN_ERROR':
      return {
        ...state,
        errorMessage: action.message
      }
    default:
      return state;
  }
}
