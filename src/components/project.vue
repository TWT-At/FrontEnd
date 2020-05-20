<template>
  <div class="main-box">
    <div class="main-div">
        <div v-for="(proj,index) in data" :key="index" class="proj-div" v-on:click="handleClick(proj)">
            <el-progress 
            type="circle" 
            :percentage=(proj.rate.toFixed(2))*100
            :color="getColor(proj.rate.toFixed(2))"
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
                <div v-if="handleIf(proj.rate)" class="ddl-main" >
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
  </div>
</template>

<script>
import {ShowMyProject,ShowSpecifiedProject} from '../api/user'

export default {
  name: 'project',
  data() {
    return {
        data:[
            {   id: 2,
                name: "齐呈祥",
                title: "at系统开发",
                created_at: "2020-04-14 12:24:54",
                rate:0.6123123123123,
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
    },
    handleClick(proj){
        this.$store.dispatch('user/setProjDetailID',proj)
         ShowSpecifiedProject({project_id:proj.id}).then( res=>{
            this.$store.dispatch('user/setProjInfo',res.data.data)
            this.$router.push('/main/projMain/projDetail/projDetailMem')
        })
    },
    getMyproj(){
        ShowMyProject().then( res=> {
            res.data.data.forEach(elem => {
                
                this.data.push(elem[0])
            });
        })
    }
  }
  ,created(){
      this.getMyproj()
  }
};
</script>
<style scoped>

    .proj-div:hover{
        cursor: pointer;
        background-color: #CCD1D6;
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
        transition: all .2s;
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
    }

    .main-box{
        min-height: 1000px;
        width: 1148px;
        margin: 0px;
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-direction:column;
        justify-content: flex-start;
        align-items: flex-start;
    }
</style>