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
                <button class="change-userInfo-button" @click="toUserDetail">密码修改及信息维护>></button>
              </div>
              <div class="info-div-second">组别：<span class="info-span-second">{{complexInfo.campus}}-{{userInfo.group}}（{{userInfo.group_role}}）</span></div>
            </div>
        </div>
        <div class="weekly-box">
          <div class="weekly-title-box">
            <img :src="weekly2x" class="weekly-title-logo">
            <div class="title-word">周报状态</div>
          </div>
          <div class="weekly-main">
            <div class="weekly-div-first weekly-div">第202015周报:<span v-if="!userInfo.WeekPublicationSituation" class="sub-status">未提交</span><span v-if="userInfo.WeekPublicationSituation" class="sub-status">已提交</span></div>
            <div class="weekly-div-second weekly-div">起止日期：{{getWeekStartDate()}}～{{getWeekEndDate()}}</div>
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
            <div class="message-big">
              <div class="message-div">
                <div class="message-big-title"><el-checkbox v-model="messageBig.checked"></el-checkbox>{{messageBig.type}}{{messageBig.title}}</div>
                <div class="message-big-content">{{messageBig.message}}</div>
              </div>
              <div class="time-div">{{messageBig.time}}</div>
            </div>
            <div class="messages" v-for="(message,i) in messages" :key="i">
              <div class="messages-title"><el-checkbox v-model="message.checked"></el-checkbox>{{message.type}}{{message.title}}</div>
              <div class="messages-time">{{message.time}}</div>
            </div>
        </div>
      </div>
    </div>
    <div class="second-line-box">
      <div class="proj-title-box">
        <img class="proj-logo" :src="project2x">
         <div class="title-word">我的项目</div>
         <div class="proj-nun">共有{{projNum.doing}}个项目在进行中，已完结{{projNum.done}}个项目</div>
      </div>
      <div class="proj-main">

      </div>
    </div>
    <div class="third-line-box">
      <div class="group-title-box">
        <img class="group-logo" :src="member2x">
         <div class="title-word">有人吗</div>
         <div class="group-num">当前共{{group.total}}人在线，本组共有{{group.myGroup}}人在线</div>
      </div>
      <div class="group-main">
        <button class="who-button group-button">他们都是谁？</button>
        <button class="cons-button group-button" @click="toGrouper">工作室成员情况</button>
        <button class="mac-button group-button">管理我的Mac地址</button>
      </div>
    </div>
  </div>
</template>
<script>
import {getHead,getComplex,getMessage,UpdateRead,ShowMyProject,getOnline} from '../api/user'
import head from '../assets/vue.png'
import message2x from '../assets/message2x.png'
import weekly2x from '../assets/weekly2x.png'
import project2x from '../assets/project2x.png'
import member2x from '../assets/member2x.png'

