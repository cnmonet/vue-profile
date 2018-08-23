export const stMap={
    0: {title:'关闭',status:'success',color:'#909399',row:'0'},
    1: {title:'正常',status:'gray',color:'#409EFF',row:'1'},
    2: {title:'审核',status:'danger',color:'#F56C6C',row:'2'},
    3: {title:'警告',status:'warning',color:'#E6A23C',row:'3'},
    4: {title:'等待',status:'info',color:'#67C23A',row:'4'},
    5: {title:'等待审核',status:'info',color:'#67C23A',row:'5'},
    6: {title:'确认',status:'info',color:'#67C23A',row:'6'},
    9: {title:'删除',status:'gray',color:'#409EFF',row:'9'},
    
    11: {title:'已下单',status:'info',color:'#67C23A',row:'11'},
    12: {title:'已出库',status:'info',color:'#67C23A',row:'12'},
    13: {title:'已发货',status:'info',color:'#67C23A',row:'13'},
    14: {title:'运输中',status:'info',color:'#67C23A',row:'14'},
    15: {title:'已签收',status:'info',color:'#67C23A',row:'15'},
    16: {title:'申请退款',status:'info',color:'#67C23A',row:'16'},
    17: {title:'退款中',status:'info',color:'#67C23A',row:'17'},
    20: {title:'交易成功',status:'info',color:'#67C23A',row:'20'},
}
export const oauthMap = {
    0: '未知',
    1: '微信',
    2: '支付宝',
    3: 'QQ',
    4: '百度',
    5: 'Github',
    6: 'E-mail',
    7: '手机'
}
export function oauthFilter(params) {//状态取出
    params = Number(params)
    return oauthMap[params]
}
export const roleMap = {
    mall_admin : '商城管理员',
    mall_user  : '商城用户',
    store_admin: '店铺管理员',
    store_work : '店铺员工',
}
export function roleFilter(params) {//状态取出
    return roleMap[params]
}
export const StMap = {
    0: '关闭',
    1: '开启',
    2: '审核',
    3: '警告',
    4: '等待'
}
export function stFilter(params) {//状态取出
    //params = Number(params)
    return stMap[params].title
}
export const statusMap = {
    0: 'success',
    1: 'gray',
    2: 'danger',
    3: 'warning',
    4: 'info'
}
export function statusFilter(status) {
    return stMap[status].status
}
export function flowFilter(status) {//流动
    if(status==1) return '收入';
    else if(status==2)return '支出';
    else return '未知';
}
export function getFixed(num) {//价格取小数部分
    return (int)(num*100-Math.trunc(num)*100);
}
export function getFixed2(num) {//折扣取小数部分
    return (int)((100-num)%10);
}


export const pingjia=[
    {'title':'好评','ico':'el-icon-success',color:'#F56C6C','row':'1'},
    {'title':'中评','ico':'el-icon-warning',color:'#E6A23C','row':'0'},
    {'title':'差评','ico':'el-icon-error',color:'#909399','row':'-1'},
]

