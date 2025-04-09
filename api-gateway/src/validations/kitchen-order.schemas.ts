import * as yup from 'yup';


export const orderSchema = yup.object().shape({
  orders: yup.number().required('Orders is required').max(30, 'You can send a maximum of 30 orders')
});
