import {createAPI} from '@/utils/request'

const api = "/api/system/pe/permission"
export const list = data => createAPI(`${api}/queryPage`, 'post', data)
export const add = data => createAPI(`${api}/save`, 'post', data)
export const update = data => createAPI(`${api}/update`, 'put', data)
export const remove = data => createAPI(`${api}/delete`, 'delete', data)
export const detail = data => createAPI(`${api}/info/${data.id}`, 'get', data)
export const saveOrUpdate = data => {return data.id?update(data):add(data)}
