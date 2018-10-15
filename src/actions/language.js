export const setLanguage = (language) => {
  return (dispatch) => {
    dispatch({type: 'SET_LANGUAGE', language})
  }
};