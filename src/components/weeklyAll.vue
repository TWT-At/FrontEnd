<template>
    <div class="main-box">
        <div class="title-container">
            <div class="main-title">
                第{{getIssue()}}期周报<span class="day-span">{{getDay()}}</span>
            </div>
            <div class="title-div">
                <div class="word-div">
                    <span class="word-first">我的周报：</span>
                    <span v-if="userInfo.WeekPublicationSituation" class="word-second">已提交</span><span v-if="!userInfo.WeekPublicationSituation" class="word-second">未提交</span>
                    <br>
                    <span class="word-third">
                        周报完成情况以及组长评比将会纳入个人学期考核评比中，
                    </span>
                    <br>
                    <span class="word-third">
                        请工作室各位成员认真对待，按时完成。
                    <button class="to-write-button" @click="handleTo()">去编辑周报</button>
                    </span>
                    
                </div>
                <flip-countdown :deadline="getDDL()"></flip-countdown>
            </div>
        </div>
        <div class="header-div">
            <el-menu 
            :default-active="defaultActive"
            background-color="#E9EFF2"
            active-text-color="#3D4B59"
            text-color="#FCFEFF"
            mode="horizontal" 
            @select="handleSelect">
                <el-menu-item index="产品组">PM</el-menu-item>
                <el-menu-item index="设计组">UI/UX</el-menu-item>
                <el-menu-item index="前端组">Web</el-menu-item>
                <el-menu-item index="程序组">BackEnd</el-menu-item>
                <el-menu-item index="Android">Android</el-menu-item>
                <el-menu-item index="IOS">iOS</el-menu-item>
            </el-menu>
        </div>
        <div v-loading="loading" class="body-div">
            <div class="select-main">
                <div class="select-title select-title-datecampus">校区</div>
                <el-select v-model="options.campus" clearable placeholder="校区">
                    <el-option
                    v-for="item in optionsCampus"
                    :key="item.campus"
                    :label="item.campus"
                    :value="item.campus">
                    </el-option>
                </el-select>
                <div class="select-title select-title-datecampus">选择学期</div>
                 <el-cascader
                    :options="semesters"
                    separator='第'
                    :props="{ expandTrigger: 'hover' }"
                    v-model="options.semester"
                    >
                </el-cascader>
            </div>
            <div class="table-main">
                <div class="table-title-div">
                    <table class="title-table" cellpadding="0">
                        <colgroup class="name-title-colgroup" width="158"></colgroup>
                        <colgroup span="14" class="weekly-title-colgroup" width="60"></colgroup>
                        <tr>
                            <td class="name-title-td"></td>
                            <td class="weekly-title-td" :key=index v-for="(elem,index) in issuesArray">{{elem}}</td>
                        </tr>
                        <tr class="main-tr" :key=index v-for="(mem,index) in selectData">
                            <td class="name-td">{{mem.name}}</td>
                            <td v-for="(week) in mem.WeekPublication" :key=week.created_at class="status-td"><img class="status-img" v-on:click="handleToWeek(mem,week)" :src="getStatus(week.status)"></td>
                            <td  v-for="(week,index) in getBlanktd(mem.WeekPublication.length)" :key=index class="status-td"></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FlipCountdown from 'vue2-flip-countdown'

import weeklyE from '../assets/weeklyE.png'
import weeklyU from '../assets/weeklyU.png'
import weeklyF from '../assets/weeklyF.png'

import {getWeekly} from '../api/user'

