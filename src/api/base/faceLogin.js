import {createAPI, createImgUpAPI} from '@/utils/request'
// export const checkFace = data => createImgUpAPI(`/api/system/sys/faceLogin/checkFace`, 'post', data)
import axios from 'axios'

export const qrcode = data => createAPI('/api/system/sys/faceLogin/qrcode', 'get', data)
export const codeCheck = data => createAPI(`/api/system/sys/faceLogin/qrcode/${data.code}`, 'get', data)
export const checkFace = (data) => {
    let config = {}
    config.data = data
    config.headers = {
      'Cache-Control': 'no-cache',
      'Content-Type': 'multipart/form-data'
    }
    config.transformRequest = data
    return axios.request({
        baseURL: process.env.BASE_API,
        method: 'post',
        url: '/api/system/sys/faceLogin/checkFace',
        ...config
    })
}
