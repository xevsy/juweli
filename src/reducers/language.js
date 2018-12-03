import axios from 'axios'
import T from 'i18n-react'

const languageReducerDefaultState = 'en';

export default (language = languageReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return action.language;
    case 'GET_LANGUAGE':
      const res = axios.get(`/lang/${language}.json`).then(res => {
        T.setTexts(res.data);
      });
      return language;
    default:
      return language;
  }
};