export default {
    name:"grouper",
    components: { FlipCountdown },
    data(){
        return{
            issuesArray:this.getIssuesArray(),
            weeklyE,
            weeklyU,
            weeklyF,
            weekData:[],
            groupData:[],
            selectData:[],
            userInfo:this.$store.getters.userInfo,
            loading:false,
            defaultActive:"前端组",
            options:{
                semester:[],
                campus:""
            },
            optionsCampus:[
                {campus:"北洋园"},
                {campus:"卫津路"},
            ],
            semesters:[],
        };
    },
    methods:{
        handleSelect(key){
            this.groupData.length=0;
            this.groupData=this.weekData.filter((elem)=>{
                return elem.group==key
            })
            this.selectData=this.groupData.filter(()=>{
                return true
            })
            this.options.campus=''
        },
        getTerm(){
            let date=new Date;
            let year=date.getFullYear();
            let month=date.getMonth()+1;
            let term;
            if(month>=2&&month<9){
                term=2;
            }else{
                term=1;
            }
            this.options.semester=[`${year-1}-${year}`,`${term}`]
            for(let i=0;i<14;i++){
                let data={
                    value:`${year-i-1}-${year-i}`,
                    label:`${year-i-1}-${year-i}学年`,
                    children:[
                        {
                            value:'1',
                            label:'1学期',
                        },
                        {
                            value:'2',
                            label:'2学期',
                        }
                    ]
                }
                this.semesters.push(data)
            }
        },
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
            //
            let s_time = c_time + (7-c_day)*oneDayLong;//当前周一的毫秒时间
            let sunday = new Date(s_time);//设置周一时间对象
            let s_year = sunday.getFullYear();
            let s_month = sunday.getMonth()+1;
            let s_date = sunday.getDate();
            return `${m_year+'/'+m_month+'/'+m_date}~${s_year+'/'+s_month+'/'+(s_date)}`
        },
        fetchWeekly(semester){
            this.loading=true
            getWeekly({semester:semester}).then((res)=>{
                this.weekData=res.data.data
                this.handleSelect(this.defaultActive)
                res.data.data.forEach(elem=>{
                    if(elem.name==this.$store.getters.userInfo.name&&elem.group==this.$store.getters.userInfo.group){
                        this.$store.dispatch('user/setMyWeek',elem)
                    }
                })
                this.loading=false
            }).catch(()=>{
                this.loading=false
            })
        },
        getDDL(){
            let nowTemp = new Date();//当前时间
            let oneDayLong = 24*60*60*1000 ;//一天的毫秒数
            let c_time = nowTemp.getTime() ;//当前时间的毫秒时间
            let c_day = nowTemp.getDay()||7;//当前时间的星期几
            let m_time = c_time + (7-c_day)*oneDayLong;//当前周一的毫秒时间
            let monday = new Date(m_time);//设置周一时间对象
            let m_year = monday.getFullYear();
            let m_month = monday.getMonth()+1;
            let m_date = monday.getDate();
            return `${m_year+'/'+m_month+'/'+(m_date)} 23:59:59`
        },
        getIssuesArray(){
            let a=new Array();
            let latest=parseInt(this.getIssue())
            for(let i=0;i<14;i++){
                a[i]=latest;
                latest--;
            }
            return a;
        },
        getStatus(status){
            switch (status){
                case 'UnFinished':
                    return weeklyU
                case 'Finished':
                    return weeklyF
                default:
                    return weeklyE
            }
        },
        getBlanktd(length){
            let a=new Array();
            if(length<14){
                a=Array.apply(null, {length: 14-length})
            }
            return a;
        },
        handleToWeek(mem,week){
            if(week.status=='Finished'){
                this.$store.dispatch('user/setWeekInfo',{mem:mem,week:week}).then(()=>{
                this.$router.push('/main/weeklyComment')
            })}
        },
        handleTo(){
            this.$router.push('/main/weeklyWrite')
        }
    },
    mounted(){
        (function smoothscroll(){
            var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo (0,currentScroll - (currentScroll/5));
            }
        })();
    },
    created(){
        this.getTerm();
        this.fetchWeekly(`${this.options.semester[0]}-${this.options.semester[1]}`)
    },
    watch:{
        'options.campus':{
            handler(val){
                this.selectData.length=0;
                this.selectData=this.groupData.filter((elem)=>{
                        return (val==''||val==elem.campus)
                })
            }
        },
        'options.semester':{
            handler(val,oldval){
                if(oldval.length!=0){
                    this.weekData.length=0
                    this.groupData.length=0
                    this.selectData.length=0
                    this.fetchWeekly(`${val[0]}-${val[1]}`)
                }
            }
        }
    }
}
</script>

