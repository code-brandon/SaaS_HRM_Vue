import {
  createAPI,
  createDown,
  imgUpload
} from '@/utils/request'

export const list = data => createAPI('/employees', 'get', data)
export const add = data => createAPI('/employees', 'post', data)
export const employeesSimpleList = data => createAPI('/api/employees/em/simple', 'get', data)
export const jobnumber = data => createAPI('/api/employees/em/jobnumber', 'get', data)
export const accountStatus = data => createAPI(`/api/employees/em/${data.id}/accountStatus`, 'PUT', data)
// export const update = data => createAPI(`/api/employees/em/${data.id}`, 'put', data)
export const resignation = data => createAPI(`/api/employees/em/resignation/saveOrUpdate`, 'PUT', data) // 离职
export const resignationDetail = data => createAPI(`/api/employees/em/resignation/info/${data.id}`, 'get', null) // 离职详情

export const adjustPost = data => createAPI(`/api/employees/em/transferposition/saveOrUpdate`, 'PUT', data) // 调岗
export const adjustDetail = data => createAPI(`/api/employees/em/transferposition/info/${data.id}`, 'get', null) // 调岗详情

export const personalDetail = data => createAPI(`/api/employees/em/personal/info/${data.id}`, 'get', null)
export const personal = data => createAPI(`/api/employees/em/personal/saveOrUpdate`, 'PUT', data) // 员工信息

export const jobsDetail = data => createAPI(`/api/employees/em/jobs/info/${data.id}`, 'get', null)
export const postDetail = data => createAPI(`/api/employees/em/jobs/saveOrUpdate`, 'PUT', data) // 岗位信息

export const positiveDetail = data => createAPI(`/api/employees/em/positive/info/${data.id}`, 'get', null) // 转正详情
export const positive = data => createAPI(`/api/employees/em/positive/saveOrUpdate`, 'PUT', data) // 转正
export const edit = data => createAPI(`/api/employees/em/${data.id}`, 'PUT', data) // 编辑

export const importDown = data => createDown(`/api/employees/em/archive/export/${data.month}`, 'get', data) // 导出

export const importReport = data => createAPI(`/api/system/pe/user/import`, 'post', data) // 导入

export const settDetail = data => createAPI(`/api/employees/em/setting`, 'get', data) // 设置详细信息
export const settSave = data => createAPI(`/api/employees/em/setting`, 'PUT', data) // 设置

export const refort = data => createAPI(`/api/employees/em/archives/${data.month}`, 'get', data) // 报表
export const getArchivingList = data => createAPI('/employees/archives', 'get', data) // 归档
export const fileUpdate = data => createAPI(`/api/employees/em/archives/${data.month}`, 'PUT', data) // 归档
