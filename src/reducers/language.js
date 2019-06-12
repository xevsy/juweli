const languageReducerDefaultState = 'ru';

export default (language = languageReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return action.language;
    case 'GET_LANGUAGE':
      return language;
    default:
      return language;
  }
};