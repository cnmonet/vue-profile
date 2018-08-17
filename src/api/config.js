import request from '@/utils/request'
export const StMap = {
    0: '关闭',
    1: '开启',
    2: '审核',
    3: '警告',
    4: '等待'
}
export function stFilter(params) {//状态取出
    params = Number(params)
    return StMap[params]
}
export const statusMap = {
    0: 'success',
    1: 'gray',
    2: 'danger',
    3: 'warning',
    4: 'info'
}
export function statusFilter(status) {
    return statusMap[status]
}
export function flowFilter(status) {//流动
    if(status==1) return '收入';
    else if(status==2)return '支出';
    else return '未知';
}
