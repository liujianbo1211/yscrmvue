<template>
    <el-row class="container">
        <el-col :span="24" class="header">
            <!--
            <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'" style="text-align: center">
                {{collapsed?'':sysName}}
            </el-col>
            -->
            <el-col :span="17">

                <div style="margin-left:5px;font-size:30px;postition:relative;line-height:50px;vertical-align:middle;float:left;font-family:STXinwei">
                    &nbsp;&nbsp;&nbsp;&nbsp;智慧停车云
                </div>
            </el-col>

            <!--
            <el-col :span="10" class="tools">

                <div class="tools" @click.prevent="collapse">
                    <i class="el-icon-d-arrow-left" v-show="left"></i>
                    <i class="el-icon-d-arrow-right" v-show="right"></i>
                </div>

            </el-col>-->

            <el-col :span="7" style="padding-right:10px">
                <!--<div style="color:#fff;font-size:15px;display:inline;right:235px;position:absolute">{{nickname}}:-->
                <!--{{sysUserName}}-->
                <!--</div>-->
                <!--<el-menu style="height:50px" :default-active="active" theme="dark"-->
                <!--mode="horizontal" @select="selectTop">-->

                <!--<el-menu-item index="/loginCloud"><span style="color:#fff;font-size:13px">退出登录</span></el-menu-item>-->

                <!--</el-menu>-->
                <div style="color:#fff;font-size:15px;display:inline;right:235px;position:absolute">{{nickname}}:
                    {{sysUserName}}
                </div>
                <el-menu style="height:50px;width: 100px;float: right;" :default-active="active" theme="dark"
                         @select="selectTop">

                    <el-menu-item index="/loginCloud"><span style="color:#fff;font-size:13px;float: right;">退出登录</span>
                    </el-menu-item>

                </el-menu>



            </el-col>

        </el-col>
        <el-col :span="24" class="main">
            <aside :class="collapsed?'menu-collapsed':'menu-expanded'">

                <!--厂商平台导航菜单-->
                <el-menu :default-active="active" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose"
                         @select="handleselect"
                         unique-opened v-show="!collapsed">

                    <el-row v-show="park">
                        <el-submenu v-if="showOrderManage" index="/order">
                            <template slot="title"><span class="menuitem">人力资源管理</span></template>
                            <el-menu-item index="/orderManage_Orders" v-if="showOrderManage_Orders">部门信息</el-menu-item>
                            <el-menu-item index="/orderManage_Poles" v-if="showOrderManage_Poles">员工信息</el-menu-item>
                        </el-submenu>
                       
                        <el-submenu index="/equipment" v-if="showEquipmentManage_Monitor">
                            <template slot="title"><span class="menuitem">仓库管理</span></template>
                            
                            <el-menu-item index="/systemManage_FreeReason" v-if="showEquipmentManage_Monitor">产品分类
                            </el-menu-item>
                            <el-menu-item index="/equipmentManage_Monitor" v-if="showEquipmentManage_Monitor">产品信息
                            </el-menu-item>
                            <el-menu-item index="/equipmentManage_Intercom" v-if="showEquipmentManage_Intercom">出/入库信息
                            </el-menu-item>
                            <el-menu-item index="/equipmentManage_WorkStation" v-if="showEquipmentManage_WorkStation">
                                		出库信息
                            </el-menu-item>
                            <el-menu-item index="/equipmentManage_Channel" v-if="showEquipmentManage_Channel">销货信息
                            </el-menu-item>
                            <el-menu-item index="/equipmentManage_Camera" v-if="showEquipmentManage_Camera">盘点库存
                            </el-menu-item>                           
                        </el-submenu>
                        <el-submenu v-if="showSystemManage" index="/system">
                            <template slot="title"><span class="menuitem">财务管理</span></template>
                            <el-menu-item index="/systemManage_Commute" v-if="showSystemManage_Commute">采购/销售信息
                            </el-menu-item>
                            <el-menu-item index="/systemManage_Account" v-if="showSystemManage_Account">工资管理
                            </el-menu-item>
                        </el-submenu>
                       
                        <el-submenu v-if="showSystemManage" index="/shopManage">
                            <template slot="title"><span class="menuitem">客户关系管理</span></template>
                            <el-menu-item index="/systemManage_BlachList" v-if="showSystemManage_BlachList">客户管理
                            </el-menu-item>
                        </el-submenu>
                    </el-row>
                </el-menu>
            </aside>
            <section class="content-container">
                <div class="grid-content bg-purple-light">
                    <el-col :span="24" class="content-wrapper">
                        <keep-alive>
                            <router-view></router-view>

                        </keep-alive>
                    </el-col>
                </div>
            </section>
        </el-col>
    </el-row>
