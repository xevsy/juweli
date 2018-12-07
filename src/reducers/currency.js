const currencyReducerDefaultState = [];

export default (state = currencyReducerDefaultState, action) => {
  switch (action.type) {
    case 'CHANGE_CURRENCY_RATE':
      return {
        ...state,
        ...action.currency
    };
    case 'GET_CURRENCY_RATE':
      return action.currency;
    default:
      return state;
  }
};