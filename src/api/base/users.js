import {createAPI} from '@/utils/request'

export const queryPage = data => createAPI(`/api/system/pe/user/queryPage?page=${data.page}&limit=${data.limit}`, 'post', data)
export const simple = data => createAPI('/api/system/pe/user/simple', 'get', null)
export const add = data => createAPI('/api/system/pe/user/save', 'post', data)
export const update = data => createAPI(`/api/system/pe/user/update`, 'put', data)
export const remove = data => createAPI(`/api/system/pe/user/delete`, 'delete', data)
export const detail = data => createAPI(`/api/system/pe/user/infoAndRole/${data.id}`, 'get', null)
export const assignRoles = data => createAPI(`/api/system/pe/userrole/assignRoles`, 'put', data)
