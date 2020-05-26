<template>
  <div class="main-div">
      <div class="button-div">
          <div class="mem-num">项目成员（{{projInfo.member.length}}）</div>
          <button class="head-button add-button" @click="addVisible=true">添加成员</button>
          <button :style="changeSelectStype()" class="head-button select-button" @click="handleSelected">
              <span v-if="!selected">选择成员</span>
              <span v-if="selected">取消</span>
          </button>
          <button v-if="selected" @click="changeGroupHead" class="head-button move-head-button">转让组长</button>
          <button v-if="selected" @click="removeMem" class="head-button remove-button">移除成员</button>
      </div>
      <div class="mem-item" v-on:click="handleChoose(index,mem)" v-for="(mem,index) in projInfo.member" :key=index>
          <div class="item-head">
              <el-progress type="circle" :width=50 :stroke-width=2 :show-text=false :percentage="25"></el-progress>
              <img :src="head" class="img-head">
              <div class="item-title"><span>{{getRole(mem.permission)}}</span>：{{mem.name}}（{{mem.group_name}}）</div>
              <div class="item-line"></div>
              <div class="item-time">加入项目时间：{{mem.created_at}}</div>
              <div class="item-task">任务数:{{mem.task_num}}</div>
              <img class="online-img" :src=doing2x>
          </div>
      </div>
      <el-dialog
        title="添加成员"
        :visible.sync="addVisible"
        width="984px">
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
        <button class="create-button" @click="handleSub()">确认录入</button>
    </el-dialog>
  </div>
</template>

<script>
import head from '../assets/member2x.png'
import doing2x from '../assets/doing2x.png'
import finish2x from '../assets/finish2x.png'

import {getUserDatum,addMember,deleteMember,transferLeader,ShowSpecifiedProject} from '../api/user.js'

export default {
  name: "ProjDetailMem",
  data() {
    return {
        selectedIndex:NaN,
        selectedMem:null,
        addVisible: false,
        selected:false,
        doing2x,
        finish2x,
        head,
      projInfo:this.$store.getters.projInfo,
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
        handleSelected(){
            this.selected=!this.selected;
        },
        changeSelectStype(){
            if(this.selected){
                return 'background-color:#7d7f81'
            }else{
                return ''
            }
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
            this.projInfo.member.forEach( elem=>{
                if(elem.member_id==obj.user_id){
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
            let data={...this.addMem}
                let pData={
                    data:data,
                    project_id:this.$store.getters.projDetailID.id
                }
                addMember( pData).then( ()=>{
                    this.$message({
                            message:'添加成员成功',
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
                    this.addMem.length=0
                    this.addVisible=false
                }).catch( () =>{
                this.$message({
                    message:'添加成员失败',
                    type:"error",
                    duration:5000
                })
            })
        },
        handleChoose(index,mem){
            if(this.selected){
                let o=window.document.getElementsByClassName('mem-item')
                o.forEach(elem=>{
                    elem.style.backgroundColor='#fff'
                    elem.style.cursion='pointer'
                })
                o[index].style.backgroundColor='#CCD1D6'
                this.selectedMem=mem
                this.selectedIndex=index
            }
        },
        removeMem(){
            deleteMember({
                project_id:this.$store.getters.projDetailID.id,
                name:this.selectedMem.name,
                user_id:this.selectedMem.member_id
            }).then(()=>{
                this.$message({
                    message:'删除成员成功',
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
            }).catch(()=>{
                    this.$message({
                    message:'删除成员失败',
                    type:"error",
                    duration:5000
                })
            })
        },
        changeGroupHead(){
            transferLeader({
                project_id:this.$store.getters.projDetailID.id,
                name:this.selectedMem.name,
                user_id:this.selectedMem.member_id
            }).then(()=>{
                this.$message({
                    message:'转让组长成功',
                    type:"success",
                    duration:5000
                })
            }).catch(()=>{
                    this.$message({
                    message:'转让组长失败',
                    type:"error",
                    duration:5000
                })
            })
        },
        getRole(key){
            if(key){
                return '组长'
            }else{
                return '组员'
            }
        }
    },
    created(){
        this.fetchData()
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
        selected:{
            handler(val){
                if(val==false){
                    let o=window.document.getElementsByClassName('mem-item')
                    o.forEach(elem=>{
                        elem.style.backgroundColor='#fff'
                        elem.style.cursion='pointer'
                    })
                }
            }
        }
    }
};
</script>
<style scoped>

    .dialog-mem  .el-tag{
        height: 34px;
        border-radius: 17px;
        line-height:36px;
        font-size: 14px;
        background-color: #F1F2F9;
        margin-right: 8px;
        margin-bottom: 8px;
    }

    .el-dialog .dialog-mem{
        margin-left: 278px;
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

    .dialog-mem{
        min-height: 48px;
    }

    .main-div >>> .el-dialog{
        min-height: 240px!important;
    }

    .dialog-opt >>> i:hover{
        cursor: pointer;
        color: #409EFF;
    }

    .dialog-opt >>> i {
        font-size: 40px;
        transition: all .2s;
    }


    .dialog-opt >>> .el-select{
        width: 138px;
    }

    .form-tag{
        font-size:16px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(61,75,89,1);
        margin: 0px 60px 0px 40px;
        width: 180px;
        line-height: 40px;
    }
    
    .dialog-opt{
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-direction:row;
        justify-content: flex-start;
        align-items: left;
        margin-bottom: 20px;
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

    .online-img{
        height: 22px;
        width: 22px;
        position:absolute;
        top:6px;
        right:6px;
    }

    .item-task{
        position:absolute;
        top:38px;
        right:24px;
        font-size:12px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(143,143,143,1);
    }

    .item-time{
        position:absolute;
        top:38px;
        left:88px;
        font-size:12px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(143,143,143,1);
    }

    .item-line{
        background-color: #d6d8d9;
        position:absolute;
        top:36px;
        left:84px;
        width:420px;
        height:2px;
        border-radius: 1px;
    }

    .item-title{
        position:absolute;
        top:16px;
        left:88px;
        font-size:14px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(0,0,0,1);
    }

    .img-head{
        height: 46px;
        width: 46px;
        position:absolute;
        top:14px;
        left:24px;
        border-radius: 50%;
    }

    .item-head >>> .el-progress {
        position:absolute;
        top:12px;
        left:22px;
    }

    .mem-item:hover{
        cursor: pointer;
    }

    .mem-item{
        transition: all .2s;
        width:524px;
        height:72px;
        background:rgba(252,254,255,1);
        box-shadow:3px -3px 5px 0px rgba(0, 0, 0, 0.1), -3px 3px 5px 0px rgba(0, 0, 0, 0.1);
        border-radius:10px;
        position: relative;
        margin-bottom: 18px;
    }

    .button-div >>> .remove-button:hover{
        background:#690101;
    }

    .button-div >>> .remove-button{
        margin-left: 30px;
        background: #a20404;
    }

    .move-head-button:hover{
        background:#13283C;
    }

    .move-head-button{
        margin-left: 572px;
    }

    .select-button{
        margin-left: 30px;
    }

    .add-button{
        margin-left: 42px;
    }

    .add-button:hover{
        background:#13283C;
    }

    .head-button:hover{
        cursor: pointer;
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

    .mem-num{
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