import { combineReducers } from "redux";
import userRegistration from './userRegistration';
import getUser from './getUser';
import getUserFromToken from './getUserFromToken';
import globalUser from './globalUser';
import profileUpdate from './profileUpdate';
import createProduct from './createProduct';
import getAllProducts from './getAllProducts';
import getUserProducts from './getUserProducts';
import editProduct from './editProduct';

const reducers = combineReducers({
    userRegistration,
    getUser,
    getUserFromToken,
    globalUser,
    profileUpdate,
    createProduct,
    getAllProducts,
    getUserProducts,
    editProduct
})

export default reducers;
