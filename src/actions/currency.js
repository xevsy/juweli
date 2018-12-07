import database from '../firebase/firebase';

// CHANGE_CURRENCY_RATE
export const changeCurrencyRate = (currency) => ({
  type: 'CHANGE_CURRENCY_RATE',
  currency
});

export const startUpdateCurrencyRate = (currencyRateData = {}) => {
  return (dispatch) => {
    const {
      usd = 0,
      eur = 0
    } = currencyRateData;
    const currency = { usd, eur };
    return database.ref('currency').update(currency).then(() => {
      dispatch(changeCurrencyRate(currency))
    });
  };
};

// GET_CURRENCY_RATE
export const getCurrencyRate = (currency) => ({
  type: 'GET_CURRENCY_RATE',
  currency
});

export const getCurrency = () => {
  return (dispatch) => {
    return database.ref('currency').once('value').then((snapshot) => {
      let currency = {}
      snapshot.forEach((childSnapshot) => {
        currency = {
          ...currency,
          ...{[childSnapshot.key]: childSnapshot.val()}
        }
      });
      dispatch(getCurrencyRate(currency));
    });
  };
}