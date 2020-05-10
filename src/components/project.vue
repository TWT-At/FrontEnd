<template>
  <div class="main-box">
    <div class="title-div">
        项目管理-我的项目
        <img class="title-img" :src="doing2x"><div class="title-status">进行中：{{title[0]}}项</div>
        <img class="title-img" :src="finish2x"><div class="title-status">已完结：{{title[1]}}项</div>
    </div>
    <div class="button-div">
        <el-button class="proj-button my-button">我的项目</el-button>
        <el-button class="proj-button site-button">站内项目</el-button>
        <el-button class="proj-button create-button"  @click="dialogVisible = true">发起项目</el-button>
    </div>
    <div class="main-div">
        <div v-for="(proj,index) in data" :key="index" class="proj-div">
            <el-progress 
            type="circle" 
            :percentage=proj.rate*100
            :color="getColor(proj.rate)"
            :stroke-width=12
            :width=66>
            </el-progress>
            <div class="main-title">
                {{proj.title}}<br/>
                <span class="title-span">起始时间：{{proj.created_at.split(" ")[0]}}</span>
            </div>
                <div class="item-main">
                <div v-if="handleIf(proj.rate)" class="ddl-title">
                    DDL:
                </div>
                <div v-if="handleIf(proj.rate)" class="ddl-main">
                    <div class="ddl-item" v-for="(item,index) in proj.DDL" :key="index">
                        【{{item.time}}】{{item.title}}
                    </div>
                </div>
                <div v-if="!handleIf(proj.rate)" class="finish-div">
                    已完结<br/>
                    <span class="finish-span">完结时间：{{proj.finish_at.split(" ")[0]}}</span>
                </div>
            </div>
        </div>
    </div>
    <el-dialog
    title="创建项目"
    :visible.sync="dialogVisible"
    width="984px">
        <div class="form-item dialog-name"><div class="form-tag">项目名称：</div><el-input v-model="createForm.name" placeholder="请输入项目名称"></el-input></div>
        <div class="form-item dialog-des"><div class="form-tag">项目简介：</div><el-input  type="textarea" :autosize="{ minRows: 6, maxRows: 10}" v-model="createForm.describe" placeholder="请输入项目简介"></el-input></div>
        <div class="form-item dialog-opt">
            <div class="form-tag">项目简介：</div>
                <el-select v-model="grouper.group" placeholder="组别">
                    <el-option
                    v-for="item in groupOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="grouper.campus" placeholder="组别">
                    <el-option
                    v-for="item in campusOption"
                    :key="item"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
                <el-select v-model="grouper.role" placeholder="角色">
                    <el-option
                    v-for="item in roleOption"
                    :key="item"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
                <el-select v-model="grouper.role" placeholder="姓名">
                    <el-option
                    v-for="item in manOption"
                    :key="item"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
                <i class="el-icon-circle-plus" @click="dialogVisible = false"></i>
            </div>
        <div class="form-item dialog-man">123123</div>
        <button class="create-button" disabled="true">确认录入</button>
    </el-dialog>
  </div>
</template>

<script>
//import {ShowMyProject} from '../api/user'
import doing2x from '../assets/doing2x.png'
import finish2x from '../assets/finish2x.png'

