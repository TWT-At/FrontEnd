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
                    <button class="to-write-button">去编辑周报</button>
                    </span>
                    
                </div>
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
                <el-menu-item index="1">PM</el-menu-item>
                <el-menu-item index="2">UI/UX</el-menu-item>
                <el-menu-item index="3">FrontEnd</el-menu-item>
                <el-menu-item index="4">BackEnd</el-menu-item>
                <el-menu-item index="5">Android</el-menu-item>
                <el-menu-item index="6">iOS</el-menu-item>
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
        </div>
    </div>
</template>

<script>
import {getWeekly} from '../api/user'

export default {
    name:"grouper",
    data(){
        
        return{
            WeekPublicationFinisherSituation:[],
            userInfo:this.$store.getters.userInfo,
            loading:false,
            defaultActive:"3",
            options:{
                semester:[],
                campus:""
            },
            optionsCampus:[
                {campus:"北洋园"},
                {campus:"卫津路"},
            ],
            semesters:[

            ],
        };
    },
    methods:{
        handleSelect(key){
            window.console.log(key)
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
            for(let i=0;i<5;i++){
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
            return `${m_year+'/'+m_month+'/'+m_date}~${m_year+'/'+m_month+'/'+(m_date+6)}`
        },
        fetchWeekly(semester){
            getWeekly({semester:semester}).then((res)=>{
                this.WeekPublicationFinisherSituation=res.data.WeekPublicationFinisherSituation
            })
        }
    },
    mounted(){
    },
    created(){
        this.getTerm();
        this.fetchWeekly(`${this.options.semester[0]}-${this.options.semester[1]}`)
    },
    watch:{
        
    }
}
</script>

<style scoped>

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
        height:110px;
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