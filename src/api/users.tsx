import { IUser } from "../type/users"
import { instance } from "./instance"

export const getAllUsers = () => {
    return instance.get('/Users')
}

export const getOneUser = (id: number) => {
    return instance.get('/Users' + id)
}

export const addUser = (User: IUser) => {
    return instance.post('/Users', User)
}

export const updateUser = (User: IUser) => {
    return instance.put('/Users' + User.id, User)
}

export const removeUser = (id: number) => {
    return instance.delete('/Users' + id)
}