<style scoped>

    .main-tr{
        transition: all .3s;
    }

    .main-tr:hover{
        background-color: #fafafa;
    }

    table , td {
        border-bottom:1px solid #EBEEF5;
    }

    .name-title-td{
        height: 38px;
    }

    .title-table{
        font-size:14px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(0,0,0,1);
    }

    .status-td{
        width: 58px;
    }

    .status-img{
        transition: all .6s;
        width: 22px;
        height: 22px;
    }

    .status-img:hover{
        cursor: pointer;
        transform:rotate(360deg);
        -ms-transform:rotate(360deg); 	/* IE 9 */
        -moz-transform:rotate(360deg); 	/* Firefox */
        -webkit-transform:rotate(360deg); /* Safari 和 Chrome */
        -o-transform:rotate(360deg); 	/* Opera */
    }

    .name-td{
        width: 158px;
        height: 38px;
    }

    .table-main{
        margin:28px 76px 28px 76px;
        width: 996px;
    }


    table {
        border-collapse:collapse;
    }


    .flip-clock{
        margin:0px!important;
    }

    .word-third{
        height: 20px;
    }

    .to-write-button:hover{
        cursor: pointer;
        text-decoration: underline;
    }

    .to-write-button{
        transition: all .2s;
        outline: none;
        border:none;
        height:20px;
        font-size:16px;
        font-family:Microsoft YaHei;
        font-weight:400;
        background-color: #fff;
        color: #03A3EA;
        padding: 0px;
    }

    .word-second{
        font-size:18px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:#F59A23;
    }

    .word-first{
        font-size:18px;
        font-family:Microsoft YaHei;
        font-weight:normal;
        color:#333435;
    }

    .title-container{
        width:100%;
        text-align: left;
    }

    .title-div{
        width:100%;
        min-height:110px;
        background:rgba(252,254,255,1);
        box-shadow:3px 3px 10px 0px rgba(0, 0, 0, 0.05), -3px -3px 10px 0px rgba(0, 0, 0, 0.05);
        border-radius:20px;
        padding:22px 34px 22px 34px;
        margin:22px  0px 48px 0px;
        display: flex;
        display: -webkit-flex; /* Safari */
        flex-direction:row;
        justify-content: space-between;
        align-items: flex-start;
    }

    .day-span{
        font-size:16px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(51,52,53,1);
        margin-left: 36px;
    }

    .main-title{
        font-size:30px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(61,75,89,1);
    }

    .select-main >>> .el-input__inner{
        border-radius: 5px;
        border-color: #B5B5B5;
    }

    .select-title-datecampus{
        margin-left: 36px;
        margin-right: 16px;
    }

    .select-title-role{
        margin-left: 56px;
        margin-right: 16px;
    }

    .select-title{
        font-size:18px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(61,75,89,1);
    }

    .select-main{
        height: 70px;
        margin:0px 18px 0px 18px;
        border-bottom:1px solid #D0D2D3;
        width: 1112px;
        display: flex;
        display: -webkit-flex; /* Safari */
        flex-direction:row;
        justify-content: flex-start;
        align-items: center;
    }

    .header-div >>> .is-active{
        background-color: rgba(252,254,255,1)!important;
    }

    .el-menu--horizontal>.el-menu-item.is-active{
        border: none;
    }

    .el-menu::after, .el-menu::before {
        content: none;
    }

    .body-div{
        width: 1148px;
        min-height: 1000px;
        background: #fff;
        display: flex;
        display: -webkit-flex; /* Safari */
        flex-direction:column;
        justify-content: flex-start;
        align-items: center;
        padding-bottom: 100px;
    }

    .el-menu-item{
        width:178px;
        height:52px;
        box-shadow:3px 3px 10px 0px rgba(0, 0, 0, 0.05), -3px -3px 10px 0px rgba(0, 0, 0, 0.05);
        border-radius:20px 20px 0px 0px;
        background:#1A5D79!important;
        border: none!important;
        font-size:24px;
        font-family:Microsoft YaHei;
        font-weight:bold;
    }

    .el-menu-item:hover{
        background-color:#CCD1D6;
    }

    .header-div >>> .is-active{
        background-color: rgba(252,254,255,1)!important;
    }

    .el-menu{
        width: 1148px;
        height: 52px;
        display: flex;
        display: -webkit-flex; /* Safari */
        flex-direction:row;
        justify-content: space-between;
        align-items: flex-start;
        border: none;
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