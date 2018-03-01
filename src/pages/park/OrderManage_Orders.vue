<template>
    <section>
        <common-table
        		:showdelete="showdelete"
        		:delapi="delapi"
                :queryapi="queryapi"
                :addapi="addapi"
                :editapi="editapi"
                :showEdit="showEdit"
                :tableheight="tableheight"
                :fieldsstr="fieldsstr"
                :tableitems="tableitems"
                :btswidth="btswidth"
                :addtitle="addtitle"
                :hide-export="hideExport"
                :hide-options="hideOptions"
                :hideTool="hideTool"
                :hideSearch="hideSearch"
                :hideAdd="hideAdd"
                :showImg="showImg"
                v-on:showImg_Order="showImgDialog"
                ref="bolinkuniontable"
        ></common-table>
        
    </section>
</template>


<script>
    import {path, orderStateType,orderPayType} from '../../api/api';
    import util from '../../common/js/util'
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
            	showEdit:true,
                loading: false,
                hideExport: true,
                hideSearch: true,
                hideAdd: false,
                tableheight: '',
                showdelete: true,
                hideOptions: false,
                hideTool: false,
                showImg: false,
				addapi: '/department/create',
				editapi: '/department/create',
                queryapi: '/department/query',
                delapi: '/department/delete',
                btswidth: '100',
                fieldsstr: 'id__c_type__car_number__car_type__create_time__end_time__duration__pay_type__freereasons__amount_receivable__total__electronic_prepay__cash_prepay__electronic_pay__cash_pay__reduce_amount__uid__out_uid__state__url__in_passid__out_passid__order_id_local',
                tableitems: [
                    {

                        hasSubs: false,
                        subs: [{
                            label: '部门编号',
                            prop: 'id',
                            width: '123',
                            type: 'str',
                            editable: false,
                            searchable: false,
                            addable: false,
                            unsortable: true,
                            align: 'center',
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '部门名称',
                            prop: 'name',
                            width: '180',
                            type: 'str',
							editable: true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    },
                    {
                        hasSubs: false,
                        subs: [{
                            label: '部门负责人',
                            prop: 'person_liable',
                            width: '180',
                            type: 'str',
							editable: true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    },
                    {

                        hasSubs: false,
                        subs: [{
                            label: '负责人电话',
                            prop: 'phone',
                            width: '180',
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
                            label: '短号',
                            prop: 'short_number',
                            width: '120',
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
                            label: '部门描述',
                            prop: 'describe',
                            width: '280',
                            type: 'str',
							editable: true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }
                ],
                addtitle: '添加部门',
            }
        },
        methods: {
            showImgDialog: function (index, row) {
                this.imgdialog_url = path + this.imgapi + '?orderid=' + row.order_id_local + '&comid=' + sessionStorage.getItem('comid') + '&token=' + sessionStorage.getItem('token')
                console.log(this.imgdialog_url)

                let _this = this
                axios.all([axios.get(this.imgdialog_url)])
                    .then(axios.spread(function (ret) {
                        _this.img_in = ret.data.in;
                        _this.img_out = ret.data.out;
                        _this.imgpath = path
                        console.log(_this.img_in)
                        console.log(_this.img_out)
                    }))

                this.imgDialog = true
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
                console.log(user.authlist.length)
                for (var item of user.authlist) {
                    if (AUTH_ID.showOrderManage_Orders_auth_id == item.auth_id) {
                        // console.log(item.sub_auth)
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
            // getCollector
            let _this = this
            axios.all([common.getCollector()])
                .then(axios.spread(function (ret) {
                    _this.collectors = ret.data;
                    // console.log(ret.data)
                }))
        },
        watch:{
            collectors:function (val) {
                this.tableitems[16].subs[0].selectlist = val
                this.tableitems[17].subs[0].selectlist = val
            }
        }
    }

</script>

<style>
    .gutter {
        display: none
    }
</style>

