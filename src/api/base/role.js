import {createAPI} from '@/utils/request'
import { get } from 'https';

export const list = data => createAPI('/api/system/pe/role/queryPage', 'post', data)
export const simple = data => createAPI('/api/system/sys/role/simple', 'get', null)
export const add = data => createAPI('/api/system/pe/role/save', 'post', data)
export const update = data => createAPI(`/api/system/pe/role/update`, 'put', data)
export const remove = data => createAPI(`/api/system/pe/role/delete`, 'delete', data)
export const detail = data => createAPI(`/api/system/pe/role/infoAndPerm/${data.id}`, 'get', null)
export const assignPrem = data => createAPI(`/api/system/pe/rolepermission/assignPrem`, 'put', data)
export const findAll = data => createAPI(`/api/system/pe/role/queryList`,'get',null)
