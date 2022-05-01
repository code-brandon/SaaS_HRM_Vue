import {createAPI, createFormAPI} from '@/utils/request'

export const list = data => createAPI('/attendances/:month', 'get', data)
// 考勤列表
export const attendancesList = data => createAPI(`/api/attendance/atte/attendance/queryAtte?page=${data.page.page}&limit=${data.page.limit}`, 'post', data.data)
// export const information = data => createAPI('/attendances', 'get', data)
export const importFill = data => createAPI('/attendances/import', 'post', data)
// 考勤修改
export const modify = data => createAPI(`/api/attendance/atte/attendance/updateOrSave`, 'put', data)
export const alert = data => createAPI('/notify/mail', 'post', data)

// 查询年份归档
export const getArchivingList = data => createAPI('/api/attendance/atte/archivemonthly/queryPage', 'post', data) // 归档
// 查询考勤归档详细信息
export const getArchivingCont = data => createAPI(`/api/attendance/atte/archivemonthlyinfo/list/${data.atteArchiveMonthlyId}`, 'get', null)
export const reportFormList = data => createAPI(`/api/attendance/atte/archivemonthlyinfo/queryPageAndDate`, 'post', data)
export const importAccount = data => createAPI('/attendances/import', 'post', data)

export const archives = data => createAPI(`/api/attendance/atte/archivemonthly/saveArchive`, 'post', data)

// 新建考勤报表
export const newReports = data => createAPI('/api/attendance/atte/companysettings/save', 'post', data)

export const importReport = data => createAPI('/report/atte/export', 'post', data)
export const importArchive = data => createAPI('/archive/atte/export', 'post', data)
