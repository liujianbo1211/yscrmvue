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
                hideExport: true,
                hideSearch: false,

                hideAdd: false,
                tableheight: '',
                showdelete: true,
                hideOptions: false,

                hideTool: false,
                showImg: false,

                queryapi: '/ysproduct/query',
                addapi:'/ysproduct/create',
                exportapi: '/ysproduct/exportExcel',
                editapi: '/ysproduct/create',
                delapi: '/ysproduct/delete',
                btswidth: '100',
                fieldsstr: 'id__liftrod_id__ctime__uin__out_channel_id__reason__resume__url',
                tableitems: [
                    {

                        hasSubs: false,
                        subs: [{
                            label: '产品编号',
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
                            label: '产品序列编号',
                            prop: 'product_id',
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
                            label: '产品名称',
                            prop: 'name',
                            width: '123',
                            type: 'str',
							editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    },{

                        hasSubs: false,
                        subs: [{
                            label: '单位',
                            prop: 'unity',
                            width: '100',
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
                            label: '单价',
                            prop: 'price',
                            width: '100',
                            type: 'number',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '产品分类名称',
                            prop: 'product_classify_id',
                            width: '123',
                            type: 'selection',
                            selectlist: this.reasons,
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format: (row) => {
                                    return common.nameformat(row, this.reasons, 'product_classify_id')
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '规格',
                            prop: 'specifications',
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
                            label: '色号',
                            prop: 'color',
                            width: '123',
                            type: 'str',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    },{
						hasSubs: false,
                        subs: [{
                            label: '备注',
                            prop: 'describe',
                            width: '200',
                            type: 'str',
                            editable: true,
                            searchable: false,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                        
                    }
                    
                ],
                addtitle:"添加产品",
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
                        //this.hideExport = !common.showSubExport(item.sub_auth)
                        //this.hideSearch = !common.showSubSearch(item.sub_auth)
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
            axios.all([common.getProductClassity()])
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

