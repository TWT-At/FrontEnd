<template>
    <div class="main-box">
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
                <div class="select-title select-title-role">角色</div>
                <el-select v-model="options.role" clearable placeholder="角色">
                    <el-option
                    v-for="item in optionsRole"
                    :key="item.role"
                    :label="item.role"
                    :value="item.role">
                    </el-option>
                </el-select>
                <div class="select-title select-title-datecampus">加入年份</div>
                 <el-date-picker
                v-model="options.year"
                type="year"
                value-format="yyyy"
                placeholder="加入年份">
                </el-date-picker>
                <div class="select-title select-title-datecampus">校区</div>
                <el-select v-model="options.campus" clearable placeholder="校区">
                    <el-option
                    v-for="item in optionsCampus"
                    :key="item.campus"
                    :label="item.campus"
                    :value="item.campus">
                    </el-option>
                </el-select>
            </div>
            <div class="single-grouper-div" v-for="(grouper,i) in selecetList" :key="i">
                <div class="single-title-div">
                    <div class="first-line">
                        {{grouper.name}}
                        <span class="role-group">{{grouper.campus}}-{{grouper.group_name}}({{grouper.group_role}})</span>
                        <span class="email-span">E-mail：{{grouper.email}}</span>
                    </div>
                    <div class="second-line">
                        <span class="second-span">{{grouper.year}}年加入天外天工作室</span>
                        <span class="second-span">累计工作时长{{grouper.hour}}小时</span>
                        <span class="second-span">本周工作时长9999小时</span>
                    </div>
                    <button class="show-button" @click="handleFold(i)">
                        <span class="show-span">他的项目</span>
                        <i :class="[grouper.fold?'el-icon-d-arrow-right i-icon':'el-icon-d-arrow-right i-icon-open']"></i>
                    </button>
                </div>
                <div class="single-main">
                    <el-collapse-transition>
                        <div v-show="grouper.fold">
                            <div class="fold-box">
                                <div v-for="(proj,i) in grouper.project" :key="i" class="porject-div">
                                    <el-progress 
                                    type="circle" 
                                    :percentage=proj.rate
                                    :stroke-width=12
                                    :width=66>
                                    </el-progress>
                                    <div class="proj-info">
                                        {{proj.title}}<br/>
                                        <span class="proj-info-span">起始时间：{{proj.cteatedDate}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-collapse-transition>
                    <button @click="handleFold(i)" class="huge-button"><i :class="[grouper.fold?'el-icon-arrow-down hugebutton-icon':'el-icon-arrow-down']"></i></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {getGrouper,getComplex} from '../api/user'

export default {
    name:"grouper",
    data(){
        return{
            loading:false,
            defaultActive:"3",
            list:[{
            id: 2,
            name: "周菁涛",
            group_name: "前端组",
            group_role: "骨灰",
            campus: "北洋园",
            email: "qcx@tju.edu.cn",
            date: 17,
            hour: 416,
            year: 9012,
            fold: false,
            project: [
                {
                    title: "海棠节H5",
                    description: "天津大学海棠节H5开发",
                    process: "已完成",
                    cteatedDate:"2020-2-30",
                    rate:59,
                },
                {
                    title: "at系统开发",
                    description: "天外天新人at系统开发",
                    process: "已完成首页、周报、日志接口；\r\n完成部分管理员接口；\r\n",
                    cteatedDate:"2020-2-30",
                    rate:59,
                },
                {
                    title: "at系统开发",
                    description: "天外天新人at系统开发",
                    process: "已完成首页、周报、日志接口；\r\n完成部分管理员接口；\r\n",
                    cteatedDate:"2020-2-30",
                    rate:59,
                },
                {
                    title: "at系统开发",
                    description: "天外天新人at系统开发",
                    process: "已完成首页、周报、日志接口；\r\n完成部分管理员接口；\r\n",
                    cteatedDate:"2020-2-30",
                    rate:59,
                },
            ]
            },
            {
            id: 2,
            name: "周菁涛",
            group_name: "前端组",
            group_role: "骨灰",
            campus: "北洋园",
            email: "qcx@tju.edu.cn",
            date: 17,
            hour: 416,
            year: 9012,
            fold: false,
            project: [
                {
                    title: "海棠节H5",
                    description: "天津大学海棠节H5开发",
                    process: "已完成",
                    cteatedDate:"2020-2-30",
                    rate:59,
                },
                {
                    title: "at系统开发",
                    description: "天外天新人at系统开发",
                    process: "已完成首页、周报、日志接口；\r\n完成部分管理员接口；\r\n",
                    cteatedDate:"2020-2-30",
                    rate:59,
                },
                {
                    title: "at系统开发",
                    description: "天外天新人at系统开发",
                    process: "已完成首页、周报、日志接口；\r\n完成部分管理员接口；\r\n",
                    cteatedDate:"2020-2-30",
                    rate:59,
                },
                {
                    title: "at系统开发",
                    description: "天外天新人at系统开发",
                    process: "已完成首页、周报、日志接口；\r\n完成部分管理员接口；\r\n",
                    cteatedDate:"2020-2-30",
                    rate:59,
                },
            ]
            }],
            selecetList:[],
            options:{
                role:"",
                year:"",
                campus:""
            },
            optionsRole:[
                {role:"组长"},
                {role:"组员"},
                {role:"实习"},
                {role:"骨灰"},
            ],
            optionsCampus:[
                {campus:"北洋园"},
                {campus:"卫津路"},
            ]
        };
    },
    methods:{
        handleFold(i){
            this.selecetList[i].fold=!this.selecetList[i].fold
        },
        handleSelect(key){
            this.options={
                role:"",
                year:"",
                campus:""
            }
            this.list.length=0;
            let keyword;
            switch (key) {
                case "1" :
                    keyword="PM"
                    break
                case "2" :
                    keyword="UI"
                    break
                case "3" :
                    keyword="Web"
                    break
                case "4" :
                    keyword="BackEnd"
                    break
                case "5" :
                    keyword="Android"
                    break
                case "6" :
                    keyword="IOS"
                    break
                default:
                    keyword=0
            }
            this.loading=true;
            getGrouper(keyword).then(res =>{
                let {data}=res.data;
                data.forEach(elem =>{
                    let o={
                        id:elem.id,
                        name:elem.name,
                        group_name:elem.group_name,
                        group_role:elem.group_role,
                        campus:elem.campus,
                        fold:false,
                        year:2013                                   //此处待更改
                    }
                    getComplex({id:o.id}).then(resdata=>{
                        o.email=resdata.data.student[0].email;
                        o.date=resdata.data.student[0].date;
                        o.hour=resdata.data.student[0].hour;
                        o.project=
                        [{
                                title: "海棠节H5",
                                description: "天津大学海棠节H5开发",
                                process: "已完成",
                                cteatedDate:"2020-2-30",
                                rate:59,
                            },
                            {
                                title: "at系统开发",
                                description: "天外天新人at系统开发",
                                process: "已完成首页、周报、日志接口；\r\n完成部分管理员接口；\r\n",
                                cteatedDate:"2020-2-30",
                                rate:59,
                            },
                            {
                                title: "at系统开发",
                                description: "天外天新人at系统开发",
                                process: "已完成首页、周报、日志接口；\r\n完成部分管理员接口；\r\n",
                                cteatedDate:"2020-2-30",
                                rate:59,
                            },
                            {
                                title: "at系统开发",
                                description: "天外天新人at系统开发",
                                process: "已完成首页、周报、日志接口；\r\n完成部分管理员接口；\r\n",
                                cteatedDate:"2020-2-30",
                                rate:59,
                            },]            //展示用途
                        o.project.forEach(item => item.rate=60)
                        if(o!=undefined){
                            this.list.push(o)
                            this.selecetList.push(o)
                        }
                    })
                })
                this.loading=false;
            })
        },
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
        this.handleSelect(this.defaultActive)
    },
    watch:{
        options:{
            handler(val){
                this.selecetList.length=0;
                this.list.forEach(elem=>{
                    if((val.role==""||val.role==elem.group_role)&&(val.campus==""||val.campus==elem.campus)&&(val.year==""||val.role==elem.year)){
                        this.selecetList.push(elem)
                    }
                })
            },
            deep:true
        }
    }
}
</script>

<style scoped>

    .proj-info-span{
        font-size:14px;
        font-family:Microsoft YaHei;
        font-weight:normal;
        color:#8F8F8F;
        line-height:24px;
    }

    .proj-info{
        font-size:14px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(0,0,0,1);
        line-height:24px;
        margin-left: 16px;
    }

    .porject-div{
        width: 260px;
        text-align: left;
        display: flex;
        display: -webkit-flex; /* Safari */
        flex-direction:row;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 24px;
    }

    .fold-box >>> .el-progress__text{
        font-size:14px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(3,163,234,1);
    }

    .fold-box{
        background: #fff;
        min-height: 100px;
        display: flex;
        display: -webkit-flex; /* Safari */
        flex-direction:row;
        justify-content: space-between;
        align-items: flex-start;
        flex-wrap:wrap;
    }

    .hugebutton-icon{
        transform:rotate(180deg);
        -ms-transform:rotate(180deg); 	/* IE 9 */
        -moz-transform:rotate(180deg); 	/* Firefox */
        -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
        -o-transform:rotate(180deg); 	/* Opera */
    }

    .huge-button:hover{
        cursor: pointer;
    }

    .huge-button{
        margin: 4px auto 4px auto;
        outline: none;
        border: none;
        background-color: #fff;
    }

    .huge-button >>> i{
        font-size: 38px;
        font-weight: bold;
        color: #3B4C5D;
    }

    .single-main{
        margin:24px 56px 0px 56px;
        text-align: center;
    }

    .show-button:hover{
        cursor: pointer;
    }

    .show-button >>> i{
        font-size: 16px;
        margin-top: 22px;
    }

    .show-span{
        margin-right: 8px;
        font-size:14px;
        font-family:Microsoft YaHei;
        font-weight:400;
        text-decoration:underline;
        color:rgba(3,163,234,1);
    }

    i{
        transition: all .3s ease-in;
    }

    .i-icon-open{
        transform:rotate(-90deg);
        -ms-transform:rotate(-90deg); 	/* IE 9 */
        -moz-transform:rotate(-90deg); 	/* Firefox */
        -webkit-transform:rotate(-90deg); /* Safari 和 Chrome */
        -o-transform:rotate(-90deg); 	/* Opera */
    }

    .i-icon{
        transform:rotate(90deg);
        -ms-transform:rotate(90deg); 	/* IE 9 */
        -moz-transform:rotate(90deg); 	/* Firefox */
        -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
        -o-transform:rotate(90deg); 	/* Opera */
    }

    .show-button:hover{
        text-decoration: underline;
    }

    .show-button{
        transition: all .3s ease-in;
        outline: none;
        border: none;
        background: #fff;
        margin-left: 56px;
        font-size:14px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(3,163,234,1);
    }

    .second-span{
        margin-right: 16px;
    }

    .second-line{
        margin-top: 8px;
        text-align: left;
        margin-left: 56px;
        font-size:14px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(0,0,0,1);
    }

    .email-span{
        font-size:14px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(0,0,0,1);
        margin-left: 160px;
    }

    .role-group{
        font-size:14px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(0,0,0,1);
        margin-left: 16px;
    }

    .first-line{
        margin-top: 22px;
        text-align: left;
        margin-left: 56px;
        font-size:18px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(61,75,89,1);
    }

    .single-grouper-div{
        margin:0px 18px 0px 18px;
        border-bottom:1px solid #D0D2D3;
        min-height: 178px;
        width: 1112px;
        text-align: left;
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
        background:rgba(59,76,93,1)!important;
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