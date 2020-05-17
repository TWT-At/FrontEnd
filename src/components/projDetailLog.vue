<template>
  <div class="main-div">
        <div class="button-div">
            <div class="log-num">项目日志（{{projInfo.log.length}}）</div>
        </div>
        <div class="log-container">
            <div class="log-item" v-for="(log,index) in projInfo.log" :key=index>
                {{log.update_at}}<span class="log-name">{{log.name}}</span>{{log.description}}
            </div>
        </div>
  </div>
</template>

<script>

export default {
  name: "ProjDetailLog",
  data() {
    return {
      projInfo:this.$store.getters.projInfo,
    }
  },
  methods:{

  }
};
</script>
<style scoped>

    .log-name{
        margin:0px 24px 0px 24px;
    }

    .log-item{
        font-size:14px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(0,0,0,1);
        width:100%;
        min-height:14px;
        margin-bottom: 24px;
    }

    .log-container{
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-direction:column;
        justify-content: flex-start;
        align-items: flex-start;
    }

    .log-num{
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