export default {
  name: 'project',
  data() {
    return {
        dialogVisible: false,
        doing2x,
        finish2x,
        title:[3,3],
        groupOption:[
            {
                value:"前端",
                label:"前端"
            },{
                value:"后端",
                label:"后端"
            },{
                value:'产品',
                label:'产品'
            },{
                value:'设计',
                label:'设计'
            },{
                value:'安卓',
                label:'安卓'
            },{
                value:'iOS',
                label:'iOS'
            }
        ],
        campusOption:["卫津路","北洋园"],
        roleOption:["站长","组长","组员","实习","骨灰"],
        manOption:["尼古拉斯凯奇","赵四","S1mple","猕猴桃"],
        createForm:{
            name:'',
            describe:'',
        },
        grouper:{
            user_id : '',
            name : '',
            group : '',
            campus:'',
            role:'',
        },
        data:[
            {   id: 2,
                name: "齐呈祥",
                title: "at系统开发",
                created_at: "2020-04-14 12:24:54",
                rate:0.1,
                DDL:[
                    {title:"完成原型图",time:"2020-4-44"},
                    {title:"完成原型图",time:"2020-4-44"},
                    {title:"完成原型图",time:"2020-4-44"},
                    {title:"完成原型图",time:"2020-4-44"},
                    {title:"完成原型图",time:"2020-4-44"},
                    {title:"完成原型图",time:"2020-4-44"},
                    {title:"完成原型图",time:"2020-4-44"},
                    {title:"完成原型图",time:"2020-4-44"},
                    {title:"完成原型图",time:"2020-4-44"},
                ]
            },
            {   id: 2,
                name: "齐呈祥",
                title: "at系统开发",
                created_at: "2020-04-14 12:24:54",
                finish_at: "2020-04-14 12:24:54",
                rate:1,
                DDL:[
                    {title:"完成原型图",time:"2020-4-44"},
                    {title:"完成原型图",time:"2020-4-44"}
                ]
            }
        ]
    }
  },
  methods:{
    getColor(rate){
        if(rate==1){
            return '#32B16C'
        }else{
            return '#03A3EA'
        }
    },
    handleIf(rate){
        if(rate!=1){
            return true
        }else{
            return false
        }
    }
  }
  ,created(){

  }
};
</script>
<style scoped>

    .main-box >>> .el-dialog{
        background:rgba(252,254,255,1);
        border-radius:20px;
    }

    .create-button:hover{
        cursor: pointer;
        background:#13283C;
    }

    .create-button{
        transition: all .2s;
        outline: none;
        border: none;
        width:190px;
        height:48px;
        background:rgba(59,76,93,1);
        box-shadow:3px -3px 5px 0px rgba(0, 0, 0, 0.1), 3px 3px 5px 0px rgba(0, 0, 0, 0.1), -3px 3px 5px 0px rgba(0, 0, 0, 0.1), -3px -3px 5px 0px rgba(0, 0, 0, 0.1);
        border-radius:24px;
        font-size:24px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(252,254,255,1);
        line-height:37px;
    }

    .dialog-opt >>> .el-input {
        width: 142px;
    }

    .dialog-opt >>> i:hover{
        cursor: pointer;
        color: #409EFF;
    }

    .dialog-opt >>> i {
        font-size: 40px;
        transition: all .2s;
    }

    .dialog-opt{
        width: 768px;
    }

    .el-input,.el-textarea{
        width: 604px;
    }

    .main-box >>> .el-dialog__title{
        font-size:30px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(61,75,89,1);
    }

    .form-tag{
        width: 160px;
        font-size:24px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(61,75,89,1);
    }

    .form-item{
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-direction:row;
        justify-content: flex-start;
        align-items: flex-start;
        margin-left:68px;
        margin-bottom: 34px;
    }

    .finish-span{
        font-size:14px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(143,143,143,1);
        line-height:24px;
    }

    .finish-div{
        font-size:36px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(50,177,108,1);
        text-align: left;
        line-height: 32px;
    }

    .item-main{
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-direction:row;
        justify-content: flex-start;
        align-items: flex-start;
        margin:18px auto 18px 32px;
        border-left:solid rgb(179, 179, 179);
        padding-left: 32px;

    }

    .ddl-main{
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-direction:column;
        justify-content: flex-start;
        align-items: flex-start;
        min-height: 100%;
    }

    .ddl-title{
        font-size:14px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(162,4,4,1);
    }

    .title-span{
        font-size:12px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:#8F8F8F;
    }

    .main-title{
        margin-left: 16px;
        text-align: left;
        font-size:14px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(0,0,0,1);
    }

    .proj-div >>> .el-progress__text{
        font-size:14px!important;
        font-family:Microsoft YaHei;
        font-weight:400;
    }

    .proj-div{
        width:1140px;
        min-height:96px;
        background:rgba(252,254,255,1);
        box-shadow:3px 3px 10px 0px rgba(0, 0, 0, 0.05), -3px -3px 10px 0px rgba(0, 0, 0, 0.05);
        border-radius:20px;
        margin-top: 24px;
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-direction:row;
        justify-content: flex-start;
        align-items: center;
        padding-left: 32px;
    }

    .main-div{
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-direction:column;
        justify-content: flex-start;
        align-items: flex-start;
        margin-top: 48px;
    }

    .site-button{
        margin-right: 690px;
    }

    .my-button{
        margin-right: 36px;
    }

    .button-div{
        margin-top:48px;
    }

    .proj-button:hover{
        background:#13283C;
    }

    .proj-button{
        transition: all .2s;
        width:134px;
        height:36px;
        background:rgba(59,76,93,1);
        box-shadow:3px -3px 5px 0px rgba(0, 0, 0, 0.1), 3px 3px 5px 0px rgba(0, 0, 0, 0.1), -3px 3px 5px 0px rgba(0, 0, 0, 0.1), -3px -3px 5px 0px rgba(0, 0, 0, 0.1);
        border-radius:18px;
        font-size:18px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(252,254,255,1);
        line-height:35px;
        padding:0px;
        line-height: 18px;
    }

    .title-div{
        font-size:30px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(61,75,89,1);
        height: 38px;
        line-height: 38px;
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-direction:row;
        justify-content: flex-start;
        align-items: center;
    }

    .title-status{
        font-size:14px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(0,0,0,1);
        margin-left: 14px;
    }

    .title-img{
        height: 22px;
        width: 22px;
        margin-left: 36px;
    }

    .main-box{
        min-height: 1000px;
        width: 1148px;
        margin: 48px auto 0px 24px;
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-direction:column;
        justify-content: flex-start;
        align-items: flex-start;
    }
</style>