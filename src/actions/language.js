import axios from 'axios'
import T from 'i18n-react'

export const setLanguage = (language) => {
  return (dispatch) => {
    axios.get(`/lang/${language || 'en'}.json`).then(res => {
      T.setTexts(res.data);
    });
    dispatch({type: 'SET_LANGUAGE', language})
  }
};