export default {
  name: "home",
  data() {
    return {
      head,
      message2x,
      project2x,
      weekly2x,
      member2x,
      userInfo:this.$store.getters.userInfo,
      complexInfo:{
        email: "",
        campus: "",
        project: []
      },
      messageNum:0,
      messageBig:{
      },
      messageBigCopy:{
      },
      messages:[],
      messagesCopy:[],
        projNum:{
          doing:0,
          done:0,
        },
        group:{
          total:0,
          myGroup:0,
        }
    };
  },
  methods:{
      toGrouper(){
          this.$router.push('/main/grouper')
      },
      toUserDetail(){
          this.$router.push('/main/userDetail')
      },
      getWeekStartDate() { 
        let nowTemp = new Date();//当前时间
        let oneDayLong = 24*60*60*1000 ;//一天的毫秒数
        let c_time = nowTemp.getTime() ;//当前时间的毫秒时间
        let c_day = nowTemp.getDay()||7;//当前时间的星期几
        let m_time = c_time - (c_day-1)*oneDayLong;//当前周一的毫秒时间
        let monday = new Date(m_time);//设置周一时间对象
        let m_year = monday.getFullYear();
        let m_month = monday.getMonth()+1;
        let m_date = monday.getDate();
        return (m_year+'-'+m_month+'-'+m_date)
      },
      getWeekEndDate(){
        let nowTemp = new Date();//当前时间
        let oneDayLong = 24*60*60*1000 ;//一天的毫秒数
        let c_time = nowTemp.getTime() ;//当前时间的毫秒时间
        let c_day = nowTemp.getDay()||7;//当前时间的星期几
        let m_time = c_time - (c_day-1)*oneDayLong;//当前周一的毫秒时间
        let monday = new Date(m_time);//设置周一时间对象
        let m_year = monday.getFullYear();
        let m_month = monday.getMonth()+1;
        let m_date = monday.getDate();
        return (m_year+'-'+m_month+'-'+(m_date+6))
      }
    },
    mounted(){
    getHead().then(res => {
            return 'data:image/png;base64,' + btoa(
                new Uint8Array(res.data)
                  .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
        }).then(data => {
            this.head=data;
        })
  },
  created(){
    getComplex({id:this.userInfo.id}).then(res =>{
      if(res.status === 200){
        let {student,project}=res.data;
        this.complexInfo.email = student[0].email;
        this.complexInfo.campus = student[0].campus;
        this.complexInfo.project = project;
      }
    })
    getMessage().then( res=>{
      if(res.status === 200){
        let data = res.data.data.reverse().slice(0,14);
        data.forEach(elem =>{
          if(elem.read == 0){
            this.messageNum++
          }
        })
        if(data[0]){
          let now=new Date();
          let t=new Date(data[0].created_at.replace('-','/'));
          let time ;
          if(now.getFullYear()>t.getFullYear()){
            time = now.getFullYear()-t.getFullYear()+"年前"
          }else if(now.getMonth()>t.getMonth()){
            time = now.getMonth()-t.getMonth()+"个月前"
          }else if(now.getDate()>t.getDate()){
            time = now.getDate()-t.getDate()+"天前"
          }else if(now.getHours()>t.getHours()){
            time = now.getHours()-t.getHours()+"小时前"
          }else if(now.getMinutes()>t.getMinutes()){
            time = now.getMinutes()-t.getMinutes()+"分钟前"
          }else {
            time="刚刚"
          }
          this.messageBig={
            id:data[0].id,
            type:data[0].type,
            title:data[0].title,
            message:data[0].message,
            checked:!!data[0].read,
            time:time
          }
          this.messageBigCopy={
            id:data[0].id,
            type:data[0].type,
            title:data[0].title,
            message:data[0].message,
            checked:!!data[0].read,
            time:time
          }
          data.shift();
          data.forEach( elem =>{
            let now=new Date();
          let t=new Date(elem.created_at.replace('-','/'));
          let time ;
          if(now.getFullYear()>t.getFullYear()){
            time = now.getFullYear()-t.getFullYear()+"年前"
          }else if(now.getMonth()>t.getMonth()){
            time = now.getMonth()-t.getMonth()+"个月前"
          }else if(now.getDate()>t.getDate()){
            time = now.getDate()-t.getDate()+"天前"
          }else if(now.getHours()>t.getHours()){
            time = now.getHours()-t.getHours()+"小时前"
          }else if(now.getMinutes()>t.getMinutes()){
            time = now.getMinutes()-t.getMinutes()+"分钟前"
          }else {
            time="刚刚"
          }
            this.messages.push({
            id:elem.id,
            type:elem.type,
            title:elem.title,
            message:elem.message,
            checked:!!elem.read,
            time:time
            })
            this.messagesCopy.push({
            id:elem.id,
            type:elem.type,
            title:elem.title,
            message:elem.message,
            checked:!!elem.read,
            time:time
            })
          })
        }
      }
    })
    ShowMyProject().then(res=>{
        if(res.data.error_code != 1){
            res.data.data.forEach(item => {
                if(item[0].rate==1){
                    this.projNum.done++
                }else{
                    this.projNum.doing++
                }
            })
        }
    }).catch((e)=>{
        if(e==1){
            this.group={
                total:0,
                myGroup:0,
            }
        }
    })
    getOnline().then(res =>{
        this.group.total=Object.getOwnPropertyNames(res.data.online).length
        for(let x in res.data.online){
            if(res.data.online[x]=='online'){
                this.group.myGroup++
            }
        }
    })
  },
  watch:{
    messageBig:{
      handler(val){
        if(val.checked!=this.messageBigCopy.checked){
          UpdateRead({message_id:this.messageBig.id,status:Number(val.checked)}).then(()=>{
            this.messageBigCopy.checked=this.messageBig.checked
            if(this.messageBigCopy.checked==true){
                this.messageNum--
              }else{
                this.messageNum++
              }
          })
          }
      },
      deep:true
    },
    messages:{
      handler(val){
        for(let i=0;i<this.messages.length;i++){
            if(val[i].checked!=this.messagesCopy[i].checked){
            UpdateRead({message_id:val[i].id,status:Number(val[i].checked)}).then(()=>{
              this.messagesCopy[i].checked=!this.messagesCopy[i].checked
              if(this.messagesCopy[i].checked==true){
                this.messageNum--
              }else{
                this.messageNum++
              }
            })
            }
        }
      },
      deep:true
    }
  }
};
</script>

<style scoped>

  .group-button:hover,.group-button:focus{
    cursor: pointer;
    background-color: #CCD1D6;
  }

  .group-button{
    transition: all .2s;
    outline: none;
    border:none;
    background:rgba(252,254,255,1);
    box-shadow:3px 3px 10px 0px rgba(0, 0, 0, 0.05), -3px -3px 10px 0px rgba(0, 0, 0, 0.05);
    border-radius:20px;
    width:326px;
    height:56px;
    font-size: 18px;
  }

  .group-main{
    height: 56px;
    width: 1148px;
    display: flex;
    display: -webkit-flex; /* Safari */
    flex-direction:row;
    justify-content: space-between;
    align-items: flex-end;
    margin: 22px 0px 100px 0px;
  }

  .group-num{
    font-size:16px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(51,52,53,1);
    margin-left: 18px;
  }

  .group-logo{
    width: 50px;
    height: 56px;
    margin-right: 38px;
  }

  .group-title-box{
    display: flex;
    display: -webkit-flex; /* Safari */
    flex-direction:row;
    justify-content: flex-start;
    align-items: flex-end;
  }

  .third-line-box{
    margin-top: 36px;
    width: 1148px;
  }

  .proj-main{
    width:1148px;
    min-height:218px;
    background:rgba(252,254,255,1);
    box-shadow:3px 3px 10px 0px rgba(0, 0, 0, 0.05), -3px -3px 10px 0px rgba(0, 0, 0, 0.05);
    border-radius:20px;
    margin-top: 18px;
  }

  .proj-nun{
    margin-left: 22px;
    font-size:16px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(51,52,53,1);
  }

  .second-line-box{
    margin-top: 36px;
    width: 1148px;
  }

  .proj-logo{
    height: 60px;
    width: 60px;
    margin-right: 34px;
  }

  .proj-title-box{
    display: flex;
    display: -webkit-flex; /* Safari */
    flex-direction:row;
    justify-content: flex-start;
    align-items: flex-end;
  }

  .messages{
    margin-left: 42px;
    margin-bottom: 8px;
    font-size:14px;
    font-family:Microsoft YaHei;
    font-weight:400;
    display: flex;
    display: -webkit-flex; /* Safari */
    flex-direction:row;
    justify-content: space-between;
    align-items: flex-start;
    width: 446px;
  }

  .message-big-content{
    width: 360px;
    text-align: left;
    margin-left: 24px;
  }

  .message-big-title >>> .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner,
  .messages-title >>> .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner
  {
    background-color: #70B603;
    border-color: #70B603;
  }

  .message-big-title >>> .el-checkbox__inner,.messages-title >>> .el-checkbox__inner{
    border-color: #f00;
    border-radius: 50%;
  }

  .message-big-title{
    font-size:18px;
    font-family:Microsoft YaHei;
    font-weight:bold;
    color:rgba(0,0,0,1);
    display: -webkit-flex; /* Safari */
    flex-direction:row;
    justify-content: flex-start;
    align-items: center;
  }

  .message-big{
    width: 446px;
    display: flex;
    display: -webkit-flex; /* Safari */
    flex-direction:row;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 26px;
    margin-left: 42px;
    margin-bottom: 12px;
  }

  .message-main{
    height:474px;
    background:rgba(252,254,255,1);
    box-shadow:3px 3px 10px 0px rgba(0, 0, 0, 0.05), -3px -3px 10px 0px rgba(0, 0, 0, 0.05);
    border-radius:20px;
    margin-top: 24px;
    display: flex;
    display: -webkit-flex; /* Safari */
    flex-direction:column;
    justify-content: flex-start;
    align-items: flex-start;
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
    text-decoration: underline;
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
    text-decoration: underline;
  }

  .change-userInfo-button{
    transition: all .2s;
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
  }

  .main-box{
    min-height: 1000px;
    width: 1148px;
    margin: 76px auto 0px 24px;
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-direction:column;
    justify-content: flex-start;
    align-items: flex-start;
  }
</style>