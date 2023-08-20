import {all, fork} from 'redux-saga/effects';
import regUser from './regUser';
import getUSer from './getUser';
import getUserFromToken from './getUserFromToken';
import profileUpdate from './profileUpdate';
import createProduct from './createProduct';
import getAllProducts from './getAllProducts';
import getProducts from './getUsersProduct';
import deleteProduct from './deleteProduct';
import editProduct from './editProduct';

export default function* watchers() {
    yield all([
        regUser,
        getUSer,
        getUserFromToken,
        profileUpdate,
        createProduct,
        getAllProducts,
        getProducts,
        deleteProduct,
        editProduct,
    ].map(fork))
}
