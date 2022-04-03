
import {createAPI, createImgAPI} from '@/utils/request'

export const imgUpload = data => createAPI('/system/upfile', 'post', data)
export const imgDownload = data => createImgAPI(`/system/upfile/${data.id}`, 'get', data)
// 城市列表
export const cityList = data => createAPI('/api/social_security/bs/city/list', 'get', null)
