const languageReducerDefaultState = 'en';

export default (state = languageReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return action.language;
    default:
      return state;
  }
};