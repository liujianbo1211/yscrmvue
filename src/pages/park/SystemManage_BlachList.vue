<template>
    <section>
        <common-table
                :queryapi="queryapi"
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
                :showEdit="showEdit"
                :showdelete="showdelete"
                :addtitle="addtitle"
                :addapi="addapi"
                :delapi="delapi"
                :editapi="editapi"
                :addFormRules="addFormRules"
                ref="bolinkuniontable"
        ></common-table>
    </section>
</template>


<script>
    import {blackStateType} from '../../api/api';
    import common from '../../common/js/common'
    import {AUTH_ID} from '../../common/js/const'
    import CommonTable from '../../components/CommonTable'

    export default {
        components: {
            CommonTable
        },
        data() {
            return {
                loading: false,
                hideExport: true,
                hideSearch: true,

                hideAdd: false,
                tableheight: '',
                showdelete: true,
                hideOptions: false,

                hideTool: false,
                showEdit: true,
                showdelete: true,
                queryapi: '/customer/query',
                addapi: '/customer/add',
                delapi: '/customer/delete',
                editapi: '/customer/add',
                btswidth: '100',
                fieldsstr: 'id__car_number__ctime__utime__remark__operator__state',
                tableitems: [
                    {

                        hasSubs: false,
                        subs: [{
                            label: '编号',
                            prop: 'id',
                            width: '123',
                            type: 'number',
                            searchable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    },
                    {
                        hasSubs: false, subs: [
                            {
                                label: '姓名',
                                prop: 'name',
                                width: '123',
                                type: 'str',
                                editable: true,
                                searchable: true,
                                addable: true,
                                unsortable: true,
                                align: 'center',
                            },
                        ]
                    },
                    {

                        hasSubs: false,
                        subs: [{
                            label: '地区',
                            prop: 'address',
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
                            label: 'QQ号码',
                            prop: 'qq',
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
                            label: '邮箱',
                            prop: 'email',
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
                            label: '创建时间',
                            prop: 'begin_time',
                            width: '180',
                            type: 'date',
                            editable: false,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format: function (row) {
                                return common.dateformat(row.begin_time)
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '备注',
                            prop: 'describe',
                            width: '250',
                            type: 'str',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }


                ],
                searchtitle: '高级查询',
                addtitle: '添加客户',
                addFormRules: {
                    car_number: [
                        {required: true, message: '请输入车牌号', trigger: 'blur'}
                    ],
                    operator: [
                        {required: true, message: '请输入操作人', trigger: 'blur'}
                    ],
                }
            }
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
                for (var item of user.authlist) {
                    if (AUTH_ID.showSystemManage_BlachList_auth_id == item.auth_id) {
                        console.log(item.sub_auth)
                        this.hideSearch = !common.showSubSearch(item.sub_auth)
                        this.hideAdd = !common.showSubAdd(item.sub_auth)
                        this.hideExport = !common.showSubExport(item.sub_auth)
                        this.showEdit = common.showSubEdit(item.sub_auth)
                        this.showdelete = common.showSubDel(item.sub_auth)
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
            this.$refs['bolinkuniontable'].$refs['search'].resetSearch()
            this.$refs['bolinkuniontable'].getTableData({})
        }
    }

</script>

<style>
    .gutter {
        display: none
    }
</style>