</template>

<script>
    import common from '../common/js/common'
    import {AUTH_ID} from '../common/js/const'

    export default {
        data() {
            return {
            	shopManage:false,
                active: '',
                bolink: false,
                park: false,
                platform: false,
                left: true,
                right: false,
                sysName: '联盟管理后台',
                server: '',
                collapsed: false,
                sysUserName: '',
                nickname: '',
                user: '',
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                secureVisible: false,
                //根据权限控制页面是否显示
                showOrderManage: true,
                showOrderManage_Orders: true,
                showOrderManage_Poles: false,
                showMonthMember: false,
                showMonthMember_Refill: false,
                showMonthMember_VIP: false,
                showOrderStatistics: false,
                showOrderStatistics_HourRent: false,
                showOnlinePay: false,
                showOnlinePay_Income: false,
                showOnlinePay_CashManage: false,
                showShopManage: false,
                showShopManage_Coupon: false,
                showShopManage_Shop: false,
                showShopManage_QueryAccount: false,
                showEquipmentManage: false,
                showEquipmentManage_Monitor: false,
                showEquipmentManage_Intercom: false,
                showEquipmentManage_WorkStation: false,
                showEquipmentManage_Channel: false,
                showEquipmentManage_Camera: true,
                showEquipmentManage_LED: false,
                showEmployeePermission: false,
                showEmployeePermission_Role: false,
                showEmployeePermission_Manage: false,
                showSystemManage: false,
                showSystemManage_BlachList: false,
                showSystemManage_Commute: true,
                showSystemManage_Account: true,
                showSystemManage_Params: false,
                showSystemManage_FreeReason: true,
                showSystemManage_CarManage: false,
                showSystemManage_CarManage_CarType: false,
                showSystemManage_CarManage_BindType: false,
                showSystemManage_Price: false,
                showSystemManage_MonthCard: false,
                showSystemManage_Logs: false,

            }
        },
        methods: {
            openSecurity() {
                this.active = '/securitycenter'
                console.log(this.active)
                this.$router.push('/securitycenter')
            },
            handleopen() {
                //console.log('handleopen');
            },
            handleclose() {
                //console.log('handleclose');
            },
            selectTop(a, b) {
                //console.log(a)
                //console.log(b)
                console.log(this.active)
                this.active = a
                this.$router.push(a);
                console.log(this.active)
            },
            handleselect: function (a, b) {
                console.log(this.active)
                //console.log(a)
                //console.log(this)
                //console.log(this.$router)
                var cpath = this.$router.currentRoute.fullPath
                //console.log(a)
                //console.log(cpath)
                var options = this.$router.options.routes
                this.active = a
                this.$router.push(a);
                //console.log(this.$router.options.routes[2].children[0].component)
                //this.$router.options.routes[2].children[0].component.methods.getData()
                //this.$router.push({ path: '/server' })
                //this.$router.push({ path: '/404' })
                /*
                for(var x in options){
                    //console.log(options[x])
                    if(options[x].leaf){
                        //一个节点
                        if(options[x].children[0].path==cpath){
                            //console.log(options[x].component.mounted())
                            //options[x].component.mounted()
                            console.log(cpath)
                        }
                    }

                    else{
                        //多个节点
                        for(var i in options[x].children){
                            if(options[x].children[i].path==cpath){
                                console.log(options[x].children[i].component.mounted())
                            }else{
                                for(var j in options[x].children[i].children){
                                    if(options[x].children[i].children[j].path==cpath){
                                        console.log(options[x].children[i].children[j].component.mounted())
                                    }
                                }
                            }
                        }
                    }
                    */
                //}

            },
            //退出登录
            logout: function () {
                var _this = this;
                let user = sessionStorage.getItem('user');
                let u = JSON.parse(user);
                let logoutParams = {userid: u.userid, token: sessionStorage.getItem("token")}
                this.$confirm('确认退出吗?', '提示', {
                    //type: 'warning'
                }).then(() => {
                    //this.$post(path+"/user/dologout",logoutParams)
                    sessionStorage.removeItem('user');
                    sessionStorage.removeItem('token');
                    _this.$router.push('/login');
                }).catch(() => {

                });
            },
            //折叠导航栏
            collapse: function () {
                this.collapsed = !this.collapsed;
                if (this.left == false) {
                    this.left = true;
                    this.right = false;
                } else {
                    this.left = false;
                    this.right = true;
                }

            },
            showMenu(i, status) {
                this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
            },
        },
        mounted() {
            var vm = this;
            var user = sessionStorage.getItem('user');
            this.user = user
            if (user) {
                user = JSON.parse(user);
                this.sysUserName = user.nickname || '';

                var cpath = this.$router.currentRoute.fullPath;
                console.log(cpath)
                if (cpath == '/query/queryout') {
                    this.active = '/query/queryin'
                } else if (cpath == '/order/orderout') {
                    this.active = '/order/orderin'
                } else {
                    this.active = cpath;
                }
                if (user.roleid == 0 || user.roleid == 30) {
                    this.nickname = "车场";
                    this.park = true;
                }

            }
            //遍历返回的页面列表赋值
            this.showOrderManage = common.pageShow(user, AUTH_ID.showOrderManage_auth_id);
            this.showOrderManage_Orders = common.pageShow(user, AUTH_ID.showOrderManage_Orders_auth_id);
            this.showOrderManage_Poles = common.pageShow(user, AUTH_ID.showOrderManage_Poles_auth_id);
            this.showMonthMember = common.pageShow(user, AUTH_ID.showMonthMember_auth_id);
            this.showMonthMember_Refill = common.pageShow(user, AUTH_ID.showMonthMember_Refill_auth_id);
            this.showMonthMember_VIP = common.pageShow(user, AUTH_ID.showMonthMember_VIP_auth_id);
            this.showOrderStatistics = common.pageShow(user, AUTH_ID.showOrderStatistics_auth_id);
            this.showOrderStatistics_HourRent = common.pageShow(user, AUTH_ID.showOrderStatistics_HourRent_auth_id);
            this.showShopManage = common.pageShow(user, AUTH_ID.showShopManage_auth_id);
            this.showShopManage_Coupon = /*common.pageShow(user, AUTH_ID.showShopManage_Coupon_auth_id)*/true;
            this.showShopManage_Shop = common.pageShow(user, AUTH_ID.showShopManage_Shop_auth_id);
            this.showShopManage_QueryAccount = common.pageShow(user, AUTH_ID.showShopManage_QueryAccount_auth_id);
            this.showEquipmentManage = common.pageShow(user, AUTH_ID.showEquipmentManage_auth_id);
            this.showEquipmentManage_Monitor = common.pageShow(user, AUTH_ID.showEquipmentManage_Monitor_auth_id);
            this.showEquipmentManage_Intercom = common.pageShow(user, AUTH_ID.showEquipmentManage_Intercom_auth_id);
            this.showEquipmentManage_WorkStation = false;
            this.showEquipmentManage_Channel = false;
            this.showEquipmentManage_Camera = true;
            this.showEquipmentManage_LED = common.pageShow(user, AUTH_ID.showEquipmentManage_LED_auth_id);
            this.showEmployeePermission = common.pageShow(user, AUTH_ID.showEmployeePermission_auth_id);
            this.showEmployeePermission_Role = common.pageShow(user, AUTH_ID.showEmployeePermission_Role_auth_id);
            this.showEmployeePermission_Manage = common.pageShow(user, AUTH_ID.showEmployeePermission_Manage_auth_id);
            this.showSystemManage = common.pageShow(user, AUTH_ID.showSystemManage_auth_id);
            this.showSystemManage_BlachList = true;
            this.showSystemManage_Commute = true;
            this.showSystemManage_Account = common.pageShow(user, AUTH_ID.showSystemManage_Account_auth_id);
            this.showSystemManage_Params = common.pageShow(user, AUTH_ID.showSystemManage_Params_auth_id);
            //this.showSystemManage_FreeReason = common.pageShow(user, AUTH_ID.showSystemManage_FreeReason_auth_id);
            this.showSystemManage_CarManage = common.pageShow(user, AUTH_ID.showSystemManage_CarManage_auth_id);
            this.showSystemManage_CarManage_CarType = common.pageShow(user, AUTH_ID.showSystemManage_CarManage_CarType_auth_id);
            this.showSystemManage_CarManage_BindType = common.pageShow(user, AUTH_ID.showSystemManage_CarManage_BindType_auth_id);
            this.showSystemManage_Price = common.pageShow(user, AUTH_ID.showSystemManage_Price_auth_id);
            this.showSystemManage_MonthCard = common.pageShow(user, AUTH_ID.showSystemManage_MonthCard_auth_id);
            this.showSystemManage_Logs = common.pageShow(user, AUTH_ID.showSystemManage_Logs_auth_id);
            this.showOnlinePay = common.pageShow(user, AUTH_ID.showOnlinePay_auth_id);
            this.showOnlinePay_Income = common.pageShow(user, AUTH_ID.showOnlinePay_Income_auth_id);
            this.showOnlinePay_CashManage = common.pageShow(user, AUTH_ID.showOnlinePay_CashManage_auth_id);
        },
        watch: {
            ulist: function (val) {
                this.sysUserName = val.nickname
            }
        },
        // activated(){
        //     this.showOrderManage = true;
        //     this.showOrderManage_Orders = true;
        // }
    }

