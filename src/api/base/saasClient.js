import {createAPI, createFormAPI} from '@/utils/request'

export const list = data => createAPI('/api/company/co/company/page', 'get', data)
export const detail = data => createAPI(`/api/company/co/company/info/${data.id}`, 'get', data)
