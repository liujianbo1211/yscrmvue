<template>
    <section>
        <common-table
        		:showdelete="showdelete"
        		:editapi="editapi"
        		:addtitle="addtitle"
        		:showShopEdit="showEdit1"
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
                :showCustomizeAdd="hideAdd"
                v-on:customizeadd="showadd"
                v-on:showeditshop="showeditshop"
                ref="bolinkuniontable"
        ></common-table>
        <!--操作dialog-->
        <el-dialog
                title="夹江益胜陶瓷厂货物调拨单"
                :visible.sync="regUserVisible"
                >

            <div>
                <el-button type="primary" size="small" @click="regUser">注册员工</el-button>
            </div>
            <template>
                <el-table
                        :data="employeeData"
                        style="width: 100%"
                        max-height="250">
                    <el-table-column
                            fixed="left"
                            label="操作"
                            width="180">
                        <template slot-scope="scope">
                            <el-button
                                    @click.native.prevent="handleEdit(scope.row)"
                                    type="text"
                                    size="small">
                                编辑
                            </el-button>
                            <el-button
                                    @click.native.prevent="deleteRow(scope.row)"
                                    type="text"
                                    size="small"
                                    style="color:red">
                                删除
                            </el-button>

                        </template>
                    </el-table-column>
                    <el-table-column
                    <el-table-column
                            type="index"
                            label="索引"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="id"
                            label="编号"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="nickname"
                            label="姓名"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="strid"
                            label="登陆账号"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="phone"
                            label="电话"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="mobile"
                            label="手机"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            :formatter="strFormat"
                            prop="auth_flag"
                            label="角色"
                            width="120">
                    </el-table-column>

                    <el-table-column
                            :formatter="dateFormat"
                            prop="reg_time"
                            label="创建时间"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            :formatter="dateFormat"
                            prop="logon_time"
                            label="最近登陆时间"
                            width="180">
                    </el-table-column>

                </el-table>
            </template>

            <!--简单分页工具条-->
            <el-pagination
                    small
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
                    :total="total">
            </el-pagination>
        </el-dialog>
        
    </section>
</template>
<style>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>


<script>
    import {path,shop_type,pay_type} from '../../api/api';
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
            	showEdit1:true,
            	showInput:true,
            	showdelete:true,
            	showEdit:true,
                loading: false,
                hideExport: true,
                hideSearch: false,
				regUserVisible:false,
                hideAdd: false,
                tableheight: '',
                showdelete: true,
                hideOptions: false,

                hideTool: false,
                showImg: false,

                queryapi: '/repository/query',
                addapi:'/repository/create',
                exportapi: '/repository/exportExcel',
                editapi: '/repository/create',
                delapi: '/repository/delete',
                btswidth: '180',
                fieldsstr: 'id__liftrod_id__ctime__uin__out_channel_id__reason__resume__url',
                tableitems: [
                    {

                        hasSubs: false,
                        subs: [{
                            label: '编号',
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
                            label: '订单编号',
                            prop: 'order_id',
                            width: '123',
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
                            label: '收货单位地址',
                            prop: 'address',
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
                            label: '收货单位及负责人',
                            prop: 'manager',
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
                            label: '出纳',
                            prop: 'teller',
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
                            label: '收货人',
                            prop: 'consignee',
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
                            label: '经手人',
                            prop: 'handman',
                            width: '123',
                            type: 'str',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                        }]
                    },{

                        hasSubs: false,
                        subs: [{
                            label: '采购/销售',
                            prop: 'shop_type',
                            width: '123',
                            type: 'selection',
                            selectlist: shop_type,
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format: (row) => {
                                    return common.nameformat(row, shop_type, 'shop_type')
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '填单',
                            prop: 'tiandan',
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
                            label: '订单总金额',
                            prop: 'total',
                            width: '123',
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
                            label: '支付状态',
                            prop: 'type',
                            width: '123',
                            type: 'selection',
                            selectlist: pay_type,
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format: (row) => {
                                    return common.nameformat(row, pay_type, 'type')
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '日期',
                            prop: 'create_time',
                            width: '180',
                            type: 'date',
                            editable: false,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format:function(row){
                            	return common.dateformat(row.create_time)
                            }
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
                addtitle:"采购/销售订单录入",
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
                username:'杨一枚',
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
	        	this.username="杨一枚"
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