</script>
<style lang="scss" scoped>

    $bg: #2d3a4b; //#008F4C; //#324157;//#0080dd;//#35495E;//#1F2D3D
    .container {
        position: absolute;
        top: 0px;
        bottom: 0px;

        width: 100%;
        .header {
            height: 50px;
            line-height: 50px;

            background: $bg;
            color: #fff;
            .userinfo {
                text-align: right;
                padding-right: 20px;
                float: right;
                .userinfo-inner {
                    cursor: pointer;
                    color: #fff;
                    img {
                        width: 40px;
                        height: 40px;
                        border-radius: 20px;
                        margin: 10px 0px 10px 10px;
                        float: right;
                    }
                }
            }
            .logo {
                //width:180px;
                height: 50px;
                font-size: 22px;
                padding-left: 20px;
                padding-right: 20px;
                border-color: rgba(238, 241, 146, 0.3);
                border-right-width: 1px;
                border-right-style: solid;
                img {
                    width: 40px;
                    float: left;
                    margin: 10px 10px 10px 18px;
                }
                .txt {
                    color: #fff;
                }
            }
            .logo-width {
                width: 180px;
            }
            .logo-collapse-width {
                width: 60px
            }
            .tools {
                padding: 0px 23px;
                width: 14px;
                height: 50px;
                line-height: 50px;
                cursor: pointer;
            }
        }
        .main {
            display: flex;
            // background: #324057;
            position: absolute;
            top: 50px;
            bottom: 0px;
            overflow: hidden;
            aside {
                background: #EEF1F6;
                flex: 0 0 180px;
                width: 180px;
                // position: absolute;
                // top: 0px;
                // bottom: 0px;
                .el-menu {
                    height: 100%;

                }

                .collapsed {
                    width: 60px;
                    .item {
                        position: relative;
                    }
                    .submenu {
                        position: absolute;
                        top: 0px;
                        left: 60px;
                        z-index: 99999;
                        height: auto;
                        display: none;
                    }

                }
            }
            .menuitem {
                font-size: 16px;
                margin-left: 12px;
                //color:black
            }
            .menu-collapsed {
                flex: 0 0 60px;
                width: 60px;
            }
            .menu-expanded {
                flex: 0 0 180px;
                width: 80px;
            }
            .content-container {
                // background: #f1f2f7;
                flex: 1;
                // position: absolute;
                // right: 0px;
                // top: 0px;
                // bottom: 0px;
                // left: 180px;
                overflow-y: hidden;
                padding: 10px;
                padding-top: 8px;
                .breadcrumb-container {
                    //margin-bottom: 15px;
                    .title {
                        width: 180px;
                        float: left;
                        color: #475669;
                    }
                    .title2 {
                        width: 160px;
                        float: left;
                        color: #475669;
                    }
                    .breadcrumb-inner {
                        float: right;
                    }
                }
                .content-wrapper {
                    background-color: #fff;
                    box-sizing: border-box;
                }
            }
        }
    }
</style>
