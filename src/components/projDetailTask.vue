<template>
  <div class="main-div">
      <div class="button-div">
          <div class="task-num">任务（{{projInfo.task.length}}）</div>
          <button class="head-button">新建任务</button>
      </div>
      <div class="task-item" v-for="(task,index) in projInfo.task" :key=index>
          <div class="item-head">
              <div class="item-title">TASK：{{task.title}}</div>
              <div class="item-line"></div>
              <div class="item-cteated">起始时间：{{task.created_at}}
                    <span class="item-end">DDL：9012-13-32</span>
                    <span class="item-mem">参与者：{{task.name}}</span>
                </div>
              <img class="online-img" :src=doing2x>
          </div>
      </div>
  </div>
</template>

<script>
import doing2x from '../assets/doing2x.png'
import finish2x from '../assets/finish2x.png'

export default {
  name: "ProjDetailMem",
  data() {
    return {
        doing2x,
        finish2x,
      projInfo:this.$store.getters.projInfo,
    }
  },
  methods:{

  }
};
</script>
<style scoped>

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