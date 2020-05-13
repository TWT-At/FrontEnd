<template>
  <div class="main-box">
      <div class="title-div">
          <el-progress :color="getColor" :stroke-width=6 :width=68 type="circle" :percentage=ID.rate*100></el-progress>
          <div v-bind:style="{width:ID.rate*960+'px'}" :class="isFinish()?'finish-line':'process-line'"></div>
          <div class="bg-line"></div>
          <div class="proj-title">{{ProjDetail.title}}</div>
          <div class="proj-created">{{ID.created_at}}</div>
          <div class="mem-all">
              项目成员：
            <span v-for="(mem,index) in ProjDetail.member" :key=index class="title-mem">{{mem.name+' '}}</span>
          </div>
          <div v-on:click="handleBack()" class="back-cross"><i class="el-icon-close"></i></div>
      </div>
      <div class="describe-title">
          <div class="des-word">
              项目介绍: <i class="el-icon-edit-outline"></i>
          </div>
          <button class="my-button des-button">保存</button>
      </div>
      <el-input
        type="textarea"
        :rows="10"
        placeholder=""
        :maxlength="400"
        resize="none"
        show-word-limit
        v-model="ProjDetail.description">
    </el-input>
    <div class="finish-div">
        <button class="my-button finish-button">项目完结</button>
    </div>
    <div class="nav-div">
        <button :id="handleStyle(1)" class="nav-button nav-mem" @click="handleNav(1)">项目成员</button>
        <div class="nav-line" ></div>
        <button :id="handleStyle(2)" class="nav-button nav-task" @click="handleNav(2)">任务管理</button>
        <div class="nav-line"></div>
        <button :id="handleStyle(3)" class="nav-button nav-log" @click="handleNav(3)">查看日志</button>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
    name:'projDetail',
    data (){
        return{
        navKey:1,
        ID:this.$store.getters.projDetailID,
        ProjDetail: {
        title: "at系统开发",
        description: "天外天新人at系统开发",
        process: "已完成首页、周报、日志接口；\r\n完成部分管理员接口；\r\n",
        member: [
            {
                name: "齐呈祥",
                group_name: "程序组",
                permission: 1,
                created_at: "2020-04-21 17:26:11"
            },
            {
                name: "高树韬",
                group_name: "前端组",
                permission: 0,
                created_at: "2020-04-21 17:26:11"
            }
        ],
        task: [
            {
                name: "齐呈祥",
                title: "项目管理",
                description: "项目管理",
                process: "正在做",
                created_at: "2020-04-21 17:37:56"
            }
        ],
        log: [
            {
                name: "齐呈祥",
                description: "新增了项目",
                update_at: "2020-04-21 17:41:56"
            }
        ]
    }
        }
    },
    methods:{
        getColor(){
            if(this.ID.rate==1){
                return "#13ce66"
            }else{
                return "#738eab"
            }
        },
        isFinish(){
            if(this.ID.rate==1){
                return true
            }else{
                return false
            }
        },
        handleBack(){
            this.$router.push('/main/projMain/project')
        },
        handleNav(key){
            this.navKey=key
            this.$store.dispatch('user/setProjInfo',this.ProjDetail)
            switch(key){
                case 1:
                    this.$router.push('/main/projMain/projDetail/projDetailMem').catch(err=>{
                        window.console.log(err)
                    })
                    break;
                default:
                    break;
            }
        },
        handleStyle(key){
            if(key==this.navKey){
                return 'select-nav'
            }else{
                return ''
            }
        }
    },
    created(){
        this.handleNav(1)
    }
}
</script>

<style scoped>

    #select-nav{
        color: #3D4B59;
        font-size: 20px;
    }

    .nav-div >>> .nav-mem{
        width: 108px;
        text-align: left;
    }

    .nav-line{
        width: 1px;
        height: 48px;
        background-color: #cfd0d1;
        margin: 2px;
    }

    .nav-button:hover{
        font-size: 20px;
        cursor: pointer;
    }

    .nav-button{
        transition: all .2s;
        outline: none;
        border: none;
        background-color: #fff;
        height: 48px;
        width: 140px;
        font-size:18px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(143,143,143,1);
    }

    .nav-div{
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-direction:row;
        justify-content: flex-start;
        align-items: center;
    }

    .finish-div >>> .finish-button:hover{
        background-color: #690101;
    }

    .finish-div >>> .finish-button{
        background-color: #A20404;
    }

    .finish-div{
        width: 100%;
        margin-top: 20px;
        margin-bottom: 14px;
        text-align: right;
    }

    .main-box >>> .el-textarea__inner{
        border-radius:20px;
    }

    .my-button:hover{
        cursor: pointer;
        background:#13283C;
    }

    .my-button{
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
    }

    .des-word{
        line-height: 24px;
    }

    .des-word >>> .el-icon-edit-outline{
        font-size: 26px;
    }

    .describe-title{
        margin-top: 36px;
        font-size:18px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(61,75,89,1);
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-direction:row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-bottom: 28px;
    }

    .back-cross:hover{
        color: #409EFF;
        transform:rotate(90deg);
        -ms-transform:rotate(90deg); 	/* IE 9 */
        -moz-transform:rotate(90deg); 	/* Firefox */
        -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
        -o-transform:rotate(90deg); 	/* Opera */
        cursor: pointer;
    }

    .back-cross{
        transition: all .2s;
        font-size: 48px;
        right: -10px;
        top: -10px;
        position: absolute;
    }

    .mem-all{
        max-width: 936px;
        position: absolute;
        left: 86px;
        top: 40px;
        font-size:14px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(143,143,143,1);
        text-align: left;
    }

    .proj-created{
        position: absolute;
        right: 54px;
        top: 10px;
        font-size:14px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(143,143,143,1);
    }

    .proj-title{
        position: absolute;
        left: 86px;
        top: 0px;
        font-size:20px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(61,75,89,1);
        line-height:30px;
    }

    .finish-line{
        z-index: 2;
        background-color: #13ce66;
        height: 6px;
        width: 960px;
        position: absolute;
        left: 62px;
        top: 30px;
        border-radius: 3px 3px 3px 3px;
    }

    .bg-line{
        background-color: #d6d8d9;
        position: absolute;
        left: 62px;
        top: 30px;
        width: 960px;
        height: 6px;
        border-radius: 3px 3px 3px 3px;
        z-index: 1;
    }

    .process-line{
        z-index: 2;
        background-image: linear-gradient(to right, #738eab , #c8e5f3);
        height: 6px;
        position: absolute;
        left: 62px;
        top: 30px;
        border-radius: 3px 3px 3px 3px;
    }

    .title-div >>> .el-progress__text{
        font-size: 12px!important;
        font-weight: bold!important;
    }

    .title-div >>> .el-progress-circle{
        transform:rotate(90deg);
        -ms-transform:rotate(90deg); 	/* IE 9 */
        -moz-transform:rotate(90deg); 	/* Firefox */
        -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
        -o-transform:rotate(90deg); 	/* Opera */
    }

    .title-div >>> .el-progress{
        position: absolute;
        left: 0px;
        top: 0px;
    }

    .title-div{
        position: relative;
        width:1076px;
        height: 68px;
    }

    .main-box{
        width:1140px;
        min-height:987px;
        background:rgba(252,254,255,1);
        box-shadow:3px 3px 10px 0px rgba(0, 0, 0, 0.05), -3px -3px 10px 0px rgba(0, 0, 0, 0.05);
        border-radius:20px;
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-direction:column;
        justify-content: flex-start;
        align-items: flex-start;
        margin-top: 48px;
        margin-bottom: 48px;
        padding: 32px;
    }
</style>