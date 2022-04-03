import {createAPI} from '@/utils/request'

// 查询部门列表
export const list = data => createAPI('/api/company/co/department/departments/1', 'get', data)
// 保存部门
// data  {id：“”，name：“”}
export const save = data => createAPI('/api/company/co/department/save', 'post', data)
// 根据id查询部门 {id：“”}
export const find = data => createAPI(`/api/company/co/department/info/${data.id}`, 'get', data)
// 根据id删除部门 {id:""}
export const deleteById = data => createAPI(`/api/company/co/department/delete`, 'delete', data)
// 根据id更新部门 {id:"",name:"",code:""}
export const update = data => createAPI(`/api/company/co/department/update`, 'put', data)
// 保存或更新的方法
export const saveOrupdate = data => { return data.id ? update(data) : save(data) }

// 考勤配置保存更新
export const attendanceSave = data => createAPI(`/cfg/atte`, 'put', data)
export const getAttendance = data => createFormAPI(`/cfg/atte/item`, 'post', data)
// 请假配置保存更新
export const leaveSave = data => createAPI(`/cfg/leave`, 'put', data)
export const getLeave = data => createFormAPI(`/cfg/leave/list`, 'post', data)
// 扣款配置保存更新
export const deductionsSave = data => createAPI(`/cfg/deduction`, 'put', data)
export const getDeductions = data => createFormAPI(`/cfg/ded/list`, 'post', data)
// 加班配置保存更新
export const overtimeSave = data => createAPI(`/cfg/extDuty`, 'put', data)
export const getOvertime = data => createFormAPI(`/cfg/extDuty/item`, 'post', data)
export const archive = data => createAPI(`/attendances/archive/item`, 'get', data)
