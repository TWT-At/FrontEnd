<template>
  <div class="main-div">
      <div class="button-div">
          <div class="mem-num">项目成员（{{projInfo.member.length}}）</div>
          <button class="head-button add-button">添加成员</button>
          <button class="head-button select-button">选择成员</button>
          <button class="head-button move-head-button">转让组长</button>
          <button class="head-button remove-button">移除成员</button>
      </div>
      <div class="mem-item" v-for="(mem,index) in projInfo.member" :key=index>
          <div class="item-head">
              <el-progress type="circle" :width=50 :stroke-width=2 :show-text=false :percentage="25"></el-progress>
              <img :src="head" class="img-head">
              <div class="item-title">组长：{{mem.name}}（{{mem.group_name}}）</div>
              <div class="item-line"></div>
              <div class="item-time">加入项目时间：{{mem.created_at}}</div>
              <div class="item-task">任务数7/9</div>
              <img class="online-img" :src=doing2x>
          </div>
      </div>
  </div>
</template>

<script>
import head from '../assets/vue.png'
import doing2x from '../assets/doing2x.png'
import finish2x from '../assets/finish2x.png'

export default {
  name: "ProjDetailMem",
  data() {
    return {
        doing2x,
        finish2x,
        head,
      projInfo:this.$store.getters.projInfo,
    }
  },
  methods:{

  }
};
</script>
<style scoped>

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

    .mem-item{
        width:524px;
        height:72px;
        background:rgba(252,254,255,1);
        box-shadow:3px -3px 5px 0px rgba(0, 0, 0, 0.1), -3px 3px 5px 0px rgba(0, 0, 0, 0.1);
        border-radius:10px;
        position: relative;
    }

    .remove-button{
        margin-left: 30px;
    }

    .move-head-button{
        margin-left: 592px;
    }

    .select-button{
        margin-left: 30px;
    }

    .add-button{
        margin-left: 42px;
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
        height: 100px;
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-direction:row;
        justify-content: flex-start;
        align-items: center;
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