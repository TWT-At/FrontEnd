<template>
  <div class="main-div">
      <div class="button-div">
          <div class="task-num">任务（{{projInfo.task.length}}）</div>
          <button class="head-button" @click="dialogVisible=true">新建任务</button>
      </div>
      <div class="task-item" v-for="(task,index) in projInfo.task" :key=index>
          <div class="item-head">
              <div class="item-title">TASK：{{task.title}}</div>
              <div class="item-line"></div>
              <div class="item-cteated">起始时间：{{task.created_at}}
                    <span class="item-end">DDL：{{task.deadline.split(' ')[0]}}</span>
                    <span class="item-mem">参与者：{{task.name}}</span>
                </div>
              <img class="online-img" :src=doing2x>
          </div>
      </div>
      <el-dialog
        title="新建TASK"
        :visible.sync="dialogVisible"
        width="45%">
            <div class="task-title create-item"><span class="title-span">名称：</span><el-input v-model="taskInfo.title" placeholder="名称"></el-input></div>
            <div class="task-ddl create-item"><span class="title-span">DDL：</span><el-date-picker
                v-model="time"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                :picker-options="pickerOptions"
                placeholder="选择日期时间">
                </el-date-picker>
            </div>
            <div class="task-mem create-item"><span class="title-span">项目成员：</span>
                <el-select v-model="value" v-if="!!myPermition" placeholder="请选择成员">
                    <el-option
                    v-for="item in options"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
                    </el-option>
                </el-select>
                <span class="self-span" v-if="!myPermition">自己</span>
            </div>
            <button class="create-button" @click="handleSub">确认录入</button>
        </el-dialog>
  </div>
</template>

<script>
import doing2x from '../assets/doing2x.png'
import finish2x from '../assets/finish2x.png'

import {getMemberDatum,createTask,createOtherTask,ShowSpecifiedProject} from '../api/user'

export default {
    name: "ProjDetailMem",
    data() {
        return {
            pickerOptions: {
            disabledDate(time) {
                return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
            }},
            dialogVisible: false,
            doing2x,
            finish2x,
            projInfo:this.$store.getters.projInfo,
            taskInfo:{
                title:'',
                description:''
            },
            value:'',
            time:'',
            options:[],
            myPermition:0
        }
    },
    methods:{
        getOptions(){
            getMemberDatum({project_id:this.$store.getters.projDetailID.id}).then( res=>{
                this.options=res.data.data
                res.data.data.forEach(elem=>{
                    if(elem.user_id==this.$store.getters.userInfo.id){
                        this.myPermition=1
                    }
                })
            })
        },
        handleSub(){
            switch (this.myPermition){
                case 1:
                    if(this.value!=''&&this.taskInfo.title!=''&&this.taskInfo.description!=''&&this.time!=''){
                        createOtherTask({
                            project_id:this.$store.getters.projDetailID.id,
                            name:this.value,
                            title:this.taskInfo.title,
                            description:this.taskInfo.description,
                            deadline:this.time
                        }).then( ()=>{
                            this.$message({
                            message:'添加成功',
                            type:"success",
                            duration:5000
                            })
                            ShowSpecifiedProject({project_id:this.$store.getters.projDetailID.id}).then( res=>{
                                this.$store.dispatch('user/setProjInfo',res.data.data).then(()=>{
                                    this.projInfo=this.$store.getters.projInfo
                                })
                            }).catch(()=>{
                        window.console.log(123)
                    })
                            this.dialogVisible=false
                        }).catch(()=>{
                            this.$message({
                            message:'添加失败',
                            type:"error",
                            duration:5000
                        })})
                    }else{
                        this.$message({
                            message:'请填写全部信息',
                            type:"error",
                            duration:5000
                        })
                    }
                break;
                case 0:
                    if(this.$store.getters.projDetailID.id==''||this.taskInfo.title==''||this.time==''){
                        createTask({
                            project_id:this.$store.getters.projDetailID.id,
                            title:this.taskInfo.title,
                            description:this.taskInfo.description,
                            deadline:this.time
                        }).then( ()=>{
                            this.$message({
                                message:'添加成功',
                                type:"success",
                                duration:5000
                            })
                            ShowSpecifiedProject({project_id:this.$store.getters.projDetailID.id}).then( res=>{
                                this.$store.dispatch('user/setProjInfo',res.data.data).then(()=>{
                                    this.projInfo=this.$store.getters.projInfo
                                })
                            }).catch(()=>{
                                window.console.log(123)
                            })
                            this.dialogVisible=false
                        }).catch(()=>{
                            this.$message({
                            message:'添加失败',
                            type:"error",
                            duration:5000
                        })})
                    }else{
                        this.$message({
                            message:'请填写全部信息',
                            type:"error",
                            duration:5000
                        })
                        }
                    break;
                default:break;
            }
        }
    },
    created(){
        this.getOptions()
    },
    watch:{
        'taskInfo.title':{
            handler(val){
                this.taskInfo.description=val;
            },
            deep:true
        }
    }
};
</script>
<style scoped>

    .main-div >>> .el-dialog{
        width: 864px!important;
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

    .task-mem>>> .el-input{
        width: 460px;
    }

    .self-span{
        width: 604px;
        text-align: center;
    }

    .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width: 604px;
    }

    .task-title >>> .el-input{
        width: 604px;
    }

    .create-item{
        text-align: left;
        width: 692px;
        padding-left: 60px;
        padding-right: 60px;
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-direction:row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 40px;
    }

    .title-span{
        font-size:16px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(61,75,89,1);
        width: 148px;
    }

    .item-end{
        color: #A20404;
        font-weight: bold;
    }

    .online-img{
        height: 22px;
        width: 22px;
        position:absolute;
        top:6px;
        right:6px;
    }

    .item-cteated{
        position:absolute;
        top:38px;
        left:24px;
        font-size:12px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(143,143,143,1);
    }

    .item-line{
        background-color: #d6d8d9;
        position:absolute;
        top:36px;
        left:18px;
        width:488px;
        height:2px;
        border-radius: 1px;
    }

    .item-title{
        position:absolute;
        top:16px;
        left:24px;
        font-size:14px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(0,0,0,1);
    }


    .task-item{
        width:524px;
        min-height:72px;
        background:rgba(252,254,255,1);
        box-shadow:3px -3px 5px 0px rgba(0, 0, 0, 0.1), -3px 3px 5px 0px rgba(0, 0, 0, 0.1);
        border-radius:10px;
        position: relative;
        margin-bottom: 18px;
    }


    .head-button:hover{
        cursor: pointer;
        background:#13283C;
    }

    .head-button{
        transition: all .2s;
        width:72px;
        height:24px;
        background:rgba(77,91,104,1);
        box-shadow:3px -3px 5px 0px rgba(0, 0, 0, 0.1), -3px 3px 5px 0px rgba(0, 0, 0, 0.1), 3px 3px 5px 0px rgba(0, 0, 0, 0.1), -3px -3px 5px 0px rgba(0, 0, 0, 0.1);
        border-radius:12px;
        font-size:14px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(252,254,255,1);
    }

    .task-num{
        font-size:14px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(0,0,0,1);
    }

    .button-div{
        width: 100%;
        height: 36px;
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-direction:row;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 20px;
    }

    .main-div{
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-direction:row;
        justify-content: space-between;
        align-items: flex-start;
        align-content:flex-start;
        width: 100%;
        min-height: 542px;
        padding: 22px 0px 36px 0px;
        flex-wrap:wrap;
    }
</style>