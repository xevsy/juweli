export const setLanguage = (language) => {
  return (dispatch) => {
    dispatch({type: 'SET_LANGUAGE', language})
  }
};

export const getLanguage = () => {
  return (dispatch) => {
    dispatch({type: 'GET_LANGUAGE'})
  }
};
