import axios from 'axios'
import {path, RoleFuncion} from '../../api/api'

export default {

    dateformat: function (longtime) {
        if (longtime == "" || longtime == null) {
            return ""
        }
        var nTime = new Date(longtime * 1000);
        var month = nTime.getMonth() + 1;
        var day = nTime.getDate();
        var hour = nTime.getHours();
        var minute = nTime.getMinutes();
        var second = nTime.getSeconds();
        return nTime.getFullYear() + "-" + (month < 10 ? ("0" + month) : month) + "-" + (day < 10 ? ("0" + day) : day) + " " + (hour < 10 ? ("0" + hour) : hour) + ":" + (minute < 10 ? ("0" + minute) : minute) + ":" + (second < 10 ? ("0" + second) : second)
    },
    dateformatonly: function (longtime) {
        if (longtime == "" || longtime == null) {
            return ""
        }
        var nTime = new Date(longtime * 1000);
        var month = nTime.getMonth() + 1;
        var day = nTime.getDate();
        var hour = nTime.getHours();
        var minute = nTime.getMinutes();
        var second = nTime.getSeconds();
        return nTime.getFullYear() + "-" + (month < 10 ? ("0" + month) : month) + "-" + (day < 10 ? ("0" + day) : day)
    },
    datetosecond: function (d) {
        return Math.round((d.getTime()) / 1000)
    },
    secondtodate: function (d) {
        return Math.round((d.getTime()) * 1000)
    },
    getordertype: function (order) {
        if (order.substring(0, 1) == 'a') {
            return order.substring(0, 3);
        } else {
            return order.substring(0, 4);
        }
    },
    gww: function (_w) {
        var w, _w = _w ? _w : 0;
        if (window.innerWidth) {
            w = window.innerWidth;
        } else {
            w = document.documentElement.offsetWidth || document.body.clientWidth || 0;
        }
        ;
        w = w < _w ? _w : w;
        return parseInt(w);
    },
    gwh: function (_h) {
        var h, _h = _h ? _h : 0;
        if (window.innerHeight) {
            h = window.innerHeight;
        } else {
            h = document.documentElement.offsetHeight || document.body.clientHeight || 0;
        }
        ;
        h = h < _h ? _h : h;
        return parseInt(h);
    },
    clone: function (obj) {
        var o, i, j, k;
        if (typeof(obj) != "object" || obj === null) return obj;
        if (obj instanceof (Array)) {
            o = [];
            i = 0;
            j = obj.length;
            for (; i < j; i++) {
                if (typeof(obj[i]) == "object" && obj[i] != null) {
                    o[i] = arguments.callee(obj[i]);
                }
                else {
                    o[i] = obj[i];
                }
            }
        }
        else {
            o = {};
            for (i in obj) {
                if (typeof(obj[i]) == "object" && obj[i] != null) {
                    o[i] = arguments.callee(obj[i]);
                }
                else {
                    o[i] = obj[i];
                }
            }
        }

        return o;
    },
    intervalchange: function (vm, val, field) {
        var start = field + 'start';
        var end = field + 'end';

        if (val == "between") {
            vm.searchShow[start] = true;
            vm.searchShow[end] = true;
        } else if (val == "null") {
            vm.searchShow[start] = false;
            vm.searchShow[end] = false;
        } else {
            vm.searchShow[start] = true;
            vm.searchShow[end] = false;
        }
    },
    stateformat: function (state) {
        if (state == 0) return "未审核"
        if (state == 1) return "已审核"
        if (state == 2) return "禁用"
        if (state == 3) return "已锁定"
    },
    ynformat: function (state) {
        if (state == 0) return "否"
        if (state == 1) return "是"
    },
    balanceformat: function (balance, digit) {
        if (balance == null) {
            return '-'
        } else {
            return balance.toFixed(digit) + ' 元'
        }
    },
    nameformat: function (row, list, col) {
        for (var x in list) {
            // console.log('for '+x)
            // console.log('value_no '+list[x].value_no)
            // console.log('row '+row[col])
            if (row[col] == null) {
                if (col == 'com_id') {
                    return '(未知车场)'
                } else if (col == 'car_union_id') {
                    return '-'
                } else if (col == 'server_id') {
                    return '(无服务商)'
                } else {
                    return ''
                }
            }
            // console.log(list)
            // console.log(x+'?'+list[x].value_no+'?'+row[col])
            if (list[x].value_no == row[col]) {
                return list[x].value_name
            }
        }
    },
    funcformat: function (is_collector, is_inspect, is_opencard) {
        if (is_collector == 1) {
            return RoleFuncion[1].value_name
        }
        if (is_inspect == 1) {
            return RoleFuncion[2].value_name
        }
        if (is_opencard == 1) {
            return RoleFuncion[3].value_name
        }
        return RoleFuncion[0].value_name
    },
    genderformat: function (row) {

    },
    getWorkSite_id(){
        let param = '?token=' + sessionStorage.getItem('token')
            + '&comid=' + sessionStorage.getItem('comid');
        return axios.get(path + '/getdata/getWorkSiteId' + param)
    },
    getChannelType(){
        let param = '?token=' + sessionStorage.getItem('token')
            + '&comid=' + sessionStorage.getItem('comid');
        return axios.get(path + '/getdata/getChannelType' + param)
    },
    getMonitorName() {
        let param = '?token=' + sessionStorage.getItem('token')
            + '&comid=' + sessionStorage.getItem('comid');
        return axios.get(path + '/getdata/getMonitorName' + param)

    },
    getUnionList: function (params) {
        let param = '?token=' + sessionStorage.getItem('token')
        if (typeof(params) != 'undefined') {
            param += params
        }
        return axios.get(path + '/getdata/unionlist' + param)
    },
    getServerList: function (params) {
        let param = '?token=' + sessionStorage.getItem('token')
        if (typeof(params) != 'undefined') {
            param += params
        }
        return axios.get(path + '/getdata/serverlist' + param)
    },
    getParkList: function (params) {
        let param = '?token=' + sessionStorage.getItem('token')
        if (typeof(params) != 'undefined') {
            param += params
        }
        return axios.get(path + '/getdata/parklist' + param)
    },
    getParkLists: function (params) {
        let param = '?token=' + sessionStorage.getItem('token')
        return axios.get(path + '/getdata/parklists' + param)
    },
    getBaPayUnionList: function () {
        let param = '?token=' + sessionStorage.getItem('token')
        return axios.get(path + '/getdata/payunionlist' + param)
    },
    getBankInfo: function () {
        let param = '?token=' + sessionStorage.getItem('token')
        return axios.get(path + '/getdata/getbankinfo' + param)
    },
    getCentralPaymentList: function (params) {
        let param = '?token=' + sessionStorage.getItem('token')
        if (typeof(params) != 'undefined') {
            param += params
        }
        return axios.get(path + '/getdata/getcentralpaymentlist' + param)
    },
    getEventLists() {
        let param = '?token=' + sessionStorage.getItem('token')
        return axios.get(path + '/getdata/geteventlist' + param)
    },
    getCollector() {
        //获取收费员
        let param = '?token=' + sessionStorage.getItem('token')
            + '&comid=' + sessionStorage.getItem('comid')
            + '&groupid=' + sessionStorage.getItem('groupid')
        return axios.get(path + '/getdata/getalluser' + param)
    },
    getLiftReason() {
        //获取收费员
        let param = '?token=' + sessionStorage.getItem('token')
        return axios.get(path + '/liftRod/getLiftReason' + param)
    },
    getDepartments() {
        //获取收费员
        let param = '?token=' + sessionStorage.getItem('token')
        return axios.get(path + '/department/getDepartments' + param)
    },
    getProductClassity() {
        //获取收费员
        let param = '?token=' + sessionStorage.getItem('token')
        return axios.get(path + '/ysproductclassify/getProductClassity' + param)
    },
    getProducts() {
        //获取收费员
        let param = '?token=' + sessionStorage.getItem('token')
        return axios.get(path + '/ysproduct/getProducts' + param)
    },getProductMsg(product_id) {
        //获取收费员
        let param = '?token=' + sessionStorage.getItem('token')+'&product_id='+product_id
        return axios.get(path + '/ysproduct/getProductMsg' + param)
    },
    getEmployeeRole() {
        //获取员工角色
        let param = '?token=' + sessionStorage.getItem('token')
            + '&comid=' + sessionStorage.getItem('comid')
            + '&loginuin=' + sessionStorage.getItem('loginuin')
        return axios.get(path + '/member/getrole' + param)
    },
    getPName() {
        //获得月卡套餐
        let param = '?token=' + sessionStorage.getItem('token')
            + '&comid=' + sessionStorage.getItem('comid')
            + '&loginuin=' + sessionStorage.getItem('loginuin')
        return axios.get(path + '/getdata/getpname' + param)
    },
    getCarType() {
        //获得车型类型
        let param = '?token=' + sessionStorage.getItem('token')
            + '&comid=' + sessionStorage.getItem('comid')
            + '&groupid=' + sessionStorage.getItem('groupid')
        return axios.get(path + '/getdata/getcartype' + param)
    },
    editCarNum(carnumber,id){
        //更改车牌号
        let param = '?token=' + sessionStorage.getItem('token')
            + '&comid=' + sessionStorage.getItem('comid')
            + '&id=' + id
            + '&carnumber=' + encodeURI(encodeURI(carnumber))
        return axios.get(path + '/vip/editCarNum' + param)
    },
    getProdSum(p_name,month){
        //通过续费月数和月卡套餐获取金额
        let param = '?token=' + sessionStorage.getItem('token')
            + '&comid=' + sessionStorage.getItem('comid')
            + '&loginuin=' + sessionStorage.getItem('loginuin')
            + '&p_name=' + p_name
            + '&months=' + month
        return axios.get(path + '/getdata/getprodsum' + param)
    },
    reNewProduct(p_name,month,name,b_time,id,remark,act_total,nickname){
    // reNewProduct(this.pnameno,this.refillcount,this.currentRow.name,this.Btime,this.currentRow.pid,this.currentRow.remark,this.RefillTotalact,roleid==30?'车场':roleid){
        //月卡续费
        let param = '?token=' + sessionStorage.getItem('token')
            + '&comid=' + sessionStorage.getItem('comid')
            + '&loginuin=' + sessionStorage.getItem('loginuin')
            + '&p_name=' + p_name
            + '&months=' + month
            + '&name=' + name
            + '&b_time=' + b_time
            + '&id=' + id
            + '&remark=' + remark
            + '&act_total=' + act_total
            + '&nickname=' + nickname
        return axios.get(path + '/vip/renewproduct' + param)
    },
    getLength: function (obj) {
        var count = 0;
        for (var key in obj) {
            count++
        }
        return count
    },
    transform: function (obj) {
        return []
    },
    paytypeformat: function (paytype) {
        if (paytype == 0) return "主扫"
        if (paytype == 1) return "被扫"
        if (paytype == 2) return "免密"
        if (paytype == 3) return "现金"
    },
    paychannelformat: function (paychennel) {
        if (paychennel == 0) return "微信"
        if (paychennel == 1) return "支付宝"
        if (paychennel == 2) return "余额"
        if (paychennel == 3) return "银联"
    },
    // pageShow: function (pageName,pagename2) {
    //     var user = sessionStorage.getItem('user');
    //     this.user = user
    //     if (user) {
    //         user = JSON.parse(user)
    //         this.sysUserName = user.nickname || ''
    //         // console.log(user.authlist.length)
    //         // OrderManage_auth_id:2,//订单管理
    //         for (var item of user.authlist) {
    //
    //             if (pageName == item.nname) {
    //             // if (pageName == item.auth_id) {
    //                 console.log(pagename2+'_auth_id:'+item.auth_id+',//'+pageName)
    //                 return true
    //             }
    //         }
    //     }
    //     return false
    // }
    pageShow: function (user, pageName) {
        // console.log(user.authlist.length)
        // OrderManage_auth_id:2,//订单管理
        for (var item of user.authlist) {
            if (pageName == item.auth_id) {
                return true
            }
        }

        return false
    },
    showSubSearch: function (sub_auth) {
        //显示高级查询
        if (sub_auth.indexOf('查看') > -1) {
            return true
        }
        return false
    },
    showSubExport: function (sub_auth) {
        //显示导出
        if (sub_auth.indexOf('导出') > -1) {
            return true
        }
        return false
    },
    showSubAdd: function (sub_auth) {
        //显示新增
        if (sub_auth.indexOf('注册') > -1) {
            return true
        }
        if (sub_auth.indexOf('添加') > -1) {
            return true
        }
        return false
    },
    showSubEdit: function (sub_auth) {
        if (sub_auth.indexOf('编辑') > -1) {
            return true
        }
        return false
    },
    showSubDel: function (sub_auth) {
        if (sub_auth.indexOf('删除') > -1) {
            return true
        }
        return false
    },
    showSubUpdate: function (sub_auth) {
        if (sub_auth.indexOf('修改') > -1) {
            return true
        }
        return false
    },
    showSubReFill: function (sub_auth) {
        if (sub_auth.indexOf('续费') > -1) {
            return true
        }
        return false
    },
    showSubPermission: function (sub_auth) {
        if (sub_auth.indexOf('权限') > -1) {
            return true
        }
        return false
    },
    showSubSetFee: function (sub_auth) {
        if (sub_auth.indexOf('收费设置') > -1) {
            return true
        }
        return false
    },
    showSubReset: function (sub_auth) {
        if (sub_auth.indexOf('修改密码') > -1) {
            return true
        }
        return false
    },
    getShopMemberList(obj){
       	return axios.get(path + '/shopmember/quickquery' + '?token=' + sessionStorage.getItem('token')+'&shop_id='+obj.shop_id+'&page='+obj.page);
    },
    saveShopMember(obj){
    	return axios.get(path + '/shopmember/create' + '?token=' + sessionStorage.getItem('token')
	    	+'&shop_id='+obj.shop_id+'&comid='+obj.comid
	    	+'&nickname='+obj.nickname+'&phone='+obj.phone
	    	+'&mobile='+obj.mobile+'&auth_flag='+obj.auth_flag
	    	+'&userId='+obj.userId);
    },
    addMoney(obj){
    	return axios.get(path + '/shop/addmoney' + '?token=' + sessionStorage.getItem('token')
	    	+'&shop_id='+obj.shop_id+'&addmoney='+obj.addmoney
	    	+'&operator='+obj.operator+'&parkid='+obj.parkid
	    	+'&ticket_time='+obj.ticket_time+'&ticket_money='+obj.ticket_money
    		+'&ticketfree_limit='+obj.ticketfree_limit);
    },
    editPass(obj){
    	return axios.get(path + '/shopmember/editpass' + '?token=' + sessionStorage.getItem('token')
	    	+'&newpass='+obj.newpass+'&confirmpass='+obj.confirmpass
	    	+'&id='+obj.id);
    }
    ,
    deleteShopMember(id){
    	return axios.get(path + '/shopmember/delete' + '?token=' + sessionStorage.getItem('token')+'&id='+id);
    }
}
