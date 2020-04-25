<template>
  <div class="main-box">
    <div class="first-line-box">
      <div class="first-left-box">
        <div class="info-box">
          <div class="info-title-box">
            <img :src="head" class="info-title-logo">
            <div class="title-word">
              早上好，{{userInfo.name}}
            </div>
          </div>
          <div class="info-main">
              <div class="info-div-first info-div-top">今天是你加入天外天的第<span class="info-span-bold">{{userInfo.date}}</span>天</div>
              <div class="info-div-first">你已在工作室累计工作时长<span class="info-span-bold">{{userInfo.hour}}</span>小时</div>
              <div class="info-div-first">本周工作时常<span class="info-span-bold">9999</span>小时</div>
              <div class="info-div-second info-div-second-top">账号：
                <span class="info-span-second">{{userInfo.name}}</span>
                <button class="change-userInfo-button">密码修改及信息维护>></button>
              </div>
              <div class="info-div-second">组别：<span class="info-span-second">{{userInfo.group}}</span></div>
            </div>
        </div>
        <div class="weekly-box">
          <div class="weekly-title-box">
            <img :src="weekly" class="weekly-title-logo">
            <div class="title-word">周报状态</div>
          </div>
          <div class="weekly-main">
            <div class="weekly-div-first weekly-div">第202015周报:<span class="sub-status">未提交</span></div>
            <div class="weekly-div-second weekly-div">起止日期：2020/04/07～2020/04/13（美东时间）</div>
            <div class="weekly-div-third weekly-div">
              周报截止日期为每周周一，在时间范围内可以进行编辑。<br/>超过时间的周报不能进行编辑。
              <button class="write-weekly-button">去编辑周报>></button>
            </div>
          </div>
        </div>
      </div>
      <div class="message-box">
        <div class="message-title-box">
          <img :src="message2x" class="message-logo">
          <div class="title-word">消息</div>
          <div class="message-num" v-if="messageNum">{{messageNum}}</div>
        </div>
        <div class="message-main">

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import head from '../assets/vue.png'
import message2x from '../assets/message2x.png'
import weekly2x from '../assets/weekly2x.png'

export default {
  name: "home",
  data() {
    return {
      head,
      message2x,
      weekly2x,
      userInfo:this.$store.getters.userInfo,
      messageNum:1,
    };
  }
};
</script>
<style scoped>

  .message-main{
    height:474px;
    background:rgba(252,254,255,1);
    box-shadow:3px 3px 10px 0px rgba(0, 0, 0, 0.05), -3px -3px 10px 0px rgba(0, 0, 0, 0.05);
    border-radius:20px;
    margin-top: 24px;
  }

  .message-num{
    border-style: solid;
    border-width: 4px;
    border-color: #D70000;
    width: 34px;
    height: 34px;
    line-height: 24px;
    margin-left: 12px;
    margin-bottom: 0px;
    border-radius: 50%;
    font-family: MicrosoftYaHei;
    font-weight: bolder;
    font-size: 18px;
    color: #D70000;
  }

  .message-title-box{
    display: flex;
    display: -webkit-flex; /* Safari */
    flex-direction:row;
    justify-content: flex-start;
    align-items: flex-end;
  }

  .message-logo{
    width: 56px;
    height: 60px;
    margin-right: 32px;
  }

  .write-weekly-button:hover{
    cursor: pointer;
  }

  .write-weekly-button{
    outline: none;
    border: none;
    font-size:14px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(3,163,234,1);
    background-color: #fff;
  }

  .weekly-div-third{
    font-size: 14px;
    color: #333435;
    font-family: MicrosoftYaHei;
    margin-top: 4px;
    text-align:left;
  }

  .weekly-div-second{
    font-size: 14px;
    color: #333435;
    font-family: MicrosoftYaHei;
  }

  .sub-status{
    font-family: MicrosoftYaHei-Bold;
    font-weight: bolder;
    color: #F59A23;
    font-size: 18px;
    margin-left: 8px;
  }

  .weekly-div-first{
    margin-top: 24px;
    font-family: MicrosoftYaHei;
    color: #333435;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .weekly-div{
    margin-left: 32px;
  }

  .weekly-main{
    width:518px;
    height:162px;
    background:rgba(252,254,255,1);
    box-shadow:3px 3px 10px 0px rgba(0, 0, 0, 0.05), -3px -3px 10px 0px rgba(0, 0, 0, 0.05);
    border-radius:20px;
    margin-top: 18px;
    display: flex;
    display: -webkit-flex; /* Safari */
    flex-direction:column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .weekly-title-box{
    height: 54px;
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-direction:row;
    justify-content: flex-start;
    align-items: flex-end;
  }

  .weekly-box{
    height: 234px;
    width: 518px;
    margin-top: 48px;
  }

  .weekly-title-logo{
    height: 54px;
    width: 54px;
    margin-right: 32px;
  }

  .change-userInfo-button:hover{
    cursor: pointer;
  }

  .change-userInfo-button{
    outline: none;
    border:none;
    height:15px;
    font-size:14px;
    font-family:Microsoft YaHei;
    font-weight:400;
    background-color: #fff;
    color: #03A3EA;
  }

  .info-div-second-top{
    margin-top: 16px;
  }

  .info-span-second{
    color: #333435;
    font-family: MicrosoftYaHei;
    font-weight:normal;
    margin-right: 12px;
  }

  .info-span-bold{
    color: #03A3EA;
    font-family: MicrosoftYaHei-Bold;
    font-weight: bold;
    font-size: 18px;
    margin:0px 4px 0px 4px;
  }

  .info-div-top{
    margin-top: 26px;
  }

  .info-div-first{
    margin-left: 32px;
    font-size:14px;
    color: #333435;
    font-family:  MicrosoftYaHei ;
  }

  .info-div-second{
    margin-left: 32px;
    font-size:14px;
    color: #333435;
    font-family:  MicrosoftYaHei-Bold ;
    font-weight: bold;
  }

  .info-main{
    width:518px;
    height:190px;
    background:rgba(252,254,255,1);
    box-shadow:-3px -3px 10px 0px rgba(0, 0, 0, 0.05), 3px 3px 10px 0px rgba(0, 0, 0, 0.05);
    border-radius:20px;
    margin-top: 24px;
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-direction:column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .title-word{
    font-size:30px;
    font-family:Microsoft YaHei;
    font-weight:bold;
    color:rgba(61,75,89,1);
  }

  .info-title-box{
    height: 62px;
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-direction:row;
    justify-content: flex-start;
    align-items: flex-end;
  }

  .info-title-logo{
    height: 62px;
    width: 62px;
    margin-right: 32px;
    border-radius: 50%;
    background-color: #888;
  }

  .info-box{
    min-height: 272px;
    width:518px;
  }

  .message-box{
    width:532px;
    height: 560px;
  }

  .first-left-box{
    width: 518px;
    height: 560px;
  }

  .first-line-box{
    height:560px;
    width:1148px;
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-direction:row;
    justify-content: space-between;
    align-items: flex-start;
    background-color: #0f0c;
  }

  .main-box{
    min-height: 1000px;
    width: 1148px;
    margin: 76px auto 0px 24px;
    background-color: blue;
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-direction:column;
    justify-content: flex-start;
    align-items: flex-start;
  }
</style>