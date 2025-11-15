export const URL_BASE = 'http://localhost:3000';

export const GET_PRODUCTS_ENDPOINT = '/product';

const USER_SUBPATH = '/user';

export const SIGN_IN_ENDPOINT = `${USER_SUBPATH}/signin`;

export const SIGN_UP_ENDPOINT = `${USER_SUBPATH}/signup`;

export const GET_USER_ENDPOINT = `${USER_SUBPATH}/`;

const CART_SUBPATH = '/cart';

export const GET_CART_ENDPOINT = `${CART_SUBPATH}/`;

export const ADD_TO_CART_ENDPOINT = `${CART_SUBPATH}/addItem`;

export const UPDATE_CART_ITEM_ENDPOINT = `${CART_SUBPATH}/updateItem`;

export const DELETE_CART_ITEM_ENDPOINT = `${CART_SUBPATH}/deleteItem`;

export const LOCALSTORAGE_TOKEN_KEY = 'authToken';