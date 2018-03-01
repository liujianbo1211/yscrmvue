<template>
    <section>
        <common-table
        		:showdelete="showdelete"
        		:editapi="editapi"
        		:addtitle="addtitle"
        		:showShopEdit="showEdit"
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
                v-on:customizeadd="showadd"
                v-on:showeditshop="showeditshop"
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
            	showInput:true,
            	showdelete:true,
            	showEdit:false,
                loading: false,
                hideExport: true,
                hideSearch: false,
				regUserVisible:false,
                hideAdd: true,
                tableheight: '',
                showdelete: true,
                hideOptions: true,

                hideTool: false,
                showImg: false,

                queryapi: '/repository/queryproduct',
                addapi:'/repository/create',
                exportapi: '/repository/exportExcel',
                editapi: '/repository/create',
                delapi: '/repository/delete',
                btswidth: '100',
                fieldsstr: 'id__liftrod_id__ctime__uin__out_channel_id__reason__resume__url',
                tableitems: [
                     {

                        hasSubs: false,
                        subs: [{
                            label: '产品编号',
                            prop: 'product_id',
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
                            label: '规格',
                            prop: 'specifications',
                            width: '150',
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
                            label: '色号',
                            prop: 'color',
                            width: '100',
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
                            label: '生产总数',
                            prop: 'total',
                            width: '150',
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
                            label: '消耗数量',
                            prop: 'use',
                            width: '150',
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
                            label: '剩余数量',
                            prop: 'remain',
                            width: '150',
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
                            label: '报废数量',
                            prop: 'baofei',
                            width: '150',
                            type: 'str',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center'
                        }]
                    }
                    
                ],
                addtitle:"出/入库操作",
                searchtitle: '高级查询',
                imgDialog: false,
                imgdialog_url: '',
                collectors: [],
                reasons: [],
                showEditTile:"",
                restaurants: [],
      			state3: '',
      			options:[{
                    value: 1,
                    label: '入库'
                }, {
                    value: 2,
                    label: '出库'
                }, {
                    value: 3,
                    label: '报废'
                }],
                pname:"",
                unity:"",
                specifications:'',
                total:'',
                username:'',
                create_time:'',
                type:'',
                describe:'',
                rId:0
            }
        },
        methods: {
        	showadd: function () {
        		this.rId=0
	        	this.total=""
	        	this.username=""
	        	this.create_time=""
	        	this.type=""
	        	this.describe=""
	        	this.pname = ""
                this.unity = ""
                this.specifications = ""
                this.state3=""
                this.showEditTile="出/入库操作";
	        	this.regUserVisible=true;
           },
           showeditshop: function (index, row) {
           		this.rId=row.id
           		this.state3=row.product_id
           		this.total=row.total
	        	this.username=row.username
	        	this.create_time=common.dateformat(row.create_time)
	        	this.type=row.type
	        	this.describe=row.describe
	        	this.pname = row.pname
                this.unity = row.unity
                this.specifications = row.specifications
           		this.showEditTile="编辑";
	        	this.regUserVisible=true;
            },
           save(){
           	let aform = {}

            aform.token = sessionStorage.getItem('token')
            aform.comid = sessionStorage.getItem('comid')
            //aform.groupid = this.
            aform.product_id = this.state3
            aform.total = this.total
            aform.username = this.username
            aform.create_time = this.create_time
            aform.describe = this.describe
            aform.type = this.type
            if(this.rId!=0){
            	aform.id=this.rId
            }
            let _this = this
           	this.$axios.post(path+"/repository/create", this.$qs.stringify(aform), {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                            }
                        }).then(function (response) {
                            let ret = response.data;

                            if (ret > 0 || ret.state == 1) {
                            	
                                //更新成功
                                _this.$refs['bolinkuniontable'].getTableData({})
                                _this.$message({
                                    message: '操作成功!',
                                    type: 'success',
                                    duration: 600
                                });
                                _this.regUserVisible = false;
                                _this.$refs['refillForm'].resetFields()
                            } else {
                                //更新失败
                                _this.$message({
                                    message: ret.msg,
                                    type: 'error',
                                    duration: 1200
                                });
                            }
                            _this.resetloading = false

                        }).catch(function (error) {
                            
                            _this.resetloading = false;
                        })
           },
           querySearch(queryString, cb) {
           	
		        var restaurants = this.restaurants;
		        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
		        // 调用 callback 返回建议列表的数据
		        cb(results);
		      },
		      createFilter(queryString) {
		        return (restaurant) => {
		          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
		        };
		      },
		      loadAll() {
		        /*return [
		          { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" }      
		        ];*/
		       let _this = this
		       axios.all([common.getProducts()])
		                .then(axios.spread(function (reason) {
		                    //_this.collectors = collector.data;
		                    _this.restaurants = reason.data;
		                }))
		      },
		      handleSelect(item) {
		      	//alert(this.state3);
		      	let _this = this
		      	
		        axios.all([common.getProductMsg(this.state3)])
		                .then(axios.spread(function (reason) {
		                    //_this.collectors = collector.data;
		                    //_this.restaurants = reason.data;
		                    _this.pname = reason.data.product.name
		                    _this.unity = reason.data.product.unity
		                    _this.specifications = reason.data.product.specifications
		                    
		                }))
		      },
		      handleIconClick(ev) {
		      }
		            
        },
        mounted() {
        	this.loadAll();
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

