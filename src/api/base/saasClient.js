import {createAPI, createFormAPI} from '@/utils/request'

export const list = data => createAPI(`/api/company/co/company/queryPage?page=${data.page}&limit=${data.limit}`, 'post', data)
export const detail = data => createAPI(`/api/company/co/company/info/${data.id}`, 'get', data)
