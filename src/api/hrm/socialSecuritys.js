import {createAPI, createFormAPI} from '@/utils/request'

export const list = data => createAPI('/api/social_security/ss/usersocialsecurity/queryPageAndTran', 'post', data)
// 查询当前是否有设置过社保
export const getSettings = data => createAPI('/api/social_security/ss/companysettings/info', 'get')
// 保存设置当前企业的社保信息
export const saveSettings = data => createAPI('/api/social_security/ss/companysettings/save', 'post', data)

export const getTips = data => createAPI(`/api/social_security/ss/tips/${data.yearMonth}`, 'get')

// 用户社保详情
export const getContent = data => createAPI(`/api/social_security/ss/usersocialsecurity/infoAndTran/${data.userId}`, 'get', null)
export const saveContent = data => createAPI(`/api/social_security/ss/usersocialsecurity/saveOrUpdate`, 'put', data)
export const importFill = data => createAPI('/api/social_security/ss/import', 'post', data)
// 获取社保缴费项目
export const paymentItemList = data => createAPI(`/api/social_security/ss/citypaymentitem/items/${data.id}`, 'get')

// 历史归档接口
export const getArchivingList = data => createAPI(`/api/social_security/ss/archive/archiveHistory`, 'post', data)

export const getArchivingCont = data => createAPI(`/api/social_security/ss/archivedetail/queryPageAndTran`, 'post', data)
export const getArchivingExport = data => createAPI(`/api/social_security/ss/historys/${data.yearMonth}/export`, 'get', data)
export const getArchivingFirst = data => createAPI(`/api/social_security/ss/historys/${data.yearMonth}/first`, 'get', data)
export const getArchivingArchive = data => createAPI(`/api/social_security/ss/archive/saveArchive`, 'post', data)

export const newReport = data => createAPI(`/api/social_security/ss/companysettings/update`, 'put', data)
