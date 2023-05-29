import { IProducts } from "../type/products"
import { instance } from "./instance"

export const getAllProducts = () => {
    return instance.get('/products')
}

export const getOneProduct = (id: number) => {
    return instance.get('/products/' + id)
}

export const addProduct = (product: IProducts) => {
    return instance.post('/products', product)
}

export const updateProducts = (products: IProducts) => {
    return instance.put('/products/' + products.id, products)
}

export const removeProducts = (id: number) => {
    return instance.delete('/products/' + id)
}