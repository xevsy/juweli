import database from '../firebase/firebase'
import moment from 'moment'

// ADD_MAIN_ITEM
export const addNewOrder = (order) => ({
  type: 'ADD_NEW_ORDER',
  order
});

export const applyOrder = (data = {}, bucket = {}) => {
  return (dispatch) => {
    const {
      email,
      phone,
      fio,
      comments,
      delivery,
      deliveryBranch,
      createAt = moment().format()
    } = data;
    const order = {email, phone, fio, comments, delivery, deliveryBranch, order: bucket, createAt}
    return database.ref('orders').push(order).then((ref) => {
      dispatch(addNewOrder({
        id: ref.key,
        ...order
      }))
    });
  };
};

// GET_MAIN_ORDERS
export const getMainOrders = (orders) => ({
  type: 'GET_MAIN_ORDERS',
  orders
});

export const getOrders = () => {
  return (dispatch) => {
    return database.ref('orders').orderByChild('createAt').once('value').then((snapshot) => {
      const orders = [];
      snapshot.forEach((childSnapshot) => {
        orders.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      dispatch(getMainOrders(orders.reverse()));
    });
  };
}