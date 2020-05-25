<template>
  <div class="main-box">
      <div class="title-div">
          <div class="main-title">第{{getIssue()}}期周报
              <span class="title-span">{{getDay()}}</span>
          </div>
          <div>
          <button class="title-button">提交</button>
          <button class="title-button" @click="$router.go(-1)">返回</button>
          </div>
      </div>
      <div class="des-title">
          以下模板仅供参考，你可以自己决定在周报中记录什么。 文档编辑器采用markdown语法，语法参考请点击：
          <a target="_blank" href="https://www.runoob.com/markdown/md-tutorial.html">语法参考</a>
      </div>
  </div>
</template>

<script>
export default {
    name:'weeklyWrite',
    data(){
        return{

        }
    },
    methods:{
        getIssue(){
            let date=new Date;
            let year=date.getFullYear();
            let beginDate = new Date(date.getFullYear(), 0, 1);
            return `${year}${Math.ceil((parseInt((date - beginDate) / (24 * 60 * 60 * 1000)) + 1 + beginDate.getDay()) / 7)}`
        },
        getDay(){
            let nowTemp = new Date();//当前时间
            let oneDayLong = 24*60*60*1000 ;//一天的毫秒数
            let c_time = nowTemp.getTime() ;//当前时间的毫秒时间
            let c_day = nowTemp.getDay()||7;//当前时间的星期几
            let m_time = c_time - (c_day-1)*oneDayLong;//当前周一的毫秒时间
            let monday = new Date(m_time);//设置周一时间对象
            let m_year = monday.getFullYear();
            let m_month = monday.getMonth()+1;
            let m_date = monday.getDate();
            return `${m_year+'/'+m_month+'/'+m_date}~${m_year+'/'+m_month+'/'+(m_date+6)}`
        }
    }
}
</script>

<style scoped>

    .des-title{
        width: 40%;
        text-align: left;
    }

    .title-span{
        font-size:16px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(51,52,53,1);
        margin-left: 36px;
    }

    .title-button:hover{
        background-color: #012d4f;
        cursor: pointer;
    }

    .title-button{
        transition: all .3s;
        width:104px;
        height:44px;
        background:rgba(2,69,122,1);
        box-shadow:3px -3px 5px 0px rgba(0, 0, 0, 0.1), -3px 3px 5px 0px rgba(0, 0, 0, 0.1), 3px 3px 5px 0px rgba(0, 0, 0, 0.1), -3px -3px 5px 0px rgba(0, 0, 0, 0.1);
        border-radius:22px;
        font-size:18px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(252,254,255,1);
        outline: none;
        margin-left: 38px;
    }

    .main-title{
        font-size:30px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(61,75,89,1);
    }

    .title-div{
        width: 100%;
        display: flex;
        display: -webkit-flex; /* Safari */
        flex-direction:row;
        justify-content: space-between;
        align-items: flex-start;
    }

    .main-box{
        min-height: 1000px;
        width: 1148px;
        margin: 76px auto 0px 24px;
        display: flex;
        display: -webkit-flex; /* Safari */
        flex-direction:column;
        justify-content: flex-start;
        align-items: flex-start;
    }
</style>