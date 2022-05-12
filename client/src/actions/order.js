import api from "../utils/api";
import { setAlert } from "./alert";

import {
  GET_ORDER,
  GET_ORDERS,
  ORDER_ERROR,
  GET_PROFILE,
  PROFILE_ERROR
} from "./types";

export const getOrders = () => async (dispatch) => {
  try {
    const res = await api.get("/seller-card/my-basket");

    console.log(res.data);

    dispatch({
      type: GET_ORDERS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get Seller Card by ID
export const getProductCard = (product) => async (dispatch) => {
  try {
    const res = await api.get(`/seller-card/${product}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const newBasketProduct = (product, history) => async (dispatch) => {
  try {
    const res = await api.post(`/seller-card/add-product-to-basket/${product}`);

    dispatch({
      type: GET_ORDER,
      payload: res.data
    });

    dispatch(setAlert("New order created!", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: ORDER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const newFavoritesProduct = (product, history) => async (dispatch) => {
  try {
    const res = await api.post(
      `/seller-card/add-product-to-favorites/${product}`
    );

    dispatch({
      type: GET_ORDER,
      payload: res.data
    });

    dispatch(setAlert("New order created!", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: ORDER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
