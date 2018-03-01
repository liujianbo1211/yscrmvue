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
                :showCustomizeAdd="hideAdd"
                v-on:customizeadd="showadd"
                v-on:showeditshop="showeditshop"
                ref="bolinkuniontable"
        ></common-table>
        <!--操作dialog-->
        <el-dialog
                :title="showEditTile"
                :visible.sync="regUserVisible"
                width="30%"
                size="tiny">
            <el-form ref="form" label-width="120px" style="margin-bottom:-30px">
                <el-form-item label="产品编号" v-if="showInput" style="width:90%">
                    <el-autocomplete
                      style="width:100%"
					  popper-class="my-autocomplete"
					  v-model="state3"
					  :fetch-suggestions="querySearch"
					  placeholder="请输入内容"
					  @select="handleSelect">
					  <i
					    class="el-icon-edit el-input__icon"
					    slot="suffix"
					    @click="handleIconClick">
					  </i>
					  <template slot-scope="props">
					    <div class="name">{{ props.item.value }}</div>
					    <span class="addr">{{ props.item.address }}</span>
					  </template>
					</el-autocomplete>
                </el-form-item>
                <el-form-item label="产品名称">
                    <el-input :disabled="true" v-model="pname" style="width:90%"></el-input>
                </el-form-item>
                <el-form-item label="规格">
                    <el-input :disabled="true" v-model="specifications" style="width:90%"></el-input>
                </el-form-item>
                <el-form-item label="单位">
                    <el-input :disabled="true" v-model="unity" style="width:90%"></el-input>
                </el-form-item>

                <el-form-item label="数量" v-if="showInput">
                    <el-input  v-model="total" style="width:90%"></el-input>
                </el-form-item>
                <el-form-item label="操作人" v-if="showInput">
                    <el-input  v-model="username" style="width:90%"></el-input>
                </el-form-item>
                <el-form-item label="操作时间" >
                    <el-date-picker type="date" placeholder="选择日期时间" v-model="create_time"
                                    style="width: 90%"></el-date-picker>
                </el-form-item>
                <el-form-item label="操作类型" v-if="showInput" style="width:90%">
                    <el-select v-model="type" placeholder="请选择" style="width:100%">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注" v-if="showInput">
                    <el-input  v-model="describe" style="width:90%"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
				<el-button @click="regUserVisible = false" size="small">取 消</el-button>
				<el-button type="primary" size="small" @click="save">保存</el-button>
			</span>
        </el-dialog>
        
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
            	showEdit:true,
                loading: false,
                hideExport: true,
                hideSearch: false,
				regUserVisible:false,
                hideAdd: true,
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
                btswidth: '100',
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
                            prop: 'pname',
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
                    }, {

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
                            label: '数量',
                            prop: 'total',
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
                            label: '操作人',
                            prop: 'username',
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
                            label: '操作时间',
                            prop: 'create_time',
                            width: '180',
                            type: 'date',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format:function(row){
                            	return common.dateformat(row.create_time)
                            }
                        }]
                    }, {

                        hasSubs: false,
                        subs: [{
                            label: '操作类型',
                            prop: 'type',
                            width: '123',
                            type: 'str',
                            editable: true,
                            searchable: true,
                            addable: true,
                            unsortable: true,
                            align: 'center',
                            format:function(row){
                            	if(row.type==1){
                            		return "入库"
                            	}else if(row.type==2){
                            		return "出库"
                            	}else if(row.type==3){
                            		return "报废"
                            	}else{
                            		return row.type
                            	}
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

