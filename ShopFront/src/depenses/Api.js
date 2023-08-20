import axios from 'axios';
import toFormData from 'object-to-formdata'

const api = axios.create({
    baseURL: 'http://localhost:8000',
});

class Api {
    static registration(formData) {
        return api.post('/user/registration',
            toFormData.serialize(formData)
        )
    }

    static profileUpdate(formData) {
        return api.post('/user/profileUpdate',
            toFormData.serialize(formData)
        )
    }

    static createProduct(formData) {
        return api.post('userProducts/createProduct',
            toFormData.serialize(formData)
        )
    }

    static getUser(formData) {
        return api.post('/user/login', {formData})
    }

    static getUserFromToken(token) {
        return api.post('/user/getUserFromToken', {token: token})
    }

    static getAllProducts(page) {
        return api.post('/userProducts/getAllProducts', page)
    }

    static getUserProducts(page) {
        return api.post('/userProducts/get', page)
    }

    static userProductsDelete(data) {
        return api.post('/userProducts/delete', data)
    }

    static userProductsUpdate(data) {
        return api.post('/userProducts/update',
            toFormData.serialize(data)
            )
    }
}

export default Api;
