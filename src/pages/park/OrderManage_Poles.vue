<template>
    <section>
        <common-table
        		:showdelete="showdelete"
        		:editapi="editapi"
        		:addtitle="addtitle"
        		:showEdit="showEdit"
        		:delapi="delapi"
        		:addapi="addapi"
                :queryapi="queryapi"
                :exportapi="exportapi"
                :tableheight="tableheight"
                :fieldsstr="fieldsstr"
                :tableitems="tableitems"
                :btswidth="btswidth"
                :hide-export="hideExport"
                :hide-options="hideOptions"
                :searchtitle="searchtitle"
                :hideTool="hideTool"
                :hideSearch="hideSearch"
                :hideAdd="hideAdd"
                :showImg="showImg"
                :imgapi="imgapi"
                ref="bolinkuniontable"
        ></common-table>
        
    </section>
</template>


<script>
    import {path,isLeave} from '../../api/api';
    import common from '../../common/js/common'
    import {AUTH_ID} from '../../common/js/const'
    import CommonTable from '../../components/CommonTable'
    import axios from 'axios'

    export default {
        components: {
            CommonTable
        },
        data() {
            return {
            	showdelete:true,
            	showEdit:true,
                loading: false,
                hideExport: false,
                hideSearch: false,

                hideAdd: false,
                tableheight: '',
                showdelete: true,
                hideOptions: false,

                hideTool: false,
                showImg: false,

                queryapi: '/employee/query',
                addapi:'/employee/create',
                exportapi: '/liftRod/exportExcel',
                imgapi: '/liftRod/getLiftRodPicture',
                editapi: '/employee/create',
                delapi: '/employee/delete',
                btswidth: '100',
                fieldsstr: 'id__liftrod_id__ctime__uin__out_channel_id__reason__resume__url',
                tableitems: [
                    {

                        hasSubs: false,
                        subs: [{
                            label: '员工编号',
                            prop: 'id',
                            width: '100',
                            type: 'str',
							editable: false,
                            searchable: true,
                            addable: false,
                            unsortable: true,
                            align: 'center'
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '员工姓名',
                            prop: 'name',
                            width: '123',
                            type: 'str',
							editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '身份证地址',
                            prop: 'address',
                            width: '300',
                            type: 'str',
							editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '身份证号码',
                            prop: 'card_id',
                            width: '220',
                            type: 'str',
							editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '手机',
                            prop: 'phone',
                            width: '180',
                            type: 'str',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '所属部门',
                            prop: 'department_id',
                            width: '123',
                            type: 'selection',
                            selectlist: this.reasons,
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format: (row) => {
                                 return common.nameformat(row, this.reasons, 'department_id')
                            }
                        }]
                    },  {

                        hasSubs: false,
                        subs: [{
                            label: '薪水',
                            prop: 'salary',
                            width: '123',
                            type: 'number',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    },{
						hasSubs: false,
                        subs: [{
                            label: '短号',
                            prop: 'short_number',
                            width: '100',
                            type: 'str',
                            editable: true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                        
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '是否离职',
                            prop: 'isleave',
                            width: '123',
                            type: 'selection',
                            selectlist: isLeave,
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format:function(row){
                            	if(row.isleave==1){
                            		return "已经离职"
                            	}else{
                            		return "在职"
                            	}
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '入职时间',
                            prop: 'begin_time',
                            width: '180',
                            type: 'date',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format:function(row){
                            	return common.dateformat(row.end_time);
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '离职时间',
                            prop: 'end_time',
                            width: '180',
                            type: 'date',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format:function(row){
                            	return common.dateformat(row.end_time);
                            }
                        }]
                    }, {
                        hasSubs: false,
                        subs: [{
                            label: '离职原因',
                            prop: 'leaving_reason',
                            width: '200',
                            type: 'str',
                            editable: true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    },{

                        hasSubs: false,
                        subs: [{
                            label: '描述',
                            prop: 'describe',
                            width: '250',
                            type: 'str',
                            editable: true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }
                    

                ],
                addtitle:"添加员工",
                searchtitle: '高级查询',
                imgDialog: false,
                imgdialog_url: '',
                collectors: [],
                reasons: []
            }
        },
        methods: {
            
        },
        mounted() {
            window.onresize = () => {
                this.tableheight = common.gwh() - 143;
            }
            this.tableheight = common.gwh() - 143;
            var user = sessionStorage.getItem('user');
            this.user = user
            if (user) {
                user = JSON.parse(user);
                console.log(user.authlist.length)
                for (var item of user.authlist) {
                    if (AUTH_ID.showOrderManage_Poles_auth_id == item.auth_id) {
                        // console.log(item.sub_auth)
                        this.hideExport = !common.showSubExport(item.sub_auth)
                        this.hideSearch = !common.showSubSearch(item.sub_auth)
                        break;
                    }
                }

            }


        },
        activated() {
            window.onresize = () => {
                this.tableheight = common.gwh() - 143;
            }
            this.tableheight = common.gwh() - 143;
            
            let _this = this
            axios.all([common.getDepartments()])
                .then(axios.spread(function (reason) {
                    //_this.collectors = collector.data;
                    _this.reasons = reason.data;
                }))
            this.$refs['bolinkuniontable'].$refs['search'].resetSearch()
            this.$refs['bolinkuniontable'].getTableData({})
        },
        watch: {
            collectors: function (val) {
                this.tableitems[3].subs[0].selectlist = val
            },
            reasons: function (val) {
                this.tableitems[5].subs[0].selectlist = val
            }
        }
    }

</script>

<style>
    .gutter {
        display: none
    }
</style>

