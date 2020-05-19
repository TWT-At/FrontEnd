<template>
    <div class="main-container">
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
        <router-view/>
        <el-dialog
        title="创建项目"
        :visible.sync="dialogVisible"
        width="984px">
        <div class="form-item dialog-name"><div class="form-tag">项目名称：</div><el-input v-model="createForm.title" placeholder="请输入项目名称"></el-input></div>
        <div class="form-item dialog-des"><div class="form-tag">项目简介：</div><el-input  type="textarea" maxlength="400" show-word-limit :autosize="{ minRows: 6, maxRows: 10}" v-model="createForm.description" placeholder="请输入项目简介"></el-input></div>
        <div class="form-item dialog-opt">
            <div class="form-tag">项目成员：</div>
                <el-select v-model="grouper.group" clearable placeholder="组别">
                    <el-option
                    v-for="item in groupOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="grouper.campus" clearable placeholder="校区">
                    <el-option
                    v-for="item in campusOption"
                    :key="item"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
                <el-select v-model="grouper.role" clearable placeholder="角色">
                    <el-option
                    v-for="item in roleOption"
                    :key="item"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
                <el-select v-model="grouperOnly.name" clearable placeholder="姓名">
                    <el-option
                    v-for="item in selesctData"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
                    </el-option>
                </el-select>
                <i class="el-icon-circle-plus" @click="handleAdd"></i>
            </div>
        <div class="form-item dialog-mem">
            <el-tag
            :key="index"
            v-for="(tag,index) in addMem"
            closable
            :disable-transitions="false"
            color="#F1F2F9"
            @close="handleClose(index)">
            {{tag.name}}
            </el-tag> 
        </div>
        <button class="create-button" @click="handleSub">确认录入</button>
    </el-dialog>
    </div>
</template>

<script>
import doing2x from '../assets/doing2x.png'
import finish2x from '../assets/finish2x.png'

import {getUserDatum,createProject,addMember} from '../api/user'
//

export default {
    name:'projMain',
    data(){
        return{
            dialogVisible: false,
            doing2x,
            finish2x,
            title:[3,3],
            groupOption:[
            {
                value:"前端组",
                label:"前端组"
            },{
                value:"程序组",
                label:"程序组"
            },{
                value:'产品组',
                label:'产品组'
            },{
                value:'设计组',
                label:'设计组'
            },{
                value:'安卓组',
                label:'安卓组'     //待定
            },{
                value:'IOS',
                label:'iOS'       //此处注意大小写
            }
            ],
            campusOption:["卫津路","北洋园"],
            roleOption:["站长","组长","组员","实习","骨灰"],
            createForm:{
                title:'',
                description:'',
            },
            grouper:{
                user_id : '',
                group : '',
                campus:'',
                role:'',
            },
            grouperOnly:{
                project_id:'',
                user_id : '',
                group : '',
                name:'',
            },
            data:[],
            selesctData:[],
            addMem:[]
        }
    },
    methods:{
        fetchData(){
            getUserDatum().then( res=>{
                res.data.data.forEach(elem => {
                    this.data.push(elem)
                });
            })
        },
        handleAdd(){
            let obj
            this.selesctData.forEach(elem =>{
                if(elem.name==this.grouperOnly.name){
                    obj={
                        project_id:'',
                        user_id : elem.id,
                        group : elem.group_name,
                        name:elem.name,
                    }
                }
            })
            let flag=true;
            this.addMem.forEach( elem =>{
                if(elem.user_id==obj.user_id){
                    flag=false;
                }
            })
            if(flag){
                this.addMem.push(obj)
            }else{
                this.$message({
                    message:'已添加该成员',
                    type:"error",
                    duration:5000
                })
            }
        },
        handleClose(index){
            this.addMem.splice(index,1)
        },
        handleSub(){
            const loading = this.$loading({
            lock: true,
            text: '创建中',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
            });
            createProject(this.createForm).then( res=>{
                this.addMem.forEach(elem =>{
                    elem.project_id=res.data.project_id
                })
                let data=null
                data={...this.addMem}
                let pData={
                    data:data,
                    project_id:res.data.project_id
                }
                //window.console.log( pData)
                addMember( pData).then( ()=>{
                    loading.close()
                    this.$message({
                    message:'创建任务成功',
                    type:"success",
                    duration:5000
                })
                }).catch( () =>{
                loading.close()
                this.$message({
                    message:'添加成员失败',
                    type:"error",
                    duration:5000
                })
            })
            }).catch( (code) =>{
                loading.close()
                this.$message({
                    message:'创建失败'+code,
                    type:"error",
                    duration:5000
                })
            })
        }
    },
    created(){
        this.fetchData();
    },
    watch:{
        grouper:{
            handler(val){
                this.grouperOnly.name=''
                this.selesctData.length=0;
                this.data.forEach(elem=>{
                    if((val.role==""||val.role==elem.group_role)&&(val.campus==""||val.campus==elem.campus)&&(val.group==""||val.group==elem.group_name)){
                        this.selesctData.push(elem)
                    }
                })
            },
            deep:true
        },
    }
}
</script>

<style scoped>

    .dialog-mem >>> .el-tag{
        height: 34px;
        border-radius: 17px;
        line-height:36px;
        font-size: 14px;
        background-color: #F1F2F9;
        margin-right: 8px;
        margin-bottom: 8px;
    }

    .el-dialog .dialog-mem{
        margin-left: 228px;
        padding-right: 120px;
        min-height: 48px;
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-direction:row;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
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

    .main-container >>> .el-dialog{
        background:rgba(252,254,255,1);
        border-radius:20px;
        min-height: 428px;
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

    .main-container >>> .el-dialog__title{
        font-size:30px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(61,75,89,1);
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

    .main-container{
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